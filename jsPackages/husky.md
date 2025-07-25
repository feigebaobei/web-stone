# husky

## overview

> 让 git hooks 使用简单。  
> 常用于格式化代码、触发 webhook 等。  
> 有很多包在使用它开发。

### feature

- feature0
- feature1
- feature2

## install

`npm i husky -D`

### 推荐手动

我会手动。知道它做了什么。不知道运行自动它做了什么。

```shell
npm set-script test "echo hi" # 用于测试。
# npm set-script prepare "husky install"  # 旧写法
npm pkg set scripts.prepare="husky install"     # 新写法
npm run prepare # 本质是执行了husky install
# 会在根目录下生成 .husky/.gitignore .husky/husky.sh
npx husky add .husky/pre-commit "npm run test" # 注意这里使用的npx
```

## usage

```shell
npm set-script prepare "husky install" # prepare在执行npm run install / npm publish / npm pack / 打包前执行。
# 该命令会创建.husky/目录并指定该目录为git hooks所在的目录。
# 这样可在每次安装后自动启用hooks，可以执行：
# 钩子如下 preinstall -> install -> postinstall -> prepublish -> preprepare -> prepare -> postprepare
# prepare是npm的钩子。
npm run prepare # 会在根目录下生成 .husky/_/.gitignore .husky/_/husky.sh
npm set-script test "echo hi" # 用于测试。
npx husky add .husky/pre-commit "npm run test" # 创建 .husky/pre-commit文件。在该文件中调用测试脚本
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \"\$1\"" # 创建 .husky/commit-msg文件。在该文件中调用测试脚本
npx husky add .husky/pre-push "npm run test" # 创建 .husky/pre-push文件。在该文件中调用测试脚本
# 然后就可以在pre-commit hook上执行命令了。
git add .husky/pre-commit # 这里是shell脚本
git commit -m 'string'
# 输出： hi
```

## uninstall

```shell
npm uninstall husky && git config --unset core.hooksPath
yarn remove husky && git config --unset core.hooksPath
```

## action

### 在 momorepo（一库多包）中使用 husky 时需要在根目录上安装。

子目录中无.git 目录。  
husky 是与 git hooks 一起工作，当然要与.git 在一起呀。  
子目录都不是一个仓库。

### 自定义安装目录

```shell
# 脚本
"prepare": "husky install .config/husky"
```

### bypass hooks

路过 hooks

```shell
git commit -m 'string' --no-verify
# or
HUSKY=0 git push
```

### with npm

```
npm ci --omit=dev --ignore-scripts

#or
npm set-secript prepare ''
npm ci --omit=dev
```

### with a custom script

```
"prepare": "node ./file.js"
```

```js
// ./file.js
const isCi = process.env.CI !== undefined
if (!isCi) {
  require('husky').install()
}
```

### 只支持客户端 git hooks

|                    |                                                    |     |     |
| ------------------ | -------------------------------------------------- | --- | --- |
| pre-commit         | git commit 生效前触发                              |     |     |
| prepare-commit-msg | 提交对象创建完之后、在提交信息编辑器显示之前触发。 |     |     |
| commit-msg         | 在提交信息编辑器关闭后、提交对象生成之前触发。     |     |     |
| post-commit        | 在提交完后触发                                     |     |     |
| pre-rebase         | 在 git rebase 前触发                               |     |     |
| post-checkout      | 在 git checkout 或 git switch 之后触发             |     |     |
| post-merge         | 在 git merge 后触发                                |     |     |
| pre-push           | 在 git push 前触发                                 |     |     |

服务器的钩子
|||||
|-|-|-|-|
|pre-receive|在收到数据前触发。|||
|update|在每个引用更新前触发|||
|post-receive|在收到数据后触发。|||

## 环境变量

HUSKY_SKIP_HOOKS is replaced by HUSKY.
HUSKY_SKIP_INSTALL is replaced by HUSKY.
HUSKY_GIT_PARAMS is removed. Instead Git parameters should be used directly in scripts (e.g. $1).
PATH for locally installed tools is not automatically set anymore. You'll need to use your package manager to run

|                    |                                |     |     |
| ------------------ | ------------------------------ | --- | --- |
| HUSKY_SKIP_HOOKS   | 已经被代替为 HUSKY             |     |     |
| HUSKY_SKIP_INSTALL | 已经被代替为 HUSKY             |     |     |
| HUSKY_GIT_PARAMS   | 已经被移除。请使用脚本。eg: $1 |     |     |
| PATH               | 需要使用 npm 去运行            |     |     |

## configuration

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api

`husky.fn(param, first: string, second: boolean = true) => void`
description

`husky.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## husky 与 prettier/commitlint/lint-staged 结合使用

```
这是伪代码
prettier
  npm i -D -E prettier
  crtp initFile .prettierrc.json

lint-staged
  npm i -D lint-staged
  crtp initFile .lintstagedrc

commitlint
  npm install -D @commitlint/config-conventional @commitlint/cli
  crtp initFile commitlint.config.js

husky
  npm i husky -D
  # npm set-script test "echo hi" # 用于测试。
  # npm set-script prepare "husky install"  # 旧写法
  npm pkg set scripts.prepare="husky install"     # 新写法
  npm run prepare
  # 会在根目录下生成 .husky/.gitignore .husky/husky.sh
  npx husky add .husky/pre-commit "npm run test"
  npx husky add .husky/commit-msg "npx --no-install commitlint --edit \"$1\""
  npx husky add .husky/pre-push "npm run test"
  # npx husky add .husky/pre-commit "npm run test"
```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
