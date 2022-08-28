# chrome浏览器的devtools
> [官网](https://developer.chrome.com/docs/devtools/)

## feature
- feature0
- feature1
- feature2

## usage
```js
```

## commands & shortcuts
## 模拟移动设备
## elements
## console
## sources
## network
## performance
## memory
## application
可以审视manifest.json / service worker / cache
### summary
|||||
|-|-|-|-|
|manifest|触发添加应用到主屏幕|||
|service worker|与sw相应的任务。|如：注销sw / 更新sw / 模拟push / 脱网 / debug / 停止sw||
||sw使用的cache|||
|clear storage|可注销sw / 清空所有存储|||

### manifest
add to homescreen  
Identity + Presentation 显示manifest.json文件的主要字段。  
icons  

### service worker
- 列出sw的脚本  
- 脱网
- update on reload 在每个页面加载时更新sw
- bypass for network 强制浏览器使用网络请求的资源
- update 更新一次sw
- push 推送一个消息
- unregister 注销指定的sw。clear storage可以清空已经被注销的sw相关的缓存。
- source 列出sw脚本
- status 当前状态。 `#1`的数字表示已经被更新的次数。若勾选“update on reload”则每次刷新都增加一次数字。`start`/`stop`可启动/停止sw。
- clients sw的作用范围



### manifest
### manifest
### manifest


## recorder
## rendering
## sensors
## remote debugging
## accessibility
## setting and customization

## todo
### title
### title
### title
