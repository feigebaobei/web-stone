# `axios`

## overview

一种异步请求的方式。
|||||
|-|-|-|-|
|XMLHttpRequests||||
|fetch||||
|axios(promise+xhr/http(s))||||

### feature

- 从浏览器中发出 xhr
- 在 node.js 中发出 http(s) 请求
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

// 执行多个请求
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });

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

支持用法：

- esm
- cjs
- script

## configuration

没有配置文件。有配置项

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|url||||||||||
|method||请求方式|string|'get'|'get'/'post'/'put'/'delete'/'option'/...|||||
|baseUrl||当url是相对链接时url的前缀。作用于当前实例。||||||||
|transformRequest||当使用‘put’、‘post’、‘patch’、‘delete’请求时，改变请求数据。最后一个方法必须返回string/buffer/buffer[]/FormData/Stream。|
Function[]|||||||
|transformResponse||改变回馈数据，然后传递给then/catch|Function[]|||||||
|headers||设置header|||||{'X-Request-With': 'XMLHttpRequest'}|||
|params||设置qs||||||||
|paramsSerializer||设置qs的序列化方法|||||`{encode?: (params: string): string => {}, serialize?: (params: Record<string, any>, option?: ParamsSerializerOptions), indexes: false}`|||
|data||设置请求体。只作用于put/post/delete/patch||||||||
|timeout||超时阈值||1000||||||
|withCredentials||明确是否使用cross-site / Access-Control||false||||||
|adapter||自定义请求控制柄。可以方便测试。||||||||
|auth||设置`Authorization`字段（也可以在headers中设置）。||||||||
|responseType||回馈类型。||'blob'||||||
|responseEncoding||回馈的码类型||'utf8'||||||
|xsrfCookieName||xsrf的cookie名||'XSRF-TOKEN'||||||
|xsrfHeaderName||||||||||
|onUploadProgress||upload的进度控制柄|||||`function({loaded, total, progress, bytes, emtimated, rate, upload = true}) {...}`|||
|onDownloadProgress||下载的进度控制柄|||||`function({loaded, total, progress, bytes, estimated, rate, download = true}) {}`|||
|maxContentLength||回馈的最大体积。node.js时有效||||||||
|maxBodyLength||只在node.js时有效。请求体的最大体积。||||||||
|validateStatus||有效的回馈码值||`function (status) {return status >= 200 && status < 300}`||||||
|maxRedirects||最大可重定向次数。||21||||||
|beforeRedirect||||||||||
|socketPath||||||||||
|transport||||||||||
|httpAgent||http(s)的代理||||||||
|httpsAgent||-||||||||
|proxy|`{protocal: 'https', host: '127.0.0.1', hostname: '127.0.0.1', port: 9000, auth: {username: 'name', password: 'pwd'}}`|设置代理||||||||
|cancelToken||可以用于取消请求|||||`new CancelToken(function (cancel) {...})`|||
|signal||用于取消请求|||||`new AbortController().signal`|||
|decompress||是否解压||true||||||
|insecureHTTPParser||不安全的http解析器||||||||
|transitional|`{silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false}`|||||||||
|env||设置处理FormData的类||||||||
|formSerializer|`{visitor: (value, key, path, helpers) => {}, dots: boolean, metaTokens: boolean, indexes: boolean}`|||||||||
|maxRate||||||||||
<!-- prettier-ignore-end -->

### transformRequest & transformResponse & interception.request & interception.response

| transformRequest | transformResponse | interception.request                         | interception.response                      |     |     |
| ---------------- | ----------------- | -------------------------------------------- | ------------------------------------------ | --- | --- |
| 处理请求前的数据 | 处理回馈后的数据  | 处理请求时的配置项。处理请求成功和请求失败。 | 处理回馈后的数据。处理回馈成功和回馈失败。 |     |     |
|                  |                   |                                              |                                            |     |     |
|                  |                   |                                              |                                            |     |     |

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

```js
axios({
    method: 'post', // 小写
    url: '/user/1234',
    data: {
        k0: 'v0',
        k1: 'v1',
    }
})
// 这里的配置项
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

```js
{
  data: {
  } // 服务端回馈的数据
  status: 200 // http 码值
  statusText: 'OK' // http status message
  headers: {
  } // 服务端给的回馈头的
  config: {
  } // 本次请求的的配置项
  request: {
  } // response的请求
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

```js
import axios from 'axios'
axios
  .post(
    'https://httpbin.org/post',
    { x: 1 },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  .then(({ data }) => console.log(data))
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

## [principle](/jsPackages/axios/principle.html)

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

## [ts+axios](/jsPackages/axios/ts_axios.html)

## [读源码](/jsPackages/axios/readCode.html)

## todo

|                                                    |                                             |     |
| -------------------------------------------------- | ------------------------------------------- | --- |
| 如何实现特定功能的。                               | 在别名方法中复用指定方法                    |     |
| 如使用 promise 实现的。                            | 在 request()方法体中使用`Promise`对象包装。 |     |
| 如何实现简写（别名）的                             | 直接定义                                    |     |
| 可以匿名的地方也使用具名函数编写。（如：回调函数） | -                                           |     |
| 文件结构                                           | -                                           |     |
| uml.                                               | -                                           |     |
| 类图                                               | -                                           |     |
| 有多个地方把 get 与别的请求方式分开对待。          | -                                           |     |
