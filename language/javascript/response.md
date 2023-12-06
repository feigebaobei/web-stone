# response

> dom 对象
> 常在 fetch 方法中看到使用它。

## feature

## usage

```js
var myResponse = new Response([body, init])
// 用于定义response中body的对象，可以是null
body: Blob |
  BufferSource |
  FormData |
  ReadableStream |
  URLSearchParams |
  USVString
init: {
  status // response的状态码。
  statusText
  headers
} // 看看这些属性就想起了xhr

let myR = new Request(new Blob(), {
  status: 200,
  statusText: 'OK',
})
```

## response 对象

实现了[Body](/language/javascript/body.html)的接口

|      |               |                                                                  |     |     |     |
| ---- | ------------- | ---------------------------------------------------------------- | --- | --- | --- |
| 属性 | 都是只读      |                                                                  |     |     |     |
|      | headers       | 回馈头                                                           |     |     |     |
|      | ok            | 状态码是否在[200, 299]内                                         |     |     |     |
|      | redirected    | 是否来自重定向。若为 true，则 url 属性值为数组。                 |     |     |     |
|      | status        | 状态码                                                           |     |     |     |
|      | statusText    | 状态信息                                                         |     |     |     |
|      | type          | response 的类型。如 basic/cors                                   |     |     |     |
|      | url           | response 的 url                                                  |     |     |     |
|      | useFinalURL   | 是否是该 response 的最终 url                                     |     |     |     |
|      | body          | 返回 ReadableStream 类型的 body 内容                             |     |     |     |
|      | bodyUsed      | 该 response 是否读取过 body                                      |     |     |     |
| 方法 |               |                                                                  |     |     |     |
|      | clone()       | 返回一个 response 对象的克隆                                     |     |     |     |
|      | error()       | 返回一个绑定了网络错误的新的 response 对象                       |     |     |     |
|      | redirect()    | 用另一个 url 创建一个 response                                   |     |     |     |
|      | arrayBuffer() | 读取并设计为已读。返回一个解决为 ArrayBuffer 格式的 Promise 对象 |     |     |     |
|      | blob()        | 读取并设计为已读。返回一个解决为 Blob 格式的 Promise 对象        |     |     |     |
|      | formData()    | 读取并设计为已读。返回一个解决为 FormData 格式的 Promise 对象    |     |     |     |
|      | json()        | 读取并设计为已读。返回一个解决为 json 格式的 Promise 对象        |     |     |     |
|      | text()        | 读取并设计为已读。返回一个解决为 USVString 格式的 Promise 对象   |     |     |     |
|      |               |                                                                  |     |     |     |

## todo

### USCString

就是一个表示 url 的字符串。

### [request](/language/javascript/request.html)

### title

### title
