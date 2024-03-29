# xhr

- 用于在不刷新页面的情况下向服务器发出请求。
- 可以获取任意类型的数据。
- 支持 http 及很多非 http 协议
- xhr 对象比较靠低层。好多属性都是只读的。
- Xhr 很好用。好多人不直接使用的原因是写法麻烦。

## usage

```js
// 待测试
let xhr = new XMLHttpRequest()
let reqFn = (url, method, options = {headers: {}, body: {}, responseType = 'text',
  timeout: 5000,
  withCredentials: true
}) => {
  return new Promise((s, j) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.entries(options.headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v)
    })
    xhr.onreadystatechange = () => { // 无参数
      if (xhr.readyState === 4 && xhr.status === 200) {
        s(xhr.response)
      }
    }
    xhr.responseType = options.responseType
    xhr.timeout = options.timeout
    xhr.withCredentials = options.withCredentials
    xhr.send(options.body)
    // 回调方法
    xhr.addEventListener('abort', (...args) => {
      j({type: 'abort', args: args})
    })
    xhr.addEventListener('error', (...args) => {
      j({type: 'error', args: args})
    })
    // xhr.addEventListener('load', (...args) => {
    //   j({type: 'load', args: args})
    // })
    // xhr.addEventListener('loaded', (...args) => {
    //   j({type: 'loaded', args: args})
    // })
    // xhr.addEventListener('loadend', (...args) => {
    //   j({type: 'loadend', args: args})
    // })
    // xhr.addEventListener('loadstart', (...args) => {
    //   j({type: 'loadstart', args: args})
    // })
    // xhr.addEventListener('progress', (...args) => {
    //   j({type: 'progress', args: args})
    // })
    xhr.addEventListener('timeout', (...args) => {
      j({type: 'timeout', args: args})
    })
  }
}
```

## api

| xhr 对象的属性                             |                                                                                                                              |                                                  |                                                                      |      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- | ---- |
| readyState                                 | 代表请求的状态码                                                                                                             | number                                           |                                                                      | 只读 |
| onreadstatechange                          | 当 readyState 改变时触发                                                                                                     |                                                  |                                                                      |      |
| status                                     | 响应状态。标准的 http 状态码。                                                                                               | number                                           |                                                                      | 只读 |
| statusText                                 | 包含文本的 http 状态                                                                                                         |                                                  |                                                                      | 只读 |
| timeout                                    | 请求的最大时长                                                                                                               | number                                           |                                                                      |      |
| withCredentials                            | 是否使用 cookies/authorization headers                                                                                       |                                                  |                                                                      |      |
| channel                                    | 本次请求使用的 channel                                                                                                       |                                                  |                                                                      | 只读 |
| mozAnon                                    | 是否在无 cookie、authorization header 时发送请求                                                                             | boolean                                          |                                                                      | 只读 |
| mozSystem                                  | 是否强制执行同源策略                                                                                                         | boolean                                          |                                                                      | 只读 |
| mozBackgroundRequest                       | 是否后端服务器的请求                                                                                                         | boolean                                          |                                                                      |      |
| response                                   | 回馈实体                                                                                                                     |                                                  |                                                                      | 只读 |
| responseText                               | 后端返回的数据                                                                                                               | string 类型                                      | 当请求失败时为''                                                     | 只读 |
| responseType                               | 设置后端返回数据的类型。默认为'text'                                                                                         | string                                           | `'', 'text', 'arraybuffer', 'blob', 'document', 'json', 'ms-stream'` |      |
| responseURL                                | 请求的 url                                                                                                                   | string                                           | 若经过重定向，则其值是最终的 url。无 fragement                       | 只读 |
| responseXML                                | 当无法正确解析为 xml/html 是该值为 null.(包括未成功、未发送)。当 responseType 为 document 时，响应会被当作`'text/xml'`使用。 |                                                  |                                                                      | 只读 |
| upload                                     | 返回 XMLHttpRequestUpload 对象。用于追踪进度                                                                                 |                                                  |                                                                      | 只读 |
| 方法-                                      |                                                                                                                              |                                                  |                                                                      |      |
| onreadystatechange                         | 它的属性值是方法，该方法无参数。当 readystate 改变时触发。所有浏览器都支持。后来又有浏览器支持了 onload/onerror/onprogress   |                                                  |                                                                      |      |
| abort()                                    | 中止请求                                                                                                                     |                                                  |                                                                      |      |
| getAllResponseHeaders()                    | 返回所有用`CRLF`(\r\n)分隔的响应头。若无响应，则返回 null                                                                    |                                                  |                                                                      |      |
| getResponseHeader(name)                    | 返回回馈头中指定的字段                                                                                                       |                                                  |                                                                      |      |
| open(method, url, [async, user, password]) | 初始化一个请求，只能在 js 中使用。原生代码中请使用`openRequest()`                                                            | `xhr.open(method, url, [async, user, password])` |                                                                      |      |
|                                            |                                                                                                                              | method: 'GET' / 'POST' / 'PUT' / 'DELETE' ....   |                                                                      |      |
|                                            |                                                                                                                              | async 是否异步执行。默认为 true.                 |                                                                      |      |
|                                            |                                                                                                                              | user 用户名（用于认证）。默认为 null             |                                                                      |      |
|                                            |                                                                                                                              | password 密码（用于认证）。默认为 null           |                                                                      |      |
| overrideMimeType(mimeType)                 | 覆盖后端给的类型                                                                                                             |                                                  |                                                                      |      |
| send([body])                               | body 本次请求要发送的数据体                                                                                                  |                                                  |                                                                      |      |
| setRequestHeader(k, v)                     | 设计 http 请求头的值，必须在 open()后 send()前执行。                                                                         |                                                  |                                                                      |      |
| 事件-                                      |                                                                                                                              |                                                  |                                                                      |      |
| abort                                      | xhr.addEventListener('abort', eventHandler)                                                                                  |                                                  |                                                                      |      |
| error                                      |                                                                                                                              |                                                  |                                                                      |      |
| load                                       |                                                                                                                              |                                                  |                                                                      |      |
| loadend                                    |                                                                                                                              |                                                  |                                                                      |      |
| loadstart                                  |                                                                                                                              |                                                  |                                                                      |      |
| progress                                   |                                                                                                                              |                                                  |                                                                      |      |
| timeout                                    |                                                                                                                              |                                                  |                                                                      |      |

| readyState 的值 | 状态             | 说明                                 |     |     |
| --------------- | ---------------- | ------------------------------------ | --- | --- |
| 0               | UNSENT           | 未执行 open()                        |     |     |
| 1               | OPENED           | 已经执行 open()                      |     |     |
| 2               | HEADERS_RECEIVED | 已经调用 send(),并且头部、状态可获得 |     |     |
| 3               | LOADING          | 下载中。responseText 已经有些数据    |     |     |
| 4               | DONE             | 下载完成                             |     |     |

## 生命周期

```
1. 实例化                        ---> xhr对象。readyState=0
2. xhr.open()                   ---> readyState=1
3. xhr.setRequestHeader(k, v)   ---> 设置请求头
4. xhr.send()                   ---> readyState=2
5. xxxx                         ---> readyState=3  responseText已经有些数据
6. xxxx                         ---> readyState=4  下载完成
```

# todo

## [fetch](/language/javascript/fetch.html)
