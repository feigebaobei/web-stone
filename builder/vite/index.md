# vite

## overview

> 是一个开发时服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，
> 基于 rollup 提供打包功能，vite 插件也就是被 rollup 使用的。
> 基于 rollup 提供插件功能。
> 以 esm 规范提供代码。然后由浏览器处理。
> 套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。
> 强大的导入功能。
> 需要与支持 esm 语法的浏览器配合工作。
> node v14.18.0+  
> 它是一个工具集。把一些常用的工具放在一起了。（像不像门面模式）构建功能大部分是基于 rollup(esbuild)的。而且面向现代浏览器。  
> 它运行的快，原来是因为基于 esbuild、做了很少工作、面向现代浏览。能不干的事儿，全不干了。

### feature

- 开发服务器
- 构建命令
- 默认以`<root>/index.html`为主入口。
- 在 index.html 中以`<script type="module" src="..." />`和`<link href="...">`处理 js/css。vite 会处理 js/css 的引入工作。
- 可以实现多入口（即多页面）。
- 使用 Vite 开发和使用一个静态文件服务器并没有太大区别。然而，Vite 还通过原生 ESM 导入提供了许多主要用于打包场景的增强功能。
- 内部使用 esbuild 把要 cjs/umd 转换为 esm（该过程叫预构建）。
- 由 esbuild ts=>js
- 支持 ts
- 支持 hmr
- 预览功能。（先打包才能在本地预览）`npm run preview`

## install

一般不用明确安装。

```shell
npm i vite -g
pnpm install -g create-vite
```

## usage

```shell
# 初始化一个项目
npm init vite@latest
npm create vite@latest # cteate 是 init 的别名
yarn create vite
pnpm create vite
create-vite my-project
# 然后会提示选择什么模板。

vite # 启动
```

## 功能

- 提供一个类似静态文件服务器的功能。
- vite 对原生 esm 导入做了很多增强功能。
  - 使用 esbuild 完成预构建（cjs/umd => esm）
  - 重写导入为合法 url
  - 依赖是强缓存的。
- 内置支持 ts。不做类型检查。
- esbuild 做了
  - jsx / tsx
  - 预构建（cjs/umd => esm）
- hmr
- 使用 esbuild 完成 ts=>js
  - tsconfig.json
    - isolatedModules: true
    - useDefineForClassFields: true
- 把`*.css`放入`<style>`内。
  - postcss
  - css modules
  - css 预处理器
- 处理静态资源。把相对路径变为可解析的 url.
- 支持 worker
- 构建优化
  - css 代码分割
  - 生成预加载指令
  - 优化异步 chunk 加载

### 设置 esbuild 配置项

```js
// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'fragment',
  },
})
```

### css

- 导入的 css 文件会插入到 style 标签中。
- `@import`内联和变基
- postcss。需要项目中使用`postcss.config.js`配置文件。应用于已导入的 css.
- 以`.module.css`为后缀的 css 文件被认为是 css moudes 文件。
- 需要安装预处理器
- 禁用 css 注入页面`import styles from './foo.css?inline'`
- 导入静态资源`import imgUrl from './img.png'; document.querySelect(#id).src = imgUrl;`
- 导入 json`import json from './foo.json`
- ## glob 导入 `import.meta.glob(params)`

```js
// 懒加载，动态导入实现。
const modules = import.meta.glob('./dir/*.js')
=>
const modules = {
    // 以路径为key，值是返回Promise的方法
    './dir/foo.js': () => import('./dir/foo.js'),
    './dir/bar.js': () => import('./dir/bar.js')
}
// 使用modules对象的key访问相应的模块
for (let path in modules) {
    modules[path]().then((mod) => {...})
}
// 导入所有模块
const m = import.meta.glob('./dir/*.js', {eager: true})
=>
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const m = {
    './dir/foo.js': __glob__0_0,
    './dir/bar.js': __glob__0_1,
}
// 以字符串形式导入资源
const m = import.meta.glob('./dir/*.js', {as : 'raw'})
=>
const m = {
    './dir/foo.js': 'export default "foo"\n',
    './dir/bar.js': 'export default "bar"\n'
}
// 若as: 'url'，则把资源作为url加载。
// 多个匹配
const m = import.meta.glob(['./dir/*.js', './a/*.js'])
// 排除
const m = import.meta.glob(['./dir/*.js', '!**/bar.js'])
// 具名导入
const m = import.meta.glob('./dir/*.js', {import: 'setup'})
=>
const m = {
    './dir/foo.js': () => import('./dir/foo.js').then(m => m.setup),
    './dir/bar.js': () => import('./dir/bar.js').then(m => m.setup)
}
// import: 'setup', eager: true 会执行tree-shaking
// import: 'default' 会加载默认导出
// 自定义查询
const m = import.meta.glob('./dir/*.js', {
    query: {foo: 'bar', bar: true}
})
=>
const m = {
    './dir/foo.js': () => import('./dir/foo.js?foo=bar&bar=true').then(m => m.setup) // 没有使用具名导入。为什么只导入setup呢？
    './dir/bar.js': () => import('./dir/bar.js?foo=bar&bar=true').then(m => m.setup) // 没有使用具名导入。为什么只导入setup呢？
}
// 动态导入
const m = await import(`./dir/${file}.js`)
```

### web worker

```js
const worker = new Worker(new URL('./worker.js', import.meta.url))
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
})
// worker 脚本将在生产构建中编译成单独的 chunk。
// 可以在导入请求上添加 ?worker 或 ?sharedworker 查询参数来直接导入一个 web worker 脚本。
import MyWorker from './worker?worker'
const worker = new MyWorker()
// 想将 worker 内联为 base64 字符串，请添加 inline 查询参数：
import MyWorker from './worker?worker&inline'
// 添加 url 这个 query.会将一个 URL 的形式读取该 worker
import MyWorker from './worker?worker&url'
```

### 异步 Chunk 加载优化

会把多个 chunk 中共用的 chunk 一起打包。

## [cli](/builder/vite/cli.html)

## [插件](/builder/vite/plugin.html)

## 依赖预构建

就是 cjs/umd => esm 的过程。使用 esbuild 完成。

- 兼容 cjs/umd
- 把多个 esm 依赖关系的内部模块转换为单个模块。
- 自动依赖搜寻
  1. 从缓存中找
  2. 从 node_modules 中找
- 在一库多包中，不打包的依赖项目，分析并预处理依赖项目的依赖列表。可以使用`optimizeDeps.include / build.optimizeDeps.include`优化。
- vite 使用强缓存。`max-age=31536000,immutable`
- 文件系统缓存。当下列一个改变时重新运行预构建
  - package.json 中的 dependencies
  - lockfile
  - vite.config.js
-

### 缓存

- 文件系统缓存。有其一变动，则重新运行构建。
  - 锁文件。
  - 补丁文件
  - vite.config.js
  - NODE_ENV
- 浏览器缓存。有其一则不使用缓存。
  - 禁用缓存
  - `--force`选项。
  - 重新载入页面。

## 静态资源

通过在导入时的 url 中设置 qs.

|                         |                                          |     |     |     |
| ----------------------- | ---------------------------------------- | --- | --- | --- |
| 引入静态资源。          | 在开发环境使用相对链接。                 |     |     |     |
|                         | 在生产环境使用绝对链接。（从根路径开始） |     |     |     |
| ?url                    | 导入一个 url                             |     |     |     |
| ?raw                    | 导入字符串                               |     |     |     |
| ?worker / ?sharedworker | 导入为 web worker                        |     |     |     |
| ?inline                 | 导入为 base64 字符串                     |     |     |     |

### poblic 目录

- 不会被源码引用（例如 robots.txt）
- 必须保持原有文件名（没有经过 hash）
- ...或者你压根不想引入该资源，只是想得到其 URL。`<root>/public`

### new URL(url, import.meta.url)

import.meta.url 中 esm 的原生功能。

```js
let imgUrl = new URL('./img.png', import.mete.url).href
img.src = imgUrl // 使用
```

## 构建生产版本

默认入口是`<root>/index.html`。
vite 是从`*.html`文件开始打包的。

### 公共基础路径

如果你需要在嵌套的公共路径下部署项目，只需指定 base 配置项。  
结果：在 css 中使用 url() / html 文件中的引用 都是基于引配置项的。
以命令行方式设置 base。

```shell
vite build --base=/my/public/path/。
```

### 自定义构建

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: { // 调整低层rollup选项
      // https://rollupjs.org/guide/en/#big-list-of-options
    },
    watch: {...} // 文件变化时重新构建
    rollupOptions: { // 多入口打包
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html')
      }
    }
    lib: { // 当这个库要进行发布构建
        entry: resolve(__dirname, 'lib/main.js'),
        name: 'MyLib',
        // the proper extensions will be added
        fileName: 'my-lib'
    }
  }
})
```

## 部署静态站点

```
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview --port 8080"
  }
}
```

## [环境变量](/builder/vite/env.html)

## 服务端渲染

示例项目

- [vue3](https://github.com/vitejs/vite/tree/main/playground/ssr-vue)
- [react](https://github.com/vitejs/vite/tree/main/playground/ssr-react)

## 后端集成

```js
// vite.config.js
export default defineConfig({
  build: {
    // 在 outDir 中生成 manifest.json
    manifest: true,
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input: '/path/to/main.js',
    },
  },
})
```

```html
<!-- 如果是在开发环境中 -->
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/main.js"></script>
```

执行`vite build`后，会生成 [`manifest.json`](/browser/manifestJson.html) 文件

```json
{
  "main.js": {
    "file": "assets/main.4889e940.js",
    "src": "main.js",
    "isEntry": true,
    "dynamicImports": ["views/foo.js"],
    "css": ["assets/main.b82dbe22.css"],
    "assets": ["assets/asset.0ab0f9cd.png"]
  },
  "views/foo.js": {
    "file": "assets/foo.869aea0d.js",
    "src": "views/foo.js",
    "isDynamicEntry": true,
    "imports": ["_shared.83069a53.js"]
  },
  "_shared.83069a53.js": {
    "file": "assets/shared.83069a53.js"
  }
}
```

## configuration

默认配置文件：`vite.config.js`。  
它是被 node.js 使用。

```js
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})
// 异步配置 // js中总是优先异步。
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite 配置
  }
})
// 可以引用环境变量后使用。
import { defineConfig, loadEnv } from 'vite'
```

|              | key                            | 说明                                                                                                                                                                                               | 类型                                                                             | 默认值                                          | 其他枚举值   |        |          |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------- | ------------ | ------ | -------- | -------- | --- | --- |
| 共享配置     |                                |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | root                           | 项目根目录                                                                                                                                                                                         | string                                                                           | processs.cwd()                                  |              |        |          |
|              | base                           | 基础路径。（类似 html 中 base 标签）                                                                                                                                                               | string                                                                           | `'/'`                                           |              |        |          |
|              | mode                           | 模式                                                                                                                                                                                               | string                                                                           | 'development'                                   | 'production' |        |          |
|              | define                         | 定义全局常量替换方式                                                                                                                                                                               |                                                                                  |                                                 |              |        |          |
|              | plugins                        |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | publicDir                      | 静态资源服务的文件夹                                                                                                                                                                               |                                                                                  | 'public'                                        |              |        |          |
|              | cacheDir                       | 存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite 生成的某些缓存文件                                                                                                                         |                                                                                  | 'node_modules/.vite'                            |              |        |          |
|              | resovle.alias                  | 将会被传递到 @rollup/plugin-alias 作为 entries 的选项                                                                                                                                              |                                                                                  |                                                 |              |        |          |
|              | resovle.dedupe                 | 如果你在你的应用程序中有相同依赖的副本（比如 monorepos），请使用此选项强制 Vite 始终将列出的依赖项解析为同一副本（从项目根目录）。                                                                 |                                                                                  |                                                 |              |        |          |
|              | resovle.conditions             |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | resovle.mainFields             | 在解析包的入口点时尝试的字段列表。                                                                                                                                                                 |                                                                                  |                                                 |              |        |          |
|              | resovle.extensions             | 导入时想要省略的扩展名列表。                                                                                                                                                                       |                                                                                  | ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] |
|              |                                |                                                                                                                                                                                                    |
|              | resovle.preserveSymlinks       | 是否通过原始文件路径                                                                                                                                                                               |                                                                                  |                                                 |              |        |          |
|              | css.modules                    | 配置 CSS modules 的行为。选项将被传递给 postcss-modules                                                                                                                                            |                                                                                  |                                                 |              |        |          |
|              | css.postcss                    | 内联的 PostCSS 配置                                                                                                                                                                                |                                                                                  |                                                 |              |        |          |
|              | css.preprocessorOptions        | 指定传递给 CSS 预处理器的选项。                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | css.devSourcemap               | 在开发过程中是否启用 sourcemap。                                                                                                                                                                   |                                                                                  |                                                 |              |        |          |
|              | json.namedExports              | 是否支持从 .json 文件中进行按名导入。                                                                                                                                                              |                                                                                  | true                                            |              |        |          |
|              | json.stringify                 | 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。                                                           |                                                                                  |                                                 |              |        |          |
|              | esbuild                        | 传递给 esbuild 的配置项                                                                                                                                                                            |                                                                                  |                                                 |              |        |          |
|              | assetsInclude                  |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | logLevel                       | 调整控制台输出的级别，默认为 'info'。                                                                                                                                                              |                                                                                  |                                                 | 'info'       | 'warn' | 'error'  | 'silent' |     |     |
|              | clearScreen                    |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | envDir                         | 用于加载 .env 文件的目录                                                                                                                                                                           |                                                                                  |                                                 |              |        |          |
|              | envPrefix                      | 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。                                                                                                                         |                                                                                  | 'VITE\_'                                        |              |        |          |
|              | appType                        |                                                                                                                                                                                                    |                                                                                  |                                                 | 'spa'        | 'mpa'  | 'custom' |          |     |
| 服务器选项   |                                |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | server.host                    | 指定服务器应该监听哪个 IP 地址。                                                                                                                                                                   |                                                                                  | 'localhost'                                     |              |        |          |
|              | server.port                    | 指定开发服务器端口。                                                                                                                                                                               |                                                                                  | 5173                                            |              |        |          |
|              | server.strictPort              | 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。                                                                                                                                 |                                                                                  |                                                 |              |        |          |
|              | server.https                   | 启用 TLS + HTTP/2                                                                                                                                                                                  | boolean                                                                          | https.ServerOptions                             |              |        |          |          |
|              | server.open                    | 在开发服务器启动时自动在浏览器中打开应用程序。                                                                                                                                                     |                                                                                  |                                                 |              |        |          |
|              | server.proxy                   | 为开发服务器配置自定义代理规则。与 vue2 的代理很像。                                                                                                                                               | { key: options }                                                                 |                                                 |              |        |          |
|              | server.cors                    | 为开发服务器配置 CORS                                                                                                                                                                              | boolean / CorsOptions                                                            | 默认启用并允许任何源                            |              |        |          |
|              | server.headers                 | 指定服务器响应的 header。                                                                                                                                                                          |                                                                                  |                                                 |              |        |          |
|              | server.hmr                     | 禁用或配置 HMR 连接                                                                                                                                                                                |                                                                                  |                                                 |              |        |          |
|              | server.watch                   | 传递给 chokidar 的文件系统监听器选项。                                                                                                                                                             |                                                                                  |                                                 |              |        |          |
|              | server.middlewareMode          | 以中间件模式创建 Vite 服务器。（不含 HTTP 服务器）                                                                                                                                                 |                                                                                  |                                                 | 'ssr'        | 'html' |          |          |
|              | server.base                    | 在 HTTP 请求中预留此文件夹，用于代理 Vite 作为子文件夹时使用。应该以 / 字符开始和结束。                                                                                                            |                                                                                  |                                                 |              |        |          |
|              | server.fs.strict               | 限制为工作区 root 路径以外的文件的访问。                                                                                                                                                           |                                                                                  |                                                 |              |        |          |
|              | server.fs.allow                | 限制哪些文件可以通过 /@fs/ 路径提供服务。当 server.fs.strict 设置为 true 时，访问这个目录列表外的文件将会返回 403 结果。                                                                           |                                                                                  |                                                 |              |        |          |
|              | server.fs.deny                 | 用于限制 Vite 开发服务器提供敏感文件的黑名单。                                                                                                                                                     |                                                                                  | ['.env', '.env.*', '*.{pem,crt}']               |              |        |          |
|              | server.origin                  | 用于定义开发调试阶段生成资产的 origin。                                                                                                                                                            |                                                                                  |                                                 |              |        |          |
| 构建选项     |                                | 与服务器选项差不多                                                                                                                                                                                 |                                                                                  |                                                 |              |        |          |
|              | build.target                   | 设置最终构建的浏览器兼容目标。                                                                                                                                                                     |                                                                                  | 'modules'                                       |              |        |          |
|              | build.polyfillModulePreload    | 用于决定是否自动注入 module preload 的 polyfill.                                                                                                                                                   |                                                                                  |                                                 |              |        |          |
|              | build.outDir                   | 指定输出路径（相对于 项目根目录).                                                                                                                                                                  |                                                                                  |                                                 |              |        |          |
|              | build.assetsDir                | 指定生成静态资源的存放路径（相对于 build.outDir）。                                                                                                                                                |                                                                                  |                                                 |              |        |          |
|              | build.assetsInlineLimit        | 小于此阈值的导入或引用资源将内联为 base64 编码，                                                                                                                                                   |                                                                                  |                                                 |              |        |          |
|              | build.cssCodeSplit             | 启用/禁用 CSS 代码拆分。                                                                                                                                                                           |                                                                                  |                                                 |              |        |          |
|              | build.cssTarget                | 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，                                                                                                                                           |                                                                                  |                                                 |              |        |          |
|              | build.sourcemap                | 构建后是否生成 source map 文件                                                                                                                                                                     |                                                                                  |                                                 |              |        |          |
|              | build.rollupOptions            | 自定义底层的 Rollup 打包配置。                                                                                                                                                                     |                                                                                  |                                                 |              |        |          |
|              | build.commonjsOptions          | 传递给 @rollup/plugin-commonjs 插件的选项。                                                                                                                                                        | 这都要用一个配置项。要是再多几个插件，是不是会再多几个配置项呀。vue 团队真是神坑 |                                                 |              |        |          |
|              | build.dynamicImportVarsOptions | 传递给 @rollup/plugin-dynamic-import-vars 的选项。                                                                                                                                                 |                                                                                  |                                                 |              |        |          |
|              | build.lib                      | 构建为库                                                                                                                                                                                           |                                                                                  |                                                 |              |        |          |
|              | build.manifest                 | 当设置为 true，构建后将会生成 manifest.json 文件，                                                                                                                                                 |                                                                                  |                                                 |              |        |          |
|              | build.ssrManifest              | 构建也将生成 SSR 的 manifest 文件，                                                                                                                                                                |                                                                                  |                                                 |              |        |          |
|              | build.ssr                      | 生成面向 SSR 的构建                                                                                                                                                                                |                                                                                  |                                                 |              |        |          |
|              | build.minify                   | 设置为 false 可以禁用最小化混淆                                                                                                                                                                    | boolean 、 'terser' 、 'esbuild'                                                 | 'esbuild'                                       |              |        |          |
|              | build.terserOptions            | 传递给 Terser 的更多 minify 选项。                                                                                                                                                                 |                                                                                  |                                                 |              |        |          |
|              | build.write                    | 设置为 false 来禁用将构建后的文件写入磁盘。                                                                                                                                                        |                                                                                  |                                                 |              |        |          |
|              | build.emptyOutDir              |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | build.reportCompressedSize     | 启用/禁用 gzip 压缩大小报告。                                                                                                                                                                      | boolean                                                                          | true                                            |              |        |          |
|              | build.chunkSizeWarningLimit    | 规定触发警告的 chunk 大小。(kbs)                                                                                                                                                                   | number                                                                           | 500                                             |              |        |          |
|              | build.watch                    |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
| 预览选项     | 与上面的差不多                 |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | preview.host                   |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | preview.port                   |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | preview.strictPort             |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | preview.https                  |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | preview.open                   |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | preview.proxy                  |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | preview.cors                   |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
| 依赖优先选项 |                                |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | optimizeDeps.entries           | 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项（忽略了 node_modules、build.outDir、`__tests__` 和 coverage）。如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。 |                                                                                  |                                                 |              |        |          |
|              | optimizeDeps.exclude           | 在预构建中强制排除的依赖项。                                                                                                                                                                       |                                                                                  |                                                 |              |        |          |
|              | optimizeDeps.include           | 使用此选项可强制预构建链接的包。                                                                                                                                                                   | string[]                                                                         |                                                 |              |        |          |
|              | optimizeDeps.esbuildOptions    | 在部署扫描和优化过程中传递给 esbuild 的选项。                                                                                                                                                      |                                                                                  |                                                 |              |        |          |
|              | optimizeDeps.force             | 设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。                                                                                                                         |                                                                                  |                                                 |              |        |          |
| ssr 选项     |                                |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | ssr.external                   | 要为 SSR 强制外部化的依赖。                                                                                                                                                                        |                                                                                  |                                                 |              |        |          |
|              | ssr.noExternal                 | 列出的是防止被 SSR 外部化依赖项。                                                                                                                                                                  |                                                                                  |                                                 |              |        |          |
|              | ssr.target                     | SSR 服务器的构建目标。                                                                                                                                                                             | 'node' / 'webworker'                                                             | 'node'                                          |              |        |          |
|              | ssr.format                     | SSR 服务器的构建语法格式。                                                                                                                                                                         | 'esm' / 'cjs'                                                                    | 'esm'                                           |              |        |          |
| worker 选项  |                                |                                                                                                                                                                                                    |                                                                                  |                                                 |              |        |          |
|              | worker.format                  | worker 打包时的输出类型。                                                                                                                                                                          | 'es' / 'iife'                                                                    | 'iife'                                          |              |        |          |
|              | worker.plugins                 | 应用于 worker 打包的 Vite 插件。                                                                                                                                                                   |                                                                                  |                                                 |              |        |          |
|              | worker.rollupOptions           | 用于打包 worker 的 Rollup 配置项。                                                                                                                                                                 |                                                                                  |                                                 |              |        |          |

## title

## title

## title

## title

## [api](/builder/vite/api.html)

## principle

基于 esbuil/rollup 开发的。

### uml

```

```

## todo

> 服务端使用 cjs 规范，vite 使用 esm 规范。vite 是如何提供服务能力的？
> 官方文档写的太烂了。
> 如果一个项目需要维护 4-5 以上。不要用 vue，用 react。vue 的迭代变化太大。vue 的迭代问题，react 都没有。
> vue1 => vue2 => vue3 一次比一次变化大。从 1 到 2 还有一个一完全迁移工具。从 2 到 3 完全是重构。
> vue 团队急于求成。为了抢占市场，推出不完成产品。后期迭代变化巨大。好多 api 改变了用法。
> 如何才能做到写好文档
> 写好项目（如：结构化）

    按功能模块写基本使用文档。说清如何使用基本功能。
    再整理一个完整api
    再聊一下运行逻辑、源码。
    如何扩展、做插件

> 我不喜欢这个项目。
> vue 团队就喜欢搞些方便使用的畸型代码。把 data/methods 都放在 vm 上。把 VITE\_开头的变量放在 import.meta.env 上。  
> vite 自己做了什么？esbuild 做了什么？
> 未来迭代计划。
> 未来迭代计划。
