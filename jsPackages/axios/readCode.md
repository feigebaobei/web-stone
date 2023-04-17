# 读源码

## readme.md

的内容与 npm 网站上的内容相同。忽略，不看它了。

## package.json

- 使用`gulp`/`rollup`执行任务、打包。
- 使用`eslint`/`husky`做规范化管理。
- 使用`karma`/`mocha`做测试
- 依赖了`typescript`，但是发现好多`*.js`文件，未发现`*.ts`
- 还有好多脚本使用 node 运行`*.js`。不看具体代码无法知道内部逻辑。
- 执行`npm run build`时调用 rollup 打包

## rollup.config.js

以`./lib/axios.js`为入口，输出了 esm/umd/cjs，三种结果。

## ./lib/axios.js

`lib`目录一般放命令行代码。源代码放在`src`目录下。
输出了`axios`变量，它是`createInstance()`的返回值。该方法内实例化`Axios`，再经过绑定 this 后返回实例。

## ./core/Axios.js

这是 Axios 类文件。

```ts
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new InterceptorManager(), // /InterceptorManager.js
      response: new InterceptorManager(),
    }
  }
  request(configOrUrl, config) {} // 这是一个主要方法。它返回一个Promise对象。就是这个返回值使axios实现了链式调用。
  //
  getUri(config) {}
}
```

### 什么时候调用 request()

使用默认该包的默认输出时调用。

### 为什么这么写`const instance = bind(Axios.prototype.request, context);`

它是为 request()方法设置了 this 对象。
我觉得它不是好写法。应该使用实例化的方式编写。

### 细聊 request(configOrUrl, config)

该方法接收 2 个参数。未使用 es6 的 rest 方法。

```js
request(configOrUrl, config) {
    // ...
    config = mergeConfig(this.defaults, config); // 得到合并后的配置对象。就是在这里实现了当前配置项的优先级大于默认配置项。
    // ... // 校验配置项
    config.method = (config.method || this.defaults.method || 'get').toLowerCase(); // 把不规范的配置项转化为规范的。
    // ...
}
```

然后停下先看下面的类

### ./InterceptorManager.js

它是打断器管理者

```js
class InterceptorManager {
  constructor() {
    this.handlers = [] // 打断器的容器
  }
  use(fulfilled, rejected, options) {} // 添加一个打断器
  eject(id) {} // 删除指定的打断器
  clear() {} // 清除所有打断器
  forEach(fn) {} // 使用fn()执行所有打断器
}
```

它就是一个简单的 store

### 再细聊 request(configOrUrl, config)

```js
request(...) {
    // ...
    const requestInterceptorChain = []; // 保存请求打断器的数组
    let synchronousRequestInterceptors = true;
    // 这种写法支持调用多次 instance.interceptors.request.use()
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      // 遇到同步方法则返回
      // 若runWhen是方法且运行后返回false，则跳过。
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous; // 有一个为真，则真。否则为假。
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);     // 在请求打断器的数组中前置保存一对then、catch的回调方法
    });

    const responseInterceptorChain = []; // 保存回馈打断器的数组
    // 同理。支持调用多次 instance.interceptors.response.use()
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);     // 同理。在回馈打断器的数组中追加保存一对then、catch的回调方法
    });

    let promise;
    let i = 0;
    let len;
    // 同步处理config
    if (!synchronousRequestInterceptors) {
      // 这里使用了巧妙的方法组装请求打断器、回馈打断器。
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain); // 数组前半部分是请求打断器，后半部分是回馈打断器
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      // 然后链式调用。
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]); // 上面成对放入数组，现在成对从数组中取出
      }
      return promise;
    }

    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    // 异步处理config
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++]; // 又是成对取出
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig); // 被请求打断器处理过的适配器
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig); // 该方法分情况（xhr+promise / http）发出请求。
    //   就是在这里发出请求的。
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;
    // 依次使用回馈打断器处理回馈结果
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise; // 返回结果
}
```

`requestInterceptorChain`、`responseInterceptorChain`分别保存了请求打断方法、回馈打断方法。
读到这里，axios 的主要部分就读完了。

## 如何实现功能缩写

如`axios.get(...)`/`axios.post(...)`/`axios.put(...)`

```js
// Provide aliases for supported request methods
utils.forEach(
  ['delete', 'get', 'head', 'options'],
  function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, config) {
      return this.request(
        mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data,
        })
      )
    }
  }
)
// ...
```

## ./utils.js

这里封装了好多工具方法。
下面说几个源码中常用的方法。

```js
// 把origin的属性赋值给target
utils.extend(target, origin, thisArg, option)
```

## 如何实现`axios.create()`

```js
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig)
  const instance = bind(Axios.prototype.request, context)
  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context, { allOwnKeys: true })
  // Copy context to instance
  utils.extend(instance, context, null, { allOwnKeys: true })
  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig))
  }
  return instance
}
```

这个方法的返回值就是该包的默认输出值。调用`axios.create()`时会使用当前配置项生成一个 Axios 的实例。

## ./mergeConfig.js

功能是把二个配置对象合并为一个。
未细读。
为什么不使用`Object.assign()`/`Object.create()`/深复制的方法呢？

## ./dispatchRequest.js

它是一个适配文件。
使用了适配器模式。

```js
dispatchRequest(config) {
    throwIfCancellationRequested(config) // 这是一个检测参数的方法。
    // 作者在这个方法中使用了基于Error封装出来的错误对象。
    // ...
    const adapter = adapters.getAdapter(config.adapter || defaults.adapter); // 得到请求方法。
    return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    response.data = transformData.call( // 封装回馈结果
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
```

### ../adapters/adapters.js

这是真正的适配器

```js
const knownAdapters = {
  http: httpAdapter, // 基于http、https封装的方法。用于node.js环境请求接口。
  xhr: xhrAdapter, // 基于XMLHttpRequest对象和Promise封装的方法。用于browser环境请求接口。
}
export default {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters]
    const { length } = adapters
    let nameOrAdapter
    let adapter
    // ... // 一堆校验方法
    return adapter
  },
  adapters: knownAdapters,
}
```

### ./transformData.js

它是封装回馈数据的方法

```js
export default function transformData(fns, response) {
  const config = this || defaults
  const context = response || config
  const headers = AxiosHeaders.from(context.headers)
  let data = context.data

  utils.forEach(fns, function transform(fn) {
    data = fn.call(
      config,
      data,
      headers.normalize(),
      response ? response.status : undefined
    )
  })

  headers.normalize()

  return data
}
```

## 如果让我做默认配置项、当前配置项的优先级，如何实现？

- 使用原型链、对象委托、类继承。
- 使用链式数据。

```js
function A(config = null) {
  // ...
  this._config = config
  this.getConfig = () => {
    return this._config || this.config
  }
}
A.prototype.config = defaultConfig

let B = {
  config: defaultConfig,
}
let C = Object.assign(B, {
  config: curConfig,
})

class C {
  constructor(defaultConfig) {
    this.defaultConfig = defaultConfig
  }
}
class D extends C {
  constructor(config) {
    this.config = config
  }
  getConfig() {
    return this.config || this.defaultConfig
  }
}

let chain = new Chain()
chain.append(defaultConfig)
chain.append(config)
let r = {}
let cur = chain.head
while (cur) {
  r = Object.assign(r, cur.value)
  cur = cur.next
}
```

## 未暴露的方法

```js
// fulfilled 触发then方法
// rejected  触发then方法
// options: {
//     synchronous   默认值 false  是否同步运行
//     runWhen       默认值 null   处理config的方法。返回boolean
// }
instance.interceptors.request.use(fulfilled, rejected, options) {...}
```

## 是否可以多次执行`instance.interceptors.request.use()`

可以。

## 顺序图

```
                axios包内逻辑
          |-----------------------------------|
调用请求 -》| 执行请求打断 -》 请求 -》 执行回馈打断 | -》 得到回馈结果
          |-----------------------------------|
    1           2           3       4               5

```

程序在使用该包时只能感觉到 1、5.  
2/3/4 是 axios 包内部运行逻辑。

## titte

## titte
