# cookie

## overview

- 参与通信。弥补 http(s)无状态的特点。
- <4k
- 只能保存字符串。

## 用途

- 记录用户状态。如：判断用户是否登录。
- 浏览计数。

## 各字段

<!-- prettier-ignore-start -->
|     |  说明   |  默认值   |     |
| --- | --- | --- | --- |
|  name   |  名称，不可重复，不可删除   |     |     |
|  value   |  若为Uniconde则需要编码，若为二进制，则需要base64编码   |     |     |
|  maxAge   |  失效时间。若为正数，则maxAge秒后失效。若为负数，则该cookie为临时cookie，在关闭浏览器后失效。若为0，则删除该cookie.   |  -1   |     |
|  secure   |  是否仅被安全协议使用。   | false   |     |
|  path   |  指定路径下都可以使用该cookie。最后一个字符必须是`/`   |     |     |
|  domain   |  域名。若为`.abc.com`，则以`abc.com`结尾的域名都可以访问此cookie   |     |     |
|  comment   |  用处说明。   |     |     |
|  version   |  版本号。0：Netscape的cookie规范。1：w3c遵循的rfc 2109规范   |     |     |
|     |     |     |     |
|     |     |     |     |
|     |     |     |     |
<!-- prettier-ignore-end -->

## 操作 cookie

```js
// 获取cookie
document.cookie
// 设置 & 修改cookie
document.cookie = 'k=v'
document.cookie = 'k=v; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/'
// 删除 cookie 设置为以前的时间 可以不指定值
document.cookie = 'k=; expires=Thu, 18 Dec 1970 12:00:00 GMT; path=/'
```

## cookie & session

二者共同写成标记状态。

|        | cookie                 | session    |     |
| ------ | ---------------------- | ---------- | --- |
|        | 服务端种在客户端的标记 | -          |     |
| 存在于 | 客户端                 | 服务端     |     |
|        | 参于通信               | 不参于通信 |     |
| 值     | sessionId              | -          |     |
| 设置   | Set-Cookie             |            |     |
|        |                        |            |     |

## [前端存储](/browser/frontStorage/index.html)

## [跨域](/browser/crossDomain.html)

## [同源策略](/browser/origin&cors.html)
