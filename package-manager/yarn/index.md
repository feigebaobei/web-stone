# `yarn`

## overview

> 它是一个包管理工具。类似产品有：npm/pnpm  
> cli  
> 可以方便分享代码给别的开发者。很快，安全，不会遇到问题。  
> 把项目概述写入`package.json`中。  
> yarn2 及以后版本已写入了 corepack 包（它是 node 16.10+内置的包。）。通过`corepack`管理`yarn`  
> `pnpm`把依赖包做成树型的。`yarn`有可能也把依赖包做成树型的。  
> 可读强的输出日志。
> facebook 开发

### feature

- offline mode
- meterministic
- network performance
- network resilicense
- flat mode // pnpm 是树型结构
- 0 安装
- 即插即用
- 插件文档
- 支持一库多包
- 支持多个工作空间

## install

最好使用`corepack`管理`yarn`。`corepack`是`node > 16.10`的内置包。默认不使用引包。

### 安装 yarn 1+

```shell
# for yarn 1+
npm i -g yarn
```

### 安装 yarn 2+

#### node >= 16.0

```shell
# for yarn 2+ / yarn 3+
corepack enable
yarn set version stable # 更新yarn 默认执行yarn init
```

#### node < 16.0

```shell
npm i -g corepack
```

```shell
yarn --version # 若返回版本号，则安装成功。
yarn init -2 # init project
yarn set version stable # 更新yarn 默认执行yarn init
yarn set version from sources # 更新到最新的master分支
yarn set version from sources --branch 1211 # 更新为指定的PRs
```

## usage

```shell
yarn help // 列出命令
yarn init
yarn # 是yarn install 的简写
yarn install # 安装所有依赖
yarn add [package] # 添加依赖包
yarn add [package]@[version]
yarn add [package]@[tag]
yarn add [package] --dev
yarn add [package] --peer
yarn up [package] # 更新指定的包
yarn up [package]@[version] # 更新指定的包到指定版本
yarn up [package]@[tag]
yarn remove [package] # 移除依赖包
yarn set version latest # 更新yarn
yarn set version from sources
```

## command

<details>
	<summary>错误码</summary>
<pre>
yarn add <package>[@version]|[@url] // 安装依赖包
  --json
  -E --exact
  -T --tilde
  -C --caret
  -D --dev
  -P --peer
  -O --optional
  --prefer-dev
  -i --interactive
  --cached
  --mode #0

yarn bin [name] // 执行二进制脚本
-v --verbose
--json

yarn cache clean // 删除共享的缓存文件
--mirror
--all

yarn config get <name> // 读取配置项
--json
--no-redacted

yarn config set <name> <value> // 设置配置项
--json
-H --home

yarn config unset <name> // 不设置指定配置项
-H --home

yarn config // 列出当前的配置项
-v --verbose
--why
--json

yarn constraints query <query> // Query the constraints fact database.
--json

yarn constraints source // 列出源代码
-v --verbose

yarn constraints // 检测本项目的限制
--fix

yarn dedupe // 删除重复依赖
-s --strategy #0
-c --check
--json
--mode #0

yarn dlx <command> // 在临时环境中运行指定的包
-p --package #0
-q --quiet

yarn exec <commandName> // 执行 shell 脚本

yarn explain peer-requirements

</pre>
</details>

```shell
yarn help

  Usage: yarn [command] [flags]

  Displays help information.

  Options:

    --cache-folder <path>               specify a custom folder that must be used to store the yarn cache
    --check-files                       install will verify file tree of packages for consistency
    --cwd <cwd>                         working directory to use (default: /Users/cat/Documents/code/third)
    --disable-pnp                       disable the Plug'n'Play installation
    --emoji [bool]                      enable emoji in output (default: true)
    --enable-pnp, --pnp                 enable the Plug'n'Play installation
    --flat                              only allow one version of a package
    --focus                             Focus on a single workspace by installing remote copies of its sibling workspaces.
    --force                             install and build packages even if they were built before, overwrite lockfile
    --frozen-lockfile                   don't generate a lockfile and fail if an update is needed
    --global-folder <path>              specify a custom folder to store global packages
    --har                               save HAR output of network traffic
    --https-proxy <host>
    --ignore-engines                    ignore engines check
    --ignore-optional                   ignore optional dependencies
    --ignore-platform                   ignore platform checks
    --ignore-scripts                    don't run lifecycle scripts
    --json                              format Yarn log messages as lines of JSON (see jsonlines.org)
    --link-duplicates                   create hardlinks to the repeated modules in node_modules
    --link-folder <path>                specify a custom folder to store global links
    --modules-folder <path>             rather than installing modules into the node_modules folder relative to the cwd, output them here
    --mutex <type>[:specifier]          use a mutex to ensure only one yarn instance is executing
    --network-concurrency <number>      maximum number of concurrent network requests
    --network-timeout <milliseconds>    TCP timeout for network requests
    --no-bin-links                      don't generate bin links when setting up packages
    --no-default-rc                     prevent Yarn from automatically detecting yarnrc and npmrc files
    --no-lockfile                       don't read or generate a lockfile
    --non-interactive                   do not show interactive prompts
    --no-node-version-check             do not warn when using a potentially unsupported Node version
    --no-progress                       disable progress bar
    --offline                           trigger an error if any required dependencies are not available in local cache
    --otp <otpcode>                     one-time password for two factor authentication
    --prefer-offline                    use network only if dependencies are not available in local cache
    --preferred-cache-folder <path>     specify a custom folder to store the yarn cache if possible
    --prod, --production [prod]
    --proxy <host>
    --pure-lockfile                     don't generate a lockfile
    --registry <url>                    override configuration registry
    -s, --silent                        skip Yarn console logs, other types of logs (script output) will be printed
    --scripts-prepend-node-path [bool]  prepend the node executable dir to the PATH in scripts
    --skip-integrity-check              run install without checking if node_modules is installed
    --strict-semver
    --update-checksums                  update package checksums from current repository
    --use-yarnrc <path>                 specifies a yarnrc file that Yarn should use (.yarnrc only, not .npmrc) (default: )
    -v, --version                       output the version number
    --verbose                           output verbose messages on internal operations
    -h, --help                          output usage information
  Commands:
    - access
    - add
    - audit
    - autoclean
    - bin
    - cache
    - check
    - config
    - create

    - dlx # 有临时环境中运行包

    - exec
    - generate-lock-entry / generateLockEntry
    - global
    - help
    - import
    - info
    - init
    - install
    - licenses
    - link
    - list
    - login
    - logout
    - node
    - outdated
    - owner
    - pack
    - policies
    - publish
    - remove
    - run
    - tag
    - team
    - unlink
    - unplug
    - upgrade
    - upgrade-interactive / upgradeInteractive
    - version
    - versions
    - why
    - workspace
    - workspaces
```

## cli

`yarn init` init project
`yarn add [package]` add package
`yarn add [package]@[version]` add package
`yarn add [package]@[tag]` add package
`--dev` 安装到 devDependencies
`--peer` 安装到 peerDependencies
`--optional` 安装到 optionalDependencies
`yarn upgrade [package]` upgrade package
`yarn upgrade [package]@[version]` upgrade package
`yarn upgrade [package]@[tag]` upgrade package
`yarn remove [package]` remove package
`yarn` 安装项目中的依赖
当不确定时不要使用`yarn dlx`代替`yarn add`。`yarn dlx`不会跟踪包的名称、版本。

## 配置文件

默认配置文件：`<root>/.yarnrc`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
|yarn-offline-mirror|"./packages-cache"||||||
|yarn-offline-mirror-pruning|true||||||
|yarn-path|"./bin/yarn"||||||
|disable-self-update-check|true||||||
|child-concurrency|#number#||||||
|unsafe-disable-integrity-migration|false||||||

## [pnp](/package-manager/yarn/pnp.html)

## [编辑器的 sdk](/package-manager/yarn/editor-sdk.html)

## 输出日志

```shell
> <错误码>: <符号><说明文本>
```

### 错误码

<details>
	<summary>错误码</summary>
<pre>
YN0000 - UNNAMED
YN0001 - EXCEPTION
YN0002 - MISSING_PEER_DEPENDENCY
YN0003 - CYCLIC_DEPENDENCIES
YN0004 - DISABLED_BUILD_SCRIPTS
YN0005 - BUILD_DISABLED
YN0006 - SOFT_LINK_BUILD
YN0007 - MUST_BUILD
YN0008 - MUST_REBUILD
YN0009 - BUILD_FAILED
YN0010 - RESOLVER_NOT_FOUND
YN0011 - FETCHER_NOT_FOUND
YN0012 - LINKER_NOT_FOUND
YN0013 - FETCH_NOT_CACHED
YN0014 - YARN_IMPORT_FAILED
YN0015 - REMOTE_INVALID
YN0016 - REMOTE_NOT_FOUND
YN0017 - RESOLUTION_PACK
YN0018 - CACHE_CHECKSUM_MISMATCH
YN0019 - UNUSED_CACHE_ENTRY
YN0020 - MISSING_LOCKFILE_ENTRY
YN0021 - WORKSPACE_NOT_FOUND
YN0022 - TOO_MANY_MATCHING_WORKSPACES
YN0023 - CONSTRAINTS_MISSING_DEPENDENCY
YN0024 - CONSTRAINTS_INCOMPATIBLE_DEPENDENCY
YN0025 - CONSTRAINTS_EXTRANEOUS_DEPENDENCY
YN0026 - CONSTRAINTS_INVALID_DEPENDENCY
YN0027 - CANT_SUGGEST_RESOLUTIONS
YN0028 - FROZEN_LOCKFILE_EXCEPTION
YN0029 - CROSS_DRIVE_VIRTUAL_LOCAL
YN0030 - FETCH_FAILED
YN0031 - DANGEROUS_NODE_MODULES
YN0032 - NODE_GYP_INJECTED
YN0046 - AUTOMERGE_FAILED_TO_PARSE
YN0047 - AUTOMERGE_IMMUTABLE
YN0048 - AUTOMERGE_SUCCESS
YN0049 - AUTOMERGE_REQUIRED
YN0050 - DEPRECATED_CLI_SETTINGS
YN0059 - INVALID_RANGE_PEER_DEPENDENCY
YN0060 - INCOMPATIBLE_PEER_DEPENDENCY
YN0061 - DEPRECATED_PACKAGE
YN0062 - INCOMPATIBLE_OS
YN0063 - INCOMPATIBLE_CPU
YN0068 - UNUSED_PACKAGE_EXTENSION
YN0069 - REDUNDANT_PACKAGE_EXTENSION
YN0071 - NM_CANT_INSTALL_EXTERNAL_SOFT_LINK
YN0072 - NM_PRESERVE_SYMLINKS_REQUIRED
YN0074 - NM_HARDLINKS_MODE_DOWNGRADED
YN0075 - PROLOG_INSTANTIATION_ERROR
YN0076 - INCOMPATIBLE_ARCHITECTURE
YN0077 - GHOST_ARCHITECTURE
</pre>
</details>

## yarn dlx

与 npx 类似，是 download and execute 的简称。  
只能执行远端的可执行文件。（不能执行本地的可执行文件）

## 缓存

```
yarn cache list // 列出缓存的文件
yarn cache dir  // 列出缓存目录
yarn cache clean [<module_name>] // 清除缓存
```

## principle

可基于插件、模块化与作者共同开发 yarn。  
yarn 的核心代码：是由不同的内置插件实现的。

如何支持多个编辑器？
为什么要与`corepack`一起工作？

### uml

```

```

## todo

> 版本迭代后 api 无变化
> 开发一个插件
> 未来迭代计划。
