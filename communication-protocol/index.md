# overview

通信协议是指双方实体完成**通信或服务所必须遵循的规则和约定**。协议定义了**数据单元使用的格式**，信息单元应该包含的信息与含义，连接方式，信息发送和接收的时序，从而确保网络中数据顺利地传送到确定的地方。  
是一层套一层的  
由某一运行在用户空间的应用程序来实现其功能。

# 组成

<!-- prettier-ignore-start -->
| osi      | 主要的分层 | 说明 | 代表协议 | 传输对象       |
| ------------ | -- | ---- | ------------ | ------ |
| 应用层 表达层 会话层 | 应用层 |  | [HTTP](/communication-protocol/http.html) [HTTPS](/communication-protocol/https.html) FTP SMTP DNS Telnet POP3 SNMP NFS | 报文 message       |
| 运输层   | 运输层 |  | [TCP](/communication-protocol/tcp.html) [UDP](/communication-protocol/udp.html)  | tcp 报文段 segment udp 数据报 datagram |
| 网络层   | 网络层 |  | [IP](/communication-protocol/ip.html) ICMP ARP  | 分组、数据包 packet    |
| 数据链路层 物理层    | 网络接口层 |  | PPP Etherent  | 帧 frame       |
<!-- prettier-ignore-end -->

HTTP 超文本传输协议（浏览网页服务）  
TFTP 文件传输协议（较快，但是不可靠）  
FTP 文件传输协议（提供文件上传，文件下载服务，较慢但是可靠）  
NFS 网络文件系统（Unix 和 Linux 系统之间共享文件）  
[SMTP 简单邮件传输协议（邮件的发送和转发）](/communication-protocol/smtp.html)  
[POP3 接收邮件（由服务器下载到本地）](/communication-protocol/pop3.html)  
Talnet (远程登录功能（配置交换机、路由器）)  
SNMP 简单网络管理协议（通过网管软件来管理网络）  
DNS 域名系统，将域名解析为 IP 地址（将百度的域名转换为服务器的 IP 地址）

![osi](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3L6e3OwCgSWOxp79AJUzXs/bcc453b68a03ae5a83bda4e5453984d1/osi-model-7-layers_zhCN.svg)

# 各层功能

![各层之间的传递过程](/communication-protocol/transferProcess.png)

## 应用层的逻辑

应用层:负责应用程序之间的数据交流  
[HTTP 1 2 3](/communication-protocol/http.html) [HTTPS](/communication-protocol/https.html) FTP SMTP DNS Telnet POP3 SNMP NFS [QUIC](/communication-protocol/quic.html) [ipfs](/communication-protocol/ipfs.html)

## 运输层的逻辑

[TCP](/communication-protocol/tcp.html) [UDP](/communication-protocol/udp.html)

用户数据报协议

## 网络层的逻辑

[IP](/communication-protocol/ip.html) ICMP [ARP](/communication-protocol/arp.html)

## 网络接口层的逻辑

以太网协议规定，接入网络的设备都必须安装网络适配器，即网卡，数据包必须是从一块网卡传送到另一块网卡。而网卡地址就是数据包的发送地址和接收地址，有了 MAC 地址（网卡编号）以后，以太网采用广播形式，把数据包发给该子网内所有主机，子网内每台主机在接收到这个包以后，都会读取首部里的目标 MAC 地址，然后和自己的 MAC 地址进行对比，如果相同就做下一步处理，如果不同，就丢弃这个包。  
链路管理、帧同步、寻址、流量控制、差错控制  
MAC 地址（网卡编号）：48 位的二进制数。表示为 12 位的 16 进制数。分为两部分：前 24 位为厂商编号，后 24 位为网卡的编号（由专门的机构分配）  
PPP [Etherent](/communication-protocol/etherent.md)

# 端口范围

| 0-6535    |                         |     |
| --------- | ----------------------- | --- |
| 1-255     | 知名的端口号            |     |
| 256-1023  | unix 系统占用           |     |
| 1024-5000 | tcp / ip 临时分配的端口 |     |
| >5000     | 给其他服务预留的        |     |

端口：

- 一个进程可以占用多个端口；
- 一个端口只能被一个进程占用
- 一个端口就是一个数据通道
- 端口号是一个无符号 16 位整数(0~65535)

五元组：网络中标识一条信息的具体流向，源端口、目的端口、源 IP 地址、目的 IP 地址、协议

# mac 地址

MAC 地址也叫物理地址、硬件地址，由网络设备制造商生产时烧录在网卡(Network lnterface Card)的 EPROM(一种闪存芯片，通常可以通过程序擦写)。IP 地址与 MAC 地址在计算机里都是以二进制表示的，IP 地址是 32 位的，而 MAC 地址则是 48 位的。

# [流 streaming](/communication-protocol/streaming.md)

# [从输入 url 到看到页面效果](/communication-protocol/urlRenderer.html)

# imap Internet Mail Access Protocol(互联网邮件存取协议)，

> 该协议用于邮件的接收，与 POP3 类似。它允许客户端通过远程的方式（不需要下载邮件到本地）直接在服务器上管理邮件，支持增删改、搜索、文件夹/文件管理等。由于是 online 的模式，可以再多个设备间同步。

# webmail

用户通过 UA 来完成邮件相关的操作。而 WebMail 则更简单，不需要安装 UA，直接浏览器打开（163 邮箱、QQ 邮箱），web 端可以通过 http 与服务器进行通讯，当然邮件服务器之间还是通过 SMTP 来传递邮件。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c39dc23da354a2188a21e1206f68df5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=868&h=102&s=22237&e=png&b=ffffff)
