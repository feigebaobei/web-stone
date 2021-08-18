# html
- HTML 指的是超文本标记语言 (Hyper Text Markup Language)
- HTML 不是一种编程语言，而是一种标记语言 (markup language)
- 标记语言是一套标记标签 (markup tag)
- HTML 使用标记标签来描述网页
- 它在浏览器中有自己默认样式
- 明确规定需要成对出现，即：开始标签+闭合标签。但是仍有一些标签是自闭合的。因为这些标义，不应该包含非特定的内容。如：`img`它是图片域标签。它是自闭合标签，它只能处理图片，不应该包含非图片内容。`br`是拆行标签。它是自闭合标签，它只能拆行，不应该包含非拆行内容。html语言为了防止包含不正确内容的错误，设置了自闭合标签。</li>
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
|外部样式表|||||
|外部样式表|||||

# 链接
```
<a href="http://www.w3school.com.cn/">Visit W3School</a>
<a name="#id">基本的注意事项 - 有用的提示</a>
```
使用 Target 属性，你可以定义被链接的文档在何处显示。
name 属性规定锚（anchor）的名称。用于要内部链接。

# 链接
# 图像
# 表格
# 列表
# 块
# 类
# id
# 内联框架
# js
# 路径
# 头部
# 布局
详情请看css
# 响应式布局
# 属性
# 属性
# 属性
# 属性
# 属性
# 属性
# 属性
# 属性
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
        