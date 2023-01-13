# 定义

- 可扩展标记语言
- 类似 html. xml 是 html 的补充，不是替代。
- 用于传输数据，非显示数据。在 xhr(XMLHttpRequest)就是使用 xml 为传输内容的。
- 需要自定义标签
- 必须使用关闭标签
- 区分大小写
- 标签名中可使用下划线，不要使用-.:
  - 使用前缀来避免命名冲突
- 属性必须加引号
- 必须有根元素

```xml
<!-- demo -->
<?xml version="1.0" encoding="ISO-8859-1"?>
<note>
    <to>George</to>
    <form>John</from>
    <heading>Reminder</heading>
    <body>Don't forget the meeting!</body>
</note>
```

# 验证

## XML DTD

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE note [
  <!ELEMENT note (to,from,heading,body)>
  <!ELEMENT to      (#PCDATA)>
  <!ELEMENT from    (#PCDATA)>
  <!ELEMENT heading (#PCDATA)>
  <!ELEMENT body    (#PCDATA)>
]>
<note>
...
```

## DTD

## XML Schema

是 xml dtd 的代替者

# 使用

```
xml = ...
xml.getElementByTagName('to')[0].childrenNodes[0].nodeValue
// nodeValue 节点的值
// innerHTML 内部文本
```

## xml dom

# XMLHttpRequest

```js
xhr: {
    readyState,      // http请求的状态
    responseText,    // 当前状态下从服务器接收到的响应体。不包括响应头。
    responseXML,     // 把响应解析为xml并作为document对象返回。
    status,          // http状态代码
    statusText,      // http状态代码对应的文本
    onreadystatechange // 指定当http请求的状态改变时调用的回调方法
    abort(),         // 取消当前响应
    getAllResponseHeaders(),  // 把http响应头部作为未解析的字符串返回
    getResponseHeader(),      // 返回指定http响应头部的值
    open(),         // 初始化http请求参数，但不发送http请求。
    send(),         // 发送http请求，参数是open()的结果。
    setRequestHeader(),       //  向一个执行了open()并未执行send()的请求添加或设置一个http请求。
}
```

## readyState

|     |               |                                                                |
| --- | ------------- | -------------------------------------------------------------- |
| 0   | Uninitialized | 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。 |
| 1   | Open open()   | 方法已调用，但是 send() 方法未调用。请求还没有被发送。         |
| 2   | Sent Send()   | 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。       |
| 3   | Receiving     | 所有响应头部都已经接收到。响应体开始接收但未完成。             |
| 4   | Loaded        | HTTP 响应已经完全接收。                                        |

只会递加。

# ActiveX （放弃）

# 传输数据

ie 为了开发更新网页部分内容创建了`xml`和`XMLHttpRequest`（简称 xhr 对象）。后来`json`比`xhr`使用更方便，所以多使用`json`。  
ie 开发此功能后，其他浏览器也都支持了此功能。然后有了页面异步更新功能。
