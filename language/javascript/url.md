# URL
> 本方聊的是window.URL

`URL.createObjectURL(obj: File | Blob | MediaSource) => DOMString`  
每次调用都会返回一个新的URL对象。  
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

## todo
### DOMString
js
DOMString是一个UTF-16字符串。js已经使用了这样的字符串。所以DOMString直接映射为一个String
