# 客户端&服务端的的通信方式

- client 请求 service hxr/ajax
- service 推送给 client EventSource
- service 与 client 互相推送 WebSocket

## [xhr](/language/javascript/xhr.html)/[ajax](/language/javascript/ajax.html)

## [EventSource](/language/javascript/eventSource.html)

## WebSocket

## xhr/ajax && eventSource && websocket

|     | xhr/ajax | eventSource                          | websocket                                            |
| --- | -------- | ------------------------------------ | ---------------------------------------------------- |
|     |          | 基于 html 协议。无需复杂的握手过程。 |                                                      |
|     |          | 自动重连                             |                                                      |
|     |          | 比轮询占用资源少，适合低带宽环境。   | 适用于复杂的大规模的实时应用，如在线游戏、协同编辑。 |
|     |          | 支持跨域                             |                                                      |
|     |          | 单向通信                             | 双向通信。实时性和效率                               |
|     |          | 较低版本的浏览器不支持               |                                                      |
|     |          |                                      |                                                      |
|     |          |                                      |                                                      |
|     |          |                                      |                                                      |
|     |          |                                      |                                                      |
|     |          |                                      |                                                      |
|     |          |                                      |                                                      |
|     |          |                                      |                                                      |
