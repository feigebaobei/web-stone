# request
> 这是一个实验中的功能
> dom对象
> 常在fetch方法中看到使用它。

## feature
## usage
```js
var myRequest = new Request(input[, init])
input: USCString | Request对象
init: {
    method // 大写
    headers: {...}
    body: {...}
    mode // cors（默认值） | no-cors | same-origin | navigate
    credentials // omit | same-origin携带当前域下cookie到服务器端 | include携带all-sites下的cookie到服务器端
    cache // default | no-store | reload | no-cache | force-cache | only-if-cached
    redirect // follow(默认值) | error | manual
    referrer // client（默认值） | no-referrer  | USVString
    integrity
}
```

## request对象
|||||||
|-|-|-|-|-|-|
|属性|都是只读的|||||
||method|||||
||url|||||
||headers|||||
||context|||||
||referrer|||||
||referrerPolicy|||||
||mode|||||
||credentials|||||
||redirect|||||
||itegrity|包含请求的子资源的完整性||||
||cache|||||
||body|||||
||bodyUsed|||||
|方法||||||
||clone()|创建当前request的副本||||
||arrayBuffer()|返回解决一个ArrayBuffer表示的请求主体的 promise.||||
||blob()|返回解决一个Blob表示的请求主体的 promise.||||
||formData()|返回解决一个FormData表示的请求主体的 promise.||||
||json()|返回解决一个JSON表示的请求主体的 promise.||||
||text()|返回解决一个USVString(文本) 表示的请求主体的 promise.||||

## todo
### USCString
就是一个表示url的字符串。

### [response](/language/javascript/response.html)
### title
### title