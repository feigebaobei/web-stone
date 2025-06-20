# vite plugin

vite 的插件是基于 rollup 的插件，只是增加一个 vite 的特有配置项。可以用于服务器。

## 使用方法

```js
// 添加插件
pnpm add -D @vitejs/plugin-legacy

// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import image from '@rollup/plugin-image'
import {defineConfig} from 'vite'
export default defineConfig({
    plugins: [ // 可以接受多个插件。若插件无效则不使用它。
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        {
            ...image(),
            enforce: 'pre' // 使用此字段明确指定本插件与vite core plugins的执行顺序。
            // pre
            // post
            // default 默认post
            apply: 'build' // 明确在哪个期间执行，默认2个期间都执行。
            // build
            // serve
        }
    ]
})
```

## 发现插件

[vite rollup plugins 的网站](https://vite-rollup-plugins.patak.dev/)

## 插件 api

### 习惯

推荐使用 rollup 的命名习惯。

- 以`rollup-plugin-`开头
- 包括`rollup-plugin vite-plugin`关键字。

若只对 vite 开发的插件。

- 以`vite-plugin-`开头
- 包括`vite-plugin`关键字。
  - 也可以以特定框架说明`vite-plugin-vue-` / `vite-plugin-react-` / `vite-plugin-svelte-`

### 插件的配置

一般这样使用插件

```js
// vite.config.js
import { defineConfig } from 'vite'
import { framework } from 'vite-plugin-frame-work'
export default defineConfig({
  plugins: [framework()],
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
          map: null,
        }
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const msg = 'from virtual module'`
      }
    },
  }
}
```

#### virtual modules convention

把打包时的信息给源文件，用于 esm 语法导入。

### 钩子

|             |                    |     |     |
| ----------- | ------------------ | --- | --- |
| options     | 在服务端调用一次   |     |     |
| buildStart  | 在服务端调用一次   |     |     |
| resolveId   | 每次进入模块时调用 |     |     |
| load        | 每次进入模块时调用 |     |     |
| transform   | 每次进入模块时调用 |     |     |
| buildEnd    | 当服务器关闭时调用 |     |     |
| closeBundle | 当服务器关闭时调用 |     |     |

### vite 的钩子

不会作用于 rollup  
||||||
|-|-|-|-|-|
|config|`(config: UserConfig, env: {mode: S, command: S}) => UserConfig \| null \| void`|在解析 vite 配置前调用。接收原始用户配置，返回合并后（或改变后）的配置对象。|在此钩子中添加 plugin 无效。||
|configResolved|`(config: ResolvedConfig) => void \| Promise<void>`|在解析 vite 配置后调用。|||
|configureServer|`(server: ViteDevServer) => (() => void) \| void \| Promise<(() => void) \| void>`|用于配置开发服务器的钩子|||
|configurePreviewServer|`(server: PreviewServerForHook) => (() => void) \| void \| Promise<(() => void) \| void>`|用于配置预览服务器|||
|transformIndexHtml|`IndexHtmlTransformHook \| {order?: 'pre' \| 'post', hander: IndexHtmlTransformHook}`|用于转换 html|||
|handleHotUpdate|`(ctx: HmrContext) => Array<ModuleNode> \| void \| Promise<Array<ModuleNode> \| void>`|用于自定义 HMR 处理|||

### 插件的顺序

1. alias
1. 使用 enforce: 'pre'的插件
1. vite core 插件
1. 未设置 enforce 的插件
1. vite build 插件
1. 使用 enforce: 'post'的插件
1. 打包后的插件（minify / manifest / reporting）

这 7 个顺序是所有插件的执行顺序。插件作者能控制的只有三个。即：enforce 控制的三个执行节点。

## demo

```js
// 列出已经使用的插件
let clog = console.log
export default () => {
  return {
    name: 'vite-plugin-output',
    configResolved(config) {
      let pluginNameList = config.plugin.map(plugin => plugin.name)
      clog(`已经使用的插件：${pluginNameList.join('\n')}`)
    }
  }
}
// 分析请求的插件
let clog = console.log
export default () => {
  return {
    name: 'vite-plugin-request-analytics',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        clog(`${req.method}\t${req.url}`)
        next()
      })
    }
  }
}
// 列出热更新的文件
let clog = console.log
export default () => {
  return {
    name: 'vite-plugin-hot-update-report',
    handleHotUpdate({file, timestamp, modules}) {
      let date = new Date(timestamp)
      let [y, m, d, h, mn, s] = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ]
      clog(`${modules.length}个模块被更新，${y}-${m+1}-${d} ${h}:${mn}:${s}`)
      modules.forEach(m => {
        clog(`\t${m.url}`)
      })
    }
  }
}
// 写入打包结果的插件
import fs from 'fs'
import path from 'path'
let viteConfig = null
let clog = console.log
export default () => {
  return {
    name: 'vite-plugin-write',
    configResolved(config) {
      viteConfig = config
    },
    writeBundle() {
      let outDir = path.resolve(viteConfig.build.outDir || 'dist')
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir)
      }
      let fileOutPath = path.resolve(outDir, filename)
      fs.writeFileSync(fileOutPath, domain)
    }
  }
}
```
