# overview

https 协议：超文本传输协议
url:统一资源定位符，在网络中唯一定义一份资源。  
protocol://userName:password@serverAddress:port/path?queryString#fragment  
一般基于 tcp 协议

# 特点

<!-- prettier-ignore-start -->
|||||
|-|-|-|-|
|内容加密||||
|验证身份||||
|保护数据完整性||||
|内容加密||||
|||||
<!-- prettier-ignore-end -->

# [status](/communication-protocol/status.html)

# 实现原理

## 加解密算法

### 对称加密

des / aes

### 非对称加密

rsa/dsa

## 通信过程

![https通信过程](/communication-protocol/https.png)

```

        client                  server
           |     先建立tcp连接      |
           |     请求https连接      |
           |---------------------->|
           |                       |
           |     返回证书（公钥）     |
           |<----------------------|
           |                       |
    验证证书是否有效                  |
    产生随机（对称）密钥              |
    使用公钥对对称密钥加密             |
           |                       |
           |    发送加密后的对称密钥   |
           |---------------------->|
           |                       |
           |             使用私钥解密，得到对称密钥
           |        ok             |
           |<----------------------|
           |                       |
           |        发送请求        |
           | （通过对称密钥加密的密文）|
           |---------------------->|
           |                       |
           |              使用对称密钥解密，得到明文
           |              处理请求后生成回馈
           |              使用对称密钥加密回馈
           |                       |
           |        返回回馈        |
           |<----------------------|
           |                       |
       使用对称密钥解密，             |
       得到明文后渲染                |
           |                       |
           |        多路复用        |
           |      断开tcp连接        |
```

1. 建立 tcp 连接
2. 初始化安全层
3. 发送 http 请求

# 优点

|                                                |     |     |     |
| ---------------------------------------------- | --- | --- | --- |
| 客户端生成的密钥只有当前客户端与服务端能得到   |     |     |     |
| 客户端生成的密文只有当前客户端和服务端能够解密 |     |     |     |
| 客户端与服务端的通信是安全的                   |     |     |     |

# [HTTP](/communication-protocol/http.html) & HTTPS

# [ssl (secure socket layer)](/communication-protocol/ssl.html) & [tls (transport layer security)](/communication-protocol/tls.html)

被称为安全层。二者运行在 tcp 上。

```
       -------------
       |    http   |
       -------------
       -------------
       | ssl / tls |
       -------------
       -------------
       |    tcp    |
       -------------
       -------------
       |    ip     |
       -------------
       -------------
       |  网络接口   |
       -------------
```

# [ca 证书](/browser/caCert.html)
