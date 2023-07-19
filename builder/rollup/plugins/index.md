# overview

- rollup 的一站式插件库。
- 现在（2021/05/20）rollup 的插件是这样的`@rollup/plugin-<name>`，以前是这样的`rollup-plugin-<name>`。请使用现在的。
- 这是一个一库多包的仓库。

# demo

不会

```js

```

# 惯例

- 以`rollup-plugin-`开头。
- 在 package.json 中写上 rollup-plugin 关键字
- 发布前测试。推荐使用[mocha]()/[ava]()
- 优先使用异步方法
- 请使用英文编写文档
- 尽量输出 sourcemap
- 若使用到了 virtual modules，则请以\0 开头命名 module ID

# properties

name 插件的名字，在错误、警告时使用。

# build hooks

- 在打包时调用的方法。
- 参数为打包信息
- build hooks 存在于 build 阶段。由`rollup.rollup(inputOptions)`触发。
- 最开始是`options`，若无错误，则最后一个是`buildEnd`，否则最后一个是`closeBundle`。
- 在观察模式下`watchChange`会在任意时间触发。
- `closeWatcher`关闭观察模式

hooks 的种类

- async 必须返回 Promise 对象
- first 若一些插件都设置此值，则依次执行，直到 hook 返回不是 null/undefined
- sequential 若一些插件都设置此值，则依次执行。若 hook 是 async，则等待前面的 hook 为 resolved 时执行。
- parallel 若一些插件都设置此值，则按照特定顺序执行。若 hook 是 async，则不等待当前 hook 执行结束就执行。

hooks 可以是方法，也可以是对象。若是对象，则可类型为：

```ts
type XXXX = {
  order: 'pre' | 'post' | null // 指定在一系统插件中何时执行此插件
  sequential: boolean // 只能用于parallel hook，是否并行执行。常用于是否等待前面的插件的结果。
}
```

![流程图]()

|                             | type                              | kind             | 前 hook                                         | 后 hook                      | 说明                                                                              |     |
| --------------------------- | --------------------------------- | ---------------- | ----------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------- | --- |
| buildEnd                    | `(error?: Error) => void`         | aysnc / parallel | moduleParsed / resolveId / resolveDynamicImport | -                            | 最后钩子。它后面是`generate / write`。若打包时有错，则抛出错误。可以写为 promise. |     |
| buildStart                  | `(options: InputOptions) => void` | async / parallel | options                                         | resovleId 并行解决每一个入口 | 接收`rollup.rollup()`的参数                                                       |     |
| closeWatcher                | `() => void`                      | async / parallel | -                                               | -                            | 当有新的`watchChange`事件时触发。                                                 |     |
| load                        |                                   |                  |                                                 |                              |                                                                                   |     |
| moduleParsed                |                                   |                  |                                                 |                              |                                                                                   |     |
| options                     |                                   |                  |                                                 |                              |                                                                                   |     |
| resolveDynamicImport        |                                   |                  |                                                 |                              |                                                                                   |     |
| resolveId                   |                                   |                  |                                                 |                              |                                                                                   |     |
| shouldTransformCachedModule |                                   |                  |                                                 |                              |                                                                                   |     |
| transform                   |                                   |                  |                                                 |                              |                                                                                   |     |
| watchChange                 |                                   |                  |                                                 |                              |                                                                                   |     |

## 基本结构

```js

```

# list of plugin

| name                | description                                         |     |     |
| ------------------- | --------------------------------------------------- | --- | --- |
| alias               | 为打包定义、解决别名                                |     |     |
| auto-install        | 自动安装 bundle 导入的依赖项                        |     |     |
| babel               | 使用 babel 去编译文件                               |     |     |
| beep                | 当出现错误、警告是使用系统的警告声。                |     |     |
| buble               | 使用 buble 编译 es2015                              |     |     |
| commonjs            | 把 commonjs 转化为 es6                              |     |     |
| data-uri            | 从 data uri 中引入模块                              |     |     |
| dsv                 | 使用`de-dsv`把`*.csv`/`*.tsv`转化为 js              |     |     |
| dynamic-import-vars | 解决包含变量的动态导入                              |     |     |
| eslint              | 使用 eslint 检查入口和所有引入的文件                |     |     |
| graphql             | 把`*.gql`/`*.graphql`转化为 es6 模块                |     |     |
| image               | 引入 jpg/png/git/svg/webp 文件                      |     |     |
| inject              | 扫描模块中的全局变量，并在必要时注入 import 语句    |     |     |
| json                | 把`*.json`转化为 es6                                |     |     |
| legacy              | 使用`export`处理传统的非模块脚本                    |     |     |
| multi-entry         | 为打包使用多入口                                    |     |     |
| node-resolve        | 解决在`node_modules`中依赖                          |     |     |
| replace             | 打包是取代文件中的字符串                            |     |     |
| run                 | 当打包完成时执行该包                                |     |     |
| strip               | 移除包中的 debugger 声明，如 console/assert.equal。 |     |     |
| sucrase             | 使用 surase 轮换 ts/flow/jsx/……                     |     |     |
| typescript          | 集成 rollup+ts                                      |     |     |
| url                 | 使用 data-url 或 esm 引入文件                       |     |     |
| virtual             | 从内存中引入虚拟模块                                |     |     |
| wasm                | 使用 rollup 引入 webassembly 代码                   |     |     |
| yaml                | 把`*.yaml`转化为 es6 模块                           |     |     |

[other plugin](https://github.com/rollup/plugins/tree/master/packages/pluginutils)

# contributing

这是一个使用`pnpm`管理的一库多包库。
`npm i pnpm -g`

## working with plugin packages

保持所有的插件包都在`packages`目录中。

```
// 在本地指定的包中添加指定的依赖
pnpm add <package> --filter ./packages/<name>
// 发布
pnpm run publish -- <name> [flags]
```

包请遵守`@rollup/plugin-<name>`的规则。
发布时过程（逻辑）：

- 收集最后一次发布的 commit。
- 制定下一个版本号（包括：major, minor, patch）
- 更新 package.json
- 生成一个新的 ChangeLog 入口.
- 为目标插件更新`CHANGELOG.md`。
- 使用`chore(release): <name>-v<version>`格式提交`packag.json`、`CHANGELOG.md`。
- 发布到 npm
- 标记此次发布。格式：`<name>-v<version>`
- 推到远端仓库

## flags

| key                       | description                                                                          |     |     |     |
| ------------------------- | ------------------------------------------------------------------------------------ | --- | --- | --- |
| --dry                     | 执行演练脚本。跳过所有的文件修改，npm/git 的动作。显示确定的版本、新添加的 changelog |     |     |     |
| --major, --minor, --patch | 强制明确的语义化版本                                                                 |     |     |     |
| --no-push                 | 不添加改变、tag 到 git                                                               |     |     |     |
| --no-tag                  | 发布是不打 tag.                                                                      |     |     |     |

## running test

```
pnpm run test
// 测试所有有修改的文件
pnpm run test --filter ./packages/<name>
// 测试指定的包
pnpm run lint
// 检查所有有修改的文件的拼写
pnpm run lint --filter ./packages/<name>
// 检查指定包的拼写
```

# adding plugins

若想添加、讨论插件，请在 twitter 上联系@RollupJS。

# lifeCircle

# hooks

## load

加载器。
自定义加载器，由其他 loader 决定是否返回 null.(最后的行为是从文件系统中加载文件。)此时不能使用 parser.
此文方法已经使用`this.parse()`去解析了。该解析器会生成一个对象：
`{code, ast, map}`

## hookfn

## hookfn

## hookfn

## hookfn

## hookfn
