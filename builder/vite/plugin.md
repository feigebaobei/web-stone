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
| resolveId   | 每交进入模块时调用 |     |     |
| load        | 每交进入模块时调用 |     |     |
| transform   | 每交进入模块时调用 |     |     |
| buildEnd    | 当服务器关闭时调用 |     |     |
| closeBundle | 当服务器关闭时调用 |     |     |

### vite 的钩子

不会作用于 rollup  
||||||
|-|-|-|-|-|
|config|`(config: UserConfig, env: {mode: S, command: S}) => UserConfig | null | void`|在解析 vite 配置前调用。接收原始用户配置，返回合并后（或改变后）的配置对象。|在此钩子中添加 plugin 无效。||
|configResolved|`(config: ResolvedConfig) => void | Promise<void>`|在解析 vite 配置后调用。|||
|configureServer|`(server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>`|用于配置开发服务器的钩子|||
|configurePreviewServer|`(server: PreviewServerForHook) => (() => void) | void | Promise<(() => void) | void>`|用于配置预览服务器|||
|transformIndexHtml|`IndexHtmlTransformHook | {order?: 'pre' | 'post', hander: IndexHtmlTransformHook}`|用于转换 html|||
|handleHotUpdate|`(ctx: HmrContext) => Array<ModuleNode> | void | Promise<Array<ModuleNode> | void>`|用于自定义 HMR 处理|||

### 插件的顺序

- alias
- 使用 enforce: 'pre'的插件
- vite core 插件
- 未设置 enforce 的插件
- vite build 插件
- 使用 enforce: 'post'的插件
- 打包后的插件（minify / manifest / reporting）

## title

## title

## title

## title
