# lerna init

在一个已经存在的项目上创建 lerna 需要的环境（主要是目录结构）。
或在创建一个 lerna 环境的项目。

## options

`--independent`
使用分离模式。

`--exact`
不会。好像是控制是否安装 lerna 在 devDependence 里。

## 效果

只创建了项目结构：

```
<root>
|-- packages/
|-- lerna.json
|-- package.json
```

## principle

1. 在 devDependence 中添加 lerna.
2. 创建 lerna.json，并保存 version 字段。若是 fix 模式，则此字段是数字。若是分离模式，则此字段是'independent'

# lerna add

添加匹配的依赖。

## usage

`lerna add <package>[@version] [--dev] [--exact] [--peer]`
在本 lerna 项目中安装一个本地、远端的包。一次只能安装一个包。

## options

`所有filter flags`
`--dev`
安装在`devDependencies`

`--exact`
使用严格版本号的包。

`--peer`
安装在`peerDependencies`

`--registry <url>`
使用指定的 registry 安装包。

`--no-boostrap`
跳过`lerna bootstrap`
原来`lerna add`会默认执行`lerna bootstrap`.

## principle

使用`npm install` / `yarn add`

# lerna create

创建一个被 lerna 管理的包。
此子命令有好多与`package.json`字段相关的选项。

## usage

`lerna create <packageName> [loc]`
loc 指定 packageName 的所在位置。默认是`lerna.json`中`packages`字段的第一个值。

## options

`--access`
设置`publishConfig.access`的值：'public' / 'restricted'。默认是"public"

`--bin`
包是否有可执行文件。默认：`<packageName>`

`--description`
package.json 的 description 字段。

`--dependencies`
xxx

`--es-module`
初始化一个已经编译的 esm 模块。

`--homepage`
xxx

`--keywords`
xxx

`--license`
xxx

`--private`
xxx

`--registry`
xxx

`--tag`
xxx

`--yes`
跳过所有询问。全部使用默认值。

## principle

# lerna bootstrap

引导本地的包建立互相依赖关系或安装远端的包作为依赖。
默认执行`npm ci`

## usage

`lerna bootstrap`
// 在`--`后面写其他选项。也可在`lerna.json`中设置。
`lerna bootstrap -- --production --no-option`

```
{
    ...
    "npmClientArgs": ["--production", "--no-optional"]
}
```

## options

`--hoist [glob]`  
把依赖项提升到根项目里。  
`--strict`  
不会  
`--nohoist [glob]`  
不会  
`--ignore`  
设置执行`lerna bootstrap`时忽略的内容。  
`--ingore-prepublish`  
跳过`prepublish`生命周期钩子。  
`--ignore-scripts`  
跳过所有的生命周期钩子。  
`--resgistry <url>`  
xxx  
`--npm-client`  
xxx  
`--use-workspaces`  
xxx

`--no-ci`
跳过`npm ci`
若要强制执行`npm ci`，则使用`lerna bootstrap --ci`
`--force-local`
强制使用本地包。不管理版本等因素。

`--publishConfig.directory`
指定被发布时使用子目录。没有固定的值。

## principle

1. `npm install`
2. 若要依赖关系则建立软链接。
3. 在所有包中执行`npm run prepublish`，除非使用`--ignore-prepublish`
4. 在所有包中执行`npm run prepare`。

# lerna publish

发布本 lerna 项目中的包。

- 发布从最近一次发布后变动的包。
- 发布指定 git 标签的包。
- 发布最后一次 commit 的包。
- 发布前一次提交中有更新的包。
- 若测试 private 为 true 则不发布该包。

## usage

```
lerna publish
lerna publish from-git
lerna publish from-package
```

## options

`--canary`
当使用这个标志运行时，lerna publish 会以更细粒度的方式(每次提交)发布包。在发布到 npm 之前，它通过获取当前版本，将其转移到下一个小版本，添加所提供的元后缀(默认为 alpha)并附加当前的 git sha(例如:1.0.0 变成 1.1.0-alpha.0+81e3b443)来创建新版本标签。
`--contents <dir>`
`--dist-tag <tag>`
`--dit-head <sha>`
`--graph-type <all|dependencies>`
`--ignore-scripts`
`--ignore-prepublish`
`--legacy-auth`
`--no-git-reset`
`--no-granular-pathspec`
`--no-verify-access`
`--otp`
`--preid`
`--pre-dist-tag <tag>`
`--registry <url>`
`--tag-version-prefix`
`--tag-tag`
`--yes`

## principle

# lerna version

## usage

## options

## principle

# lerna list

列出本地包

## usage

`lerna ls`

## options

`--json`
显示 json 格式。多行。
`--ndjson`
显示 json 格式。单行。
`-a, -all`
显示所有包，包括私包。
`-l, --long`
显示扩展信息。
`-p, --parseable`
显示本包的路径。
`--toposort`
显示包的拓扑信息。
`--graph`
xxx

## principle

# lerna changed

xxx

## usage

`lerna changed`

## options

`--json`
`--ndjson`
`-a, --all`
`-l, --long`
`-p, --parseable`
`--toposort`
`--graph`
`--conventional-graduate`
`--force-publish`
`--ignore-change`
`--include-merged-tags`

## principle

# lerna diff

显示所有从上一次发布后的不同的包或单文件。

## usage

`lerna diff [package]`

## options

## principle

# lerna exec

在每个包中执行可执行二进制命令

## usage

`lerna exec -- <command [args...]>`
`lerna exec -- rm -rf ./node_modules`
`lerna exec -- protractor conf.js`

## options

`所有filter flags`
`--stream`
流式输出每个子进程。
`--parallel`
`--no-bail`
没有输出
`--no-prefix`
`--profile`
`--profile-location <location>`

## principle

# lerna run

若此包中包括指定的脚本，则执行该脚本。

## usage

```
lerna run <script> -- [args...]
lerna run test
lerna run build
lerna run --parallel watch
```

## options

`所有filter flags`
`--npm-client <client>`
`--stream`
`--parallel`
`--no-bail`
`--no-prefix`
`--profile`
`--profile-location <location>`

## principle

# lerna clean

清除所有子包的`node_modules`

## usage

`lerna clean`

## options

`所有filter flags`
`--yes`

## principle

# lerna import

使用`commit history`引入本地包。

## usage

```
lerna import <path-to-external-repository>
```

## options

`--flatten`
`--dest`
`--preserve-commit`

## principle

使用 git commit history 再运行出一个包。
lerna create 新建
lerna import 生成

# lerna link

链接有依赖的包。

## usage

`lerna link`

## options

`--force-local`
`--publishConfig.directory`

## principle

# lerna info

列出本地环境信息。

## usage

## options

## principle

# @lerna/filter-options

`--scope <glob>`
设置作用范围。
`--ignore <glob>`
设置排队的作用范围。
`--no-private`
不作用于私包。
`--since [ref]`
设置只包括从`ref`后有变动的包。若没有`ref`，则 ref 的默认值为最后的 tag.
`--exclude-dependents`
与`--since`一起使用。不包括所有 dependents.
`--include-dependents`
包含所有 dependents.
`--include-dependencies`
包含所有 dependents.不管--scope/--ignore/--since。
（我不喜欢这样的 api。各 api 间是同级的，为什么要出现优先级更高 api 呢？）
`--include-merged-tags`
包含从合并来的分支上的--since 之后的包。
