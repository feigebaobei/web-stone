# response
> dom对象
> 常在fetch方法中看到使用它。

## feature
## usage
```js
var myResponse = new Response([body, init])
// 用于定义response中body的对象，可以是null
body: Blob | BufferSource | FormData | ReadableStream | URLSearchParams | USVString
init: {
    status // response的状态码。
    statusText
    headers
} // 看看这些属性就想起了xhr

let myR = new Request(new Blob(), {
    status: 200,
    statusText: 'OK'
})
```

## request对象
|||||||
|-|-|-|-|-|-|
|属性||||||
|方法||||||
|||||||

## title
## title
## todo
### USCString
就是一个表示url的字符串。

### [response](/language/javascript/response.html)
### title
### title