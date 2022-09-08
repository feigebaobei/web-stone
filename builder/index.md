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
- [other](/builder/other.html)
- [swc](/builder/swc.html)
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
|配置文件||rollup.config.js (esm / cjs / ts)||非必须，webpack.config.js (cjs)|||||||
|||||写法宽泛|||||||
|认知范围|esm / cjs|esm||js / json|||||||
|支持的语言||||coffeescript/ts/esnext/less/sass/stylus/elm|||||||
|支持的编写规范||||esm/cjs/amd/assets/wasm|||||||
|loader|||||||||||
|代码分割||动态引入时||动态引入时|||||||
|优先方|浏览器||||||||||
|默认|不打包||||||||||
|观察模式|支持|支持||支持|||||||
|排除项|支持|支持||支持|||||||
|输出|可按平台输出|指定规范，支持6种。|||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||

# todo
## 对builder的理解
把代码输入进去。它把代码输出出来。不改变运行逻辑，可以改变代码结构。
esbuild直接支持stdin输入。
rollup直接build.generater() // stdout输出。

## 代码分割
动态引入时使用import/require。import()返回一个promise.当在满足条件时才加载相关代码。即相关代码需要异步加载。builder使用代码分割懒加载代码。代码分割是为懒加载服务的。可以用于减小包体积、减小首屏加载时长、分成若干小包。




