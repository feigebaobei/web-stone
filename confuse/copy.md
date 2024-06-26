# 复制

前端脚本复制。

## 推荐解决方案

```js
let copy = (str) => {
  let p
  if (window.isSecureContext && navigator.clipboard) {
    p = navigator.clipboard.writeText(str)
  } else {
    let ele = document.createElement('textarea')
    let styles = ele.style
    styles.position = 'fixed'
    styles.zIndex = '0'
    styles.left = '-500px'
    styles.top = '-500px'
    ele.value = str
    document.body.appendChild(ele)
    ele.focus()
    ele.select()
    let result = document.execCommand('copy')
    ele.remove()
    p = Promise.resolve(true)
  }
  return p
}
```

## 可选解决方案

- clipboard
  - [npm](https://www.npmjs.com/package/clipboard)
  - [官网](https://clipboardjs.com/)
- [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2)
- [vue3-clipboard]()
- [useClipboard](https://vueuse.org/core/useClipboard/)
- [v-clipboard](https://www.npmjs.com/package/v-clipboard)

[Clipboard](/language/javascript/clipboard.html) 有兼容性问题
[ClipboardData]()
[DataTransfer]()

### clipboard

```js
navigator.clipboard
  .writeText('str')
  .then(() => {
    clog('then')
  })
  .catch(() => {
    clog('catch')
  })
  .finally(() => {
    clog('finally')
  })
```

```
navigator.clipboard.writeText()
navigator.clipboard.readText()
navigator.clipboard.write()
navigator.clipboard.read()
event.clipboardData.setData(format, data)
event.clipboardData.getData(format)
event.clipboardData.clearData()
```

## 反对解决方案

- document.execCommand('copy') // 'cut' / 'paste'
  - 存在安全问题：可以修改浏览器设置、运行脚本，容易被恶意攻击。
  - 浏览器兼容问题：很多特性在不同浏览器操作不一致。
-
