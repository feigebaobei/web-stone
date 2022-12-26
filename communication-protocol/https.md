# overview

https 协议：超文本传输协议
url:统一资源定位符，在网络中唯一定义一份资源。  
protocol://userName:password@serverAddress:port/path?queryString#fragment  
一般基于 tcp 协议

# 编码、解码

# [status](/communication-protocol/status.html)

# 实现原理

## 加解密算法

### 对称加密

des / aes

### 非对称加密

rsa/dsa

## 通信过程

```

        client                  server
           |                       |
           |     请求https连接      |
           |---------------------->|
           |                       |
           |     返回证书（公钥）     |
           |<----------------------|
           |                       |
    产品随机（对称）密钥              |
    使用公钥对对称密钥加密             |
           |                       |
           |    发送加密后的对称密钥   |
           |---------------------->|
           |<----------------------|
           |                       |
           |   通过对称密钥加密的密文  |
           |---------------------->|
           |<----------------------|
           |                       |
```

# 优点

|                                                |     |     |     |
| ---------------------------------------------- | --- | --- | --- |
| 客户端生成的密钥只有当前客户端与服务端能得到   |     |     |     |
| 客户端生成的密文只有当前客户端和服务端能够解密 |     |     |     |
| 客户端与服务端的通信是安全的                   |     |     |     |

# [HTTP](/communication-protocol/http.html) & [HTTPS](/communication-protocol/https.html)

# [ssl](/communication-protocol/ssl.html) & [tls](/communication-protocol/tls.html)

二者运行在 tcp 上
