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
|内置插件|||||||||||
||不支持缓存|支持缓存|||||||||
|||使用静态分析支持tree-shaking||使用静态分析支持tree-shaking|||||||
|sourcemap||支持|支持||||||||
|用法|cli / js / go|cli / js||cli / js|||||||
|配置文件||rollup.config.js||非必须，webpack.config.js|||||||
|认知范围||esm||js / json|||||||
|loader|||||||||||
|代码分割||动态引入时||动态引入时|||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
||||||||||||
