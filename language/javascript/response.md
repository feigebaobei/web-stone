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

## request 对象

|      |     |     |     |     |     |
| ---- | --- | --- | --- | --- | --- |
| 属性 |     |     |     |     |     |
| 方法 |     |     |     |     |     |
|      |     |     |     |     |     |

## todo

### USCString

就是一个表示 url 的字符串。

### [request](/language/javascript/request.html)

### title

### title
