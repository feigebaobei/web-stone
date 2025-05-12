# `pnpm`

## overview

|     |                           |                                                        |
| --- | ------------------------- | ------------------------------------------------------ |
| 快  | 比 npm/yarn 提速 2 倍以上 | 使用“可寻址文件系统”（content-addressable filesystem） |
|     |                           |                                                        |
|     |                           |                                                        |
|     |                           |                                                        |
|     |                           |                                                        |
|     |                           |                                                        |

> 快速、有效.  
> 支持一库多包。  
> 创建非平的 node_modules(树型的)。不支持直接访问包。  
> 通过指定工作空间去实现。  
> 与`corepack`一起工作。

### feature

- 多包一库管理工具。
- 包管理工具，比 npm/yarn 强大。用法上与竞品无区别，内部逻辑不同。
- 会检验所有参数。若一个参数出错，则无法执行。
- pnpm run cmd <=> pnpm cmd. 若找到具名脚本则执行引脚本，否则当作 shell 执行。
- pnpm 使用 npm 的配置。
- 有自己的锁文件。
- 管理 node 环境。

## install

### 非 node.js 环境

```shell
// posix system
curl -fsSL https://get.pnpm.io/install.sh | sh -
// or
wget -qO- https://get.pnpm.io/install.sh | sh -
brew install pnpm
winget install pnpm
scoop install nodejs-lts pnpm
choco install pnpm
```

### node.js 环境

```shell
// macos
curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
// windows
(Invoke-WebRequest 'https://get.pnpm.io/v6.16.js' -UseBasicParsing).Content | node - add --global pnpm
```

### 使用其他包管理工具安装

```shell
npm i pnpm -g
# or
yarn global add pnpm
```

## usage

在 node v16.13+ 发布了 corepack 来管理包管理工具。但是它默认不启用。需要执行`corepack enable`才能启动。

```shell
pnpm install <packageName>
pnpm add pn # 安装到dependencies
pnpm add -D pn # 安装到devDependencies
pnpm add -O pn
pnpm add -g pn
pnpm add pn@next
pnpm add pn@3.0.0
pnpm install # => npm install
pnpm add <pkg> # => npm i <pkg>
pnpm <cmd> # => npm run <cmd>
```

### 定义别名

在`.bashrc`或`.zshrc`或` .fish`中添加：`alias pn=pnpm`

### uninstall

```shell
pnpm ls -g # 列出所有全局包
pnpm rm -g <pkg>... # 列出每个全局包
pnpm root -g # 找到全局目录的位置并手动删除它
# 使用独立脚本安装后，使用此命令移除
rm -rf $PNPM_HOME
# 使用npm安装后，使用此命令移除
npm rm -g pnpm
rm -rf $(pnpm store path) # 删除全局内容可寻址存储
```

### 过滤

```
pnpm --filter
pnpm --filter ./packages/<name> add <package>
```

## configuration

使用`npm`的配置
默认配置文件：`<root>/.npmrc`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

### package.json

详见 [npm](/package-manager/npm/index.html) 的 package.json 各字段说明

### [.npmrc](/package-manager/pnpm/npmrc.html)

pnpm 会加载配置项、环境变量。

- 当前项目中的 `/path/to/my/project/.npmrc`
- 当前工作空间的`pnpm-workspace.yaml`
- 当前用户的`~/.npmrc`
- 当前设备的`/etc/npmrc`

### pnpm-workspace.yaml

示例

```yaml
packages:
  # all packages in direct subdirs of packages/
  - 'packages/*'
  # all packages in subdirs of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

### .pnpmfile.cjs

## cli

该包有一库多包管理功能，所以一定要有处理多个工作工作空间、子包的命令。`--filter`

未完。

<!-- prettier-ignore-start -->
|命令|简写 | 说明|对比 |选项|
| ----------------------------------- | --- | ------------------------------------ | --------------------- |--|
| add | | 安装包 | 同`npm install <pkg>` |-P -D -O -E --save-peer -g --workspace `--filter <package_selector>`|
| import | | 从其他锁文件（`package-lock.json / npm-shrinkwrap.json / yarn.json`）生成 pnpm-lock.yaml | ||
| install | i | 安装所有依赖 | 同`npm install` | --force --offline -P --ignore-scripts|
| install-test | it | 执行完 pnpm install 后执行 pnpm test | |无选项|
| link | ln | 创立本地软链接 | |`--dir <dir>` -C|
| unlink |  | 取消本地软链接 | | -r `--filter <package_selector>`|
| prune | | 删除无关联的依赖包 | |--prod --no-optional|
| rebuild | rb | 重新打包 | ||
| remove | rm | 删除本项目的 node_modules | | -r -g -O -P --filter|
| unlink | | 取消本地软链接 | ||
| update | up | 更新依赖包成为允许的最新版本 | |--latest -L -g --workspace -P -D|
| audit | | 检查不安全的依赖 | |`--audit-level <severity>` --json -D -P|
| list | ls | 以树状结构列出所有依赖 | |-r --json --long -g -P -D|
| outdated | | 检测过时的依赖包 | |-r -g --long -D -P|
| exec | | (已经在node_modules/.bin中添加PATH)执行指定 command. | ||
| run | | 执行指定脚本 | 同`npm run` ||
| start | | 执行 start 脚本 | ||
| test | | 执行 test 脚本 | ||
| pack | | | ||
| publish | | 发布包。会触发的生命周期方法`prepublishOnly prepublish prepack postpack publish postpublish` | `pnpm publish <name> [flags]`|-r --json `--tag <tag>` --force --dry-run|
| root | |显示有效的模块目录 | ||
| bin | |可执行命令的目录 | ||
| dedupe | | 移除旧版本（相当于现有node_modules中的版本号）的包 | |--check|
| fetch | | 不会| |-D -P|
| patch | |提取一个包到临时目录。为了修改此包中的内容。 | |`--edit-dir <dir>`|
| `patch-commit <path>` | |提取出一个目录 | ||
| why | |显示所有包的依赖关系 | |-r --json --long -g -P -D|
| licenses | | | ||
| dlx | |安装依赖并不写package.json,运行默认命令。 | ||
| create | | 从`create-*`/`@foo/create-*`开始工具中创建项目 | |无选项|
| `env <cmd>` | | 管理node环境| ||
|  | | | `pnpm env use --global lts`|安装并使用指定版本|
|  | | | `pnpm env remove --global 14.0.0`||
|  | | | `pnpm env list`|--remote|
| pack | |创建一个tarball包 | ||
| server |管理store server | | ||
| store status | | | ||
| store add | | | ||
| store prune | | | ||
| store path | | | ||
| setup | |用于标准的加载脚本。 | ||
| init | |创建package.json文件 | ||
| deploy | |不会 | ||
| doctor | |不会 | ||
| config c | |管理配置文件 | | -g --location --json|
| `config set <key> <value>` | | | ||
| `config get <key>`| | | ||
| `config delete <key>` | | | ||
| config list | | | ||
| config c | | | ||
| ...还有一些未在 help 中显露的子命令 | | | ||
<!-- prettier-ignore-end -->

`-c / --dir` 指定工具目录  
`-w / --workspace-root` 指定工具根目录  
`pnpm exec` 运行本地、远端指定包  
`--filter xxx`

## 生命周期脚本

`devPreinstall`。只在本地 pnpm install 时运行。在安装依赖前运行。在根目录中有 package.json 时运行。

## workspace

一库多包项目可以连接起本地开发包的引用关系。
该类项目的根目录下必须有`pnpm-workspace.yaml`.有它的目录就是命名空间的根目录。

## config

```shell
pnpm config list # 查看配置
global-bin-dir=D:\pnpm_node_module
registry=http://registry.npmjs.org/
store-dir=D:\pnpm_node_module
user-agent=pnpm/8.2.0 npm/? node/v16.16.0 win32 x64
pnpm config set store-dir D:\\node\\global # 设置全局地址
pnpm config set cache-dir D:\\node\\cache # 设置缓存地址

```

## 缓存

```
pnpm store path # 查看缓存路径
pnpm store prune # 清空缓存
```

## api

## principle

此包的处理逻辑。

### uml

```

```

## issue

```shell
# 检查pnpm的命令位置
which pnpm

```

## pnpm & lerna

|                  | pnpm                                                                  | lerna                                                                     |     |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------- | --- |
| 作者             | 一直更新着                                                            | 被 nx 团队收购后就与 nx 项目强绑定了。再加上后来 api 变化，现在不好用了。 |     |
| 管理 node 版本   | y                                                                     | n                                                                         |     |
| 一库多包         | 基于全设备共享依赖来源，+ --filter + workspace 指定安装范围。项目结构 | 这是它的初衷。在安装依赖、发布包时很方便。                                |     |
| api              | 稳定，没变过                                                          | 一点一点地变。v7+后变得我都不能使用了。                                   |     |
| 对项目结构的影响 | 无影响，一库一包项目相同。                                            | 有特定的项目结构。子包都放在指定目录下。                                  |     |
|                  |                                                                       |                                                                           |     |
|                  |                                                                       |                                                                           |     |

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
