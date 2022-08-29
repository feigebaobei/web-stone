Notifications
Web Push and Notifications

https://web.dev/notifications/



# push
> push api使web应用可以接收服务器提供的消息。  
> 当使用pushMessages subscriptions时必须解决[xsrf/csrf]()问题 https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html https://blog.codinghorror.com/preventing-csrf-and-xsrf-attacks/

## feature
- feature0
- feature1
- feature2

## usage
```js
// 当sw处理active状态后
PushManager.subscribe() // Promise<obj>
// 创建或返回已经存在的push subscription
serviceWorkerRegistration.pushManager.subscribe().then(pushSubscription => {...}).catch(err => {...})
```

## 推送消息的过程
```
your server => web push protocol request => push service => message arrives on the device
```

## PushManager api
该对象是接收后端服务来的消息的接口。  
该接口使用`ServiceWorkerRegistration.pushManager`创建  

|||||||
|-|-|-|-|-|-|
|属性||||||
||supportedContentEncodings|返回一个受支持的内容编码数组，可以用来加密推送消息的有效负载。||||
|事件||||||
|方法||||||
||getSubscription()|`Promise<PushSubscription>`||||
||permissionState(options?: PushSubscriptionOptions)|返回推送消息的权限状态 `Promise<state>`||'prompt', 'denied', or 'granted'||
||subscribe(opt?: PushSubscriptionOptions)|订阅一个push 服务`Promise<PushSubscription>`||||


## PushSubscription api
该对象提供一个订阅端口，支持取消订阅。
|||||||
|-|-|-|-|-|-|
|属性|只读|||||
||endpoint|返回订阅端口||||
||expirationTime|返回订阅期限||||
||options|返回PushSubscriptionOptions||||
|事件||||||
|方法||||||
||getKey(name: p256dh / auth)|返回公钥。可用于加密消息和发给后端。|ArrayBuffer|||
||toJSON()|序列化订阅信息并返回|JSON|||
||unsubscribe()|是否取消订阅成功`Promise<boolean>`||||

```ts
PushSubscriptionOptions: {
    userVisibleOnly: boolean // 指示返回的推送订阅将只用于用户可见的消息。
    applicationServerKey: string // 你的推送服务器将使用一个公钥通过推送服务器向客户端应用程序发送消息。该值是应用程序服务器生成的签名密钥对的一部分，可用于P-256曲线上的椭圆曲线数字签名(ECDSA)。
}
```


## todo
### title
### title
### title
