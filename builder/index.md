- [webpack5](/builder/webpack5/index.html)
  - [webpack-cli](/jsPackages/webpackCli.html) 在命令行中运行 webpack 待完成
- [rollup](/builder/rollup/index.html)
- [grunt](/builder/grunt/index.html)
- [gulp](/builder/gulp/index.html)
  - 任务执行器
- [snowpack](/builder/snowpack/index.html)
  - 打包为 esm。需要运行器支持 esm.
  - 基于`esbuild`/`rollup`开发。
  - 快。
- [vite](/builder/vite/index.html)
- [parcel](/builder/parcel.html)
- [esbuild](/builder/esbuild.html)
- [spago](/builder/spago.html)
- [rome](/builder/rome/index.html)
- [ast](/builder/ast.html)
- [swc](/builder/swc.html)
- [make](/builder/make.html) 可能有它
- [Browserify](/builder/Browserify.html)
- [RequireJS](/builder/RequireJS.html)
- [SystemJS](/builder/SystemJS.html)
- [turbopack](/builder/turbopack/index.html)
- [tsup](/builder/tsup/index.html)
- [microbundle](/builder/microbundle.html)
- [father](/builder/father.html)
- [other](/builder/other.html)
- [other](/builder/other.html)

# esbuild & rollup & xxx & xxx

|                        | esbuild                                                                                                                                     | rollup                            | showpack                    | webpack5                                                            |     |     |     |     |     |     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------- | ------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| 编写语言               | go/ts/js                                                                                                                                    | js/ts                             |                             |                                                                     |     |     |     |     |     |     |
| 基础包                 | 无。基于自研的 esbuild 家族开发                                                                                                             | esbuild                           |                             |                                                                     |     |     |     |     |     |     |
|                        | 不使用缓存                                                                                                                                  | 可以使用缓存                      |                             |                                                                     |     |     |     |     |     |     |
| 插件                   | 可简单的插件                                                                                                                                | 可插件                            |                             |                                                                     |     |     |     |     |     |     |
|                        |                                                                                                                                             | 通常是方法                        |                             | 通常是实例，可使用多次。                                            |     |     |     |     |     |     |
| 内置插件               |                                                                                                                                             |                                   |                             |                                                                     |     |     |     |     |     |     |
|                        | 不支持缓存                                                                                                                                  | 支持缓存                          |                             |                                                                     |     |     |     |     |     |     |
| tree-shaking           | esm                                                                                                                                         | 使用静态分析支持 tree-shaking     |                             | 使用静态分析支持 tree-shaking                                       |     |     |     |     |     |     |
| sourcemap              | 支持                                                                                                                                        | 支持                              |                             | 支持                                                                |     |     |     |     |     |     |
| 用法                   | cli / js / go                                                                                                                               | cli / js                          |                             | cli / js                                                            |     |     |     |     |     |     |
| 配置文件               | cjs                                                                                                                                         | rollup.config.js (esm / cjs / ts) |                             | 非必须，webpack.config.js (cjs)                                     |     |     |     |     |     |     |
|                        | 可从 cli 中得到自定义选项                                                                                                                   |                                   |                             | 写法宽泛                                                            |     |     |     |     |     |     |
| 认知范围               | esm / cjs / jsx                                                                                                                             | esm                               |                             | js / json                                                           |     |     |     |     |     |     |
| 支持的语言             |                                                                                                                                             |                                   |                             | coffeescript/ts/esnext/less/sass/stylus/elm                         |     |     |     |     |     |     |
| 支持的编写规范         |                                                                                                                                             |                                   |                             | esm/cjs/amd/assets/wasm                                             |     |     |     |     |     |     |
| loader                 | 有                                                                                                                                          | 没有 loader。使用 plugin 实现。   |                             | 有很多                                                              |     |     |     |     |     |     |
|                        | 以扩展名判断                                                                                                                                |                                   |                             | 以扩展名判断                                                        |     |     |     |     |     |     |
| 代码分割               |                                                                                                                                             | 动态引入时                        |                             | 1.多入口。2.入口中明确依赖或使用 splitchunkplugin 插件 3.动态引入时 |     |     |     |     |     |     |
| 优先方                 | 浏览器                                                                                                                                      |                                   |                             |                                                                     |     |     |     |     |     |     |
| 默认                   | 不打包                                                                                                                                      |                                   |                             |                                                                     |     |     |     |     |     |     |
| 观察模式               | 支持                                                                                                                                        | 支持                              |                             | 支持                                                                |     |     |     |     |     |     |
| 排除项                 | 支持                                                                                                                                        | 支持                              |                             | 支持                                                                |     |     |     |     |     |     |
| 输出                   | iife/cjs/esm，也可按平台输出                                                                                                                | 指定规范，支持 6 种。             |                             | 面向运行环境输出。打库包时有丰富的输出选项。                        |     |     |     |     |     |     |
| 控制 package.json 字段 | 有一些                                                                                                                                      |                                   |                             |                                                                     |     |     |     |     |     |     |
| 不足                   | 但一些针对构建应用的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS 处理方面。esbuild vs rollup。Rollup 在应用打包方面, 更加成熟和灵活。 |                                   |                             |                                                                     |     |     |     |     |     |     |
|                        | 工程化特性较少，不适用于大型项目。                                                                                                          |                                   |                             |                                                                     |     |     |     |     |     |     |
|                        | 有观察模式，不支持 hmr                                                                                                                      |                                   |                             |                                                                     |     |     |     |     |     |     |
| 文档                   | -                                                                                                                                           | -                                 | -                           | 写的最好                                                            |     |     |     |     |     |     |
| hmr                    | 不支持                                                                                                                                      | 不支持                            |                             | 支持                                                                |     |     |     |     |     |     |
| api                    | 5 个 api 就够用了                                                                                                                           | 只有一个 api，不能一次打包多个。  | 2 个 api.可以一次打包多个。 |                                                                     |     |     |     |     |     |     |
|                        |                                                                                                                                             |                                   |                             |                                                                     |     |     |     |     |     |     |
|                        |                                                                                                                                             |                                   |                             |                                                                     |     |     |     |     |     |     |
|                        |                                                                                                                                             |                                   |                             |                                                                     |     |     |     |     |     |     |

# todo

## 对 builder 的理解

把代码输入进去。它把代码输出出来。不改变运行逻辑，可以改变代码结构。
esbuild 直接支持 stdin 输入。
rollup 直接 build.generater() // stdout 输出。

## 代码分割

动态引入时使用 import/require。import()返回一个 promise.当在满足条件时才加载相关代码。即相关代码需要异步加载。builder 使用代码分割懒加载代码。代码分割是为懒加载服务的。可以用于减小包体积、减小首屏加载时长、分成若干小包。

## title

读完这几个打包工具后，发现它们对项目结构、框架没有影响。即：在项目开发中期是发现早期选择的打包工具不好用了，再换也来得及，没有多大影响。

## 打包器的基本功能

- loader
- 代码分割
- tree-shaking
- 插件
- watch
- 压缩
- sourcemap
- 处理资源
