# webhook
https://www.redhat.com/zh/topics/automation-and-management/shenmeshi-webhook

> webhook这个词是由Jeff Lindsay在2007年在计算机科学hook项目第一次提出的。
> Webhook 是一种事件驱动的轻量级通信，可通过 HTTP 在应用之间自动发送数据。Webhook 通常由发送方和接收方商定好由特定事件触发，可自动实现 应用编程接口（API）之间的通信，并可用于激活工作流，例如在  GitOps  环境中。
> webhook 可以将事件源连接到自动化解决方案，因此，它可以用来启动事件驱动型自动化以便在发生特定事件时执行各种 IT 操作。
> webhook url 是目标应用程序给源应用程序的端点，用于接收webhook请求。  
> Webhook 通信是通过从源应用程序向目标应用程序发送 HTTP 请求来实现的。  
> 

## api
API 由一组用于构建和集成应用软件的定义和协议组合而成。  
视为信息用户和信息提供者之间的合约，它规定了消费者（调用方）需要提供的内容和提供者（响应方）需要提供的内容。  
Web API 通常使用 HTTP 从其他应用请求数据，并定义响应报文的结构，其通常采用 XML 或 JSON 文件格式。  

## Webhook 有何不同？
要设置 Webhook，客户端需向服务器 API 提供唯一的 URL，并指定其要了解的事件。设置 Webhook 后，客户端不再需要轮询服务器。发生特定的事件时，服务器会自动将相关的有效负载发送到客户端的 Webhook URL。 

Webhook 通常被称为“反向 API” 或“推送 API”，因为通信责任落在了服务器而非客户端上。与客户端不断发送 HTTP 请求来请求数据，直至服务器作出响应的方式不同，服务器在数据可用时会立即向客户端发送一个 HTTP POST 请求。虽然有这些别名，但其实 Webhook 并非 API，二者可以结合使用。应用必须具有 API 才能使用 Webhook。 

Webhook 这一名称取自 Web（表明指的是基于 HTTP 的通信）与 hooking 编程函数（允许应用截获调用或可能感兴趣的其他事件）。Webhook 可“钩住”服务器应用上发生的事件，并提示服务器通过 Web 将有效负载发送到客户端。Jeff Lindsay 在 2007 年发表的一篇名为[《Webhook 革新 Web 世界》](https://progrium.github.io/blog/2007/05/03/web-hooks-to-revolutionize-the-web/)（Web hooks to revolutionize the web）的博客文章推动了这一概念的普及。

## demo
```
webhook url
https://<your-website>/<your-webhook-endpoint>
```
## 如何定义webhook
## 如何调用webhook
## 如何接收webhook

## hookdeck
## http状态代码
|待处理的 WEBHOOK 状态 |	描述|	修复|
|-|-|-|
|（无法连接）ERR	|我们无法建立到目标服务器的连接。|	确保您的主机域名可以公开访问互联网。|
|(302) ERR（或其他 3xx 状态）|	目标服务器尝试将请求重定向到另一个位置。这种情况，我们认为对 Webhook 请求的重定向响应是失败的。	|将 Webhook 端点目的地设置为重定向解析的 URL。|
|(400) ERR（或其他 4xx 状态）	|目标服务器不能或不会处理请求。当服务器检测到错误 (400)、目标 URL 有访问限制 (401, 403) 或目标 URL 不存在 (404) 时，可能会发生这种情况。	|确保您的端点可以公开访问互联网。确保您的端点接受 POST HTTP 方法。|
|(500) ERR（或其他 5xx 状态）|	目标服务器在处理请求时遇到了错误。	|查看应用程序的日志，了解它为什么返回 500 错误。|
|（TLS 错误）错误|	我们无法与目标服务器建立安全连接。目标服务器的证书链中的 SSL/TLS 证书或中间证书的问题通常会导致这些错误。Stripe 需要 v1.2 或更高版本的 TLS。	|执行 SSL 服务器测试，找出可能导致此错误的问题。|
|（超时） 错误	|目标服务器响应 Webhook 请求的时间过长。	|务必要在您的 Webhook 处理代码中延迟复杂的逻辑并立即返回成功的响应。|

