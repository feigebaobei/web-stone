# vite-plugin 应用篇

架构简图

```
|----------------------------------------------|
|    vite 工程化（如：模板）                      |
|                                              |
|  |---------------|    |---------------|      |
|  |   esbuild     |    |   rollup      |      |
|  |   生成esm      |    |   打包、插件   |      |
|  |               |    |               |      |
|  |---------------|    |---------------|      |
|                                              |
|----------------------------------------------|
```

插件分类
config 在解决 vite 配置前调用，接收原始用户配置，返回合并后的配置对象。 在此钩子中添加 plugin 无效。
configResolved 在解决 vite 配置后调用
configureServer 用于配置开发服务器的钩子
configurePreviewServer 用于配置预览服务器
transformIndexHtml 用于转换 html
handleHotUpdate 用于自定义 hmr 处理
插件的功能
打包功能：rollup 是一个打包器，它的插件都是用于打包的。vite 把插件转给 rollup 使用。
操作配置文件。vite 独有的钩子中可以操作用于 vite 的配置对象。

## [开发的几个插件](/builder/vite/plugin.html)
