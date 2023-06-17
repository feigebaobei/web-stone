# 前端存储

## 简介

一种在前端保存数据的思想。第一次在页面中的保存数据，那么从第二次开始就可以使用了。可以使用的方法有：

1. cookie
2. localStorage
3. sessionStorage
4. ie 的 userData
5. web sql
6. indexedDB

从技术角度看待这些方法。没有高低之分，只有对特定任务是否合适。

## cookie

### 简介

1. cookie："小饼干，小甜品"
2. 参与 http 通信。因为在 http 中可以看到 cookie，所以易受到攻击。
3. 面向路径。只作用于当前路径（页面）。
4. 每个 cookie < 4K

### 运行机制

1. 后端种在前端
2. 前端动都不动它，下次请求时传给后端。

![](./image/cookie0.png)

### 使用

![](./image/cookie1.png)

### 总结

**设置 cookie 的值**

```js
function setCookie(key, value, duration) {
  // duration 单位为ms
  var d = new Date()
  document.cookie = key + '=' + value + '; ' + d.getTime() + duration
}
```

**获取 cookie 的值**

```js
function getCookie(key) {
  var cookieArr = document.cookie.split(';')
  for (var i = 0; i < cookieArr.length; i++) {
    var cookie = cookieArr[i].trim()
    if (cookie.indexOf(key) === 0) {
      return cookie.substring(key.length, key.cookie.length)
    }
  }
}
```

## localStorage/sessionStorage

1. localStorage < 5M
2. localStorage 的使用也是遵循同源策略的，所以不同的网站直接是不能共用相同的 localStorage。可以在同网站下跨页面。
3. sessionStorage 只作用于当前页面。

**优势**  
1、localStorage 拓展了 cookie 的 4K 限制  
2、localStorage 会可以将第一次请求的数据直接存储到本地，这个相当于一个 5M 大小的针对于前端页面的数据库，相比于 cookie 可以节约带宽，但是这个却是只有在高版本的浏览器中才支持的

**局限**  
2、目前所有的浏览器中都会把 localStorage 的值类型限定为 string 类型，这个在对我们日常比较常见的 JSON 对象类型需要一些转换  
3、localStorage 在浏览器的隐私模式下面是不可读取的  
4、localStorage 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡  
5、localStorage 不能被爬虫抓取到

![](./image/localstorage.jpg)

### 使用

一般在第一次加载页面时在本地保存好数据。从第二次开始使用本地保存的数据。为了保证前端性能，一般不会保存大量数据。只保存关键数据，再根据它做出判断后执行相应的程序。

    window.localStorage//boolean 浏览器是否支持

写入(3 种形式)

    window.localStorage["a"] = 1;
    window.localStorage.b = 1;
    window.localStorage.setItem('c',3);

读取

    var a = window.localStorage.a;
    var b = window.localStorage["b"];
    var c = window.localStorage.getItem("c");
    var d = window.localStorage.key(d);

修改

    window.localStorage.a = 4;

删除

    window.localStorage.clear();// 清除据
    window.localStorage.removeItem("a");// 删除a

方法

    localStorage.setItem('key', 'value');
    localStorage.getItem('key');
    localStorage.removeItem('key');
    localStorage.clear();

## ie 的 userData

只有 window+ie10-才能可以使用。ie 把数据放到 c 盘的 user 文件夹里。新浏览器出来了。旧浏览器又有各种不兼容。本着向前看的态度。不于讨论。

## web sql

在前端创建一个类数据库的对象。使用和数据一样的语法增删改查。关闭页面后就没了。下次打开还需要再创建数据库。后来 w3c 也不维护了。本着向前看的态度。不于讨论。

## indexedDB

## storage

见[pwa](/pwa/index.html)

## 区别

| 特性         | cookie                                                                   | localStorage                   | sessionStorage                 | userData | web sql | indexedDB | storage                              |
| ------------ | ------------------------------------------------------------------------ | ------------------------------ | ------------------------------ | -------- | ------- | --------- | ------------------------------------ |
| 生命周期     | 一般由服务器生成，可设置失效时间。若在浏览器生成，默认关闭浏览器后失效。 | 在手动删除前一直存在           | 关闭当前页面后被清除           |          |         |           | 一直存在。除非（手动、自动）删除它。 |
| 可存放大小   | <4k                                                                      | <5m                            | <5m                            |          |         |           | 约 200m.各浏览器不同                 |
| 与服务器通信 | 每次都在 http 头部信息中。过多会影响性能                                 | 仅在客户端不能与通信           | 仅在客户端不能与通信           |          |         |           | 不参与通信。可使前端脱使用。         |
| 易用性       | 原生的方法较难使用，自己封装后会好用。                                   | 原生的方法就挺好用。可再交封装 | 原生的方法就挺好用。可再交封装 |          |         |           | api 较杂，浏览器支持差异较大。       |

## 前端存储用户信息

前端一般不存储用户信息。但不排除老项目中存储用户信息的。
用户信息不宜长期、明文保存在前端。一般保存在后端，然后在前端存储一个指向该用户信息的 key.如：token/cookie.
前端常用的保存方式：ls/ss/store。因不能长期保存，不使用 ls.因不能关闭页面后再打开还需要登录，不使用 ss.store 可以实现不直白保存在浏览器。最后选择 store。接下来不要频繁请求用户信息。

```js
// 请求并保存用户信息。
let reqASave() = () => {
  return reqUserInfo().then(res => {
      store.userInfo = res.data
      return true
  }).catch(() => {
    clog('获取用户信息失败')
    return false
  })
}

// 可以在每一次切换路由前，检查是否有用户信息。
// 全局前置路由守卫beforeEach
router.beforeEach((to, from, next) => {
  if (store.hasUserInfo) {
    next()
  } else {
    reqASave().then((bool) => {
      if (bool) {
        next()
      }
    })
})

// 也可以在每次调用接口前检查
let axiosInstance = axios.create({
  baseURL: '...',
})
let axiosInstance2 = axios.create({
  baseURL: '...',
})
axiosInstance.intercepters.request.use((config) => {
  // return config
  if (store.hasUserInfo()) {
    return config
  } else {
    // 防止出现死循环，使用另一个axiosInstance
    return axiosInstance2({
      url: '...',
      params: {...}
    }).then(res => {
      store.userInfo = res.data
    }).catch(error => {
      clog('获取用户信息失败')
      return null
      // 或者取消请求。
    })
  }
}, (error) => {
  return Promise.reject(error)
})

axiosInstance.intercepters.request.use((config) => {
  // 为本次请求添加取消器
  if (stoer.hasUserInfo) {
    return config
  } else {
    let reqConfig = config
    let controller = new AbortController()
    reqConfig.cancelToken = controller.token
    return axiosInstance2({
      url: '...'
    }).then(res => {
      store.userInfo = res.data
      return reqConfig
    }).catch(() => {
      reqConfig.cancel('因获得用户信息失败，不发出此请求。')
    })
    // if ()
    // reqConfig.cancelToken = new CancelToken((cancel) => {})
  }
})
```
