# `vite`

## overview
> 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，
> 套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。
> node v14.18.0+  
> 它是一个工具集。把一些常用的工具放在一起了。（像不像门面模式）  
> 默认以`<root>/index.html`为主入口。   
> 在index.html中以`<script type="module" src="..." />`和`<link href="...">`处理js/css。vite会处理js/css的引入工作。  
> 可以实现多入口（即多页面）。  
> 使用 Vite 开发和使用一个静态文件服务器并没有太大区别。然而，Vite 还通过原生 ESM 导入提供了许多主要用于打包场景的增强功能。  
> 内部使用esbuild把要cjs/umd转换为esm（该过程叫预构建）。  
> 已内置支持ts  

### feature
- 开发服务器
- 构建命令

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





## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## configuration
默认配置文件：`path/to/file.json`。
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
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。