# 处理流式数据

## 服务端

```js
router.get('/file.txt', function (req, res) {
  let stream = fs.createReadStream('file.txt')
  stream.pipe(res) // 流式读取文件并响应。
})
```

## 客户端

```js
let axios = requrire('axios')
let fs = require('fs')
let writer = fs.createWriteStream('file.txt')
axios({
  method: 'get',
  url: 'http://127.0.0.1:8080/file.txt',
  responseType: 'stream',
}).then(function (response) {
  // 或流式写入
  response.data.pipe(writer)
  // 或兼听事件
  response.data.on('data', function (chunk) {
    // ...
  })
  response.data.on('end', function () {})
  response.data.on('error', function (err) {})
  response.data.on('close', function () {})
  response.data.on('finish', function () {})
  response.data.on('abort', function () {})
  // 还有好多其他事件。
})
```

## 流式

node 中有一个 stream 模块，用于处理流式数据。
它有一个 data 事件，在有数据时触发。
