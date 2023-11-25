# jsonwebtoken

## overview

> TODO: description

### feature

- feature0
- feature1
- feature2

## install

`npm i jsonwebtoken`

## usage

```js
const jwt = require('jsonwebtoken')
let token = jwt.sign(payload, secret)
let o = jwt.verify(token, secret)
console.log('o', o)
```

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`jwt.sign(payload, secretOrPrivateKey, [options, cb])`
payload： object | buffer | string.若不是 buffer/string，则使用`JSON.stringify()`处理。
secretOrPrivateKey: string | buffer | object | xxx
options: {
algorithm: 默认 HS256
expiresIn: vercel/ms
notBefore: vercel/ms
audience
issuer
jwtid
subject
noTimestamp
header
keyid
mutatePayload
allowInsecureKeySizes
allowInvalidAsymmetricKeyTypes
}
签名
当使用 options 时 payload 必须是 object

```
let jwt = require('jsonwebtoken')
let token = jwt.sign({foo: 'bar'}, 'secret')
```

`jwt.verify(token, secretOrPublicKey, [options, cb])`
options: {
algorithms
audience

    complete
    issuer
    jwtid
    ignoreExpiration
    ignoreNotBefore
    subject
    clockTolerance
    maxAge
    clockTimestamp
    nonce
    allowInvalidAsymmetricKeyTypes

}
得到 token 的解码结果

## TokenExpiredError

{
name: 'TokenExpiredError'
message: 'jwt expired'
expiredAt: [ExpDate]
}

## JsonWebTokenError 对象

{
name: 'JsonWebTokenError',
message: 'invalid token'
'jwt malformed'
'jwt signature'
'invalid signature'
'jwt audience invalid'
'jwt issuer invalid'
'jwt id invalid'
'jwt subject invalid'
}

## NotBeforeError

{
name: 'NotBeforeError',
message: 'jwt not active',
date: 2018-10-04T16:10:44.000Z
}

## algorithms supported

| alg Parameter Value | Digital Signature or MAC Algorithm                                     |
| ------------------- | ---------------------------------------------------------------------- |
| HS256               | HMAC using SHA-256 hash algorithm                                      |
| HS384               | HMAC using SHA-384 hash algorithm                                      |
| HS512               | HMAC using SHA-512 hash algorithm                                      |
| RS256               | RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm                         |
| RS384               | RSASSA-PKCS1-v1_5 using SHA-384 hash algorithm                         |
| RS512               | RSASSA-PKCS1-v1_5 using SHA-512 hash algorithm                         |
| PS256               | RSASSA-PSS using SHA-256 hash algorithm (only node ^6.12.0 OR >=8.0.0) |
| PS384               | RSASSA-PSS using SHA-384 hash algorithm (only node ^6.12.0 OR >=8.0.0) |
| PS512               | RSASSA-PSS using SHA-512 hash algorithm (only node ^6.12.0 OR >=8.0.0) |
| ES256               | ECDSA using P-256 curve and SHA-256 hash algorithm                     |
| ES384               | ECDSA using P-384 curve and SHA-384 hash algorithm                     |
| ES512               | ECDSA using P-521 curve and SHA-512 hash algorithm                     |
| none                | No digital signature or MAC value included                             |

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
