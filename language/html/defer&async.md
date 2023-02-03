## defer&async

|        | 无修饰                     | defer                                                                                                                                           | async                                              |
| ------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
|        | 读取并执行该 script 标签。 | 向用户代理提示该脚本不会生成任何网页内容。用户代理可以继续解析和渲染。在 DOMContentLoaded 执行之前，由上到下依次加载。（即：立即下载/延迟执行） | 异步读取并执行该 script 标签。加载完成后立即执行。 |
|        |                            | 立即下载/延迟执行                                                                                                                               | 加载完成后立即执行                                 |
| 默认值 |                            | true                                                                                                                                            | true                                               |
|        |                            | 都是 script 标签的属性                                                                                                                          | 都是 script 标签的属性                             |

dom 文档加载步骤

1. 解析 html 结构
2. 加载外部脚本/样式表
3. 解析并执行脚本代码
4. dom 树构建完成 // rendy--DOMContentLoaded
5. 加载 html 和 css 中引用的外部资源文件
6. 页面加载完成 // load
   $(document).ready() // (function() {})
   在 no.4 后执行。
   多编写多个。都可执行。
   window.onload // $(window).load(function () {...})
   在 no.6 后执行。
   若编写多个，则只执行最后一个。

## 在浏览器中使用 esmascript

`type=module` 1. 被当做 inline / external 脚本处理。 2. import 支持 4 种路由：url / `/` / `./` / `../`，其它的不支持。 3. nomodule 向后兼容。
` <script type="module" src="module.mjs"></script> <script nomodule src="fallback.js"></script> `
若浏览器支持`type=module`则使用 module.mjs，否则使用 fallbakc.js。

    4. 默认使用`defer`。行内script也是defer。
    5. 若多次引入同一文件，则只执行一次。因为esm规范是传址引用。
    6. 总是cors。需要设置`Access-Control-Allow-Origin: *`等字段。
    7. 旧浏览器不会执行credential same-origin cookies
    	新浏览器发送cookie
    8. 必须使用指定的`MIME types`: `text/javascript`
