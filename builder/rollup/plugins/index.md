# overview
rollup的一站式插件库。
现在（2021/05/20）rollup的插件是这样的`@rollup/plugin-<name>`，以前是这样的`rollup-plugin-<name>`。不要用以前的，用现在的。未来更新的怎么办？我也不知道。
这是一个一库多包的仓库。

# list of plugin
|name|description|||
|-|-|-|-|
|alias|为打包定义、解决别名|||
|auto-install|自动安装bundle导入的依赖项|||
|babel|使用babel去编译文件|||
|beep|当出现错误、警告是使用系统的警告声。|||
|buble|使用buble编译es2015|||
|commonjs|把commonjs转化为es6|||
|data-uri|从data uri中引入模块|||
|dsv|使用`de-dsv`把`*.csv`/`*.tsv`转化为js|||
|dynamic-import-vars|解决包含变量的动态导入|||
|eslint|使用eslint检查入口和所有引入的文件|||
|graphql|把`*.gql`/`*.graphql`转化为es6模块|||
|image|引入jpg/png/git/svg/webp文件|||
|inject|扫描模块中的全局变量，并在必要时注入import语句|||
|json|把`*.json`转化为es6|||
|legacy|使用`export`处理传统的非模块脚本|||
|multi-entry|为打包使用多入口|||
|node-resolve|解决在`node_modules`中依赖|||
|replace|打包是取代文件中的字符串|||
|run|当打包完成时执行该包|||
|strip|移除包中的debugger声明，如console/assert.equal。|||
|sucrase|使用surase轮换ts/flow/jsx/……|||
|typescript|集成rollup+ts|||
|url|使用data-url或esm引入文件|||
|virtual|从内存中引入虚拟模块|||
|wasm|使用rollup引入webassembly代码|||
|yaml|把`*.yaml`转化为es6模块|||

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
- 收集最后一次发布的commit。
- 制定下一个版本号（包括：major, minor, patch）
- 更新package.json
- 生成一个新的ChangeLog入口.
- 为目标插件更新`CHANGELOG.md`。
- 使用`chore(release): <name>-v<version>`格式提交`packag.json`、`CHANGELOG.md`。
- 发布到npm
- 标记此次发布。格式：`<name>-v<version>`
- 推到远端仓库

## flags

|key|description||||
|-|-|-|-|-|
|--dry|执行演练脚本。跳过所有的文件修改，npm/git的动作。显示确定的版本、新添加的changelog||||
|--major, --minor, --patch|强制明确的语义化版本||||
|--no-push|不添加改变、tag到git||||
|--no-tag|发布是不打tag.||||

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
若想添加、讨论插件，请在twitter上联系@RollupJS。

# lifeCircle
# hooks
## load
加载器。
自定义加载器，由其他loader决定是否返回null.(最后的行为是从文件系统中加载文件。)此时不能使用parser.
此文方法已经使用`this.parse()`去解析了。该解析器会生成一个对象：
`{code, ast, map}`

## hookfn
## hookfn
## hookfn
## hookfn
## hookfn
## hookfn