# 宏任务 & 微任务

|     | 宏任务                                                                                                                     | 微任务                                                    |     |
| --- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --- |
|     | 由宿主发起。                                                                                                               | 由 js 引擎发起。                                          |     |
|     | setTimeout, setInterval, postMessage, MessageChannel, setImmediate (node 环境)                                             | Promise, MutationObserver, process.nextTick （node 环境） |     |
|     | 用户交互，网络请求，定时器 setTimeout/setInterval，dom 变化（增加、删除、属性改变），跨窗口通信（如 postMessage），js 脚本 |                                                           |     |
|     |                                                                                                                            |                                                           |     |
|     |                                                                                                                            |                                                           |     |
|     |                                                                                                                            |                                                           |     |

## 执行顺序

`[宏任务[微任务]][宏任务[微任务]][宏任务[微任务]]`

promise 中使用 setTimeout 会在宏任务队列中增加一项。
promise 会在定义时立即运行。
