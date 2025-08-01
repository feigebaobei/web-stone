# window.URL

`URL.createObjectURL(obj: File | Blob | MediaSource) => DOMString`  
每次调用都会返回一个新的 URL 对象。  
`URL.revokeObjectURL()`

## demo

```js
<input type="file" id="file" multiple onchange="fileChangeHandler(event)" />
<div id="imgBox"></div>

const clog = console.log
let fileDom = document.querySelector('#file')
let imgBoxDom = document.querySelector('#imgBox')
let fileChangeHandler = (event) => {
    let fileList = event.target.files
    let file = fileList[0]
    if (file) {
        let img = new Image()
        img.onload = (event) => {
            clog('event', event)
            URL.revokeObjectURL(img.src)
        }
        img.src = window.URL.createObjectURL(file) // 阻止内存溢出
        document.querySelector('#imgBox').appendChild(img)
    }
}
```

# URL

js 也有一个构造函数 URL

```js
let url = new URL(urlStr, baseUrl?)
```

## api

| url  |              |     |     |     |     |
| ---- | ------------ | --- | --- | --- | --- |
| 属性 |              |     |     |     |     |
|      | hash         |     |     |     |     |
|      | host         |     |     |     |     |
|      | hostname     |     |     |     |     |
|      | href         |     |     |     |     |
|      | origin       |     |     |     |     |
|      | pathname     |     |     |     |     |
|      | port         |     |     |     |     |
|      | protocol     |     |     |     |     |
|      | search       |     |     |     |     |
|      | searchParams |     |     |     |     |
|      | username     |     |     |     |     |
|      | password     |     |     |     |     |
| 方法 |              |     |     |     |     |
|      | toString()   |     |     |     |     |
| 事件 |              |     |     |     |     |

| searchParams |                                   |            |     |     |     |
| ------------ | --------------------------------- | ---------- | --- | --- | --- |
| 属性         |                                   |            |     |     |     |
| 方法         | 调用这些方法会改变相应的 url 对象 |            |     |     |     |
|              | append(k, v)                      |            |     |     |     |
|              | delete(k)                         |            |     |     |     |
|              | set(k, v)                         |            |     |     |     |
|              | has(k)                            |            |     |     |     |
|              | get(k)                            |            |     |     |     |
|              | getAll(...ks)                     |            |     |     |     |
|              | entries()                         |            |     |     |     |
|              | keys()                            |            |     |     |     |
|              | values()                          |            |     |     |     |
|              | sort()                            | 按键名排序 |     |     |     |
| 事件         |                                   |            |     |     |     |

## todo

### DOMString

js
DOMString 是一个 UTF-16 字符串。js 已经使用了这样的字符串。所以 DOMString 直接映射为一个 String
