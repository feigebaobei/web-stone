## principle

输出了多个东西。平时只使用了主要的。  
平时用不到。作者有使用文档中也没写如何使用已经输出的其他东西。都已经不使用了，为什么还输出呢？
`import defaults from './defaults/index.js';`是默认配置文件。使用了`*.js`，而非`*.json`。  
全项目使用 js 开发。非 ts,在 ts 项目使用此包会有类型问题。  
`axios`是`Axios`的实例。
`axios.Axios = Axios;`外国人总喜欢使用这种环。可能是为了文件引用。  
打包工具： rollup/webpack

```js
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig // 这里设置了默认配置项
    this.interceptors = {
      // 这是设置了打断器
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }
  request() {} // 它是做什么的
  // 经过处理配置信息
  // 验证配置信息
  // 处理请求头
  // 把请求打断器和回馈打断器分别放在2个组件中。
  // 使用
  getUri() {}
}
```

很多功能、服务、方法都是在 init 时从类似配置文件中取出配置项再与程序员设计的配置项相结合，再初始化。

```js
class InterceptorManager {
  constructor() {
    this.helpers = []
  }
  use(fulfilled, rejected, options) {} // 挂载的。把数据添加helpers中。vue就是使用此方法挂载插件的。
  // 还有第三个参数。文档中也不说明它。
  eject(id) {} // 从hlepers中删除指定的数据
  clear() {} // 清空helpers
  forEach() {} // 执行全部helpers中的数据、方法
}
```

`import AxiosError from '../core/AxiosError.js';`是封装的错误对象
作者封装了错误对象。错误信息中包括

```js
message
name
stack
code
config
request
response
```

需要一个包括更多有关该信息在错误对象中。所以封装了该对象。我在我项目也可以这样做。  
又在原型链上。
`import validator from '../helpers/validator.js';`是验证文件。若验证出错，则使用封装的错误对象抛出错误。
`import CanceledError from '../cancel/CanceledError.js';`是基于 AxiosError 封装的取消请求时的错误
内部与 AbortController 对象结合使用。  
`import AxiosHeaders from '../core/AxiosHeaders.js';`是

```js
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set() {} // 设置头后，返回this. 这是常用的链模式
  get() {} // 返回头中的指定字段
  has() {} // 返回是否存在指定头字段
  delete() {} // 返回是否删除的指定头
  clear() {} //
  normalize() {} // 序列化
  concat() {} //
  toJSON() {} // 返回反序列化
  [Symbol.iterator]() {} // 基于反序列化后使用
  toString() {} // 序列化
  get [Symbol.toStringTag]() {} // 覆盖原型方法
  static from // 是否是实例
  static concat(first, ...targets) // 添加头后返回实例
  static accessor // 记录是否访问过。key是序列化后的header
}
```

`import adapters from "../adapters/adapters.js";`中使用 2 个适配器：http/xhr  
使用映射表判断使用哪个适配器。  
最后返回指定的适配器，它是一个请求方法。
`import dispatchRequest from './dispatchRequest.js';`会触发请求。
使用正确的请求方法请求。
若请求数据成功，则经过转换数据后返回数据。否则返回经过转换数据后经过包装后返回数据。
全程使用 promise 处理。

`import httpAdapter from './http.js';`
依赖 http/https。使用该包请求。
可能使用了它们才使得 axios 可以在服务端使用。  
使用了自定义事件处理。

`import xhrAdapter from './xhr.js';`
使用 promise+xhr 实现请求+链式调用。

### 运行的顺序图。

### 目录结构

```
<root>
|-- bin
|-- dist
|-- examples
|-- lib
    |-- core
    |-- axios.js
    |-- utils.js
    |-- lib
    |-- lib
    |-- lib
    |-- lib
    |-- lib
    |-- lib
|-- sandbox
|-- templates
|-- test
|-- index.js
|-- package.json
|-- readme.md
|-- rollup.config.js
|-- tsconfig.json
|-- webpack.config.js
|-- xxx
|-- xxx
```

在打断器上是否可以 use 多个？
可以。执行顺序：由外向内，再由内向外。

### uml

```

```
