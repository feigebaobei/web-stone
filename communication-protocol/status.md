## 状态码

1. 1xx 临时响应
1xx的响应码代表请求被接收，需要继续处理。
1) 100: Continue/继续
HTTP 1.1新增状态码。请求已被服务器接收，正在等待剩余部分。
2) 101: Switch Protocols/协议转换
HTTP 1.1新增状态码。请求已被服务器接收，将通知客户端切换协议完成请求。

2. 2xx 成功
2xx的响应码代表请求已被服务器成功接受处理。
1) 200: OK/正常
请求已成功，请求内容将同时返回。
2) 201: Create/已创建
请求已实现，已根据请求创建了新资源，将同时返回资源的URI。
3) 202: Accepted/接受
请求已接受，服务器正在处理。
4) 203: Non-Authoritative Information/非官方信息
HTTP 1.1新增状态码。内容已正常返回，但可能来自另一来源。
5) 204: No Content/无内容
HTTP 1.1新增状态码。请求已处理，但不需要或没有内容返回。
6) 205: Reset Content/重置内容
HTTP 1.1新增状态码。请求已处理，没有内容返回，但需要重置文档。
7) 206: Partial Content/局部内容。
HTTP 1.1新增状态码。请求已处理，局部内容（片段）已正常返回。

3. 3xx 重定向
3xx的响应码代表客户端需要进一步操作，通常用来重定向。
1) 300: Multiple Choices/多重选择
被请求的资源有多个可选的项，客户端可自己选择重定向。
2) 301: Moved Permanently/永久移动
被请求的资源已永久移到到新位置。
3) 302: Found/已找到
被请求的资源临时从不同位置响应。
4) 303: See Other/查看其他位置
HTTP 1.1新增状态码。被请求的资源可在另一位置找到，并应采用GET方式访问。
5) 304: Not Modified/未修改
客户端请求的内容并未改变，服务器将返回空内容。
6) 305: Use Proxy/使用代理
HTTP 1.1新增状态码。被请求的资源必须通过指定的代理访问。
7) 307: Temporary Redirect/临时重定向
HTTP 1.1新增状态码。被请求的资源可在另一位置找到，并应采用POST方式访问。

4. 4xx 错误
4xx的响应码代表客户端可能发生错误，服务器无法正确处理。
1) 400: Bad Request/错误请求
客户端的请求中包含语法错误。
2) 401: Unauthorized/未授权
客户端的请求需要身份验证，服务器验证未通过。
3) 403: Forbidden/禁止
服务器拒绝执行客户端的请求。
4) 404: Not Found/未找到
客户端所请求的资源未找到。
5) 405: Method Not Allowed/方法未允许
HTTP 1.1新增状态码。客户端请求的方法不能用于请求对应的资源。
6) 406: Not Acceptable/无法访问
HTTP 1.1新增状态码。客户端所请求的资源类型与请求头中的条件不符。
7) 407: Proxy Authentication Required/代理服务器认证要求
HTTP 1.1新增状态码。客户端的请求需要通过代理服务器验证。
8) 408: Request Timeout/请求超时
HTTP 1.1新增状态码。服务器等待客户端发送请求时间超长。
9) 409: Conflict/冲突
HTTP 1.1新增状态码。客户端所请求的资源与当前状态冲突，请求无法完成。
10) 410: Gone/已不可用
HTTP 1.1新增状态码。客户端所请求的资源已不可用，且没有转发地址。
11) 411: Length Required/需要数据长度
HTTP 1.1新增状态码。服务器需要客户端提供请求的数据长度。
12) 412: Precondition Failed/先决条件错误
HTTP 1.1新增状态码。服务器未能满足请求头中的先决条件。
13) 413: Request Entity Too Large/请求实体过大
HTTP 1.1新增状态码。客户端所请求的资源内容过大，服务器拒绝该请求。
14) 414: Request URI Too Long/请求URI过长
HTTP 1.1新增状态码。请求的URI过长。
15) 415: Unsupported Media Type/不支持的媒体格式
HTTP 1.1新增状态码。服务器不能识别请求附带的格式类型。
16) 416: Requested Range Not Satisfiable/请求范围无法满足
HTTP 1.1新增状态码。请求头中的范围信息服务器无法满足。
17) 417: Expectation Failed/期望失败
HTTP 1.1新增状态码。请求头中的期望信息服务器无法满足。

5. 5xx 服务器错误
5xx的响应码代表服务器有错误或异常发生。
1) 500: Internal Server Error/内部服务器错误
服务器遇到未知错误导致请求无法完成。
2) 501: Not Implemented/未实现
服务器不支持客户端请求的功能。
3) 502: Bad Gateway/网关错误
网关或代理服务器接收到远端服务器的无效响应。
4) 503: Service Unavailable/服务无法获得
服务器已超载或维护中导致请求无法完成。
5) 504: Gateway Timeout/网关超时
HTTP 1.1新增状态码。网关或代理服务器等待远端服务器的响应时间超长。
6) 505: HTTP Version Not Supported/HTTP 版本不支持
HTTP 1.1新增状态码。服务器不支持请求标明的HTTP版本。