# 可公共维护（可插件、可扩展）的项目

要做成这样也不太难。webpack/rollup/babel 都已经做成了。
本文就总结一下它们是怎么做成的。

## 可插件化

在流式处理是多用到插件。  
一个系统中由一个核心模块、插件模块组成。核心模块完成主要功能。插件模块为核心模块提供可插件功能（注册插件和调用插件）。只有一个核心无法完成可插件功能。  
二个模块之间是兄弟关系。（如古人云：他山之石，可以攻玉。）  
[plugincomb](https://www.npmjs.com/package/plugincomb)  
[tapable 日后改为本地的 readme](https://www.npmjs.com/package/tapable)

### 实现方式

- 增强功能型
  - vue
- 流水线型
  - webpack
- 钩子型
  - react
