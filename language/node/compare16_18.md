# 比较 node 16.19.0 & node 18.20.4

# [git diff](/language/node/gitDiff.html)

申请使用 node v18.20.4 版本（它是 18 版本的最后一个版本）。

# 版本

![release](/language/node/images/release.png)

## 升级的必要性 （是否要写？）

- v16 在 2023.09.11 不再维护。
-

## 应该选择什么样的版本

| 选择                              | 不选择         |
| --------------------------------- | -------------- |
| active / maintenance 阶段的版本。 | current        |
| TLS（偶数）                       | 非 TLS（奇数） |
|                                   |                |
|                                   |                |
|                                   |                |

## 谨申请使用 node v18.20.4 版本（它是 18 版本的最后一个版本）。

# 安全性

解决了 18.18.2- || 20.8.1- 的 6 个问题。（升级到 18.18.2+或 18.18.2+）

- node 依赖的 undici 不能清除跨域+重定向的 cookie.风险点是：使 cookie 泄漏给第三方。
- 在无边界的情况下快速建立和取消数据库连接会造成拒绝服务。
- 当产生新路径时实例不被保护，程序员可以使用操作此实例的属性、方法等。
- fs 包无法使用 Buffer Unit8Array 防止路由。
- 程序员要拦截并伪造总和检查码。风险点是：影响完整性检查。
- 已经插入到 WebAssemble 的代码可以插入 js 代码，这部分 js 代码可以存取 WebAssemble 对象无权限存取的数据、调用无权访问的函数。

增加了测试能力。使用`node:test`实现了类似`mocha`/`jest`的功能。
Node.js 已经宣布成为 OpenSSF Alpha-Omega 项目支持的第一个试点开源社区。
首次在 node 家族中升级 openssl 到 3.0
![openssl security](/language/node/images/opensslsecurity.png)
这是第一个将随着 OpenSSL 3.0 升级到 LTS 的版本。OpenSSL 3.0 是流行且广泛使用的加密库的一个主要的新稳定版本。OpenSSL 包含 SSL 和 TLS 协议的开源实现，它们提供了跨网络安全通信的能力。在其他关键特性中，OpenSSL 3.0 包含一个已提交验证的 FIPS 模块。联邦信息处理标准(FIPS)是由美国政府执行的一组要求，用于管理公共部门的加密使用。
Node.js 团队对安全很重视。精心规划了安全发布过程，有定期的出站通信等等。从 2021 年开始，该公司承诺在安全发布管理员轮值，以确保担任安全管理员的个人能够优先考虑安全发布。

## 为安全的必要库

|                                  |              |                                                                  |     |     |     |
| -------------------------------- | ------------ | ---------------------------------------------------------------- | --- | --- | --- |
| escapsHtml(这是一个方法，不是库) | 转义`&<>'"`  |                                                                  |     |     |     |
|                                  |              |                                                                  |     |     |     |
| csrf                             | 跨站请求伪造 | 利用用户已登录的身份，在用户不知情的情况下进行恶意请求的攻击方式 |     |     |     |
|                                  |              | 防御注入攻击                                                     |     |     |     |
| helmet                           |              | 可以设置多个安全相关的 http 头部的中间件                         |     |     |     |
| rate-limiter-flexible            |              | 限制请求频率。防止暴力破解、ddos 攻击。                          |     |     |     |
|                                  |              |                                                                  |     |     |     |
|                                  |              |                                                                  |     |     |     |
|                                  |              |                                                                  |     |     |     |

为了防御 CSRF 攻击，我们可以使用 CSRF 令牌。

## title

## title

## title

## title

## title

# 稳定性

一句话点评：std lib 在标准化，user lib 在精细化。
v18.20.0 是 LTS 版本。

# 规范

- 放弃 xhr（及相关依赖:http.request()），改为支持 fetch.
- 不久后又推出[undici](https://undici.nodejs.org/#/),可支持 mock 功能。
- 升级后的 v8 支持 intl 规范。v16.19.0 可能使用 9.9 版本 v8。v18.20.0 使用 10.2
- [fetch 规范](https://fetch.spec.whatwg.org/)
- 在推进的规范
  - [json import assertions](https://github.com/tc39/proposal-import-attributes)
  - 继续开发 esm 模块加载器实现。
- 制定了未来 10 年的目标。fetch 代替 xhr 就是此目标的一个表现。
- 升级到 es2023

推荐的 tsconfig 规范

```
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 18",

  "_version": "18.2.0",

  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  }
}
```

较严格的 tsconfig 规范

```
{
  "compilerOptions": {
    "strict": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    "isolatedModules": true,

    "checkJs": true,

    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Strictest",
  "_version": "2.0.0"
}
```

# 使用上差异

node 已经发展很多年，使用规范无变动。使用上无差异。

|              |              |            |     |     |
| ------------ | ------------ | ---------- | --- | --- |
| `aaaaa.bbbb` | `aaaaa.bbbb` | 2022.11.22 |     |     |
|              |              |            |     |     |
|              |              |            |     |     |
|              |              |            |     |     |
|              |              |            |     |     |
|              |              |            |     |     |

# 性能上

在 V8 引擎方面，Node.js 18 采用了最新的 V8 版本，这意味着更快的 JavaScript 执行速度和更好的内存管理。

- 优化 class fields & private class methods 的性能。
-

# 功能上

- 可以使用 es2023 的新功能。如：数组支持 findLast() / findLastIndex()等。
- 可能是为了遵循规范， undici 的很多能力如 Mock，Proxy，Pool 等都没有提供出来。
- 支持 json 模块
- 对 HTTPS 和 HTTP 导入的实验性支持
- 增强安全

## 增加

- 增加了 fetch api(以前使用 xhr)可以全局可用。fetch 方法返回的是 promise 对象。抹平了浏览器与服务器的差异，可以快速、简单地发 http 请求。
- 增加了 Event / EventTarget 的实例
- 预设会设定服务的 Timeout。如：headersTimeout:读取 http header 超过 60s 时会中断连接。requestTimeout：处理请求超过 5min 后会中断连接。
- 增加 Blob 对象
- 增加 BroadcastChannel 类（基于 EventTarget），可用于线程间通信。
- 增加 Web Crypo api.
- 增加 `node:test`

## 弃用

```
fs.write()
fs.writeFile()
fs.appendFile()
fs.writeFileSync()
fs.appendFileSync()
```

# 被 npm 包依赖的统计结果

# 可扩展性

# 相关生态要求 18+

# 对 node 所在环境的要求

- linux 版是在 RHEL8 上构建的，要求 glibc 2.28 以上版本。
- macOS 要求 10.15 以上版本。
- Windows 很多旧版本也不支持了。

# 升级后的收益

# 参考文献

- [Node.js 18 新特性解读](https://zhuanlan.zhihu.com/p/502951532)
- [fetch 规范](https://fetch.spec.whatwg.org/)
- [faster-class-features](https://v8.dev/blog/faster-class-features)
- [v8 引擎](https://v8.dev/docs/version-numbers)
- [Node.js 18 Released With Improved Security, Fetch API, and Next-10 Strategic Initiatives](https://openjsf.org/blog/nodejs-18-released)
- [node next-10](https://github.com/nodejs/next-10)
- [openssf](https://openssf.org/about/)
- [openssl 3.0](https://www.openssl.org/docs/man3.0/man7/migration_guide.html)
- [node.green](https://node.green/#ES2023)
- [Centralized Recommendations for TSConfig bases](https://github.com/tsconfig/bases)
- [node v18 deprecated api](https://nodejs.org/docs/latest-v18.x/api/deprecations.html)
- [node v18 deprecated api](https://nodejs.org/docs/latest-v17.x/api/deprecations.html)
- [Node.js 18 发行注记](https://docs.redhat.com/zh_hans/documentation/red_hat_build_of_node.js/18/html-single/release_notes_for_node.js_18/index#idm140606201696848)
- [Node.js 18 新特性解读](https://zhuanlan.zhihu.com/p/502951532)
- [Node.js 18 新特性解读](https://zhuanlan.zhihu.com/p/502951532)
- [Node.js 18 新特性解读](https://zhuanlan.zhihu.com/p/502951532)

# 附录

- 超市里原来有 v18.12.0 v19.0.0
- 16 版將於 2023-09-11 過期
- [openssh & openssl & openssf](/language/node/opensshopensslopenssf.html)

# 版本迭代

| 版本号  | 发布日     | 修正问题                                                                                                                  | 增加功能 |     |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- | -------- | --- |
| 18.12.0 | 2022.11.22 | -                                                                                                                         | -        |     |
| 18.15.0 | 2023.07.11 | 安全性弱点 CVE-2023-23918、CVE-2023-23919、CVE-2023-23920、CVE-2023-23936、CVE-2023-24807                                 | -        |     |
| 18.18.2 | 2024.01.02 | 安全性弱点 CVE-2023-44487、CVE-2023-45143、CVE-2023-38552、CVE-2023-39333、CVE-2023-32002、CVE-2023-32006、CVE-2023-32559 | -        |     |

(只列出 TLS 版本)

|          |            |                                                                                                                                                  |     |     |
| -------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --- | --- |
| v18.20.4 | 2024.07.08 | CVE-2024-36138 - Bypass incomplete fix of CVE-2024-27980 (High)                                                                                  |     |     |
|          |            | CVE-2024-22020 - Bypass network import restriction via data URL (Medium)                                                                         |     |     |
| v18.20.3 | 2024.05.21 | 更新依赖                                                                                                                                         |     |     |
| v18.20.2 | 4024.04.10 | CVE-2024-27980 - Command injection via args parameter of child_process.spawn without shell option enabled on Windows                             |     |     |
| v18.20.1 |            | CVE-2024-27983 - Assertion failed in node::http2::Http2Session::~Http2Session() leads to HTTP/2 server crash- (High)                             |     |     |
|          |            | CVE-2024-27982 - HTTP Request Smuggling via Content Length Obfuscation - (Medium)                                                                |     |     |
|          |            | 更新依赖                                                                                                                                         |     |     |
| v18.20.0 | 2024.03.26 | 支持 import                                                                                                                                      |     |     |
| v18.19.1 | 2024.02.14 | CVE-2024-21892 - Code injection and privilege escalation through Linux capabilities- (High)                                                      |     |     |
|          |            | CVE-2024-22019 - http: Reading unprocessed HTTP request with unbounded chunk extension allows DoS attacks- (High)                                |     |     |
|          |            | CVE-2023-46809 - Node.js is vulnerable to the Marvin Attack (timing variant of the Bleichenbacher attack against PKCS#1 v1.5 padding) - (Medium) |     |     |
|          |            | CVE-2024-22025 - Denial of Service by resource exhaustion in fetch() brotli decoding - (Medium)                                                  |     |     |
|          |            | 升级 undici、npm                                                                                                                                 |     |     |
| v18.19.0 | 2023.11.29 | 升级 npm 到 v10                                                                                                                                  |     |     |
| v18.18.2 | 2023.10.13 | CVE-2023-44487: nghttp2 Security Release (High)                                                                                                  |     |     |
|          |            | CVE-2023-45143: undici Security Release (High)                                                                                                   |     |     |
|          |            | CVE-2023-38552: Integrity checks according to policies can be circumvented (Medium)                                                              |     |     |
|          |            | CVE-2023-39333: Code injection via WebAssembly export names (Low)                                                                                |     |     |
| v18.18.1 | 2023.10.10 | (Windows) FS can not handle certain characters in file name #48673                                                                               |     |     |
|          |            | 18 and 20 node images give error - Text file busy (after re-build images) nodejs/docker-node#1968                                                |     |     |
|          |            | libuv update in 18.18.0 breaks webpack's thread-loader #49911                                                                                    |     |     |
|          |            | 升级 libuv                                                                                                                                       |     |     |
| v18.18.0 | 2023.09.18 | --                                                                                                                                               |     |     |
| v18.17.1 | 2023.08.09 | CVE-2023-32002: Policies can be bypassed via Module.\_load (High)                                                                                |     |     |
|          |            | CVE-2023-32006: Policies can be bypassed by module.constructor.createRequire (Medium)                                                            |     |     |
|          |            | CVE-2023-32559: Policies can be bypassed via process.binding (Medium)                                                                            |     |     |
| v18.17.0 | 2023.07.18 | crypto: update root certificates to NSS 3.89 (Node.js GitHub Bot) #47659                                                                         |

dns: (SEMVER-MINOR) expose getDefaultResultOrder (btea) #46973
doc: add ovflowd to collaborators (Claudio Wunder) #47844
add KhafraDev to collaborators (Matthew Aitken) #47510
events: (SEMVER-MINOR) add getMaxListeners method (Matthew Aitken) #47039
fs: (SEMVER-MINOR) add support for mode flag to specify the copy behavior (Tetsuharu Ohzeki) #47084
(SEMVER-MINOR) add recursive option to readdir and opendir (Ethan Arrowood) #41439
(SEMVER-MINOR) add support for mode flag to specify the copy behavior (Tetsuharu Ohzeki) #47084
(SEMVER-MINOR) implement byob mode for readableWebStream() (Debadree Chatterjee) #46933
http: (SEMVER-MINOR) prevent writing to the body when not allowed by HTTP spec (Gerrard Lindsay) #47732
(SEMVER-MINOR) remove internal error in assignSocket (Matteo Collina) #47723
(SEMVER-MINOR) add highWaterMark opt in http.createServer (HinataKah0) #47405
lib: (SEMVER-MINOR) add webstreams to Duplex.from() (Debadree Chatterjee) #46190
(SEMVER-MINOR) implement AbortSignal.any() (Chemi Atlow) #47821
module: change default resolver to not throw on unknown scheme (Gil Tayar) #47824
node-api: (SEMVER-MINOR) define version 9 (Chengzhong Wu) #48151
(SEMVER-MINOR) deprecate napi_module_register (Vladimir Morozov) #46319
stream: (SEMVER-MINOR) preserve object mode in compose (Raz Luvaton) #47413
(SEMVER-MINOR) add setter & getter for default highWaterMark (#46929) (Robert Nagy) #46929
test: unflake test-vm-timeout-escape-nexttick (Santiago Gimeno) #48078
test_runner: (SEMVER-MINOR) add shorthands to test (Chemi Atlow) #47909
(SEMVER-MINOR) support combining coverage reports (Colin Ihrig) #47686
(SEMVER-MINOR) execute before hook on test (Chemi Atlow) #47586
(SEMVER-MINOR) expose reporter for use in run api (Chemi Atlow) #47238
tools: update LICENSE and license-builder.sh (Santiago Gimeno) #48078
url: (SEMVER-MINOR) implement URL.canParse (Matthew Aitken) #47179
wasi: (SEMVER-MINOR) no longer require flag to enable wasi (Michael Dawson) #47286|||
|v18.16.1|2023.06.20|CVE-2023-30581: mainModule.**proto** Bypass Experimental Policy Mechanism (High)
CVE-2023-30585: Privilege escalation via Malicious Registry Key manipulation during Node.js installer repair process (Medium)
CVE-2023-30588: Process interuption due to invalid Public Key information in x509 certificates (Medium)
CVE-2023-30589: HTTP Request Smuggling via Empty headers separated by CR (Medium)
CVE-2023-30590: DiffieHellman does not generate keys after setting a private key (Medium)
OpenSSL Security Releases
OpenSSL security advisory 28th March.
OpenSSL security advisory 20th April.
OpenSSL security advisory 30th May
c-ares vulnerabilities:
GHSA-9g78-jv2r-p7vc
GHSA-8r8p-23f3-64c2
GHSA-54xr-f67r-4pc4
GHSA-x6mf-cxr9-8q6v|||
|v18.16.0|2023.04.12|Add initial support for single executable applications|||
|||Replace url parser with Ada|||
|||buffer:
(SEMVER-MINOR) add Buffer.copyBytesFrom(...) (James M Snell) #46500
doc:
add marco-ippolito to collaborators (Marco Ippolito) #46816
add debadree25 to collaborators (Debadree Chatterjee) #46716
add deokjinkim to collaborators (Deokjin Kim) #46444
events:
(SEMVER-MINOR) add listener argument to listenerCount (Paolo Insogna) #46523
lib:
(SEMVER-MINOR) add AsyncLocalStorage.bind() and .snapshot() (flakey5) #46387
(SEMVER-MINOR) add aborted() utility function (Debadree Chatterjee) #46494
src:
(SEMVER-MINOR) allow optional Isolate termination in node::Stop() (Shelley Vohr) #46583
(SEMVER-MINOR) allow embedder control of code generation policy (Shelley Vohr) #46368
stream:
(SEMVER-MINOR) add abort signal for ReadableStream and WritableStream (Debadree Chatterjee) #46273
tls:
(SEMVER-MINOR) support automatic DHE (Tobias Nießen) #46978
url:
(SEMVER-MINOR) implement URLSearchParams size getter (James M Snell) #46308
worker:
(SEMVER-MINOR) add support for worker name in inspector and trace_events (Debadree Chatterjee) #46832|||
|v18.15.0|2023.03.07|--|||
|v18.14.2|2023.02.21|升级 npm 到 9.5.0|||
|v18.14.1|2023.02.16|CVE-2023-23918: Node.js Permissions policies can be bypassed via process.mainModule (High)|||
|||CVE-2023-23919: Node.js OpenSSL error handling issues in nodejs crypto library (Medium)|||
|||CVE-2023-23936: Fetch API in Node.js did not protect against CRLF injection in host headers (Medium)|||
|||CVE-2023-24807: Regular Expression Denial of Service in Headers in Node.js fetch API (Low)|||
|||CVE-2023-23920: Node.js insecure loading of ICU data through ICU_DATA environment variable (Low)|||
|v18.14.0|2023.02.02|升级 npm 到 9.3.1|||
|||doc:
add parallelism note to os.cpus() (Colin Ihrig) #45895
http:
join authorization headers (Marco Ippolito) #45982
improved timeout defaults handling (Paolo Insogna) #45778
stream:
implement finished() for ReadableStream and WritableStream (Debadree Chatterjee) #46205|||
|v18.13.0|2023.01.05|Add support for externally shared js builtins|||
|||Introduce File|||
|||Support function mocking on Node.js test runner|||
|||build:
disable v8 snapshot compression by default (Joyee Cheung) #45716
crypto:
update root certificates (Luigi Pinca) #45490
deps:
update ICU to 72.1 (Michaël Zasso) #45068
doc:
add doc-only deprecation for headers/trailers setters (Rich Trott) #45697
add Rafael to the tsc (Michael Dawson) #45691
deprecate use of invalid ports in url.parse (Antoine du Hamel) #45576
add lukekarrys to collaborators (Luke Karrys) #45180
add anonrig to collaborators (Yagiz Nizipli) #45002
deprecate url.parse() (Rich Trott) #44919
lib:
drop fetch experimental warning (Matteo Collina) #45287
net:
(SEMVER-MINOR) add autoSelectFamily and autoSelectFamilyAttemptTimeout options (Paolo Insogna) #44731
src:
(SEMVER-MINOR) add uvwasi version (Jithil P Ponnan) #45639
(SEMVER-MINOR) add initial shadow realm support (Chengzhong Wu) #42869
test_runner:
(SEMVER-MINOR) add t.after() hook (Colin Ihrig) #45792
(SEMVER-MINOR) don't use a symbol for runHook() (Colin Ihrig) #45792
tls:
(SEMVER-MINOR) add "ca" property to certificate object (Ben Noordhuis) #44935
remove trustcor root ca certificates (Ben Noordhuis) #45776
tools:
update certdata.txt (Luigi Pinca) #45490
util:
add fast path for utf8 encoding (Yagiz Nizipli) #45412
improve textdecoder decode performance (Yagiz Nizipli) #45294
(SEMVER-MINOR) add MIME utilities (#21128) (Bradley Farias) #21128|||
|v18.12.1|2022.11.03|CVE-2022-3602: X.509 Email Address 4-byte Buffer Overflow (High)|||
|||CVE-2022-3786: X.509 Email Address Variable Length Buffer Overflow (High)|||
|||CVE-2022-43548: DNS rebinding in --inspect via invalid octal IP address (Medium)|||
|v18.12.0|2022.10.25|进入 TLS 版本，命名为 Hydrogen|||
|v18.0.0 - v18.11.0|是 current 版本，不统计。||||
|v17.x.x|不是 TLS 版本，不统计。||||
|v16.20.2|2023.08.09|CVE-2023-32002: Policies can be bypassed via Module.\_load (High)|||
|||CVE-2023-32006: Policies can be bypassed by module.constructor.createRequire (Medium)|||
|||CVE-2023-32559: Policies can be bypassed via process.binding (Medium)|||
|v16.20.1|2023.06.20|CVE-2023-30581: mainModule.**proto** Bypass Experimental Policy Mechanism (High)|||
|||CVE-2023-30585: Privilege escalation via Malicious Registry Key manipulation during Node.js installer repair process (Medium)|||
|||CVE-2023-30588: Process interuption due to invalid Public Key information in x509 certificates (Medium)|||
|||CVE-2023-30589: HTTP Request Smuggling via Empty headers separated by CR (Medium)|||
|||CVE-2023-30590: DiffieHellman does not generate keys after setting a private key (Medium)|||
|v16.20.0|2023.03.29|更新依赖|||
|v16.19.1|2023.02.16|CVE-2023-23918: Node.js Permissions policies can be bypassed via process.mainModule (High)|||
|||CVE-2023-23919: Node.js OpenSSL error handling issues in nodejs crypto library (Medium)|||
|||CVE-2023-23920: Node.js insecure loading of ICU data through ICU_DATA environment variable (Low)|||
||||||
||||||
||||||
||||||
||||||
||||||
||||||
||||||
||||||
||||||
