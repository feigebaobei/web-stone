# vite

## overview

> [官网](https://vite.dev/guide/)
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
> 本地开发服务器+构建工具。  
> 根目录下的 index.html 为入口，若根目录下有多个 html 文件，是可以支持多入口。
> 分为预编译阶段（esbuild）和打包阶段（rollup）  
> 支持 ts

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
  - [css-modules](language/css/css-modules/index.html)
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
- 导入 json `import json from './foo.json`
- ## glob 导入 `import.meta.glob(params)`

```js
// 懒加载，动态导入实现。
const modules = import.meta.glob('./dir/*.js')
=> // 等价于
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

预构建就是 cjs/umd => esm 的过程。使用 esbuild 完成。

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

<!-- prettier-ignore-start -->
|                         |                                          |     |     |     |
| ----------------------- | ---------------------------------------- | --- | --- | --- |
| 引入静态资源。          | 在开发环境使用相对链接。                 |     |     |     |
|                         | 在生产环境使用绝对链接。（从根路径开始） |     |     |     |
| ?url                    | 导入一个 url                             |     |     |     |
| ?raw                    | 导入字符串                               |     |     |     |
| ?worker / ?sharedworker | 导入为 web worker                        |     |     |     |
| ?inline                 | 导入为 base64 字符串                     |     |     |     |
<!-- prettier-ignore-end -->

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

## [config](/builder/vite/config.html)

## [api](/builder/vite/api.html)

## [mode&NODE_ENV](/builder//vite/mode&NODE_ENV.html)

## principle

基于 esbuil/rollup 开发的。

### uml

```

```

## todo

> 服务端使用 cjs 规范，vite 使用 esm 规范。vite 是如何提供服务能力的？
> 如果一个项目需要维护 4-5 年以上。不要用 vue，用 react。vue 的迭代变化太大。vue 的迭代问题，react 都没有。
> vue1 => vue2 => vue3 迭代问题一次比一次变化大。从 1 到 2 还有一个一完全迁移工具。从 2 到 3 完全是重构。
> vue 团队急于求成。为了抢占市场，推出未完成产品。后期迭代变化巨大。好多 api 改变了用法。
> 如何才能做到写好文档
> 写好项目（如：结构化）

    按功能模块写基本使用文档。说清如何使用基本功能。
    再整理一个完整api
    再聊一下运行逻辑、源码。
    如何扩展、做插件

> vue 团队就喜欢搞些方便使用的畸型代码。把 data/methods 都放在 vm 上。把 VITE\_开头的变量放在 import.meta.env 上。  
> vite 自己做了什么？esbuild 做了什么？
> 未来迭代计划。
> 未来迭代计划。
