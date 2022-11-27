# Function

该对象是方法对象。  
通常在 js 中有 2 种编写方法的方法：

```js
let f = function (...args) => {...}
new Function(...args, body)
// args可以是数组
//    也可以是用,分隔的字符串
```

本文多聊第二种。  
功能如下：

- 运行时生成函数。有点像 eval
- 可从服务端接收函数体后生成函数在客户端运行。
- `[[Environment]]`指向全局变量
- 若编写代码时不确定方法体是什么，则使用此方法。
- 方法体不会被压缩。

## [createFunction](/util/index.html)
