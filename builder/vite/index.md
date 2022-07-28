# `vite`

## overview
> 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，
> 套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。
> 强大的导入功能。
> node v14.18.0+  
> 它是一个工具集。把一些常用的工具放在一起了。（像不像门面模式）构建功能大部分是基于rollup(esbuild)的。而且面向现代浏览器。  
> 它运行的快，原来是因为基于esbuild、做了很少工作、面向现代浏览。能不干的事儿，全不干了。  

### feature
- 开发服务器
- 构建命令
- 默认以`<root>/index.html`为主入口。   
- 在index.html中以`<script type="module" src="..." />`和`<link href="...">`处理js/css。vite会处理js/css的引入工作。  
- 可以实现多入口（即多页面）。  
- 使用 Vite 开发和使用一个静态文件服务器并没有太大区别。然而，Vite 还通过原生 ESM 导入提供了许多主要用于打包场景的增强功能。  
- 内部使用esbuild把要cjs/umd转换为esm（该过程叫预构建）。  
- 已内置支持ts  

## install
一般不用明确安装。  
`npm i vite -g`

## usage
```shell
# 初始化一个项目
npm init vite@latest
npm create vite@latest # cteate 是 init 的别名
yarn create vite
pnpm create vite
```

## 功能
- 提供一个类似静态文件服务器的功能。  
- vite对原生esm导入做了很多增强功能。  
  - 使用esbuild完成预构建（cjs/umd => esm）
  - 重写导入为合法url  
  - 依赖是强缓存的。  
- 内置支持ts。不做类型检查。  
- esbuild做了
  - jsx / tsx
  - 预构建（cjs/umd => esm）
- 

### 设置esbuild配置项
```js
// vite.config.js
import {defineConfig} from 'vite'
export default defineConfig({
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'fragment'
    }
})
```

### css
- 导入的css文件会插入到style标签中。  
- `@import`内联和变基  
- postcss。需要项目中使用`postcss.config.js`配置文件。应用于已导入的css.  
- 以`.module.css`为后缀的css文件被认为是css moudes 文件。  
- 需要安装预处理器  
- 禁用css注入页面`import styles from './foo.css?inline'`  
- 导入静态资源`import imgUrl from './img.png'; document.querySelect(#id).src = imgUrl;`
- 导入json`import json from './foo.json`  
- glob导入 `import.meta.glob(params)`
  - 

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
  type: 'module'
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
会把多个chunk中共用的chunk一起打包。

## 插件
vite的插件是基于rollup的插件，只是增加一个vite的特有配置项。可以用于服务器。
```js
// 添加插件
npm add -D @vitejs/plugin-legacy

// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import image from '@rollup/plugin-image'
import {defineConfig} from 'vite'
export default defineConfig({
    plugins: [ // 可以接受多个插件。若无效则不使用。
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        {
            ...image(),
            enforce: 'pre' // 使用此字段明确指定本插件与vite core plugins的执行顺序。
            // pre 
            // default 默认post
            // post 
            apply: 'build' // 明确在哪个期间执行，默认2个期间都执行。
            // build
            // serve
        }
    ]
})
```

### 发现插件
[vite rollup plugins 的网站](https://vite-rollup-plugins.patak.dev/)

### 插件api
#### 习惯
推荐使用rollup的命名习惯。  
- 以`rollup-plugin-`开头
- 包括`rollup-plugin vite-plugin`关键字。  

若只对vite开发的插件。
- 以`vite-plugin-`开头
- 包括`vite-plugin`关键字。  
  - 也可以以特定框架说明`vite-plugin-vue-` / `vite-plugin-react-` / `vite-plugin-svelte-`

#### 插件的配置
一般这样使用插件
```js
// vite.config.js
import {defineConfig} from 'vite'
import {framework} from 'vite-plugin-frame-work'
export default defineConfig({
    plugins: [framework()]
})
```

```js
export default function myPlugin() {
    const virtualModuleId = 'virtual:my-module'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
    return {
        name: 'plugin-name',
        transform(src, id) {
            if (reg.test(id)) {
                return {
                    code: fn(src),
                    map: null
                }
            }
        },
        load(id) {
            if(id === resolvedVirtualModuleId) {
                return `export const msg = 'from virtual module'`
            }
        }
    }
}
```

##### virtual modules convention
把打包时的信息给源文件，用于esm语法导入。

#### 钩子
|||||
|-|-|-|-|
|options|在服务端调用一次|||
|buildStart|在服务端调用一次|||
|resolveId|每交进入模块时调用|||
|load|每交进入模块时调用|||
|transform|每交进入模块时调用|||
|buildEnd|当服务器关闭时调用|||
|closeBundle|当服务器关闭时调用|||

#### vite的钩子
不会作用于rollup  
||||||
|-|-|-|-|-|
|config|||||
|configResolved|||||
|configureServer|||||
|configurePreviewServer|||||
|transformIndexHtml|||||
|handleHotUpdate|||||

#### 插件的顺序
- alias
- 使用enforce: 'pre'的插件
- vite core 插件
- 未设置enforce的插件
- vite build 插件
- 使用enforce: 'post'的插件
- 打包后的插件（minify / manifest / reporting）

## 依赖预构建
- 兼容cjs/umd  
- 把多个esm依赖关系的内部模块转换为单个模块。  
- 自动依赖搜寻
  1. 从缓存中找
  2. 从node_modules中找
- 在一库多包中，自动侦测不在node_modules中的依赖项。  
- vite使用强缓存。`max-age=31536000,immutable`
- 文件系统缓存。当下列一个改变时重新运行预构建  
  - package.json中的dependencies
  - lockfile
  - vite.config.js
- 

## 静态资源
通过在导入时的url中设置qs.  

||||||
|-|-|-|-|-|
|引入静态资源。|在开发环境使用相对链接。||||
||在生产环境使用绝对链接。（从根路径开始）||||
|?url|导入一个url||||
|?raw|导入字符串||||
|?worker / ?sharedworker|导入为web worker||||
|?inline|导入为base64字符串||||

### poblic目录
- 不会被源码引用（例如 robots.txt）
- 必须保持原有文件名（没有经过 hash）
- ...或者你压根不想引入该资源，只是想得到其 URL。`<root>/public`

### new URL(url, import.meta.url)
import.meta.url中esm的原生功能。  
```js
let imgUrl = new URL('./img.png', import.mete.url).href
img.src = imgUrl // 使用
```

## 构建生产版本
### 公共基础路径
如果你需要在嵌套的公共路径下部署项目，只需指定 base 配置项。  
结果：在css中使用url() / html文件中的引用 都是基于引配置项的。
以命令行方式设置base。  
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

## 环境变量和模式
```js
import.meta.env.MODE        // 应用运行的模式
import.meta.env.BASE_URL    // 基本url.  base
import.meta.env.PROD        // 是否是生产环境
import.meta.env.DEV         // 是否是开发环境
import.meta.env.SSR         // 是否运行在server上
```

### `.env`文件
```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

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
      input: '/path/to/main.js'
    }
  }
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










## title
## title
## title
## title

## configuration
默认配置文件：`vite.config.js`。  
它是被node.js使用。  
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

|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
`vite.fn(param, first: string, second: boolean = true) => void`
description

`vite.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 服务端使用cjs规范，vite使用esm规范。vite是如何提供服务能力的？
> 官方文档写的太烂了。
> 如果一个项目需要维护4-5以上。不要用vue，用react。vue的迭代变化太大。vue的迭代问题，react都没有。
    > vue1 => vue2 => vue3 一次比一次变化大。从1到2还有一个一完全迁移工具。从2到3完全是重构。
    > vue团队急于求成。为了抢占市场，推出不完成产品。后期迭代变化巨大。好多api改变了用法。
> 如何才能做到写好文档
    > 写好项目（如：结构化）
    按功能模块写基本使用文档。说清如何使用基本功能。
    再整理一个完整api
    再聊一下运行逻辑、源码。
    如何扩展、做插件
> 我不喜欢这个项目。
> 未来迭代计划。