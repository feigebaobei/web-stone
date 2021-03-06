# ddos是什么？
分布式拒绝服务（DDoS）攻击是通过大规模互联网流量淹没目标服务器或其周边基础设施，以破坏目标服务器、服务或网络正常流量的恶意行为。  

# DDoS 攻击的工作原理
DDoS 攻击是通过连接互联网的计算机网络进行的。  
这些网络由计算机和其他设备（例如 IoT 设备）组成，它们感染了恶意软件，从而被攻击者远程控制。这些个体设备称为机器人（或僵尸），一组机器人则称为僵尸网络。  
一旦建立了僵尸网络，攻击者就可通过向每个机器人发送远程指令来发动攻击。  
当僵尸网络将受害者的服务器或网络作为目标时，每个机器人会将请求发送到目标的 IP 地址，这可能导致服务器或网络不堪重负，从而造成对正常流量的拒绝服务。  

# 如何识别 DDoS 攻击
- 来自单个 IP 地址或 IP 范围的可疑流量  
- 来自共享单个行为特征（例如设备类型、地理位置或 Web 浏览器版本）的用户的大量流量  
- 对单个页面或端点的请求数量出现不明原因的激增  
- 奇怪的流量模式，例如一天中非常规时间段的激增或看似不自然的模式（例如，每 10 分钟出现一次激增）  

# 常见的 DDoS 攻击有哪几类？
## 应用程序层攻击
攻击目标：此类攻击有时称为第 7 层 DDoS 攻击（指 OSI 模型第 7 层），其目标是耗尽目标资源。  
HTTP 洪水

## 协议攻击
攻击目标：协议攻击也称为状态耗尽攻击，这类攻击会过度消耗服务器资源和/或防火墙和负载平衡器之类的网络设备资源，从而导致服务中断。  
SYN 洪水  

## 容量耗尽攻击
攻击目标：此类攻击试图通过消耗目标与较大的互联网之间的所有可用带宽来造成拥塞。攻击运用某种放大攻击或其他生成大量流量的手段（如僵尸网络请求），向目标发送大量数据。  
DNS 放大  

# 如何防护 DDoS 攻击？
## 黑洞路由
有一种解决方案几乎适用于所有网络管理员：创建黑洞路由，并将流量汇入该路由。在最简单的形式下，当在没有特定限制条件的情况下实施黑洞过滤时，合法网络流量和恶意网络流量都将路由到空路由或黑洞，并从网络中丢弃。  
如果互联网设备遭受 DDoS 攻击，则该设备的互联网服务提供商（ISP）可能会将站点的所有流量发送到黑洞中作为防御。这不是理想的解决方案，因为它相当于让攻击者达成预期的目标：使网络无法访问。  

## 速率限制
限制服务器在某个时间段接收的请求数量也是防护拒绝服务攻击的一种方法。虽然速率限制对于减缓 Web 爬虫窃取内容及防护暴力破解攻击很有帮助，但仅靠速率限制可能不足以有效应对复杂的 DDoS 攻击。  

## Web 应用程序防火墙
Web 应用程序防火墙（WAF） 是一种有效工具，有助于缓解第 7 层 DDoS 攻击。在互联网和源站之间部署 WAF 后，WAF 可以充当反向代理，保护目标服务器，防止其遭受特定类型的恶意流量入侵。  


## Anycast 网络扩散
此类缓解方法使用 Anycast 网络，将攻击流量分散至分布式服务器网络，直到网络吸收流量为止。将分布式攻击流量的影响分散到可以管理的程度，从而分散破坏力。  

# title
# title
# title
# title
# title
# title
# title

[参考文章](https://www.cloudflare.com/zh-cn/learning/ddos/what-is-a-ddos-attack/)