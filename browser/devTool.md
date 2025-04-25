# 开发者工具

> f12

# elements

# console

# sources

# network

# application

# performance insights

# lighthouse

# performance

# memory

# security

# recorder

# redux

# components

# profiler

# vue

# 性能相关

- [web-vitals]()

# 性能指标

|                 |                                |                                                                                                                                                                                                                                                                                           |                        |     |
| --------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | --- |
| lcp             |                                | 显示最⼤内容元素所需时间                                                                                                                                                                                                                                                                  | 衡量⽹站初次载⼊速度   |     |
| fid             |                                | ⾸次输⼊延迟时间                                                                                                                                                                                                                                                                          | 衡量⽹站互动顺畅程度   |     |
| cls             |                                | 累计版⾯配置移转                                                                                                                                                                                                                                                                          | 衡量⽹⻚元件视觉稳定性 |     |
| fp              |                                | responseStart - navigationStart                                                                                                                                                                                                                                                           |                        |     |
| 重定向耗时      |                                | redirectEnd - redirectStart                                                                                                                                                                                                                                                               |                        |     |
| nds 查询耗时    |                                | domainLookupEnd - domainLookupStart                                                                                                                                                                                                                                                       |                        |     |
| tcp 链接耗时    |                                | connectEnd - connectStart                                                                                                                                                                                                                                                                 |                        |     |
| http 请求耗时   |                                | responseEnd - responseStart                                                                                                                                                                                                                                                               |                        |     |
| 解析 dom 树耗时 |                                | domComplete - domInteractive                                                                                                                                                                                                                                                              |                        |     |
| dom ready 时间  |                                | domContentLoadedEventEnd - navigationStart                                                                                                                                                                                                                                                |                        |     |
| onload          | loadEventEnd - navigationStart |                                                                                                                                                                                                                                                                                           |                        |     |
| dcl             | domContentLoaded               | 表示 HTML 文档加载完成事件。当初始 HTML 文档完全加载并解析之后触发，无需等待样式、图片、子 frame 结束。作为明显的对比，load 事件是当个页面完全被加载时才触发。                                                                                                                            |                        |     |
| fp              | first paint                    | 首屏绘制，页面刚开始渲染的时间。                                                                                                                                                                                                                                                          |                        |     |
| fcp             | first contentfulPaint          | 首屏内容绘制，首次绘制任何文本，图像，非空白 canvas 或 SVG 的时间点。                                                                                                                                                                                                                     |                        |     |
| fmp             | first meaningfulPaint          | 首屏有意义的内容绘制，这个“有意义”没有权威的规定，本质上是通过一种算法来猜测某个时间点可能是 FMP。有的理解为是最大元素绘制的时间，即同 LCP（Largest ContentfulPaint）。其中 FP、FCP、FMP 是同一条虚线，三者时间不一致。比如首次渲染过后，有可能出现 JS 阻塞，这种情况下 FCP 就会大于 FP。 |                        |     |
| l               | onload                         | 页面所有资源加载完成事件。                                                                                                                                                                                                                                                                |                        |     |
| lcp             | largest content paint          | 最大内容绘制，页面上尺寸最大的元素绘制时间。                                                                                                                                                                                                                                              |                        |     |

# performance

浏览器的对象

```
// 获取 performance 数据
var performance = {
    // memory 是非标准属性，只在 Chrome 有
    // 我有多少内存
    memory: {
        usedJSHeapSize:  16100000, // JS 对象（包括V8引擎内部对象）占用的内存，一定小于 totalJSHeapSize
        totalJSHeapSize: 35100000, // 可使用的内存
        jsHeapSizeLimit: 793000000 // 内存大小限制
    },

    // 我从哪里来？
    navigation: {
        redirectCount: 0, // 如果有重定向的话，页面通过几次重定向跳转而来
        type: 0           // 0   即 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
                          // 1   即 TYPE_RELOAD       通过 window.location.reload() 刷新的页面
                          // 2   即 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
                          // 255 即 TYPE_UNDEFINED    非以上方式进入的页面
    },
    //  核心时间相关
    timing: {
        // 在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload 的时间戳，如果无前一个网页 unload ，则与 fetchStart 值相等
        navigationStart: 1441112691935,

        // 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
        unloadEventStart: 0,

        // 和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳
        unloadEventEnd: 0,

        // 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0
        redirectStart: 0,

        // 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0
        redirectEnd: 0,

        // 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
        fetchStart: 1441112692155,

        // DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupStart: 1441112692155,

        // DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupEnd: 1441112692155,

        // HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间
        connectStart: 1441112692155,

        // HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间
        // 注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过
        connectEnd: 1441112692155,

        // HTTPS 连接开始的时间，如果不是安全连接，则值为 0
        secureConnectionStart: 0,

        // HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存
        // 连接错误重连时，这里显示的也是新建立连接的时间
        requestStart: 1441112692158,

        // HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
        responseStart: 1441112692686,

        // HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
        responseEnd: 1441112692687,

        // 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
        domLoading: 1441112692690,

        // 完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
        // 注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源
        domInteractive: 1441112693093,

        // DOM 解析完成后，网页内资源加载开始的时间
        // 在 DOMContentLoaded 事件抛出前发生
        domContentLoadedEventStart: 1441112693093,

        // DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）
        domContentLoadedEventEnd: 1441112693101,

        // DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件
        domComplete: 1441112693214,

        // load 事件发送给文档，也即 load 回调函数开始执行的时间
        // 注意如果没有绑定 load 事件，值为 0
        loadEventStart: 1441112693214,

        // load 事件的回调函数执行完毕的时间
        loadEventEnd: 1441112693215

    }
}
```

## api

|      |                        |                                                                             |     |     |     |
| ---- | ---------------------- | --------------------------------------------------------------------------- | --- | --- | --- |
| 属性 |                        |                                                                             |     |     |     |
|      | memory                 |                                                                             |     |     |     |
|      | navigation             |                                                                             |     |     |     |
|      | timing                 |                                                                             |     |     |     |
| 方法 |                        |                                                                             |     |     |     |
|      | getEntries()           | 取得所有请求的时间数据                                                      |     |     |     |
|      | getEntriesByName(name) | 取出指定名称的时间数据                                                      |     |     |     |
|      | now()                  | 返回从 performance.time.navigationStart 到当前时间的微秒（ms 的千分之一）值 |     |     |     |
|      |                        |                                                                             |     |     |     |

## title

## title

## title
