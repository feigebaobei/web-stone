# session & jsonwebtoken

<!-- prettier-ignore-start -->
|     | session            | jsonwebtoken    |
| --- | ----------------- | ---------------- |
|     | 占用后端内存                       | 前端存                    |
|     | 种 cookie，前端不处理        | 前端得到后，在之后的请求 header.authentication 字段使用 |
|     | 需求定义有效时长，及时更新。 | access_token 与 refresh_token 结合使用                  |
|     | 使用cookie传递sessionId      | 使用header的指定字段传递access_token           |
|     |  | 不是密文，它是编码后的值。payload中不应该放敏感数据，要放也得放密文。|
|     |  | 服务端生成|
|     |  | 可扩展性好     |
|     |  |      |
|     |  |      |
|     |  |      |
|     |  |      |
<!-- prettier-ignore-end -->

## access_token & refresh_token

|          | access_token             | refresh_token         |
| -------- | ------------------------ | --------------------- |
| 用途     | 控制访问权限，标记用户。 | 用于刷新 access_token |
| 有效时长 | 短                       | 长                    |
| 生成模式 | jwt                      | jwt                   |

### demo

```js
// no.1 登录时生成2个token
function login(req: Request, res: Response) {
  const { username, password } = req.body
  const user = getUserById(username)
  if (!user || user.password != password) {
    return res.status(401).send('Incorrect username or password')
  }
  const session = createSession(username, user.displayName)
  const accessToken = signToken(
    {
      username: user.user.username,
      name: user.displayName,
      sessionId: session.sessionId,
    },
    '300s'
  )
  const refreshToken = signToken({ sessionId: session.sessionId }, '1y')
  session.access_token = accessToken
  session.refresh_token = refreshToken
  return res.send(session)
}
// no.2 前端使用token访问资源
// no.3 刷新token
function refreshAccessToken(req: Request, res: Response) {
  const refreshToken = req.body.refresh_token
  if (!refreshToken) {
    return res.status(401).send('No refresh token')
  }
  const refresh = verifyToken(refreshToken)
  const session = getSession(refresh.sessionId)
  const newAccessToken = signToken(session, '300s')
  if (!newAccessToken) {
    return res.status(401).send('Unable to generate access token')
  }
  const newRefreshToken = signToken(session.sessionId, '1y')
  return res.send({
    access_token: newAccessToken,
    refresh_token: newRefreshToken,
  })
}
```

## 刷新 token 的逻辑

```
    client              server
    输入用户信息
    请求登录 ------------》 验证用户信息
                        若成功生成2个token+过期时刻
           《------------- 返回2个token
    在ls中保存token*2
    在请求的header中添加access_token

    当快过期时
    请求刷新token -----> 验证是否有效
        《-------------- 返回新token
    在ls中保存token*2
```

不推荐在后端提示 access_token 过期后再刷新 token,再请求指定接口。

## 前端发起刷新 token

```js
let refreshTokenFn = () => {
  req({ url, method, data })
    .then((res) => {
      localStorage.setItem('token', {
        access_token: res.access_token,
        refresh_token: res.refresh_token,
        expireTime: res.expireTime,
      })
    })
    .catch(() => {
      setTimeout(() => {
        refreshTokenFn()
      }, 500)
    })
}
setInterval(() => {
  refreshTokenFn()
}, 5 * 60 * 1000)

let refreshTokenFn2 = () => {
  return req({ url, method, data })
}
let delayedRefreshToken = (delay: 300000) => {
  new Promise((s, j) => {
    setTimeout(() => {
      refreshTokenFn2()
        .then((res) => s(res))
        .catch((err) => j(err))
    }, delay)
  })
    .then(() => {
      // 同refreshTokenFn.then
      delayedRefreshToken()
    })
    .catch(() => {
      let t = delay / 10
      t = t > 10 ? t : 10
      delayedRefreshToken(t)
    })
}
delayedRefreshToken()
```

# jsonwebtoken

> 用途：认证身份来源。
> (hash 只能用于验证数据完整，不能加密)  
> 一般在 payload 中放与用户相关的数据。如 userId  
> 因 jwt 不能保证数据安全，所以必须使用 https
> 在 payload 中设置 expire,原理同 cookie 的过期时间。  
> 不依赖 cookie，所以可避免[csrf 攻击](/safety&hacker/csrf&xsrf.html)

```
header.payload.signature
```

三部分的 demo:

```
header: {
  typ: "JWT",   // 类型是jwt
  alg: "HS256", // 算法是 HMAC-SHA256
}
payload: {
  userId: 'xxxxx'
}
signature:
let data = base64UrlEncode(header) + '.' + base64UrlEncode(payload)
let hashedData = hash(data, secret)
let signature = base64UrlEncode(hashedData)
```

## 原理

## 登出

- 创建一个列表，存放 token 有效且已经主动倒出的 token。
- 达到过期时刻
