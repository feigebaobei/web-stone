# worker

## web workder

在后台运行。类似多线程。
不阻塞主线程。
使用 postMessage()和 onmessage()通信。

## service workder

它是代理服务器。用于拦截网络请求。可以实现离线缓存、推送通知、后台同步。

## shared workder

用于多同源窗口、iframe、web worker 之间共享一个 worker 实例。用于数据共享。
