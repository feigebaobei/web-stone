# notification
> 把信息提示给用户。即使用户未打开网站。  
> 在web worker中使用。  
> 只能工作在https

## 主要技术
- push
- pull


## feature
- feature0
- feature1
- feature2

## usage
```js
requestPermission()

```

## 基本逻辑
1. 请求用户同意推送消息。浏览器把客户端标记给后端。后端保存起来。
2. 在后端添加推送消息的逻辑。
3. 浏览器收到消息后显示出来。

## Notification api
只能工作在https
||key|说明|默认值|枚举值||
|-|-|-|-|-|-|
|属性|只读|||||
|静态属性|permission|当前消息器的权限||'denied' 明确拒绝 / 'granted' 明确可显示 / 'default' 不知道用户的选项。与denied相同||
|静态属性|maxActions|活动的最大次数||||
|实例属性|actions|为用户提供了可用于与通知交互的操作。||||
|实例属性|badge|当没在足够空间显示消息时显示的图标。||||
|实例属性|body|消息的body属性||||
|实例属性|data|消息的data属性||||
|实例属性|dir|||||
|实例属性|lang|||||
|实例属性|tag|||||
|实例属性|icon|||||
|实例属性|image|||||
|实例属性|renotify|||||
|实例属性|requireInteraction|是否处于打开状态||||
|实例属性|silent|是否使用静默提示。如：无场景、振动。||||
|实例属性|timestamp|||||
|实例属性|title|||||
|实例属性|vibrate|是否振动||||
|方法||||||
|静态方法|requestPermission()|请求显示消息权限||||
|实例方法|close()|关闭消息||||
|实例方法|description|||||
|事件||||||
||click|||||
||close|||||
||error|||||
||show|||||

## 适用场景
- 及时、相关、精确地为用户提示信息。  
- 增强与用户关系。

### 注意
如果发现用户没查看，就不要频繁推送了。  

## todo
### title
### title
### title
