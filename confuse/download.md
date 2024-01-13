# 下载

## `window.open()`

```js
window.open('http://xxx.com/file', '_blank')
```

## a

```js
let link = document.createElement('a')
link.href = 'urlForFile'
link.download = 'filename.ext' // 文件的名称
link.click()

let link = document.createElement('a')
link.href = 'urlForFile'
link.download = 'filename.ext' // 文件的名称
docuement.body.appendChild(link)
link.click()
docuement.body.removeChild(link)
```

## fetch / xhr

```js
fetch('url')
  .then((res) => res.blob()) // 获取后端返回的文件流
  .then((blob) => {
    let url = URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.href = url
    link.download = 'filename.ext'
    link.click()
  })
```

## axios

```
import axios from 'axios'
axios.get('url', {responseType: 'blob'}).then(res => {
    let blob = new Blob([res.data])
    let url = URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.href = url
    link.download = 'filename.ext'
    link.click()
})
```

## file-saver.js

```
import { saveAs } from 'file-saver'
fetch('url')
.then(res => res.blob())
.then(blob => {
    saveAs(blob, 'filename.ext')
})
```

## iframe

let iframe = document.createElement('iframe')
iframe.style.display = 'none'
iframe.src = 'url'
document.body.appendChild(iframe)

## title

## title

## title

## title
