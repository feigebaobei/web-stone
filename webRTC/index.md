# webRTC

## overview

> 浏览器中用于 p2p 的实时媒体流。不需要及时通信服务器。  
> mediastream  
> peerConnection  
> datachannel  
> 基于[quic](/communication-protocol/quic.html)

### feature

- feature1
- feature2

## demo

```

```

## 协议

|      |                                            |     |     |
| ---- | ------------------------------------------ | --- | --- |
| stun | simple traversal of user datagram protocol |     |     |
| turn | traversal using relays around NAT          |     |     |
|      |                                            |     |     |
|      |                                            |     |     |
|      |                                            |     |     |

webrtc 中使用二个协议：
srtp secure real-time transport protocol  
用于传递 audio/video  
sctp stream control transport protocol 有点像 http2  
用于传递 app 的数据。

## usage

```shell

```

## demo

## api

## todo

navigator.getUserMedia(option, fn0, fn1)
window.url.createObjectURL()
