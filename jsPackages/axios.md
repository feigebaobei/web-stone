# `axios`

## overview

前端一种异步请求的方式。
|||||
|-|-|-|-|
|XMLHttpRequests||||
|fetch||||
|axios(promise)||||

### feature

- 从浏览器中发出 xhr
- 在 node.js 中发现 http 请求
- 支持 promise
- 支持打断请求和回馈
- 可转换 request 和 response data
- 可取消请求。（fetch 不可取消）

## install

`npm i axios`

## usage

```js
const axios = require('axios').default
axios.get(url,
    params: {
        key: 'value'
    }
).then(...).catch(...)
async function fn() {
    let result = await axios.post(url, {
        key0: 'v0',
        key1: 'v1'
    })
}

// 创建一个实例
// axios.create([config])
let instance = axios.create({
    baseURL: 'http:www.xxx.com',
    timeout: 5000,
    headers: {
        'key': 'value'
    }
})
// 实例的方法
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
axios#getUri([config])
```

## configuration

<!-- 默认配置文件：`path/to/file.json`。 -->

没有配置文件。有配置项

```js
config: {
    url: '/user',
    method: 'get', // default
    baseURL: 'https://xxx',
    transformRequest: [function (data, headers) {...}], // 在'PUT', 'POST', 'PATCH' and 'DELETE'时，发出请求前处理一次数据
    transformResponse: [function (data) {...}],
    header: {'k': 'v'},
    params: {'k': 'v'}, // 发出get请求时把参数拼接到url中。
    paramsSerializer: function(params) {...}, // serializing 查询字符串
    data: {'k': 'v'}, // 发出'PUT', 'POST', 'DELETE , and 'PATCH'请求时的参数
    timeout: 5000, // 超时时间
    withCredentials: false, // 跨域请求时是否带cookie
    adapter: function(config) {...}, // 需要学习
    auth: {'k': 'v'}, // 用于http的auth验证
    ressponseType: 'json', // default
    responseEncoding: 'utf-8', // default
    xsrfCookieName: 'XSRF-TOKEN', // 不会
    xsrfHeaderName: 'X-XSRF-TOKEN', // 不会
    onUploadProgress: function(progressEvent) {...}, // 只在浏览器中支持，控制上传进程的控制器
    onDownLoadProgress: function(progressEvent) {...},
    maxCoutentLength: 2000, // 返回的最大数据
    validateStatus: function (status) {...},
    maxRedirects: 21, // 最大重定向次数
    beforeRedirect: (options, {headers}) => {...},
    socketPath: null, // default 不会
    httpAgent: new http.Agent({keepAlive: true}), // 默认是浏览器的agent. 若在node.js中使用，一般用于模拟浏览器请求
    httsAgent: new http.Agent({keepAlive: true}),
    proxy: { // 设置代理服务器
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
        }
    },
    cancelToken: new CancelToken(function (cancel) {
    }), // 专用于取消请求的token
    signal: new AbortController().signal, // 不会
    decompress: true, // default
    insecureTHHPParser: undefined, // default 不会
    transitional: { // 不会
        silentJSONParsing: true, // default value for the current Axios version
        // try to parse the response string as JSON even if `responseType` is not 'json'
        forcedJSONParsing: true,
        // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
        clarifyTimeoutError: false,
    },
    env: {
         FormData: window?.FormData || global?.FormData // 自动序列化为FormData对象的payload
    },
}
```

### 配置默认值

```
axios.default.baseURL = 'xxx'
axios.default.headers.common['Authorization'] = axios.default.baseURL = AUTH_TOKEN
```

### 自定义实例的默认值

```
const instance = axios.create({
  baseURL: 'https://api.example.com'
});
// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

## api

```
axios({
    method: 'post', // 小写
    url: '/user/1234',
    data: {
        k0: 'v0',
        k1: 'v1',
    }
})
axios(url[, config])
axios.request(config)
axios.get(url[, config])
axios.post(url[, config])
axios.put(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.patch(url[, config])
```

## response schema

```
{
    data: {}
    status: 200
    statusText: 'OK'
    headers: {}
    config: {}
    request: {}
}
```

## interceptors

```js
axios.interceptors.request.use((config) => {
    ...
    return config
}, function (error) {
    return Promise.reject(error)
})
axios.interceptors.response.use((config) => {
    ...
    return config
}, function (error) {
    return Promise.reject(error)
})
// 删除打断
let myInterceptor = axios.interceptors.request.use(() => {...})
axios.interceptors.request.eject(myInterceptor)
// 删除实例的打断也类似
```

- 每个 interceptor 都会执行
- 按定义顺序执行
- 只返回最后一个 interceptor 的结果
- 每个 interceptor 接收前一个的结果

## cancellation

推荐`AbortController`.在 axios v0.22.0+ 支持。

```js
let controller = new AbortController()
axios.get(...).then(...)
controller() // 取消请求
```

## 使用 application/x-www-form-urlencoded 格式

有下面多种方法

### form data

在 v0.27.0 后支持设置了`header.Content-Type: multipart/form-data`会，自动序列化为 FormData 对象。

```
import axios from 'axios';
axios.post('https://httpbin.org/post', {x: 1}, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}).then(({data})=> console.log(data));
```

### browser

```js
// no.1
const params = new URLSearchParams()
params.append('key', 'value')
axios.post(url, params)

// no.2
const qs = require('qs')
axios.post('/foo', qs.stringify({ bar: 123 }))

// no.3
import qs from 'qs'
const data = { bar: 123 }
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
}
axios(options)
```

### node.js

```js
// no.1
const querystring = require('querystring')
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }))

// no.2
const url = require('url')
const params = new url.URLSearchParams({ foo: 'bar' })
axios.post('http://something.com/', params.toString())
```

## principle

### uml

```

```

## demo

```js
import axios from 'axios'
import md5 from 'md5'
import createSimpleStore from './simpleStore'

let simpleStore = createSimpleStore()

let instance = axios.create({
  // baseURL: 'http:www.xxx.com',
  // 用于各种后端接口，所以不适合设置baseURL
  timeout: 5000,
  headers: {
    // 'key': 'value'
  },
})
let myInterceptor = instance.interceptors.request.use(
  (config) => {
    // 取消重复请求
    let hashStr = md5({
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
    })
    if (simpleStore.isExist(hashStr)) {
      return null
    } else {
      return config
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (res) => {
    let hashStr = md5({
      url: res.config.url,
      method: res.config.method,
      params: res.config.params,
      data: res.config.data,
    })
    simpleStore.remove(hashStr)
    if (res.status === 200) {
      return res.data
    } else {
      return Promise.reject(new Error('请求出错'))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
// let cancelRequest = () => {
//     axios.interceptors.request.eject(myInterceptor)
// }

export {
  instance,
  // 强制取消请求
  // cancelRequest
}
```

```js
let createSimpleStore = () => {
  let simpleStore = {
    value: new Set(),
    isExist: function (v) {
      return simpleStore.value.has(v)
    },
    add: function (v) {
      simpleStore.value.add(v)
    },
    remove: function (v) {
      simpleStore.value.delete(v)
    },
  }
  return simpleStore
}
export default createSimpleStore
```
