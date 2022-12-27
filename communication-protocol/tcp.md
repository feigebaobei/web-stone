# overview

Transmission Control Protocol  
一般基于 ip 协议  
是为了在不可靠的互联网络上提供可靠的端到端字节流而专门设计的一个传输协议。

- TCP 提供可靠交付的服务，保证数据无差错、不丢失、不重复、按序到达。
- TCP 提供全双工通信。
- TCP 虽然是面向字节流的，但 TCP 传送的数据单元却是报文段。一个 TCP 报文段分为首部和数据两部分
- 一个 tcp 连接可以传送多个 http 请求和响应。

## 特点

<!-- prettier-ignore-start -->
|     |            |             |  |
| --- | ---- | --- | ------ |
|     | 面向连接   |             |  |
|     | 传输可靠   | 2 个使用 tcp 的应用，在交换数据之前必须建立 tcp 连接。    |  |
|     |            | 应用程序产生的数据长度保持不变。     |  |
|     |            | 当 tcp 发出一个段后，它启动一个定时器，等待目的端确认收到这个报文段。若不能及时收到确认，则重发这个报文段。tcp 有延迟确认的功能。在此功能未打开，则立即确认。若此功能打开，则由定时器触发确认时间点 |  |
|     |            | tcp 将保持它首部和数据的检验和。若目的端检测数据与检验和有差错，则不确认收到此报文段。     |  |
|     |            | tcp 将收到的数据进行重新排序，以正确顺序交给应用层。      | 如何排序的？ ip 在传输过程中会失序。 |
|     |            | tcp 可以丢弃重复数据。             |  |
|     |            | tcp 的接收端只允许另一端发送接收端的缓冲区所能接纳的数据。可防止较快主机致使较慢主机的缓冲区溢出        |  |
|     | 面向字节流 |             |  |
<!-- prettier-ignore-end -->

![tcp头部](/communication-protocol/tcpHeader.png)  
源端口(Source Port)  
目的端口(Desination Port)  
序列号(Sequence Number)【数据包的序号】  
确认号(Acknowledgment Number)（序列号+1）【用于指示下一个数据包序号】  
报头的长度(HLEN):以 32 字节为单位的报头长度  
保留域(Reserved)：设置为 0  
编码位(Code Bits):用于控制段的传输（如会话的建立和终止）  
包括：URG、ACK、PSH、RST、SYN、FIN 6 个位  
SYN（synchronous）：请求建立 TCP 连接  
FIN：断开 TCP 连接  
RST：重置 TCP 连接  
ACK：确认、反馈连接情况  
PSH：将数据立刻送到应用层进行处理的命令  
URG：判断紧急指针是否有效的命令  
窗口大小(Windows)：接收方能够继续接收的字节数【控制发送的速度】。只有 16bit，因此最大是 65535 字节。  
校验和(Checksum): 包括 TCP 报头和数据在内的校验和【判断数据传输是否出错】  
紧急指针(Urgent Pointer)：当前序列号到紧急位置的偏移量  
选项(Option)：厂商根据需要自定义的内容  
MAC 地址  
数据(Data)：上层协议数据

# 工作方式

![工作方式](https://img-blog.csdnimg.cn/img_convert/3972ebc07c64f3eab67b7a17aab7ff48.png)

建立连接  
三握  
建立连接是由 tcp 建立的。应用程序不需要担心如何建立。

1. 客户端发送 syn（syn=x）报文给服务器端，进入 SYN_SEND 状态。
2. 服务端收到 syn 报文后回应一个 syn（seq=y）ack（ack=x+1）报文，进入 SYN_RECV 状态。
3. 客户端收到服务器端的 syn 报文，回应一个 ack（ack=y+1）报文，进入 established 状态。

开始传输数据。

终止连接  
四挥  
由 tcp 的半关闭造成的。

1. 某个应用首先调用 close。该端执行“主动关闭”。该端发送一个 fin 分节，表示数据发送完毕。
2. 收到 fin 的对端执行“被动关闭”。
3. 一段时间后，接收到这个文件结束符的应用进程将调用 close 关闭它的套接字。这使得它的 tcp 也发送一个 fin.
4. 接收这个最终 fin 的原发送端 tcp 确认这个 fin.

![四挥](https://img-blog.csdn.net/20180719110841774?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9taW5nMTAwMDAx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

# tcp & udp

<!-- prettier-ignore-start -->
|     | tcp  | udp        |     |
| --- | --- | ---- | --- |
|     | 面向连接  | 面向报文      |     |
|     |   | 无连接的数据报服务      |     |
|     | 高可靠性，确保数据传递正确。不出现乱序、丢失。 | 在传递数据前不建立连接。不对数进行检查与修改。 |     |
|     |  | 有较好的实时性，工作效率高。      |     |
|     |  | 段结构简单，网络开销小。  |     |
<!-- prettier-ignore-end -->

# 指标

<!-- prettier-ignore-start -->
|  |    |     |     |
| ---- | --- | --- | --- |
| RTT 及其偏差（RTT 波动的值、方差，也叫抖动。） | round trip time |     |     |
|  |    |     |     |
|  |    |     |     |
<!-- prettier-ignore-end -->
