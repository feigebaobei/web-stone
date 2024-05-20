# sso

> 身份和访问管理（iam）
> 访问控制
> 目的：只登录一次，多次访问。
> 控制用户可以访问的所有资源的权限。

## 类型

|          |                                   |     |     |
| -------- | --------------------------------- | --- | --- |
| SAML     | 安全声明标记语言                  |     |     |
| OAuth    | 开放标准                          |     |     |
| OIDC     | 使用一组 token 存取多个网站的方法 |     |     |
| Kerberos | 基于 token 的身份验证系统         |     |     |

## 竞品

|     |              |                      |                                  |
| --- | ------------ | -------------------- | -------------------------------- |
| fim | 联合身份管理 | 多个服役共享用户信息 |                                  |
|     | 多重要素验证 |                      | 如邮箱+密码再加一次性密码（otp） |

## 优势

- 更强的密码
- 无重复的密码
- 更好地执行密码策略。it 团队分工明确。
- 多因素身份验证
- 只输入一次密码

## 对 sso 的要求

- 足够安全
- 应使用多重认证
- 限制密码。如长度、复杂度、最短更新时间、最多尝试登录次数。

## 运行逻辑

- ![运行逻辑](/promote/sso/saml.png)

---

- 从 idp 开始登录的情况![1](/promote/sso/1.png)
- 从 sp 开始登录的情况![2](/promote/sso/2.png)
- 以上 2 种情况都是把数据从 idp 经过前端传给 sp![3](/promote/sso/3.png)

## 难点

- 当 sp 验证失败时，如何重定向到 idp 的登录页面。
- 当 idp 验证用户信息成功后，如何把 saml 给到 sp.
- sp 如何判断这个 saml 对应哪个用户、哪个客户端的请求。

## 参考文献

- [Setting up a Single Sign-On (SSO) SAML Test Environment with NX Workspace, Express.js, Passport, @node-saml/passport-saml, and TypeScript: A Guide with SimpleSAMLphp and a Working Repository](https://medium.com/@joshuawright_63564/setting-up-a-single-sign-on-sso-saml-test-environment-nx-express-js-and-passportjs-e08e0742c120)
- [Setup a Single Sign On SAML Test Environment with Docker and NodeJS](https://medium.com/disney-streaming/setup-a-single-sign-on-saml-test-environment-with-docker-and-nodejs-c53fc1a984c9)
- [How To Implement Node.js SAML Authentication In Your Application](https://marketsplash.com/node-js-saml/)
- [saml](/promote/sso/saml.html)
- [saml](/promote/sso/saml.html)
- [saml](/promote/sso/saml.html)
- [saml](/promote/sso/saml.html)
- [saml](/promote/sso/saml.html)
