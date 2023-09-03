# EventSource

web 内容与服务器发送事件通信的接口。
一个 EventSourcer 实例会对 http 服务器开启一个持久化的连接。以`text/event-stream`格式发送事件。  
使用`EventSource.close()`关闭。

## 构造函数

```js
let pc = new EventSource(url, configuration)
configuration: {
  withCredentials: Boolean // default false
  // cors是否包含credentials
}
```

## 属性

|                 |      |          |                           |
| --------------- | ---- | -------- | ------------------------- |
| readyState      | 只读 |          |                           |
| url             | 只读 |          |                           |
| withCredentials | 只读 |          |                           |
| close()         |      | 关闭连接 | 设置 readyState 为 CLOSED |

## 事件

|         |                |     |     |
| ------- | -------------- | --- | --- |
| error   |                |     |     |
| message | 收到数据时触发 |     |     |
| open    | 打开连接时触发 |     |     |
