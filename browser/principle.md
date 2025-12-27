# 功能

显示从服务器请求到的数据。
[原文](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Parsing_general)

# 浏览器的主要组件为 (1.1)：

- **用户界面** - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
- **浏览器引擎** - 在用户界面和呈现引擎之间传送指令。
- **呈现引擎（rendering engine）** - 负责显示请求的内容。如果请求的内容是 HTML，它负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
- **网络** - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
- **用户界面后端** - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
- **JavaScript 解释器**。用于解析和执行 JavaScript 代码。
- **数据存储**。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

值得注意的是，和大多数浏览器不同，Chrome 浏览器的每个标签页都分别对应一个呈现引擎实例。每个标签页都是一个独立的进程。

# 呈现引擎

呈现引擎可显示 HTML 和 XML 文档与图片。通过插件（或浏览器扩展程序），还可以显示其他类型的内容。
有两种呈现引擎。

- Gecko 是 Mozilla 公司开发的。用于 Firefox
- WebKit 是 Apple 基于（KDE(用于要排版 html)/KJS(用于解析 js)）开发的。chrome/safari 都使用它。

三大浏览器用了二个内核。

## 大体过程

1. 处理 html 为 dom 树
2. 处理 css 为 cssom 树
3. 把 dom 树 cssom 树合并为一个渲染树
4. 根据渲染树来布局，计算每个节点的位置
5. 调用 gpu 绘制，合成图层，显示在屏幕上。

## 主流程

呈现引擎一开始会从网络层获取请求文档的内容，内容的大小一般限制在 8000 个块以内。

然后进行如下所示的基本流程：

```
parsing html to construct the dom tree ---> render tree construction ---> layout of the render tree ---> painting the render tree
构建dom树 ---> 构建渲染树 ---> 布局渲染树 ---> 绘制渲染树
```

呈现引擎将开始解析 HTML 文档，并将各标记逐个转化成“内容树”上的 DOM 节点。同时解析外部 CSS 文件以及样式元素中的样式数据。HTML 中带有视觉指令的样式信息将用于创建另一个树结构：呈现树。
呈现树包含多个带有视觉属性（如颜色和尺寸）的矩形。这些矩形的排列顺序就是它们将在屏幕上显示的顺序。
呈现树构建完毕之后，进入“布局”处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。下一个阶段是绘制 - 呈现引擎会遍历呈现树，由用户界面后端层将每个节点绘制出来。
需要着重指出的是，这是一个渐进的过程。为达到更好的用户体验，呈现引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕之后，就会开始构建呈现树和设置布局。在不断接收和处理来自网络的其余内容的同时，呈现引擎会将部分内容解析并显示出来。

```
// webkit
                                    dom
                                    |
                                    |
                                    V
        html --> html parser --> dom tree           layout
                                    |                ^
                                    |                |
                                    V                V
                                    attachment --> render tree --> painting --> display
                                    ^
                                    |
                                    |
 style sheets --> css parser --> style rules

```

```
// mozilla
                                                dom
                                                |
                                                |
                                                V
        html --> parser --> content sink --> content model                reflow
                                    |                |                      ^
                            |-------|                |                      |
                            |                        V                      V
                            |                     frame constructor --> frame tree --> painting --> display
                            |                          ^
                            |                          |
                            V                          |
                    style sheets --> css parser --> style rules
```

<!-- prettier-ignore-start -->
|              | gecko             | webkit |
| ------------ | ----------------- | ------ |
| 视觉格式化元素组成的树  | 框架树            | 呈现树 |
| 对于元素的放置          | 重排              | 布局   |
| 对于连接 DOM 节点和可视化信息从而创建呈现树的过程 | frame constructor | 附加   |
<!-- prettier-ignore-end -->

# 解析

解析文档是指将文档转化成为理解和使用的结构。

- 词法解析 标记是语言中的词汇
- 语法解析 应用语言的语法规则，分析文档的结构，从而构建解析树。

```
document --> lexical analysis --> systax analysis --> parse tree
```

## 翻译

翻译是指将输入文档转换成另一种格式。
编译器可将源代码编译成机器代码，具体过程是首先将源代码解析成解析树，然后将解析树翻译成机器代码文档。

```
source code --> parsing --> parse tree --> translation --> machine code
```

webkit 使用了 flex(词法分析器)/bison(创建解析器)

# 呈现树

# 布局

# 绘制

遇到脚本会阻塞构建 dom 树。  
遇到 css 会阻塞构建渲染树。  
html 默认使用流式布局。

## 优化渲染效率

- 规范编写 html/css。设置编码类型。
- 样式写在 head 中，脚本写在 body 结束前。
- 简化、优化 css 选择器。尽量少写嵌套。
- 减少 js [操作 dom](/language/javascript/opDom.html).
- class 属性是性能最高的处理样式的选择器。
- 使用 transform 做形变、位移。

# 动态变化

# 呈现引擎的线程

# css2 可视化模型

# 资源

# todo

## reflow & repaint

<!-- prettier-ignore-start -->
|          | reflow                   | repaint      |
| -------- | ------------------------------------ | ---- |
|          | 回流                     | 重绘            |
| 包含关系 | 回流包括重绘             |      |
| 触发     | 改变布局或几何属性       | 改变外观，不影响布局                      |
|          | 变化影响布局时           | 变化不影响周围或布局时。                  |
|          | 添加、删除可见的 dom 元素 / 改变边距、填充、边框、宽高 / 内容变化，如在 input 中输入文字 / 解发 resize / 计算 offsetWidth、offsetHeight | color / border-style / visibility / outline / background                       |
| 成本     | 高                       | 低   |
| 影响范围 | 全局：从根节点 html 标签开始对整个渲染树进行重新布局          |      |
|          | 局部：对渲染树的某部分或某一个渲染对象进行重新布局            |      |
|          | display:none             | visibility:hidden 语义是隐藏元素，该元素仍占有布局空间。它会被渲染成一个空框。 |
|          |                          |      |
<!-- prettier-ignore-end -->

防止 reflow 的方式：

- 使用 transform
- 使用绝对定位，脱离当前层叠上下文，形成新的 rander layer.

## script & css

<!-- prettier-ignore-start -->
|        | script       | css           |
| ------ | -------------------------------------- | -- |
|        | 默认会阻塞 html 解析。                 | 不会阻塞 html 解析                      |
|        |   | 会阻塞渲染树。因为创建渲染树需要 cssom. |
|        | 可以使用 defer/async 不阻塞解析。或者放在最后。   | 一般放在头部。                          |
| 遇到时 | 停止解析 html。加载 js 代码，由 js 引擎解析并处理，结束后把控制权经主流程。 |    |
|        |          |    |
<!-- prettier-ignore-end -->

## title

## title

## title
