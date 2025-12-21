# css 标签

`<link xx="yyy" />`
全是小写。因 html 不区分大小写。  
||||
|-|-|-|
|rel|'modulepreload'|预加载|
||||
||||
||||
||||

# [布局](/language/css/layout.html)

# [css 选择器](/language/css/cssSelector.html)

# [动画](/language/css/animation.html)

# [伪类](/language/css/pseudo.html)

# [属性](/language/css/props.html)

# title

## [background](/language/css/background.html)

## [flex](/language/css/flex/index.html)

## [grid](/language/css/grid/index.html)

## [:root](/language/css/root.html)

## [font](/language/css/font.html)

## 响应式布局 rwd

# 预处理器

## [sass](/language/css/sass/index.html)

生于 2007，最早/最成熟的 css 预处理器。
请使用 sass 包，（node-sass 已经是旧版本了）
[官网](https://sass-lang.com/documentation)

## [less](/language//less/index.html)

生于 2009，受到 sass 的影响较大。
[官网](https://lesscss.org/features/)

## [stylus](/language//stylus/index.html)

生于 2010，node.js 社区。
[官网](https://stylus-lang.com/)

## [postcss](/language//postcss/index.html)

[官网](https://www.postcss.com.cn/)

## [css-in-js](/language/css/cssInJs.html)

## [turbine]()

## [switch css]()

## [css cacheer]()

## [DT css]()

## [CSS-Crush](https://the-echoplex.net/csscrush/#api)

## [Myth](https://github.com/segmentio/myth/blob/master/Readme.md)

## [Rework](https://github.com/reworkcss/rework)

## [样式穿透](language/css/deep.html)

# [css-modules](language/css/css-modules/index.html)

- 支持局部作用域、模块依赖。
- 会编译类名：`<filename>_<className>_<randomHash>`
- 生成 css/js

# temp

## bem

b(block) e(element) m(modifier)

```css
.btn {
}
.btn__pirce {
}
.btn--orange {
}
```

less / sass
postcss
css in js

- 使用 js 编写样式。
- 可在浏览器中编译。
- 可使用 node 在服务端打包。
- 代表是[jss]()

# [图片](/css/image/index.html)

# 引入方式

|      |                                                          |     |     |     |     |     |
| ---- | -------------------------------------------------------- | --- | --- | --- | --- | --- |
| 外联 | `<link rel="stylesheet" href="link/to/file.css"></link>` |     |     |     |     |     |
| 内联 | `<style>.c{color: red;}</style>`                         |     |     |     |     |     |
| 行内 | `<tag style="color: red;"> </tag>`                       |     |     |     |     |     |
| 引入 | `<style>@import url(./link.css)</style>`                 |     |     |     |     |     |

#
