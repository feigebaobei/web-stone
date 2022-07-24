# css标签
`<link xx="yyy" />`
全是小写。因html不区分大小写。  
||||
|-|-|-|
|rel|'modulepreload'|预加载|
||||
||||
||||
||||

# [布局](/language/css/layout.html)

# [css选择器](/language/css/cssSelector.html)

# [动画](/language/css/animation.html)

# title
## [background](/language/css/background.html)  

## 响应式布局 rwd

# 预处理器
## [sass](/language//sass/index.html)
生于2007，最早/最成熟的css预处理器。
请使用sass包，（node-sass已经是旧版本了）
[官网](https://sass-lang.com/documentation)

## [less](/language//less/index.html)
生于2009，受到sass的影响较大。
[官网](https://lesscss.org/features/)

## [stylus](/language//stylus/index.html)
生于2010，node.js社区。
[官网](https://stylus-lang.com/)

## [postcss](/language//postcss/index.html)
[官网](https://www.postcss.com.cn/)

## [turbine]()

## [switch css]()

## [css cacheer]()

## [DT css]()

## [CSS-Crush](https://the-echoplex.net/csscrush/#api)

## [Myth](https://github.com/segmentio/myth/blob/master/Readme.md)

## [Rework](https://github.com/reworkcss/rework)

# [css-modules](language/css/css-modules/index.html)
- 支持局部作用域、模块依赖。  
- 会编译类名：`<filename>_<className>_<randomHash>`  
- 生成css/js  

# temp
## bem
b(block) e(element) m(modifier)  
``` css
.btn{}
.btn__pirce{}
.btn--orange{}
```
less / sass
postcss
css in js
- 使用js编写样式。
- 可在浏览器中编译。
- 可使用node在服务端打包。  
- 代表是[jss]()  


