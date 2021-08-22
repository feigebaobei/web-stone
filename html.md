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
|`<table>`|	定义表格|
|`<caption>`|	定义表格标题。|
|`<th>`|	定义表格的表头。|
|`<tr>`|	定义表格的行。|
|`<td>`|	定义表格单元。|
|`<thead>`|	定义表格的页眉。|
|`<tbody>`|	定义表格的主体。|
|`<tfoot>`|	定义表格的页脚。|
|`<col>`|	定义用于表格列的属性。|
|`<colgroup>`|	定义表格列的组。|

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
详见[js](/js.html)

# 路径
|||
|-|-|
|`<img src="picture.jpg">`	|picture.jpg 位于与当前网页相同的文件夹|
|`<img src="images/picture.jpg">`|	picture.jpg 位于当前文件夹的 images 文件夹中|
|`<img src="/images/picture.jpg">`|	picture.jpg 当前站点根目录的 images 文件夹中|
|`<img src="../picture.jpg">`	|picture.jpg 位于当前文件夹的上一级文件夹中|

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
详见[css](/css.html)

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
## 颜色、样式和阴影
|属性|  描述|
|fillStyle| 设置或返回用于填充绘画的颜色、渐变或模式|
|strokeStyle| 设置或返回用于笔触的颜色、渐变或模式|
|shadowColor| 设置或返回用于阴影的颜色|
|shadowBlur|  设置或返回用于阴影的模糊级别|
|shadowOffsetX| 设置或返回阴影距形状的水平距离|
|shadowOffsetY| 设置或返回阴影距形状的垂直距离|
|方法  |描述|
|createLinearGradient()|  创建线性渐变（用在画布内容上）|
|createPattern()| 在指定的方向上重复指定的元素|
|createRadialGradient()|  创建放射状/环形的渐变（用在画布内容上）|
|addColorStop()|  规定渐变对象中的颜色和停止位置|

## 线条样式
|属性|  描述|
|lineCap| 设置或返回线条的结束端点样式|
|lineJoin|  设置或返回两条线相交时，所创建的拐角类型|
|lineWidth| 设置或返回当前的线条宽度|
|miterLimit|  设置或返回最大斜接长度|

## 矩形
|方法  |描述|
|rect()|  创建矩形|
|fillRect()|  绘制“被填充”的矩形|
|strokeRect()|  绘制矩形（无填充）|
|clearRect()| 在给定的矩形内清除指定的像素|

## 路径
|方法  |描述|
|fill()|  填充当前绘图（路径）|
|stroke()|  绘制已定义的路径|
|beginPath()| 起始一条路径，或重置当前路径|
|moveTo()|  把路径移动到画布中的指定点，不创建线条|
|closePath()| 创建从当前点回到起始点的路径|
|lineTo()|  添加一个新点，然后在画布中创建从该点到最后指定点的线条|
|clip()|  从原始画布剪切任意形状和尺寸的区域|
|quadraticCurveTo()|  创建二次贝塞尔曲线|
|bezierCurveTo()| 创建三次方贝塞尔曲线|
|arc()| 创建弧/曲线（用于创建圆形或部分圆）|
|arcTo()| 创建两切线之间的弧/曲线|
|isPointInPath()| 如果指定的点位于当前路径中，则返回 true，否则返回 false|

## 转换
|方法  |描述|
|scale()| 缩放当前绘图至更大或更小|
|rotate()|  旋转当前绘图|
|translate()| 重新映射画布上的 (0,0) 位置|
|transform()| 替换绘图的当前转换矩阵|
|setTransform()|  将当前转换重置为单位矩阵。然后运行 transform()|

## 文本
|属性  |描述|
|font  |设置或返回文本内容的当前字体属性|
|textAlign |设置或返回文本内容的当前对齐方式|
|textBaseline  |设置或返回在绘制文本时使用的当前文本基线|
|方法  |描述|
|fillText()|  在画布上绘制“被填充的”文本|
|strokeText()|  在画布上绘制文本（无填充）|
|measureText()| 返回包含指定文本宽度的对象|

## 图像绘制
|方法  |描述|
|drawImage()| 向画布上绘制图像、画布或视频|

## 像素操作
|属性|  描述|
|width| 返回 ImageData 对象的宽度|
|height|  返回 ImageData 对象的高度|
|data|  返回一个对象，其包含指定的 ImageData 对象的图像数据|
|方法  |描述|
|createImageData()| 创建新的、空白的 ImageData 对象|
|getImageData()|  返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据|
|putImageData()|  把图像数据（从指定的 ImageData 对象）放回画布上|
## 合成
|属性|  描述|
|globalAlpha| 设置或返回绘图的当前 alpha 或透明值|
|globalCompositeOperation|  设置或返回新图像如何绘制到已有的图像上|

## 其他
|方法  |描述|
|save()|  保存当前环境的状态|
|restore()| 返回之前保存过的路径状态和属性|
|createEvent()|  |
|getContext()|   |
|toDataURL()|  |

详见[canvas](/404.html)

# svg                                                                           
SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
SVG 用于定义用于网络的基于矢量的图形
详见[svg](/404.html)

# 媒体
视频/音频

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
详见[drag](/404.html)

# 本地存储
cookie / sessionStorage / localStorage
详见[前端存储](/404.html)

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
详见[前端缓存](/404.html)

# web workers
一般用于大量计算。它调用了浏览器的多线程环境。
worker无法访问如下对象：
- window 对象
- document 对象
- parent 对象
详见[web worker](/404.html)
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

# 事件
## window事件
|属性|  值| 描述|
|-|  -| -|
|onafterprint|  script|  文档打印之后运行的脚本。|
|onbeforeprint| script|  文档打印之前运行的脚本。|
|onbeforeunload|  script|  文档卸载之前运行的脚本。|
|onerror| script|  在错误发生时运行的脚本。|
|onhaschange| script|  当文档已改变时运行的脚本。|
|onload|  script|  页面结束加载之后触发。|
|onmessage| script|  在消息被触发时运行的脚本。|
|onoffline| script|  当文档离线时运行的脚本。|
|ononline|  script|  当文档上线时运行的脚本。|
|onpagehide|  script|  当窗口隐藏时运行的脚本。|
|onpageshow|  script|  当窗口成为可见时运行的脚本。|
|onpopstate|  script|  当窗口历史记录改变时运行的脚本。|
|onredo|  script|  当文档执行撤销（redo）时运行的脚本。|
|onresize|  script|  当浏览器窗口被调整大小时触发。|
|onstorage| script|  在| Web Storage 区域更新后运行的脚本。
|onundo|  script|  在文档执行| undo 时运行的脚本。
|onunload|  script|  一旦页面已下载时触发（或者浏览器窗口已被关闭）。|

## form事件
属性|  值| 描述|
|-|-|-|
onblur|  script|  元素失去焦点时运行的脚本。|
onchange|  script|  在元素值被改变时运行的脚本。|
oncontextmenu| script|  当上下文菜单被触发时运行的脚本。|
onfocus| script|  当元素获得焦点时运行的脚本。|
onformchange|  script|  在表单改变时运行的脚本。|
onforminput| script|  当表单获得用户输入时运行的脚本。|
oninput| script|  当元素获得用户输入时运行的脚本。|
oninvalid| script|  当元素无效时运行的脚本。|
onreset| script|  当表单中的重置按钮被点击时触发。|HTML5 中不支持。
onselect|  script|  在元素中文本被选中后触发。|
onsubmit|  script|  在提交表单时触发。|

## keyboard事件
|属性|  值| 描述|
|-|-|-|
|onkeydown| script|  在用户按下按键时触发。|
|onkeypress|  script|  在用户敲击按钮时触发。|
|onkeyup| script|  当用户释放按键时触发。|

## mouse事件
|属性|  值| 描述|
|-|-|-|
|onclick| script|  元素上发生鼠标点击时触发。|
|ondblclick|  script|  元素上发生鼠标双击时触发。|
|ondrag|  script|  元素被拖动时运行的脚本。|
|ondragend| script|  在拖动操作末端运行的脚本。|
|ondragenter| script|  当元素元素已被拖动到有效拖放区域时运行的脚本。|
|ondragleave| script|  当元素离开有效拖放目标时运行的脚本。|
|ondragover|  script|  当元素在有效拖放目标上正在被拖动时运行的脚本。|
|ondragstart| script|  在拖动操作开端运行的脚本。|
|ondrop|  script|  当被拖元素正在被拖放时运行的脚本。|
|onmousedown| script|  当元素上按下鼠标按钮时触发。|
|onmousemove| script|  当鼠标指针移动到元素上时触发。|
|onmouseout|  script|  当鼠标指针移出元素时触发。|
|onmouseover| script|  当鼠标指针移动到元素上时触发。|
|onmouseup| script|  当在元素上释放鼠标按钮时触发。|
|onmousewheel|  script|  当鼠标滚轮正在被滚动时运行的脚本。|
|onscroll|  script|  当元素滚动条被滚动时运行的脚本。|

## media事件
|属性|  值| 描述|
|onabort| script|  在退出时运行的脚本。|
|oncanplay| script|  当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。|
|oncanplaythrough|  script|  当媒介能够无需因缓冲而停止即可播放至结尾时运行的脚本。|
|ondurationchange|  script|  当媒介长度改变时运行的脚本。|
|onemptied| script|  当发生故障并且文件突然不可用时运行的脚本（比如连接意外断开时）。|
|onended| script|  当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）。|
|onerror| script|  当在文件加载期间发生错误时运行的脚本。|
|onloadeddata|  script|  当媒介数据已加载时运行的脚本。|
|onloadedmetadata|  script|  当元数据（比如分辨率和时长）被加载时运行的脚本。|
|onloadstart| script|  在文件开始加载且未实际加载任何数据前运行的脚本。|
|onpause| script|  当媒介被用户或程序暂停时运行的脚本。|
|onplay|  script|  当媒介已就绪可以开始播放时运行的脚本。|
|onplaying| script|  当媒介已开始播放时运行的脚本。|
|onprogress|  script|  当浏览器正在获取媒介数据时运行的脚本。|
|onratechange|  script|  每当回放速率改变时运行的脚本（比如当用户切换到慢动作或快进模式）。|
|onreadystatechange|  script|  每当就绪状态改变时运行的脚本（就绪状态监测媒介数据的状态）。|
|onseeked|  script|  当| seeking 属性设置为 false（指示定位已结束）时运行的脚本。
|onseeking| script|  当| seeking 属性设置为 true（指示定位是活动的）时运行的脚本。
|onstalled| script|  在浏览器不论何种原因未能取回媒介数据时运行的脚本。|
|onsuspend| script|  在媒介数据完全加载之前不论何种原因终止取回媒介数据时运行的脚本。|
|ontimeupdate|  script|  当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。|
|onvolumechange|  script|  每当音量改变时（包括将音量设置为静音）时运行的脚本。|
|onwaiting| script|  当媒介已停止播放但打算继续播放时（比如当媒介暂停已缓冲更多数据）运行脚本|

# 富文本编辑
详见[富文本编辑](/404.html)

# 全标签
```
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
```