# workBox
> 封装servicework + cache等。再提供相应api。

## feature
- 简化sw用法  
- feature1
- feature2

## usage
```js
```

## 介绍workbox & service worker





## 您需要知道的
## 使用workbox的方法
## 用例 & 诀窍

## 相关包
- [workbox-build](https://developer.chrome.com/docs/workbox/reference/workbox-build/)
- [workbox-routing](https://developer.chrome.com/docs/workbox/modules/workbox-routing/)
- [workbox-strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/)
- [workbox-precaching](https://developer.chrome.com/docs/workbox/modules/workbox-precaching/)
- [workbox-expiration](https://developer.chrome.com/docs/workbox/modules/workbox-expiration/)
- [workbox-window](https://developer.chrome.com/docs/workbox/modules/workbox-window/)
- [workbox-webpack-pluigin](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/) 自动缓存打包结果。
- [workbox-expiration](https://developer.chrome.com/docs/workbox/modules/workbox-expiration/) 限制xxx
- [workbox-streams](https://developer.chrome.com/docs/workbox/reference/workbox-streams/)
- [workbox-cli](https://developer.chrome.com/docs/workbox/modules/workbox-cli/)
## 缓存优先的注意事项：
- 不使用缓存版本管理缓存。只根据文件名请求会无法得到服务器上最新的资源。所以请使用缓存版本管理静态资源，不论是否使用hash name / query string。
- 限制缓存大小
- 限制缓存期限。可以使用 workbox-expiration
- 

## 调试
## 加快导航
- 使用合理方法从缓存中回馈请求
- 只请求页面部分ui对应的接口。
- 预加载与sw启动并行

## 管理缓存
- 在合适的时间缓存合适资源
  - 需要权限的资源不缓存
  - 缓存关键资源
  - 缓存静态资源
    - 全局样式
    - 全局基本方法（js）
    - shell html
- 控制大小
- 设置期限，过期后删除。
- 高效更新。
- 考虑缓存策略：
  - stale while ravalidate
  - 网络优先
  - 缓存优先
  - 只使用网络
  - 只使用缓存
- 多种缓存策略。对不同的资源使用适合的缓存策略
- 不缓存images / favicons
- 不缓存polyfill  

## generateSW & injectManifest
缓存资源很简单
||generateSW|injectManifest||
|-|-|-|-|
|||||
|||||

## 打包
与builder结合都是单独打包


## title
## title
## title
## title
## title
## title
## title

## api
|||||||
|-|-|-|-|-|-|
|key|description|||||

## todo
### 吐槽
它想简化sw。结果只简化了api.创建了好多小包（如workbox-routing）。学习基本sw/cache知识与学习一群小包，工作量几乎相等。  

### title
### title
