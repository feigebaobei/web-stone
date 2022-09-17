- [webpack5](/builder/webpack5/index.html)
- [rollup](/builder/rollup/index.html)
- [grunt](/builder/grunt/index.html)
- [gulp](/builder/gulp/index.html)  
  - 任务执行器
- [snowpack](/builder/snowpack/index.html)
  - 打包为esm。需要运行器支持esm.
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
- [other](/builder/other.html)
- [other](/builder/other.html)
- [other](/builder/other.html)
- [other](/builder/other.html)
- [other](/builder/other.html)
- [other](/builder/other.html)

# esbuild & rollup & xxx & xxx
||esbuild|rollup|showpack|webpack5|||||||
|-|-|-|-|-|-|-|-|-|-|-|
|编写语言|go/ts/js|js/ts|||||||||
|基础包|无。基于自研的esbuild家族开发|esbuild|||||||||
||不使用缓存|可以使用缓存|||||||||
|插件|可简单的插件|可插件|||||||||
|||通常是方法||通常是实例，可使用多次。|||||||
|内置插件|||||||||||
||不支持缓存|支持缓存|||||||||
|tree-shaking|esm|使用静态分析支持tree-shaking||使用静态分析支持tree-shaking|||||||
|sourcemap|支持|支持||支持|||||||
|用法|cli / js / go|cli / js||cli / js|||||||
|配置文件|cjs|rollup.config.js (esm / cjs / ts)||非必须，webpack.config.js (cjs)|||||||
||可从cli中得到自定义选项|||写法宽泛|||||||
|认知范围|esm / cjs / jsx|esm||js / json|||||||
|支持的语言||||coffeescript/ts/esnext/less/sass/stylus/elm|||||||
|支持的编写规范||||esm/cjs/amd/assets/wasm|||||||
|loader|有|没有loader。使用plugin实现。||有很多|||||||
||以扩展名判断|||以扩展名判断|||||||
|代码分割||动态引入时||动态引入时|||||||
|优先方|浏览器||||||||||
|默认|不打包||||||||||
|观察模式|支持|支持||支持|||||||
|排除项|支持|支持||支持|||||||
|输出|iife/cjs/esm，也可按平台输出|指定规范，支持6种。|||||||||
|控制package.json字段|有一些||||||||||
|不足|但一些针对构建应用的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS处理方面。esbuild vs rollup。Rollup 在应用打包方面, 更加成熟和灵活。||||||||||
||工程化特性较少，不适用于大型项目。||||||||||
||有观察模式，不支持hmr||||||||||
|文档|-|-|-|写的最好|||||||
|hmr|不支持|不支持||支持|||||||
||||||||||||

# todo
## 对builder的理解
把代码输入进去。它把代码输出出来。不改变运行逻辑，可以改变代码结构。
esbuild直接支持stdin输入。
rollup直接build.generater() // stdout输出。

## 代码分割
动态引入时使用import/require。import()返回一个promise.当在满足条件时才加载相关代码。即相关代码需要异步加载。builder使用代码分割懒加载代码。代码分割是为懒加载服务的。可以用于减小包体积、减小首屏加载时长、分成若干小包。

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



