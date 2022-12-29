## 1. 减少 HTTP 请求。

只用 10%-20%的用户响应时间在下载 html 文档。其余的 80%-90%时间花在下载页面中的所有组件上。

CSSSprites 在国内很多人叫 css 精灵，是一种网页图片应用处理方式。它允许你将一个页面涉及到的所有零星图片都包含到一张大图中去，这样一来，当访问该页面时，载入的图片就不会像以前那样一幅一幅地慢慢显示出来了。对于当前网络流行的速度而言，不高于 200KB 的单张图片的所需载入时间基本是差不多的，所以无需顾忌这个问题。

内联图片。 使用 data.

合并脚本和样式表。

## 2. 使用内容发布系统。（cdn）

常用的 cdn 服务提供商。

> 1. Akamai
> 2. Mirror Image
> 3. Limelight
> 4. SAVVIS
> 5. jsdevlivr

从 cdn 服务器上加载来的组件比在单个 web 服务器上的加载速度快 18%.

## 3. 添加 Expires 头。

告诉 web 客户端它可以使用一个组件的当前副本。直到指定的时间为止。  
也可以使用 Cache-Control 的 max-age 指令指定组件可以缓存多久。

## 4. 压缩组件。

client => server 使用 Accpet-Encoding: gzip deflate

一般用于 html, xml, json, css, js
一般不用于 图片，pdf，小于 2k 的文件  
压缩后请求量可以减少约 70%。

## 5. 将样式文件放在顶部。

无样式内容的闪烁。

## 6. 将脚本文件放在底部。

并行下载

    about:config 中设置 network.http.maxpersistent-connections-per-server

## 7. 避免 css 表达式。

    body {
        background-color: expression( (new Date()).getSeconds()%2 ? "#B8D4FF" : "#F08A00" );
    }

经测试后发现不能使用。

## 8. 使用外部 js/css.

内联比外联快 30%~50%.  
内联不可被缓存。外联可被缓存。

1. 每个页面单独一个 css/js.
2. 所有页面全使用一个 css/js.
3. 一类页面使用一个 css/js.

动态内联。

## 9. 减少 dns 查找。

dns(Domain Name System)  
浏览器查找一个给定的主机名的 ip 地址需要 20-120ms。  
ttl(Time-to-live)存活时间  
（这一条和上面的第 2 条有冲突。我也不知道如何解决。）

## 10. 精简 js/css.

1. 精简 （从代码中移除不必要的字符以减小其大小）
2. 混淆 （移除注释和空白）
3. 节省 （使用工具 JSMin 等）

## 11. 避免重定向。

重写向会使网页变慢。

    // 这是重定向的写法。
    <meta http-equiv="refresh" content="0; url=http://stevesouders.com/newuri">

在重定向完毕并且 HTML 文档下载完毕之前，没有任何东西显示给用户。  
重定向会延迟整个 html 文档的传输。

1. 缺少结尾的斜线。
2. 连接网站。
3. 跟踪内部流量。
4. 跟踪出站流量。
5. 美化 url.

## 12. 移除重复脚本。

害处。

1. 页面加载变慢。
2. 会产生多次加载。

解决方法。

1. 使用脚本管理模块。
2. 在 php 中创建一个方法。用来判断是否已经加载。

## 13. 配置 Etag.

ETag(Entity Tag)  
web 服务器和浏览器确认缓存组件的有效性的一种机制。

## 14. 使 Ajax 可缓存。
