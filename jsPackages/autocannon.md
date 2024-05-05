# autocannon

## overview

> node 环境的压力测试工具。
> 支持 cli & js
> 基于 worker 工作。可以为 worker 传入 js 文件的路径。
> autocannon 实例是基于 EventEmitter 的。

### feature

- feature0
- feature1
- feature2

## install

`npm i autocannon`

## usage

### cli

```
autocannon [opts] url
url是合法的http(s)的url。
支持环境变量中的端口号。如'http://localhost:$PORT/path'

opts:
-c/--connections N 连接数
-p/--pipelining  N 在每个管道中的语境数量
-d/--duration    秒 运行时间
-a/--amount      N 请求总数。优先级大于duration
-L               N
-S/--socketPath
-w/--workers     N workers线程的数量
-W/--warmup
--on-port
-m/--method      METHOD 请求方式。默认'GET'
-t/--timeout     N秒 达到打时长时未连接成功，则重试。默认为10
-b/--body        BODY 请求体。
-F/--form        FORM 用于上传form (multipart/form-data)
-i/--input       FILE 与请求体有关
-H/--headers     k=v
--har            FILE http archive (har) format
-B/--bailout     N
-M/--maxConnectionRequest N 每个连接的最大请求数量
-O/--maxOverallRequest    N 所有请求的总数
-r/--connectionRate       N 每秒最大请求数
-R/--overallRate          N 每秒最大请求数
-C/--ignoreCoordinatedOmission
-D/--reconnectRate        N 最大重新连接次数
-n/--no-progress B 是否不显示进度条 默认false
-l/--latency     B 是否列出潜在数据 默认false
-I/--idReplacement
-j/--json        B 是否以json格式输出内容。内容是进度条和不渲染的结果。默认false
-f/--forever
-s/--servername
-x/--excludeErrroStats
-E/--expectBody  EXPECTED
--renderStatusCodes   渲染回馈状态
--cert           cert chain的路径。pem格式
--key            pem的私钥路径
--ca             ca证书的路径
--debug          输出连接失败和错误
-v/--version
-V/--verbose
-h/--help
```

### js

```js
const autocannon = require('autocannon')
autocannon(
  {
    url: 'http://localhost:3000',
    connections: 10,
    pipelining: 10,
    duration: 10,
  },
  console.log
)
async function foo() {
  let result = await autocannon({
    url: 'http://localhost:3000',
    connections: 10,
    pipelining: 10,
    duration: 10,
  })
  console.log(result)
}
// 若有第二个参数，则使用回调方式处理。否则返回promise对象。
```

#### opts

<!-- prettier-ignore-start -->
|                           | 是否必填     | 默认值 | 说明               | 类型    |
| ------------------------- | ------------ | ------ | ------------------ | --- |
| url                       | 必填         |        |                    |     |
| socketPath                |              |        |                    |     |
| workers                   |              |        | 线程数             |     |
| connections               |              | 10     | 连接数             |     |
| duration                  |              | 10     | 持续秒数           |     |
| amount                    |              |        | 请求总次数，有它会忽略duration          |     |
| sampleInt                 |              |        |                    |     |
| timeout                   |              | 10      | 请求的超时时间，单位s                   |     |
| pipelining                |              |        |                    |     |
| bailout                   |              |        |                    |     |
| method                    |              |        | 请求方式，大写。                   |     |
| title                     |              |        |                    |     |
| body                      |              |        |                    | string    |
| form                      |              |        |                    |     |
| headers                   |              |        |                    |     |
| initialContext            |              |        |                    |     |
| setupClient               |              |        |                    |     |
| verifyBody                |              |        | 验证返回体是否正确。会记入result.mismatches                   | function 或 js（ts）文件路径    |
| maxConnectionRequest      |              |        | 每个连接的最大请求数量。                   |     |
| maxOverallRequests        |              |        |                    |     |
| connectionRate            |              |        |  每个连接最大qps                  |     |
| overallRate               |              |        |                    |     |
| ignoreCoordinatedOmission |              |        |                    |     |
| reconnectRate             |              |        |                    |     |
| requests                  |              |        | object[] |     |
|                           | body         |        | 请求体，(同时设置headers中的'Content-Type': 'application/json')                   |     |
|                           | headers      |        |                    |     |
|                           | method       |        |                    |     |
|                           | path         |        |                    |     |
|                           | setupRequest |        |                    |     |
|                           | onResponse   |        |                    |     |
| har                       |              |        |                    |     |
| idReplacement             |              |        |                    |     |
| forever                   |              |        |                    |     |
| servername                |              |        |                    |     |
| excludeErrorStats         |              |        |                    |     |
| expectBody                |              |        |                    |     |
| tlsOptions                |              |        |                    |     |
| skipAggregateResult       |              |        |                    |     |
<!-- prettier-ignore-end -->

## 解读结果

<!-- prettier-ignore-start -->
| stat    | 2.5%   | 50%    | 97.5%  | 99.5%  | Avg    | Stdev  | Max    |
| ------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Latency | 极小值 | 平常值 | 极大值 | 极大值 | 平均值 | 标准差 | 最大值 |

| stat                       | 1%  | 2.5%   | 50%    | 97.5%  | 99.5%  | Avg    | Stdev  | Max    |
| -------------------------- | --- | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Req/Sec 每秒的请求数       |     | 极小值 | 平常值 | 极大值 | 极大值 | 平均值 | 标准差 | 最大值 |
| Bytes/Sec 每秒的下载字节数 |     | 极小值 | 平常值 | 极大值 | 极大值 | 平均值 | 标准差 | 最大值 |
|                            |     |        |
<!-- prettier-ignore-end -->

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|autocannon.track(instance[, opts])|instance||跟踪进程|||||||
||opts.outputStream|输入流||process.stderr||||||
||opts.renderProgressBar|是否渲染进度条|true|||||||
||opts.renderResultsTable|是否以表格方式显示结果|true|||||||
||opts.renderLatencyTable|是否渲染潜在数据|false|||||||
||opts.progressBarString|进度条的文本模板|`'running [:bar] :percent'`|||||||
|autocannon.printResult(resultObject[, opts])|||列出结果|||||||
||opt.outputStream|||process.stderr||||||
||opt.renderResultsTable|||true||||||
||opt.renderLatencyTable|||true||||||
|autocannon.aggregateResult(reuslts[, opts])||||||||||
||opts.url||url必填|||||||
||opts.title||||undefined|||||
||opts.socketPath|||||||||
||opts.connections||||10|||||
||opts.sampleInt||||1|||||
||opts.pipelining||||1|||||
||opts.workers||||undefined|||||

|事件||||||||||
|autocannon.start||||||||||
|autocannon.tick||||||||||
|autocannon.done||||||||||
|autocannon.response||||||||||
||response.client||||||||||
||response.statusCode||||||||||
||response.resBytes||||||||||
||response.responseTime||||||||||
|autocannon.reqError||||||||||
|autocannon.error||||||||||
|result|autocannon方法的返回值|||||||||
|result.title||||||||||
|result.url||||||||||
|result.socketPath||||||||||
|result.requests|||每秒的请求次数直方图。|||||||
|result.latency|||回馈时长的详情的直方图。单位是ms。|||||||
|result.throughput|||回馈体大小的直方图。每秒一次。单位是B|||||||
|result.duration||||||||||
|result.errors||||||||||
|result.timeouts||||||||||
|result.mismatches||||||||||
|result.start||||||||||
|result.finish||||||||||
|result.connections||||||||||
|result.pipelining||||||||||
|result.non2xx||||||||||
|result.resets||||当setupRequest返回false时，该请求管道被重置的次数。||||||
|result.statusCodeStats||||每个状态码的回馈次数||||||
|result.min||||||||||
|result.max||||||||||
|result.average||||||||||
|result.stddev||||||||||
|result.p*|p2-5/p50/p75/p90/p97_5/p99/p99_9/p99_99/p99_999|||||||||
|client||||||||||
|client.setHeaders(headers)||||||||||
|client.setBody(body)||||||||||
|client.setHeadersAndBody(headers, body)||||||||||
|client.setRequest(request)||||||||||
|client.setRequest(newRequests)||||||||||
|client的event||||||||||
|client.headers||||||||||
|client.body||||||||||
|client.response||||||||||
||response.statusCode|||||||||
||response.resBytes|||||||||
||response.responseTime|||||||||
|client.reset||||||||||
<!-- prettier-ignore-end -->

```
let autocannon = require('autocannon')
let instance = autocannon({url: 'xxx'}, console.log)
process.once('SIGINT', () => {instance.stop})
autocannon.track(instance, {renderProgressBar: false})
```

`autocannon.fn(param, first: string, second: boolean = true) => void`
description

`autocannon.fn(param, [options: {a: string, b?: number}])`
description

## demo

```
autocannon -c 1 -a 1 -d 1 -m POST  --header 'Content-Type: application/json' -b  '{"username": "USER_NAME","pass": "PASS_123"}' -j http://localhost:3000/users

let autocannon = require('autocannon')
let clog = console.log
autocannon({
    url: 'http://localhost:3000',
    connections: 1,
    amount: 1,
    duration: 1,
    requests: [
        {
            method: 'POST',
            path: '/users',
            headers: {
                'x-k': 'x-v',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({krsdfg: 212345}),
            setupRequest: (request, context) => {
                clog(request, context)
                return request
            },
            onResponse: (...rest) => {
                clog('rest', rest)
            }
        }
    ]
}, clog)

```

## principle

此包的处理逻辑。
autocannon 方法支持回调和 promise。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
