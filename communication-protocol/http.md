# overview

http hyper text transfer protocol  
http 协议：超文本传输协议  
url:统一资源定位符，在网络中唯一定义一份资源。  
protocol://userName:password@serverAddress:port/path?queryString#fragment  
一般基于 tcp 协议  
基于 b/s 框架进行通信的。  
服务端需要 httpd、nginx 等。
客户端需要浏览器、elink、curl 等。

# 特点

<!-- prettier-ignore-start -->
|||||
|-|-|-|-|
|无连接|客户端发出一个请求，服务器回馈这个请求|可以节省时间。连接是由tcp负责的。||
|媒体独立|只要客户端、服务端知道如何处理数据内容，则任何数据都可以通过http发送。|客户端、服务端需要指定适合的MIME-type内容类型。||
|无状态|协议对事务处理没有记忆能力。都无连接了怎么可能会有状态呢。|后端服务使用cookie+session/header+jwt标记状态。||
|基于请求回馈||||
|使用明文通信|易被中间人攻击|||
<!-- prettier-ignore-end -->

## SPDY

优化了 http 1.x 的请求延迟。  
解决了 http 1.x 的安全性。

<!-- prettier-ignore-start -->
|                   |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- |
| 降低延迟          |     |     |     |     |     |
| 请求优先级        |     |     |     |     |     |
| header 压缩       |     |     |     |     |     |
| 基于 https 的加密协议传输（也就是拥有安全功能） |     |     |     |     |     |
| 服务端推送        |     |     |     |     |     |
<!-- prettier-ignore-end -->

spdy 的构成图

```
        --------
        | http |
        --------
        --------
        | spdy |
        --------
        --------
        | ssl  |
        --------
        --------
        | tcp  |
        --------
```

# 发展阶段

<!-- prettier-ignore-start -->
|  | 0.9 | 1.0    | 1.1     | 1.2 | 2.0    |     |
| ---- | --- | ----- | ---- | --- | ------- | --- |
| 缓存处理      |     | 使用 if-modified-since/expires 判断   | entity tag / if-Unmodified-Since / if-match / if-None-Match |     |     |     |
| 带宽优化及网络连接 |     | 不支持断点续传   | 使用 range 头域，只请求资源中的某一部分。返回状态码是 206   |     |     |     |
| 错误通知      |     |     | 新增 24 个错误状态响应码。如：409、401    |     |     |     |
| host 头处理   |     | 认为每个服务器绑定一个 ip 地址。因此请求头中无 hostname | 需要指明 host 头域   |     |     |     |
| 长链接   |     |     | 可以在一个 tcp 连接上传送多个 http 请求、响应。   |     |     |     |
|  |     |     | 默认找开 connection:keep-alive    |     |     |     |
| 解析格式      |     | 基于文本    |    |     | 二进制格式  |     |
|  |     |     |    |     | **多路复用**。一个连接上有多个请求，每个请求都有一个惟一的 id.接收端根据请求的 id 把请求归属到不同的服务器中。   |     |
| header 压缩   |     |     |    |     | encoder 减少需要传输的 header 大小。通信双方各缓存一份 header fields。避免重复 header 传输，减少需要传输的大小。 |     |
|  |     |     |    |     | 服务端推送  |     |
<!-- prettier-ignore-end -->

## 0.9

## 1.0

## 1.1

服务器回馈后会等待几秒后断开（默认 3 秒）。若这几秒内有请求，则使用此连接通道收发信息。否则断开连接。

## 2.0

原来是基于 SPDY 设计的。  
特点：

<!-- prettier-ignore-start -->
|||||
|-|-|-|-|
|进制分帧|使用二进制|||
|多路复用|一个 http 2.0 连接中发起多个请求。|||
|首部压缩|通信双方同时维护一张头信息表，所有字段都记录在这张表中，每次传输只需要传输表中的索引 ID.|请求头全是小写||
|服务端推送|服务端向客户端发送一个请求。|||
|请求优先级设置|每个 stream 都可以设置依赖和权重，可以按照依赖树分配优先级。|解决了关键请求被阻塞问题||
<!-- prettier-ignore-end -->

## 3.0

旧称是[quic](/communication-protocol/quic.html)  
用于多次请求（多路复用）

### 特点

- 0 rtt
- 在客户端发送的第一条信息是随机值 connection id。如果从 wifi 改变为 mobile data 时会使用此字段。
- 多路复用

# [状态码 status](/communication-protocol/status.html)

# 工作原理

1. 客户端与服务端建立连接
2. 客户端向服务端提出请求
3. 服务端接收请求，并根据请求回应文件
4. 客户端与服务端关闭连接

# 请求方法

<!-- prettier-ignore-start -->
|    |                      |   版本  |     |
| --- | ---- | --- | --- |
| GET     | 请求指定的页面信息，并返回实体主体。             |   1.0  |     |
| HEAD    | 与 GET 请求类似。返回的是响应中没有具体的内容，用于获取报头。                    |   1.0  |     |
| POST    | 向指定 url 提交数据进行处理请求（如：提交表单、上传文件）。数据被包含在请求体中。POST 请求一般用于创建新数据。 |  1.0   |     |
| PUT     | 从客户端向服务器传递数据取代指定的文档的内容。一般用于修改数据。                 |   1.1  |     |
| DELETE  | 请求服务器删除指定的数据。                         |  1.1   |     |
| CONNECT | http/1.1 协议中预留给能够将连接改为管道方式的代理服务器                          |  1.1   |     |
| OPTIONS | 允许客户端查看服务器的性能。                       |  1.1   |     |
| TRACE   | 显示服务器收到的请求，主要用于测试或诊断。         |    1.1 |     |
| PATCH   | 是对 PUT 请求的补充，用于对已知资源进行局部更新。  |  1.1   |     |
<!-- prettier-ignore-end -->

# 报文格式

## 请求

![请求报文格式](https://www.runoob.com/wp-content/uploads/2013/11/2012072810301161.png)

```
请求行
报文首部
空行
报文主体
```

报文首部包括：
|||||
|-|-|-|-|
||请求行|||
|||请求方式||
|||uri||
|||协议及版本||
||请求首部字段||客户端的信息、响应的优先级|
|||Cookie||
|||Accept-xxx||
|||Content-Type||
|||Content-Length||
|||Authorization||
|||User-Agent||
|||Referrer||
||能用首部字段||请求报文、响应报文都会使用的报文|
|||Request URL||
|||Request Method||
|||Status Code||
|||Remote Address||
|||Referrer Policy||
||实体首部字段||补充了实体有关的资源信息|
||报文主体||GET 时没用报文主体。POST 时有。|

## 回馈

回馈报文格式

```
状态行
报文首部
空行
报文主体
```

报文首部包括：

|     |              |            |     |
| --- | ------------ | ---------- | --- |
|     | 状态行       |            |     |
|     |              | 协议级版本 |     |
|     |              | 状态码     |     |
|     | 响应报文首部 |            |     |
|     | 通用首部字段 |            |     |
|     | 实体首部字段 |            |     |
|     | 报文主体     |            |     |

<!-- prettier-ignore-start -->
|                  |   |          |     |     |
| ---------------- | ---- | ------------------- | --- | --- |
| Allow            | 服务器支持的请求方式（如：GET/POST）                          |          |     |     |
| Content-Encoding | 文档的编码方式。                | 使用压缩文档会减少 html 文档的下载时间 |     |     |
| Content-Length   | 内容长度。只有在浏览器使用持久 http 连接时才需要这个数据。    |          |     |     |
| Content-Type     | 指明文档属于什么 MIME 类型。    |          |     |     |
| Date             | 当前的 GMT 时间                 |          |     |     |
| Expires          | 指明文件的过期时刻。若过期，则不缓存。                        |          |     |     |
| Last-Modified    | 文档的最后改动时刻              |          |     |     |
| Location         | 客户应当从哪里获取文档。若设置，则需要与状态码 302 一起使用。 |          |     |     |
| Refresh          | 指明浏览器应该在多长时间（单位：秒）后刷新文档。              |          |     |     |
| Server           | 服务器的名字。一般由 web 服务器设置。                         |          |     |     |
| Set-Cookie       | 设置 cookie.                    |          |     |     |
| WWW-Authenticate | 客户应该在 Authorization 头中提供什么类型的授权信息。         |          |     |     |
<!-- prettier-ignore-end -->

# content-type

指明文档的 MIME 类型。  
浏览器会根据些字段解析该文档。

<!-- prettier-ignore-start -->
|     |             |     |     |
| --------- | --- | --- | --- |
| text/html                         | html 格式   |     |     |
| text/plain                        | 纯文本格式  |     |     |
| text/xml                          | xml 格式    |     |     |
| image/gif                         | gif         |     |     |
| image/jpeg                        | jpg         |     |     |
| image/png                         | png         |     |     |
| application/xhtml+xml             | xhtml 格式  |     |     |
| application/xml                   | xml         |     |     |
| application/atom+xml              | Atom XML 聚合格式                         |     |     |
| application/json                  | json        |     |     |
| application/pdf                   | pdf         |     |     |
| application/msword                | word        |     |     |
| application/octet-stream          | 二进制流数据                              |     |     |
| application/x-www-form-urlencoded | 把 form 中的数据编码为 k/v 格式发送服务器 |     |     |
| multipart/form-data               | 上传表单时使用此格式                      |     |     |
<!-- prettier-ignore-end -->

# MIME 类型

描述消息内容类型的标准。

```
type/subtype
```

<!-- prettier-ignore-start -->
|                         |     |     |     |
| ---- | --- | --- | --- |
| text/html               |     |     |     |
| text/plain              |     |     |     |
| application/rtf         |     |     |     |
| image/gif               |     |     |     |
| image/jpeg              |     |     |     |
| audio/basic             |     |     |     |
| audio/midi audio/x-midi |     |     |     |
| audio/x-pn-realaudio    |     |     |     |
| video/mpeg              |     |     |     |
| video/x-msvideo         |     |     |     |
| application/x-gzip      |     |     |     |
| application/x-tar       |     |     |     |
<!-- prettier-ignore-end -->

# http & [HTTPS](/communication-protocol/https.html)

<!-- prettier-ignore-start -->
||http|https||
|-|-|-|-|
||hyper text transfer protocol 超文本传输协议|hyper text transfer protocol over secureSocket layer 超文本传输安全协议||
|默认接口|80|443||
|||安全协议，可用于传递敏感数据。||
|||http + ssl/tls||
|效率|高|低||
|证书|-|需要向ca申请证书，需要费用。||
||明文|密文||
|||http+ssl/tls||
|||防止运营商劫持||
<!-- prettier-ignore-end -->

# 长连接 & 短连接

```
连接 -》 传输数据 -》保持连接 -》 传输数据 -》。。。 -》关闭连接

连接 -》 传输数据 -》关闭连接
```

http 的长短连接功能是使用 tcp 的连接的功能。  
从 http1.1 起默认使用长连接。Connection: keep-alive.  
长连接需要服务端、客户端都支持长连接。

# 指标

|     |                 |          |                                      |
| --- | --------------- | -------- | ------------------------------------ |
| rtt | round-trip time | 往返时间 | 从数据完全发送完到收到确认信号的时间 |
|     |                 |          |                                      |
|     |                 |          |                                      |
|     |                 |          |                                      |

# 请求头

# 内容协商

c/s 使用头部中 Accept-xxx 字段决定使用哪个版本。

当同一个 url 对应的资源的多个版本时会引用内容协商。  
选择出最适合客户端显示的资源。

- 客户端驱动
- 服务器驱动
- 透明协商

|                 |                            |     |
| --------------- | -------------------------- | --- |
| Accept          | 告诉服务器需要哪种媒体类型 |     |
| Accept-Language | 哪种语言                   |     |
| Accept-Charset  | 哪种字符集                 |     |
| Accept-Encoding | 哪种编码                   |     |
