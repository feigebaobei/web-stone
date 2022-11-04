# html

- HTML 指的是超文本标记语言 (Hyper Text Markup Language)。不是一种编程语言，而是一种标记语言 (markup language)，标记语言是一套标记标签 (markup tag)
- HTML 使用标记标签来描述网页
- 它在浏览器中有自己默认样式
- 明确规定需要成对出现，即：开始标签+闭合标签。但是仍有一些标签是自闭合的。因为这些标义，不应该包含非特定的内容。如：`img`它是图片域标签。它是自闭合标签，它只能处理图片，不应该包含非图片内容。`br`是拆行标签。它是自闭合标签，它只能折行，不应该包含非拆行内容。html 语言为了防止包含不正确内容的错误，设置了自闭合标签。
- 若无闭合标签，则浏览器会尝试补全闭合标签
- 块级标签是默认独占一行的标签
- 行内标签是默认非独占一行的标签
- 行内标签不包含块级标签。有些标签不可互相嵌套。如 p 不可嵌套 div。
- 标签语义化可以方便程序员、浏览器、辅助设备
- 不区分大小写
- 每个标签有自己的特性。应根据标签的特性、业务需要选择合适的标签。

# html & css & javascript

- html 就像筋骨
- css 就像衣服
- javascript（js）就像本领

html 为 js 支持很多前提条件。如：

- 使用 canvas 支持 js 绘制图像。
- 使用 Geolocation 支持获取地理位置。
- 使用 draggable 支持 js 拖放 dom 元素。

# 浏览器处理 html 文件的过程

# [Element](/language/html/Element.html)

# [webComponent](/language/html/webComponents.html)

# [HTMLElement](/language/html/HTMLElement.html)

# [shadow dom](/language/html/shadowDom.html)

# [template](/language/html/template.html)

# [slot](/language/html/slot.html)

# 属性

- 使用`key="value"`形式书写在开始标签内。
- 常用`class id style PROP`

## role 属性

| 属性值             | 说明                                                                              |     |
| ------------------ | --------------------------------------------------------------------------------- | --- |
| alert              | 用于非常重要的                                                                    |     |
| alertdialog        |                                                                                   |     |
| application        | 应用                                                                              |     |
| article            | 页面的一部分                                                                      |     |
| banner             | 全站的头部                                                                        |     |
| button             | 用于可点击的元素                                                                  |     |
| toggle button      |                                                                                   |     |
| check box          |                                                                                   |     |
| cell               | 表格的一部分                                                                      |     |
| checkbox           | 用于可切换选择状态的元素                                                          |     |
| columnheader       | 整列的头                                                                          |     |
| combobox           | 为 input 控制别的元素元素                                                         |     |
| command            | 用于执行行动的元素                                                                |     |
| comment            |                                                                                   |     |
| complementary      |                                                                                   |     |
| content            |                                                                                   |     |
| contentinfo        | 用于定义 footer/containing/...                                                    |     |
| definition         | 用于定义观点                                                                      |     |
| dialog             |                                                                                   |     |
| directory          | 一个组的列表                                                                      |     |
| content list       |                                                                                   |     |
| document           | 用于复杂的合成元素                                                                |     |
| feed               | 动态的文章的列表                                                                  |     |
| figure             | 用于页面中的图表                                                                  |     |
| form               |                                                                                   |     |
| grid               |                                                                                   |     |
| gridcell           |                                                                                   |     |
| table              |                                                                                   |     |
| cell               |                                                                                   |     |
| heading            |                                                                                   |     |
| image              |                                                                                   |     |
| img                |                                                                                   |     |
| input              |                                                                                   |     |
| link               |                                                                                   |     |
| content list       |                                                                                   |     |
| listitem           | 标识项目列表中的项目                                                              |     |
| group              | 一个组合                                                                          |     |
| landmark           | 页面的界碑                                                                        |     |
| list               | 列表                                                                              |     |
| listbox            | 用户可以从中选择一个或多个静态选项，并且与 HTML select 元素不同，它可能包含图像。 |     |
| listitem           |                                                                                   |     |
| log                |                                                                                   |     |
| main               |                                                                                   |     |
| mark               |                                                                                   |     |
| marquee            |                                                                                   |     |
| math               | 用于数学表示式                                                                    |     |
| menu               |                                                                                   |     |
| menu bar           |                                                                                   |     |
| menu item          |                                                                                   |     |
| menu item          |                                                                                   |     |
| menu item          |                                                                                   |     |
| navigation         |                                                                                   |     |
| none               |                                                                                   |     |
| note               |                                                                                   |     |
| text               |                                                                                   |     |
| presentation       |                                                                                   |     |
| progress indicator |                                                                                   |     |
| radio button       |                                                                                   |     |
| radio group        |                                                                                   |     |
| region             |                                                                                   |     |
| range              |                                                                                   |     |
| roletype           |                                                                                   |     |
| row                |                                                                                   |     |
| rowgroup           |                                                                                   |     |
| rowheader          |                                                                                   |     |
| cell               |                                                                                   |     |
| scroll bar         |                                                                                   |     |
| search             |                                                                                   |     |
| searchbox          |                                                                                   |     |
| section            |                                                                                   |     |
| sectionhead        |                                                                                   |     |
| select             |                                                                                   |     |
| separator          |                                                                                   |     |
| splitter           |                                                                                   |     |
| slider             |                                                                                   |     |
| stepper            |                                                                                   |     |
| status             |                                                                                   |     |
| structure          |                                                                                   |     |
| sugggestion        |                                                                                   |     |
| switch             |                                                                                   |     |
| tab                |                                                                                   |     |
| table              |                                                                                   |     |
| tablist            |                                                                                   |     |
| tabpanel           |                                                                                   |     |
| term               |                                                                                   |     |
| tabgroup           |                                                                                   |     |
| tabbox             |                                                                                   |     |
| tab panel          |                                                                                   |     |
| text field         |                                                                                   |     |
| text entry area    |                                                                                   |     |
| timer              |                                                                                   |     |
| toolbar            |                                                                                   |     |
| tooltip            |                                                                                   |     |
| tree               |                                                                                   |     |
| treegrid           |                                                                                   |     |
| treeitem           |                                                                                   |     |
| widget             |                                                                                   |     |
| widow              |                                                                                   |     |
| outline            |                                                                                   |     |
| outline row        |                                                                                   |     |

# 标题

- h1 - h6
- 拥有默认样式

# 格式化功能的标签

|                |                      |                                                                                                                                                         |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<b>`          | 定义粗体文本。       |
| `<big>`        | 定义大号字。         |
| `<em>`         | 定义着重文字。       | 类似斜体                                                                                                                                                |
| `<i>`          | 定义斜体字。         |
| `<small>`      | 定义小号字。         |
| `<strong>`     | 定义加重语气。       |
| `<sub>`        | 定义下标字。         |
| `<sup>`        | 定义上标字。         |
| `<ins>`        | 定义插入字。         | 加了下划线                                                                                                                                              |
| `<del>`        | 定义删除字。         |
| `<code>`       | 定义计算机代码。     |
| `<kbd>`        | 定义键盘码。         |
| `<samp>`       | 定义计算机代码样本。 |
| `<tt>`         | 定义打字机代码。     |
| `<var>`        | 定义变量。           |
| `<pre>`        | 定义预格式文本。     | pre 元素可定义预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。标签的一个常见应用就是用来表示计算机的源代码。 |
| `<abbr>`       | 定义缩写。           |                                                                                                                                                         |
| `<acronym>`    | 定义首字母缩写。     | HTML5 中不支持 `<acronym>` 标签。请使用 `<abbr>` 标签代替。                                                                                             |
| `<address>`    | 定义地址。           |                                                                                                                                                         |
| `<bdo>`        | 定义文字方向。       | `<bdo dir="rtl">Here is some text</bdo>`                                                                                                                |
| `<blockquote>` | 定义长的引用。       |                                                                                                                                                         |
| `<q>`          | 定义短的引用语。     |                                                                                                                                                         |
| `<cite>`       | 定义引用、引证。     | 标签通常表示它所包含的文本对某个参考文献的引用                                                                                                          |
| `<dfn>`        | 定义一个定义项目。   |                                                                                                                                                         |

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

|         |              |
| ------- | ------------ |
| #F0F8FF | AliceBlue    |
| #FAEBD7 | AntiqueWhite |
| #7FFFD4 | Aquamarine   |
| #000000 | Black        |
| #0000FF | Blue         |
| #8A2BE2 | BlueViolet   |
| #A52A2A | Brown        |

仅有 16 种颜色名被 W3C 的 HTML 4.0 标准支持，它们是：aqua、black、blue、fuchsia、gray、green、lime、maroon、navy、olive、purple、red、silver、teal、white、yellow。
还有其他颜色名被浏览器支持。

## 安全颜色

216 种 跨平台 web 安全色被用来确保：当计算机使用 256 色调色板时，所有的计算机能够正确地显示所有的颜色。
从 00 开始每次加 33.

# 样式

|            |                                                      |     |     |     |
| ---------- | ---------------------------------------------------- | --- | --- | --- |
| 外联样式表 | `<link rel="stylesheet" type="text/css" href="URL">` |     |     |     |
| 内联样式表 | `<style type="text/css">body {color: red;}</style>`  |     |     |     |
| 行内样式表 | `<p style="color: red;">string</p>`                  |     |     |     |

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
好像不能实现任务形状的热区。

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

图片热区有时用在地图上。

# 表格

为了避免这空的单元格不显示，在空单元格中添加一个空格。  
|||
|-|-|
|`<table>`| 定义表格|
|`<caption>`| 定义表格标题。|
|`<th>`| 定义表格的表头。|
|`<tr>`| 定义表格的行。|
|`<td>`| 定义表格单元。|
|`<thead>`| 定义表格的页眉。|
|`<tbody>`| 定义表格的主体。|
|`<tfoot>`| 定义表格的页脚。|
|`<col>`| 定义用于表格列的属性。|
|`<colgroup>`| 定义表格列的组。|

|                |                                        |                                               |
| -------------- | -------------------------------------- | --------------------------------------------- |
| align          | right / left / center / justify / char | 规定与 col 元素相关的内容的水平对齐方式。     |
| char           | character                              | 规定根据哪个字符来对齐与 col 元素相关的内容。 |
| charoff        | number                                 | 规定第一个对齐字符的偏移量。                  |
| span           | number                                 | 规定 col 元素应该横跨的列数。                 |
| vertical-align | top / middle / bottom / baseline       | 定义与 col 元素相关的内容的垂直对齐方式。     |
| width          | pixels / % / relative_length           | 规定 col 元素的宽度。                         |

# 列表

`ul/li/ol/li`有自己的默认样式。

# 类 & id

class & id
getElementById()

```js
// 增
dom.classList.add('class-name')
dom.classList.add('class-name', 'nc')
dom.className += 'nc'
// 删
dom.classList.remove('class-name')
dom.classList.remove('class-name', 'nc')
// 改。没有改。删了再加。
// 查
dom.classList.contain('nc') // boolean
Array.from(dom.classList).includes('nc')
```

# 内联框架

```
<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
```

frameborder 属性规定是否显示 iframe 周围的边框。

# javascript

常用于操作 dom.
可根据 class/id/tag 等得到 dom.
可修改样式。
详见[javascript](/javascript/index.html)

# 路径

|                                   |                                              |
| --------------------------------- | -------------------------------------------- |
| `<img src="picture.jpg">`         | picture.jpg 位于与当前网页相同的文件夹       |
| `<img src="images/picture.jpg">`  | picture.jpg 位于当前文件夹的 images 文件夹中 |
| `<img src="/images/picture.jpg">` | picture.jpg 当前站点根目录的 images 文件夹中 |
| `<img src="../picture.jpg">`      | picture.jpg 位于当前文件夹的上一级文件夹中   |

# 头部

|            |                                          |
| ---------- | ---------------------------------------- |
| `<head>`   | 定义关于文档的信息。                     |
| `<title>`  | 定义文档标题。                           |
| `<base>`   | 定义页面上所有链接的默认地址或默认目标。 |
| `<link>`   | 定义文档与外部资源之间的关系。           |
| `<meta>`   | 定义关于 HTML 文档的元数据。             |
| `<script>` | 定义客户端脚本。                         |
| `<style>`  | 定义文档的样式信息。                     |

## script

内部包含脚本代码。

### 属性

好像不对

|               | value               | description                                                                    | default |                                                                                                                                                             |
| ------------- | ------------------- | ------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| async         |                     | 浏览器默认同步加载、解析脚本代码。若设置此属性则浏览器异步加载、解析脚本代码。 |         |                                                                                                                                                             |
| crossorigin   |                     | 解决脚本的 cors 问题                                                           |         |                                                                                                                                                             |
| defer         |                     | 通知浏览器在文档解析完成后执行、DOMContentLoaded 事件前执行。                  |         |                                                                                                                                                             |
| integrity     |                     | 是否启用子资源完整性功能。`integrity="${散列算法}-${散列值}"`                  |         |                                                                                                                                                             |
| nomodule      | boolean             | 脚本是否在支持 es2015 modules 的浏览器中执行                                   |         |                                                                                                                                                             |
| nonce         |                     |                                                                                |         |                                                                                                                                                             |
| referrerpolic |                     | 获取脚本时是否使用 referrer 字段。                                             |         | `no-referrer`/`no-referrer-when-downgrade`/`origin`/`origin-when-cross-origin`/`same-origin`/`strict-origin`/`strict-origin-when-cross-origin`/`unsafe-url` |
| type          | module / text/babel |                                                                                |         |                                                                                                                                                             |

```js
let script = document.createElement('script')
script.src = 'name.js'
document.querySelect('body').appendChild(script)
```

## meta

`<meta>` 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
放在`<header>`内。

### 属性

script 标签上无 preload / prefetch 属性

|            | value                                                                      | description                                 | default |     |
| ---------- | -------------------------------------------------------------------------- | ------------------------------------------- | ------- | --- |
| content    | string                                                                     | 与 http-equiv、name 相对应的值              | -       |     |
| http-equiv | 'content-type' / 'expires' / 'refresh' / 'set-cookie'                      | 把 content 属性连接到一个 HTTP 头部。       | -       |     |
| name       | 'author' / 'description' / 'keywords' / 'generator' / 'revised' / 'others' | 把 content 属性连接到某个名称。             | -       |     |
| scheme     | string                                                                     | 设置或返回用于解释 content 属性的值的格式。 | -       |     |

### meta 对象

```
let meta = document.getElementByTagName('meta')[0]
meta: {
    content,
    http-equiv,
    name,
    scheme,
}
```

### viewport

可分为：

- layout viewport 布局视口 受到动态键盘、地址栏是否显示影响
- visual viewport 视觉视口 总是不变

iframe/svg 中都有自己视口。

在移动设备中一般视口大小小于页面大小。若页面中无视口相关设置，则被设备浏览器缩放页面后全视口显示。一般会做如下设置：

```
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=3, minimum-scale=0.5, user-scalable=yes" />
```

|                   |     |                                                                                         |     |     |     |
| ----------------- | --- | --------------------------------------------------------------------------------------- | --- | --- | --- |
| width             |     | 正整数或设备宽度 device-width                                                           |     |     |     |
| height            |     | 正整数或 device-height                                                                  |     |     |     |
| initial-scale     |     | 整数或小数                                                                              |     |     |     |
| maximum-scale     |     | 整数或小数                                                                              |     |     |     |
| minimum-scale     |     | 整数或小数                                                                              |     |     |     |
| user-scalable     |     | yes/no                                                                                  |     |     |     |
| target-densityDpi |     | 70-400 之间的整数，用于表示 dpi。device-widt/device-height 等价于 10，yes/no 表示 1/0.1 |     |     |     |

### viewport-fit="cover"

因 iphone x 自作聪明搞坏了页面布局。只好想一个补救办法。

```
<meta name="viewport" content="viewport-fit=cover">
.class {
   padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);
}
```

## link

它是加载资源的标签。

|          | preload                    | prefetch                           |     |
| -------- | -------------------------- | ---------------------------------- | --- |
|          |                            | 告诉浏览器在空闲时才开始加载资源； |     |
| 页面     | 一般用于加载当前页面需要的 | 一般用于加载其它页面需要的         |     |
| 资源种类 | 脚本、字体、主要图片       | 未来可能会去的页面的资源           |     |
|          | 只加载不执行               | 只加载不执行                       |     |
|          | 均能设置、命中缓存；       | 均能设置、命中缓存；               |     |
|          | 不会导致重复请求；         | 不会导致重复请求；                 |     |
|          | 平均提高 12%速度           |                                    |     |
| 顺序     | 在众资源中最先加载         | 最后加载                           |     |
|          |                            |                                    |     |

|                | value                                                                                                                | description                                 |                                |                     |
| -------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------ | ------------------- |
| href           | url                                                                                                                  |                                             |                                |                     |
| hreflang       |                                                                                                                      |                                             |                                |                     |
| media          | media_query                                                                                                          | 规定被链接文档将被显示在什么设备上。        |                                |                     |
| referrerpolicy | no-referrer / no-referrer-when-downgrade / origin / origin-when-cross-origin / unsafe-url                            | 规定在获取资源时要使用的引荐来源信息。      | 测试一下                       |                     |
| rel            | alternate / author / help / icon / license / next / pingback / prefetch / prev / search / sidebar / stylesheet / tag | 规定当前文档与被链接文档之间的关系。        | 这里没有 script。 需要验证一下 | relationship 的缩写 |
| sizes          | heightxwidth / any                                                                                                   | 规定被链接资源的尺寸。仅适用于 rel="icon"。 |                                |                     |
| type           | MIME_type                                                                                                            | 规定被链接文档的 MIME 类型。                |                                |                     |
| as             |                                                                                                                      |                                             | 好像是未成规范的属性           |                     |

### 加载顺序

- 先加载 preload 的资源，再加载无 preload 的资源。
- 有空间时间时加载 prefetch 的资源

### 预加载

一般用于什么资源

```html
<link rel="preload" href="..." as="..." />
<link rel="modulepreload" href="..." />
<link rel="prefetch" href="..." />
```

注意 preload 需要写上正确的 as 属性，才能正常工作喔(prefetch 不需要)。

# 布局

详见[css/layout](/css/layout.html)

# 语义

html5 以后 html 很重视语义。提倡使用正常语义编写代码。兼容非语义代码。
语义的目的：让程序员、浏览器、辅助设备知道其内部文本是做什么的。

# 实体

|          |     |                   |            |                     |
| -------- | --- | ----------------- | ---------- | ------------------- |
| 显示结果 |     | 描述              | 实体名称;  | 实体编号            |
|          |     | 空格              | `&nbsp;`   | `&#160;`            |
| <        |     | 小于号            | `&lt;`     | `&#60;`             |
| >        |     | 大于号            | `&gt;`     | `&#62;`             |
| &        |     | 和号              | `&amp;`    | `&#38;`             |
| "        |     | 引号              | `&quot;`   | `&#34;`             |
| '        |     | 撇号              | `&apos;`   | (IE 不支持) `&#39;` |
| ￠       |     | 分（cent）        | `&cent;`   | `&#162;`            |
| £        |     | 镑（pound）       | `&pound;`  | `&#163;`            |
| ¥        |     | 元（yen）         | `&yen;`    | `&#165;`            |
| €        |     | 欧元（euro）      | `&euro;`   | `&#8364;`           |
| §        |     | 小节              | `&sect;`   | `&#167;`            |
| ©        |     | 版权（copyright） | `&copy;`   | `&#169;`            |
| ®        |     | 注册商标          | `&reg;`    | `&#174;`            |
| ™        |     | 商标              | `&trade;`  | `&#8482;`           |
| ×        |     | 乘号              | `&times;`  | `&#215;`            |
| ÷        |     | 除号              | `&divide;` | `&#247;`            |

|     |           |            |                    |
| --- | --------- | ---------- | ------------------ |
| ©   | `&#169;`  | `&copy;`   | COPYRIGHT SIGN     |
| ®   | `&#174;`  | `&reg;`    | REGISTERED SIGN    |
| €   | `&#8364;` | `&euro;`   | EURO SIGN          |
| ™   | `&#8482;` | `&trade;`  | TRADEMARK          |
| ←   | `&#8592;` | `&larr;`   | LEFTWARDS ARROW    |
| ↑   | `&#8593;` | `&uarr;`   | UPWARDS ARROW      |
| →   | `&#8594;` | `&rarr;`   | RIGHTWARDS ARROW   |
| ↓   | `&#8595;` | `&darr;`   | DOWNWARDS ARROW    |
| ♠   | `&#9824;` | `&spades;` | BLACK SPADE SUIT   |
| ♣   | `&#9827;` | `&clubs;`  | BLACK CLUB SUIT    |
| ♥   | `&#9829;` | `&hearts;` | BLACK HEART SUIT   |
| ♦   | `&#9830;` | `&diams;`  | BLACK DIAMOND SUIT |

# 符号

|     |           |            |                      |
| --- | --------- | ---------- | -------------------- |
| ∀   | `&#8704;` | `&forall;` | FOR ALL              |
| ∂   | `&#8706;` | `&part;`   | PARTIAL DIFFERENTIAL |
| ∃   | `&#8707;` | `&exist;`  | THERE EXISTS         |
| ∅   | `&#8709;` | `&empty;`  | EMPTY SETS           |
| ∇   | `&#8711;` | `&nabla;`  | NABLA                |
| ∈   | `&#8712;` | `&isin;`   | ELEMENT OF           |
| ∉   | `&#8713;` | `&notin;`  | NOT AN ELEMENT OF    |
| ∋   | `&#8715;` | `&ni;`     | CONTAINS AS MEMBER   |
| ∏   | `&#8719;` | `&prod;`   | N-ARY PRODUCT        |
| ∑   | `&#8721;` | `&sum;`    | N-ARY SUMMATION      |

# [字符集 & 编码](/code/index.html)

# url

|       |                    |                                     |
| ----- | ------------------ | ----------------------------------- | --- |
| http  | 超文本传输协议     | 以 http:// 开头的普通网页。不加密。 |
| https | 安全超文本传输协议 | 安全网页。加密所有信息交换。        |
| ftp   | 文件传输协议       | 用于将文件下载或上传至网站。        |
| file  |                    | 您计算机上的文件。                  |     |

# 表单

用于搜集不同类型的用户输入。
当前一般使用前后端分离开发。所以一般不使用要 action 属性。使用 ajax 提交数据。  
[上传数据那点事儿](/confuse/upload.html)

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

|属性| 描述|
|accept-charset| 规定在被提交表单中使用的字符集（默认：页面字符集）。|
|action| 规定向何处提交表单的地址（URL）（提交页面）。如果省略 action 属性，则将 action 设置为当前页面。|
|autocomplete| 规定浏览器应该自动完成表单（默认：开启）。|
|enctype| 规定被提交数据的编码（默认：url-encoded）。|
|method| 规定在提交表单时所用的 HTTP 方法（默认：GET）。|
|name| 规定识别表单的名称（对于 DOM 使用：document.forms.name）。|
|novalidate| 规定浏览器不验证表单。|
|target| 规定 action 属性中地址的目标（默认：\_self）。|

# [canvas](/html/canvas/index.html)

使用 JavaScript 在网页上绘制图像。
canvas 是可绘制图像的标签。绘图功能由 js 做。

# svg

SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
SVG 用于定义用于网络的基于矢量的图形
详见[svg](/html/svg.html)

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

draggable="true" 把元素设置为可拖放
ondragstart 属性调用了一个 drag(event) 函数，规定拖动什么数据。
dataTransfer.setData() 方法设置被拖动数据的数据类型和值：
ondragover 事件规定被拖动的数据能够被放置到何处。为了实现拖放，我们必须阻止元素的这种默认的处理方式。这个任务由 ondragover 事件的 event.preventDefault() 方法完成：
ondrop 属性调用了一个函数，drop(event)：
详见[drag](/javascript/event.html)

# 本地存储

cookie / sessionStorage / localStorage
详见[前端存储](/confuse/frontStore.html)

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

manifest 文件的建议文件扩展名是：".appcache"。demo 如下：

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

# history

<details>
  <summary>api</summary>
<pre>
html5提供的操作浏览栈的接口。
<code>
window.history 
history.back() 返回上一个栈内元素
history.forward() 返回下一个栈内元素
history.go([delta]) 进入指定的history栈
</code>
</pre>
</details>

# [web workers](/javascript/webWorker.html)

一般用于大量计算。它调用了浏览器的多线程环境。  
worker 无法访问如下对象：

- window 对象
- document 对象
- parent 对象

worker 之间使用消息传递数据（交接数据管理权）。

```
// demo
```

# server-sent 事件

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

| 事件      | 描述                     |
| --------- | ------------------------ |
| onopen    | 当通往服务器的连接被打开 |
| onmessage | 当接收到消息             |
| onerror   | 当发生错误               |

# 事件

## window 事件

| 属性           | 值     | 描述                                             |
| -------------- | ------ | ------------------------------------------------ | ---------------------------------- |
| onafterprint   | script | 文档打印之后运行的脚本。                         |
| onbeforeprint  | script | 文档打印之前运行的脚本。                         |
| onbeforeunload | script | 文档卸载之前运行的脚本。                         |
| onerror        | script | 在错误发生时运行的脚本。                         |
| onhaschange    | script | 当文档已改变时运行的脚本。                       |
| onhashchange   | script | 当 url 的 hash 值改变时                          |
| onload         | script | 页面结束加载之后触发。                           |
| onmessage      | script | 在消息被触发时运行的脚本。                       |
| onoffline      | script | 当文档离线时运行的脚本。                         |
| ononline       | script | 当文档上线时运行的脚本。                         |
| onpagehide     | script | 当窗口隐藏时运行的脚本。                         |
| onpageshow     | script | 当窗口成为可见时运行的脚本。                     |
| onpopstate     | script | 当窗口历史记录改变时运行的脚本。                 |
| onredo         | script | 当文档执行撤销（redo）时运行的脚本。             |
| onresize       | script | 当浏览器窗口被调整大小时触发。                   |
| onstorage      | script | 在                                               | Web Storage 区域更新后运行的脚本。 |
| onundo         | script | 在文档执行                                       | undo 时运行的脚本。                |
| onunload       | script | 一旦页面已下载时触发（或者浏览器窗口已被关闭）。 |

## form 事件

| 属性          | 值     | 描述                             |
| ------------- | ------ | -------------------------------- | ---------------- |
| onblur        | script | 元素失去焦点时运行的脚本。       |
| onchange      | script | 在元素值被改变时运行的脚本。     |
| oncontextmenu | script | 当上下文菜单被触发时运行的脚本。 |
| onfocus       | script | 当元素获得焦点时运行的脚本。     |
| onformchange  | script | 在表单改变时运行的脚本。         |
| onforminput   | script | 当表单获得用户输入时运行的脚本。 |
| oninput       | script | 当元素获得用户输入时运行的脚本。 |
| oninvalid     | script | 当元素无效时运行的脚本。         |
| onreset       | script | 当表单中的重置按钮被点击时触发。 | HTML5 中不支持。 |
| onselect      | script | 在元素中文本被选中后触发。       |
| onsubmit      | script | 在提交表单时触发。               |

## keyboard 事件

| 属性       | 值     | 描述                   |
| ---------- | ------ | ---------------------- |
| onkeydown  | script | 在用户按下按键时触发。 |
| onkeypress | script | 在用户敲击按钮时触发。 |
| onkeyup    | script | 当用户释放按键时触发。 |

## mouse 事件

| 属性         | 值     | 描述                                           |
| ------------ | ------ | ---------------------------------------------- |
| onclick      | script | 元素上发生鼠标点击时触发。                     |
| ondblclick   | script | 元素上发生鼠标双击时触发。                     |
| ondrag       | script | 元素被拖动时运行的脚本。                       |
| ondragend    | script | 在拖动操作末端运行的脚本。                     |
| ondragenter  | script | 当元素元素已被拖动到有效拖放区域时运行的脚本。 |
| ondragleave  | script | 当元素离开有效拖放目标时运行的脚本。           |
| ondragover   | script | 当元素在有效拖放目标上正在被拖动时运行的脚本。 |
| ondragstart  | script | 在拖动操作开端运行的脚本。                     |
| ondrop       | script | 当被拖元素正在被拖放时运行的脚本。             |
| onmousedown  | script | 当元素上按下鼠标按钮时触发。                   |
| onmousemove  | script | 当鼠标指针移动到元素上时触发。                 |
| onmouseout   | script | 当鼠标指针移出元素时触发。                     |
| onmouseover  | script | 当鼠标指针移动到元素上时触发。                 |
| onmouseup    | script | 当在元素上释放鼠标按钮时触发。                 |
| onmousewheel | script | 当鼠标滚轮正在被滚动时运行的脚本。             |
| onscroll     | script | 当元素滚动条被滚动时运行的脚本。               |

## media 事件

| 属性               | 值     | 描述                                                                     |
| ------------------ | ------ | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| onabort            | script | 在退出时运行的脚本。                                                     |
| oncanplay          | script | 当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。                 |
| oncanplaythrough   | script | 当媒介能够无需因缓冲而停止即可播放至结尾时运行的脚本。                   |
| ondurationchange   | script | 当媒介长度改变时运行的脚本。                                             |
| onemptied          | script | 当发生故障并且文件突然不可用时运行的脚本（比如连接意外断开时）。         |
| onended            | script | 当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）。         |
| onerror            | script | 当在文件加载期间发生错误时运行的脚本。                                   |
| onloadeddata       | script | 当媒介数据已加载时运行的脚本。                                           |
| onloadedmetadata   | script | 当元数据（比如分辨率和时长）被加载时运行的脚本。                         |
| onloadstart        | script | 在文件开始加载且未实际加载任何数据前运行的脚本。                         |
| onpause            | script | 当媒介被用户或程序暂停时运行的脚本。                                     |
| onplay             | script | 当媒介已就绪可以开始播放时运行的脚本。                                   |
| onplaying          | script | 当媒介已开始播放时运行的脚本。                                           |
| onprogress         | script | 当浏览器正在获取媒介数据时运行的脚本。                                   |
| onratechange       | script | 每当回放速率改变时运行的脚本（比如当用户切换到慢动作或快进模式）。       |
| onreadystatechange | script | 每当就绪状态改变时运行的脚本（就绪状态监测媒介数据的状态）。             |
| onseeked           | script | 当                                                                       | seeking 属性设置为 false（指示定位已结束）时运行的脚本。  |
| onseeking          | script | 当                                                                       | seeking 属性设置为 true（指示定位是活动的）时运行的脚本。 |
| onstalled          | script | 在浏览器不论何种原因未能取回媒介数据时运行的脚本。                       |
| onsuspend          | script | 在媒介数据完全加载之前不论何种原因终止取回媒介数据时运行的脚本。         |
| ontimeupdate       | script | 当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。   |
| onvolumechange     | script | 每当音量改变时（包括将音量设置为静音）时运行的脚本。                     |
| onwaiting          | script | 当媒介已停止播放但打算继续播放时（比如当媒介暂停已缓冲更多数据）运行脚本 |

# 富文本编辑

详见[富文本编辑](/404.html)

# 音频

audio
||||
|-|-|-|
|autoplay|autoplay|音频就绪后马上播放|
|controls|controls|向用户显示控件|
|loop|loop|循环播放|
|muted|muted|静音|
|preload|preload|在页面加载时进行加载，并预备播放。当使用 autoplay 时忽略该属性|
|src|src|音频的 url|
|audioTracks||返回可用音频的 audio TrackList 对象|
|buffered||返回已经缓冲部分的 TimeRanges 对象|
|controller||当前 MediaController 对象|
|crossOrigin||设置/返回 cors|
|currentSrc||当前的 url|
|currentTime||当前播放位置（s）|
|defaultMuted||是否默认静音|
|defaultPlaybackRate||默认播放速度|
|duration||音频的长度（s）|
|ended||是否已经结束|
|error||返回错误状态的 MediaError 对象|
|mediaGroup||该音频返回所属媒介组合的名称|
|muted||是否关闭声音|
|networkState||当前网络状态|
|paused||是否暂停|
|playbackRate||设置/返回音频播放速度|
|played||返回已经播放部分的 TimeRanges 对象|
|preload||设置/返回音频的 preload 属性|
|readyState||该音频的就绪状态|
|seekable||返回可寻址部分的 TimeRanges 对象|
|seeking||用户是否在音频中进行查找|
|textTracks||返回可用文本轨道的 TextTrackList 对象|
|volume||设置/返回音频的音量|
|addTextTrack()||向音频添加新的文本轨道|
|canPlayType()||返回是否可播放指定的音频类型|
|fastSeek()||指定播放时间|
|getStartDate()||返回新的 Date 对象，表示当前时间线偏移量|
|load()||重新加载|
|play()||开始播放|
|pause()||暂停播放|

## TimeRange

表示缓冲范围。  
若跳跃播放，则有多个缓冲范围。  
||||
|-|-|-|
|length||缓冲范围的数量|
|start(index)||指定缓冲范围的开始位置|
|end(index)||指定缓冲范围的结束位置|

# 视频

# JS 中 DOM 元素获取的宽和高的方法

需要验证  
网页可见区域宽： document.body.clientWidth （可变）  
网页可见区域高： document.body.clientHeight （可变）  
网页可见区域宽： document.body.offsetWidth (包括边线的宽)  
网页可见区域高： document.body.offsetHeight (包括边线的高)  
网页正文全文宽： document.body.scrollWidth  
网页正文全文高： document.body.scrollHeight  
网页被卷去的高： document.body.scrollTop  
网页被卷去的左： document.body.scrollLeft

# 全标签

<details>
  <summary>全标签</summary>
  <pre>
    &lt;!DOCTYPE&gt;
    &lt;a&gt;
    &lt;abbr&gt;
    &lt;acronym&gt;
    &lt;address&gt;
    &lt;applet&gt;
    &lt;area&gt;
    &lt;article&gt;
    &lt;aside&gt;
    &lt;audio&gt;
    &lt;b&gt;
    &lt;base&gt;
    &lt;basefont&gt;
    &lt;bdi&gt;
    &lt;bdo&gt;
    &lt;big&gt;
    &lt;blockquote&gt;
    &lt;body&gt;
    &lt;br&gt;
    &lt;button&gt;
    &lt;canvas&gt;
    &lt;caption&gt;
    &lt;center&gt;
    &lt;cite&gt;
    &lt;code&gt;
    &lt;col&gt;
    &lt;colgroup&gt;
    &lt;command&gt;
    &lt;data&gt;
    &lt;datalist&gt;
    &lt;dd&gt;
    &lt;del&gt;
    &lt;details&gt;
    &lt;dfn&gt;
    &lt;dialog&gt;
    &lt;dir&gt;
    &lt;div&gt;
    &lt;dl&gt;
    &lt;dt&gt;
    &lt;em&gt;
    &lt;embed&gt;
    &lt;fieldset&gt;
    &lt;figcaption&gt;
    &lt;figure&gt;
    &lt;font&gt;
    &lt;footer&gt;
    &lt;form&gt;
    &lt;frame&gt;
    &lt;frameset&gt;
    &lt;h1> - <h6&gt;
    &lt;head&gt;
    &lt;header&gt;
    &lt;hr&gt;
    &lt;html&gt;
    &lt;i&gt;
    &lt;iframe&gt;
    &lt;img&gt;
    &lt;input&gt;
    &lt;ins&gt;
    &lt;kbd&gt;
    &lt;keygen&gt;
    &lt;label&gt;
    &lt;legend&gt;
    &lt;li&gt;
    &lt;link&gt;
    &lt;main&gt;
    &lt;map&gt;
    &lt;mark&gt;
    &lt;menu&gt;
    &lt;menuitem&gt;
    &lt;meta&gt;
    &lt;meter&gt;
    &lt;nav&gt;
    &lt;noframes&gt;
    &lt;noscript&gt;
    &lt;object&gt;
    &lt;ol&gt;
    &lt;optgroup&gt;
    &lt;option&gt;
    &lt;output&gt;
    &lt;p&gt;
    &lt;param&gt;
    &lt;picture&gt;
    &lt;pre&gt;
    &lt;progress&gt;
    &lt;q&gt;
    &lt;rp&gt;
    &lt;rt&gt;
    &lt;ruby&gt;
    &lt;s&gt;
    &lt;samp&gt;
    &lt;script&gt;
    &lt;section&gt;
    &lt;select&gt;
    &lt;small&gt;
    &lt;source&gt;
    &lt;span&gt;
    &lt;strike&gt;
    &lt;strong&gt;
    &lt;style&gt;
    &lt;sub&gt;
    &lt;summary&gt;
    &lt;sup&gt;
    &lt;svg&gt;
    &lt;table&gt;
    &lt;tbody&gt;
    &lt;td&gt;
    &lt;template&gt;
    &lt;textarea&gt;
    &lt;tfoot&gt;
    &lt;th&gt;
    &lt;thead&gt;
    &lt;time&gt;
    &lt;title&gt;
    &lt;tr&gt;
    &lt;track&gt;
    &lt;tt&gt;
    &lt;u&gt;
    &lt;ul&gt;
    &lt;var&gt;
    &lt;video&gt;
    &lt;wbr&gt;
    &lt;/code&gt;
  </pre>
</details>
