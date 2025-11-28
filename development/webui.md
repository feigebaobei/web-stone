# webui

## 浏览器扩展程序

### recorder

```js
// 以这样方法绑定多个事件
addEventListenerFn(document, 'input', documentInput, true) // 有捕获阶段触发
document.querySelectorAll('select').forEach(() => {...})
$(document).ready(() => {
    $('body').delegate('*', 'mouseenter', mouseenterH)
})
let mouseenterH = () => {
    if (!isStop) {
        cacheDomMapSelector(target, () => {
            if (target.shadowRoot) { // 处理影子元素
                let domList = querySelectorAllShadow('*', target.shadowRoot)
                domList.forEach(dom => {
                    bindEvent(dom, 'mouseenter', shadwoDomMouseenter) // 为这个元素绑定mouseenter事件
                    $(dom).delegate('*', 'mouseenter', shadwoDomMouseenter) // 为这个元素的后代元素绑定mouseenter事件
                })
            } else { // 处理非影子元素
                opMouseenter(event.target)
                bindEvent(dom, 'mouseenter', shadwoDomMouseenter)
            }
        })
    }
    if (selectionDom) {}
}
let cacheDomMapSelector = (dom, onceFn) => {
    if (!domMapSelector.has(dom)) {
        domMapSelector.set(dom, getDomSelector(dom))
        if (onceFn) {
            onceFn()
        }
    }
}
let shadwoDomMouseenter = (event) => {
    opMouseenter(event.target)
}
let shadwoDomMouseenter = (event) => {
    cacheDomMapSelector(event.target, () => {
        opMouseenter(event.target)
    })
}

```

### 确定 framePath

```js
let loop = createLoop(
  (ud) => {
    return storage.get([ud]).then((res) => {
      return res[ud]
    })
  },
  (framePath) => {
    return !framePath
  },
  -1
)
let createLoop = (promiseFn, isCircleFn, i = 0) => {
  return Object.create(loopPropotype, {
    promiseFn: {
      value: promiseFn,
    },
    isCircleFn: {
      value: isCircleFn,
    },
    interval: {
      value: i,
    },
  })
}
let loopPropotype = Object.create(
  {},
  {
    launch: {
      value: function (...p) {
        return this.promiseFn(...p).then((r) => {
          if (this.isCircleFn(r)) {
            if (this.interval < 0) {
              return this.launch(...p)
            } else {
              return sleep(this.interval).then(() => {
                return this.launch(...p)
              })
            }
          } else {
            return r
          }
        })
      },
    },
  }
)
window.addEventListener('message', (messageEvent) => {
  let iframeList = document.querySelectorAll('iframe')
  let iframeIndex = -1
  if (messageEvent.data.webUIFramePath) {
    let ud = messageEvent.data.webUIFramePath.ulid
    let arr = compatibleArray(messageEvent.data.webUIFramePath.res)
    let res = [...arr]
    switch (iframeList.length) {
      default:
        for (let i = 0; i < iframeList.length; i++) {
          if (
            iframeList[i].contentWindow == messageEvent.source ||
            iframeList[i].contentWindow.parent == messageEvent.source.top
          ) {
            iframeIndex = i
          }
        }
        if (iframeIndex > -1) {
          res.unshift(`iframe >> nth=${iframeIndex}`)
        }
        break
      case 1:
        if (
          iframeList[i].contentWindow == messageEvent.source ||
          iframeList[i].contentWindow.parent == messageEvent.source.top
        ) {
          res.unshift('iframe')
        }
        break
      case 0:
        break
    }
  }
  if (res.length > arr.length) {
    if (window.parent == window.self) {
      let o = { [`${ud}`]: res }
      storage.set(o)
    } else {
      window.parent.postMessage(
        {
          webUIFramePath: {
            ulid: ud,
            res,
          },
        },
        '*'
      )
    }
  } else {
    let o = { [`${ud}`]: res }
    storage.set(o)
  }
})
```

### 取得 xPath

```js
let getStableXPath = (element) => {
  let cur = element
  let parts = []
  let part
  while (cur && cur.nodeType === 1) {
    part = cur.tagName.toLowerCase()
    if (cur.parentElement) {
      let siblings = array
        .from(cur.parentElement.children)
        .filter((el) => el.tagName === cur.tagName)
      if (sibling.length) {
        let index = sibling.indexOf(cur)
        part += `[${index + 1}]`
      }
    }
    parts.unshift(part)
    cur = cur.parentElement
  }
  return parts.length ? `//${parts.join('/')}` : ''
}
```

### 取得 selector

```js
let getSelectorByDom = (dom, check = false) => {
  cacheDomMapSelector(dom)
  let selector = domMapSelector.get(dom)
  if (check) {
    let parsedSelector = parseSelector(selector)
    let result = injectedScript.querySelectorAll(
      parsedSelector,
      dom.ownerDocument
    )
    if (result.length > 1) {
      for (let i = 0; i < result.length; i++) {
        if (result[i] === dom) {
          selector = injectedScript.generateSelectorSimple(result[i])
          break
        }
      }
    }
  }
  return selector
}
```

### injectedScript

这里参考了 playwright-crx 源码

```js
let injectedSctript = new InjectedScript(
  window,
  false,
  'javascript',
  TESTIDATTRIBUTENAME,
  1,
  'chromium',
  true,
  []
)
```

### bg.js

```js
class UniqueEvent {
  constructor(timeout = 300, sendMessageFn = () => {}) {
    this.queue = new PriorityQueue('time')
    this.timeout = timeout
    this.timer = 0
    this.sendMessageFn = sendMessageFn
  }
  clearTimeoutFn() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = 0
    }
  }
  enqueueAndOp(message) {
    this.queue.enqueue(message)
    let length = this.queue.size()
    if (length === 1) {
      this.clearTimeoutFn()
      this.timer = setTimeout(() => {
        this.opMessage(this.queue.peek(0), 1)
        this.dequeueFromFront(1)
      }, this.timeout)
    } else {
      this.clearTimeoutFn()
      this.timer = setTimeout(() => {
        this.opMoreAction()
      }, this.timeout)
    }
  }
  opMoreAction() {
    let index = 0
    let groupLen = 0
    let length = this.queue.size()
    while (index < length) {
      let cur = this.queue.peek(index)
      let next = this.queue.peek(index + 1)
      if (!next) {
        groupLen++
        break
      } else {
        if (isSameOriginEvent(cur, next)) {
          index++
          groupLen++
        } else {
          groupLen++
          break
        }
      }
    }
    this.opMessage(this.queue.peek(groupLen - 1), groupLen)
    this.dequeueFrontFront(groupLen)
    length = this.queue.size()
    if (length) {
      this.opMoreAction()
    }
  }
  dequeueFromFront(count) {
    while (count) {
      this.queue.dequeue()
      count--
    }
  }
  opMessage(message, count) {
    switch (message.name) {
      case 'click':
        message.clickCount = count
        let next = this.queue.peek(count)
        if (next && ['tabcreate'].includes(next.name)) {
          let pageStr = `${tabIdPageN.pre}${
            tagIdPageN.cur ? tabIdPageN.cur : ''
          }`
          message.signals.push({
            name: 'popup',
            popupAlias: pageStr,
          })
        }
        this.sendMessageFn(message)
        break
      case 'wheel':
        let i = 0,
          arr = []
        while (i < count) {
          arr.push(this.queue.peek(i))
          i++
        }
        message.deltaX = arr.reduce((r, c) => {
          r += c.deltaX
          return r
        }, 0)
        message.deltaY = arr.reduce((r, c) => {
          r += c.deltaY
          return r
        }, 0)
        this.sendMessageFn(message)
        break
      default:
        this.sendMessageFn(message)
        break
    }
  }
}
let uniqueEvent = new UniqueEvent(400, () => {
  chrome.runtime.sendMessage({ webUILog: message, source: 'background' })
})
chrome.runtime.onMessage.addListener((message) => {
  switch (message.action) {
    case eventType.RECORDER:
      autoOverQueue.enqueue(message.log)
      let last = autoOverQueue.getTail()
      if (IMPORTANTEVENTLIST.includes(last.name)) {
        while (!autoOverQueue.isEmpty()) {
          let eventObj = autoOverQueue.dequeue()
          uniqueEvent.enqueueAndOp(eventObj)
        }
      }
      break
  }
})
```

xx 与后台服务通信

```js
chrome.runtime.onMessage.addListener(() => {
  chrome.runtime.sendMessage({ log: res, action: eventType.CONFIG })
})
```

## 管理端

## 执行机

```js
let {chromium} = require('playwright')

router.route('/')
    .options((req, res) => {res.sendStatus(200)})
    .get((req, res) => {
        replay(stepList, stepConfig, preConfig).then(response => {
            res.status(200).join({
                code: 0,
                message: '',
                data: response,
            }).catch(...)
        })
    })
let replay = async (stepList, stepConfig, preConfig) => {
    let browser = await chromium.launch({
        headless: false,
        slowMo: preConfig.slowMo,
        timeout: preConfig.timeout,
    })
    let context = await browser.newContext({
        viewport: {width: preConfig.width, height: preConfig.height, }
    })
    await context.addCookies(stepConfig.cookie)
    let paget = await context.newPage()
    let box = []
    let stepListActual = calcVar(cloneDeep(stepList), stepConfig.varList)
    return await runFn(page, stepListActual, browser, box, preConfig.fullPage, preConfig.opError)
}
// 执行全部步骤
let runFn = (...) => {
    let retryIndexArr = []
    let pageMap = new Map()
    pageMap.set('page', page)
    for (let i = 0; i < stepList.length; i++) {
        let step = stepList[i]
        let pagePromise = null
        if (Array.isArray(step.signals)) {
            for (let i = 0; i < step.signals.length; i++) {
                switch (step.signals[i].name) {
                    case 'popup':
                        pagePromise = pageMap.get(step.pageAlias).waitForEvent('popup', {})
                    break;
                }
            }
        }
        let pageTarget = pageMap.get(step.pageAlias || 'page')
        let relationPage
        switch (step.name) {
            case 'tabchange':
                relationPage = Array.from(pageMap.values()).find(p => (p.url() === step.url))
                break;
        }
        await runStep(...).then(response => {
            box.push(response)
            return
        }).then(() => {
            return screenshotFn(...)
        }).then(() => {
            if (pagePromise) {
                return pagePromise
            } else {
                return false
            }
        }).then((p) => {
            if (p) {
                pageMap.set(stepList[i].signals[0].popupAlias, p)
            }
            pagePromise = null
        }).catch((error) => {
            switch (opError) {
                case 'retry':
                    if (retryIndexArr.includes(i)) {
                        collectError(box, error) // 把error放在box里
                        return screenshotFn(...)
                    } else {
                        retryIndexArr.push(i)
                        i--
                    }
                    break;
                case 'block':
                    collectError(...)
                    i = stepList.length
                    return screenshotFn(...)
                    break;
                case 'ingore':
                    collectError(...)
                    return screenshotFn(...)
                    break;
            }
        })
    }
}
let calcVar = () => {
    let regVarList = calcVarConfig(...)
    return steplist.map(stepItem => {
        switch (stepItem.name) {
            case 'click':
                stepItem.selector = replaceVar(stepItem.selector, regVarList)
                stepItem.locator = genLocator(...)
                break;
            ....
        }
    })
}
let replaceVar  = (...) => {
    return regVarList.reduce((r, c) => {
        r = r.replace(c.reg, c.value)
    }, originStr)
}
let calcVarConfig  = (config) => {
    return config.map(item => {
        let value = (new Function(`return ${item.value}`))()
        let parttern = `\\$\\{\\{${item.key}\\}\\}`
        let t = {
            key: item.key,
            value: value,
            reg: new RegExp(parttern, 'g')
        }
        return t
    })
}
let runStep = (...) => {
    switch (step.name) {
        case 'click':
            await getLocator(page, step).then(() => {
                ...
            })
            break;
    }
}
let getLocator = async (....) => {
    let obj = await getLocator2(page, ...)
    let t
    if (obj.selectorCount >= 1) {
        t = obj.selectorLocator
    } else if (obj.xPathCount >= 1) {
        t = obj.xPathLocator
    } else {
        t = Promise.reject()
    }
    return t
}
let getLocator2 = (...) => {
    let frameLocator = getFrameLocatorByFramePath(...)
    let selectorLocator = frameLocator.locator(selector)
    let xPathLocator = xPath ? frameLocator.locator(`xpath=${xPath}`) : undefined
    let selectorCount = await selectoLocator.count()
    let xPathCount = xPathLocator ? await xPathLocator.count() : 0
    return {
        frameLocator, selectorLocator, xPathLocator, selectorCount, xPathCount
    }
}
```
