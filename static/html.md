# html
- HTML 指的是超文本标记语言 (Hyper Text Markup Language)
- HTML 不是一种编程语言，而是一种标记语言 (markup language)
- 标记语言是一套标记标签 (markup tag)
- HTML 使用标记标签来描述网页
- 它在浏览器中有自己默认样式
- 明确规定需要成对出现，即：开始标签+闭合标签。但是仍有一些标签是自闭合的。因为这些标义，不应该包含非特定的内容。如：`img`它是图片域标签。它是自闭合标签，它只能处理图片，不应该包含非图片内容。`br`是拆行标签。它是自闭合标签，它只能拆行，不应该包含非拆行内容。html语言为了防止包含不正确内容的错误，设置了自闭合标签。
- 若无闭合标签，则浏览器会尝试补全标签
- 块级标签是默认独占一行的标签
- 行内标签是默认非独占一行的标签
- 行内标签不包含块级标签
- 有些标签不可互相嵌套。如p不可嵌套div
- 标签语义化可以方便程序员、浏览器、辅助设备
- 不区分大小写
- 每个标签有自己的特性。应根据标签的特性、业务需要选择合适的标签。

# html & css & javascript
- html就像筋骨
- css就像衣服
- javascript（js）就像本领

html为js支持很多前提条件。如：
- 使用canvas支持js绘制图像。
- 使用Geolocation支持获取地理位置。
- 使用draggable支持js拖放dom元素。

# 属性
- 使用`key="value"`形式书写在开始标签内。
- 常用`class id style PROP`

# 标题
- h1 - h6
- 拥有默认样式

# 格式化功能的标签
||||
|-|-|-|
|`<b>`|定义粗体文本。|
|`<big>`|定义大号字。|
|`<em>`|定义着重文字。|类似斜体|
|`<i>`|定义斜体字。|
|`<small>`|定义小号字。|
|`<strong>`|定义加重语气。|
|`<sub>`|定义下标字。|
|`<sup>`|定义上标字。|
|`<ins>`|定义插入字。|加了下划线|
|`<del>`|定义删除字。|
|`<code>`|  定义计算机代码。|
|`<kbd>`|   定义键盘码。|
|`<samp>`|  定义计算机代码样本。|
|`<tt>`|    定义打字机代码。|
|`<var>`|   定义变量。|
|`<pre>`|   定义预格式文本。|pre 元素可定义预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。标签的一个常见应用就是用来表示计算机的源代码。|
|`<abbr>`|  定义缩写。||
|`<acronym>`|   定义首字母缩写。|HTML5 中不支持 `<acronym>` 标签。请使用 `<abbr>` 标签代替。|
|`<address>`|   定义地址。||
|`<bdo>`|   定义文字方向。|`<bdo dir="rtl">Here is some text</bdo>`|
|`<blockquote>`|    定义长的引用。||
|`<q>`| 定义短的引用语。||
|`<cite>`|  定义引用、引证。|标签通常表示它所包含的文本对某个参考文献的引用|
|`<dfn>`|   定义一个定义项目。||

# 页面基本结构
```
<html>
    <head>
      <title>TITLE</title>
      <meta charset="UTF-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1>/>
    </head>
    <body>
      <!-- other code -->
      <!-- other -->
      <script src="URL"></script>
    </body>
</html>
```

# 注释
```
<!-- 一行 -->
<!-- 
多行
多行
 -->
<!-- [if IE 8] -->
  ...other code
<!-- [endif] -->
```

# 颜色
## 颜色名
|||
|-|-|
|#F0F8FF| AliceBlue|
|#FAEBD7| AntiqueWhite|
|#7FFFD4| Aquamarine|
|#000000| Black|
|#0000FF| Blue|
|#8A2BE2| BlueViolet|
|#A52A2A| Brown|
仅有 16 种颜色名被 W3C 的 HTML 4.0 标准支持，它们是：aqua、black、blue、fuchsia、gray、green、lime、maroon、navy、olive、purple、red、silver、teal、white、yellow。
还有其他颜色名被浏览器支持。

## 安全颜色
216种 跨平台 web 安全色被用来确保：当计算机使用 256 色调色板时，所有的计算机能够正确地显示所有的颜色。
从00开始每次加33.

# 样式
||||||
|-|-|-|-|-|
|外部样式表|`<link rel="stylesheet" type="text/css" href="URL">`||||
|内部样式表|`<style type="text/css">body {color: red;}</style>`||||
|外部样式表|`<p style="color: red;">string</p>`||||

# 链接
```
<a href="http://www.w3school.com.cn/">Visit W3School</a>
<a name="#id">基本的注意事项 - 有用的提示</a>
```
使用 Target 属性，你可以定义被链接的文档在何处显示。
name 属性规定锚（anchor）的名称。用于要内部链接。

# 图像
```
<img src="boat.gif" alt="Big Boat">
map 图像地图
area 图像地图的可点击区域。需要<map>组件内使用。

<img
src="/i/eg_planets.jpg"
border="0" usemap="#planetmap"
alt="Planets" />
<map name="planetmap" id="planetmap">
<area
shape="circle"
coords="180,139,14"
href ="/example/html/venus.html"
target ="_blank"
alt="Venus" />
<area
shape="circle"
coords="129,161,10"
href ="/example/html/mercur.html"
target ="_blank"
alt="Mercury" />
<area
shape="rect"
coords="0,0,110,260"
href ="/example/html/sun.html"
target ="_blank"
alt="Sun" />
</map>
```

# 表格
为了避免这空的单元格不显示，在空单元格中添加一个空格。
|||
|-|-|
|<table>|	定义表格|
|<caption>|	定义表格标题。|
|<th>|	定义表格的表头。|
|<tr>|	定义表格的行。|
|<td>|	定义表格单元。|
|<thead>|	定义表格的页眉。|
|<tbody>|	定义表格的主体。|
|<tfoot>|	定义表格的页脚。|
|<col>|	定义用于表格列的属性。|
|<colgroup>|	定义表格列的组。|

||||
|-|-|-|
|align	|right / left / center / justify / char|规定与 col 元素相关的内容的水平对齐方式。|
|char|character	|规定根据哪个字符来对齐与 col 元素相关的内容。|
|charoff|	number|	规定第一个对齐字符的偏移量。|
|span|	number|	规定 col 元素应该横跨的列数。|
|valign	|top / middle / bottom / baseline|定义与 col 元素相关的内容的垂直对齐方式。|
|width	| pixels / % / relative_length | 规定 col 元素的宽度。|

# 列表
ul
  li
ol
  li
有自己的默认样式。

# 类 & id
class & id
getElementById()

# 内联框架
```
<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
```
frameborder 属性规定是否显示 iframe 周围的边框。

# js
常用于操作dom.
可根据class/id/tag等得到dom.
可修改样式。
详见js

# 路径
|||
|-|-|
|<img src="picture.jpg">	|picture.jpg 位于与当前网页相同的文件夹|
|<img src="images/picture.jpg">|	picture.jpg 位于当前文件夹的 images 文件夹中|
|<img src="/images/picture.jpg">|	picture.jpg 当前站点根目录的 images 文件夹中|
|<img src="../picture.jpg">	|picture.jpg 位于当前文件夹的上一级文件夹中|

# 头部
|||
|-|-|
|`<head>`|	定义关于文档的信息。|
|`<title>`|	定义文档标题。|
|`<base>`|	定义页面上所有链接的默认地址或默认目标。|
|`<link>`|	定义文档与外部资源之间的关系。|
|`<meta>`|	定义关于 HTML 文档的元数据。|
|`<script>`|	定义客户端脚本。|
|`<style>`|	定义文档的样式信息。|

# 布局
详情请看css
# 响应式布局
# 语义
html5以后html很重视语义。提倡使用正常语义编写代码。兼容非语义代码。
语义的目的：让程序员、浏览器、辅助设备知道其内部文本是做什么的。

# 实体
||||||
|-|-|-|-|-|
|显示结果|	|描述|	实体名称;|实体编号|
| |	|空格|	&nbsp;|	&#160;|
|<|	|小于号|	&lt;|	&#60;|
|>|	|大于号|	&gt;|	&#62;|
|&|	|和号|	&amp;|	&#38;|
|"|	|引号|	&quot;|	&#34;|
|'|	|撇号| 	&apos;| (IE不支持)	&#39;|
|￠|	|分（cent）|	&cent;|	&#162;|
|£|	|镑（pound）|	&pound;|	&#163;|
|¥|	|元（yen）|	&yen;|	&#165;|
|€|	|欧元（euro）|	&euro;|	&#8364;|
|§|	|小节|	&sect;|	&#167;|
|©|	|版权（copyright）|	&copy;|	&#169;|
|®|	|注册商标|	&reg;|	&#174;|
|™|	|商标|	&trade;|	&#8482;|
|×|	|乘号|	&times;|	&#215;|
|÷|	|除号|	&divide;|	&#247;|

|||||
|-|-|-|-|
|©|	&#169;|	&copy;|	COPYRIGHT SIGN|
|®|	&#174;|	&reg;|	REGISTERED SIGN|
|€|	&#8364;|	&euro;|	EURO SIGN|
|™|	&#8482;|	&trade;|	TRADEMARK|
|←|	&#8592;|	&larr;|	LEFTWARDS ARROW|
|↑|	&#8593;|	&uarr;|	UPWARDS ARROW|
|→|	&#8594;|	&rarr;|	RIGHTWARDS ARROW|
|↓|	&#8595;|	&darr;|	DOWNWARDS ARROW|
|♠|	&#9824;|	&spades;|	BLACK SPADE SUIT|
|♣|	&#9827;|	&clubs;|	BLACK CLUB SUIT|
|♥|	&#9829;|	&hearts;|	BLACK HEART SUIT|
|♦|	&#9830;|	&diams;|	BLACK DIAMOND SUIT|

# 符号
|||||
|-|-|-|-|
|∀|	&#8704;|	&forall;|	FOR ALL|
|∂|	&#8706;|	&part;|	PARTIAL DIFFERENTIAL|
|∃|	&#8707;|	&exist;|	THERE EXISTS|
|∅|	&#8709;|	&empty;|	EMPTY SETS|
|∇|	&#8711;|	&nabla;|	NABLA|
|∈|	&#8712;|	&isin;|	ELEMENT OF|
|∉|	&#8713;|	&notin;|	NOT AN ELEMENT OF|
|∋|	&#8715;|	&ni;|	CONTAINS AS MEMBER|
|∏|	&#8719;|	&prod;|	N-ARY PRODUCT|
|∑|	&#8721;|	&sum;|	N-ARY SUMMATION|

# 字符集
# url
|http|	超文本传输协议|	以 http:// 开头的普通网页。不加密。|
|https|	安全超文本传输协议|	安全网页。加密所有信息交换。|
|ftp|	文件传输协议|	用于将文件下载或上传至网站。|
|file|	 |	您计算机上的文件。||

# 表单
用于搜集不同类型的用户输入。
当前一般使用前后端分离开发。所以一般不使用要action属性。使用ajax提交数据。
```
<form>
  action 服务器接收表单的地址
  method get post 提交表单的方式
  autocomplete 是否打开自动完成功能
  enctype   application/x-www-form-urlencoded 在发送前编码所有字符（默认）
            multipart/form-data 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
            text/plain  空格转换为 "+" 加号，但不对特殊字符编码。

<input>
  type=text / radio / submit / password / checkbox / button
        / color / date / datetime / datetime-local / email / month
        / number / range / search / tel / time / url / week
  name   服务端使用该属性的值去获取表单中相应的数据。该属性在前端用处较少。
<select>
  <options>
<textarea>
<button>
<datalist>
<button>
<button>
<button>
```
|属性|  描述|
|accept-charset|  规定在被提交表单中使用的字符集（默认：页面字符集）。|
|action|  规定向何处提交表单的地址（URL）（提交页面）。如果省略 action 属性，则将 action 设置为当前页面。|
|autocomplete|  规定浏览器应该自动完成表单（默认：开启）。|
|enctype| 规定被提交数据的编码（默认：url-encoded）。|
|method|  规定在提交表单时所用的 HTTP 方法（默认：GET）。|
|name|  规定识别表单的名称（对于 DOM 使用：document.forms.name）。|
|novalidate|  规定浏览器不验证表单。|
|target|  规定 action 属性中地址的目标（默认：_self）。|

# canvas
使用 JavaScript 在网页上绘制图像。
canvas是可绘制图像的标签。绘图功能由js做。
详见canvas

# svg                                                                           
SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
SVG 用于定义用于网络的基于矢量的图形
详见svg

# 媒体

# 对象
```
<object>
<embed>
```

# 地理
Geolocation API 用于获得用户的地理位置。

# 拖放
```
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">
```
draggable="true"   把元素设置为可拖放
ondragstart 属性调用了一个 drag(event) 函数，规定拖动什么数据。
dataTransfer.setData() 方法设置被拖动数据的数据类型和值：
ondragover 事件规定被拖动的数据能够被放置到何处。为了实现拖放，我们必须阻止元素的这种默认的处理方式。这个任务由 ondragover 事件的 event.preventDefault() 方法完成：
ondrop 属性调用了一个函数，drop(event)：
详见drag

# 本地存储
cookie / sessionStorage / localStorage
详见前端存储

# 应用程序缓存
应用程序缓存为应用带来三个优势：
- 离线浏览 - 用户可在应用离线时使用它们
- 速度 - 已缓存资源加载得更快
- 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源
```
下例展示了带有 cache manifest 的 HTML 文档（供离线浏览）：
实例

<!DOCTYPE HTML>
<html manifest="demo.appcache">
  <body>
    文档内容 ......
  </body>
</html>
```
manifest 文件的建议文件扩展名是：".appcache"。demo如下：
```
CACHE MANIFEST
# 2012-02-21 v1.0.0
/theme.css
/logo.gif
/main.js

NETWORK:
login.asp

FALLBACK:
/html/ /offline.html
```
manifest 文件有三个部分：
- CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
- NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
- FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）
详见前端缓存

# web workers
一般用于大量计算。它调用了浏览器的多线程环境。
worker无法访问如下对象：
- window 对象
- document 对象
- parent 对象
详见web worker
worker之间使用消息传递数据（交接数据管理权）。
```
// demo

```

# server-sent事件
指的是网页自动从服务器获得更新。
以前也可能做到这一点，前提是网页不得不询问是否有可用的更新。通过 Server-Sent 事件，更新能够自动到达。
```
var source = new EventSource("demo_sse.php");
source.onmessage = function(event) {
    document.getElementById("result").innerHTML += event.data + "<br>";
};
// 创建一个新的 EventSource 对象，然后规定发送更新的页面的 URL（本例中是 "demo_sse.php"）
// 每当接收到一次更新，就会发生 onmessage 事件
// 当 onmessage 事件发生时，把已接收的数据推入 id 为 "result" 的元素中
```
|事件|  描述|
|-|  -|
|onopen|  当通往服务器的连接被打开|
|onmessage| 当接收到消息|
|onerror| 当发生错误|








# 属性
# 属性
# 属性
# 富文本编辑

# 全标签
    <!-->
    <!DOCTYPE>
    <a>
    <abbr>
    <acronym>
    <address>
    <applet>
    <area>
    <article>
    <aside>
    <audio>
    <b>
    <base>
    <basefont>
    <bdi>
    <bdo>
    <big>
    <blockquote>
    <body>
    <br>
    <button>
    <canvas>
    <caption>
    <center>
    <cite>
    <code>
    <col>
    <colgroup>
    <command>
    <data>
    <datalist>
    <dd>
    <del>
    <details>
    <dfn>
    <dialog>
    <dir>
    <div>
    <dl>
    <dt>
    <em>
    <embed>
    <fieldset>
    <figcaption>
    <figure>
    <font>
    <footer>
    <form>
    <frame>
    <frameset>
    <h1> - <h6>
    <head>
    <header>
    <hr>
    <html>
    <i>
    <iframe>
    <img>
    <input>
    <ins>
    <kbd>
    <keygen>
    <label>
    <legend>
    <li>
    <link>
    <main>
    <map>
    <mark>
    <menu>
    <menuitem>
    <meta>
    <meter>
    <nav>
    <noframes>
    <noscript>
    <object>
    <ol>
    <optgroup>
    <option>
    <output>
    <p>
    <param>
    <picture>
    <pre>
    <progress>
    <q>
    <rp>
    <rt>
    <ruby>
    <s>
    <samp>
    <script>
    <section>
    <select>
    <small>
    <source>
    <span>
    <strike>
    <strong>
    <style>
    <sub>
    <summary>
    <sup>
    <svg>
    <table>
    <tbody>
    <td>
    <template>
    <textarea>
    <tfoot>
    <th>
    <thead>
    <time>
    <title>
    <tr>
    <track>
    <tt>
    <u>
    <ul>
    <var>
    <video>
    <wbr>
    </code>
        