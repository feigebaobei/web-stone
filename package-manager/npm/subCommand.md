# npx

运行本地、远端的包
执行 npm 包的二进行文件

```
npm exec -- <pkg>[@<version>] [args...]
npm exec --package=<pkg>[@<version>] -- <cmd> [args...]
npm exec -c '<cmd> [args...]'
npm exec --package=foo -c '<cmd> [args...]'

npx <pkg>[@<specifier>] [args...]
npx -p <pkg>[@<specifier>] <cmd> [args...]
npx -c '<cmd> [args...]'
npx -p <pkg>[@<specifier>] -c '<cmd> [args...]'

alias: npm x, npx

--package=<pkg> (may be specified multiple times)
-p is a shorthand for --package only when using npx executable
-c <cmd> --call=<cmd> (may not be mixed with positional arguments)
```

`<pkg>`是必填项。可以使用`path`代替包名。  
`--call / -c`用于生成命令字符串。

- 若 package.json 中有 bin 只有一个，则调用该字段。
- 若 package.json 中 bin 字段有多个，其中有一个被匹配，则执行该字段的匹配值。
- 若无匹配（无 bin、无匹配项），则报错。

--no（新） --no-install（旧）不安装  
--yes 安装

## npm & npx

### npm

npm 是包管理命令行工具。可以下载、删除……依赖包。若该包可执行，则在本项目`./node_modules/.bin`中创建软链接，或在全局`bin/`中创建软链接。
使用已经安装的依赖包：

1. 定义脚本去执行二进制文件（也被叫做可执行文件）。

```js
{
    ...
    "script": {
        "package-name": "package-cli"
    }
}
```

2. 执行脚本  
   `npm run package-name`

### npx

npx 是包执行器。在 npm v5.2.0 时内置于 npm 中。可直接执行可执行文件，不必先安装。
demo for npx:

```shell
# 1
npx cowsay wow
# 2
npx cowsay[@version] hi
```

运行过程：

1. 下载指定的包。
2. 执行该包的可执行文件。
3. 删除该包及其依赖。

若想使用已经下载的包，又不想使用 npx，则可以运行`./node_modules/.bin/<command> <args...>`

# init

## 别名 create / innit

`npm init <initializer>`  
可以创建一个新 npm 包或使用一个已有的 npm 包。  
完成的 npm 包名应该是`create-<initializer>`
相当于执行`npm exec`命令 `npm exec create-<initializer>`
使用`-y` / `--yes` 跳过所有询问。
使用`--scope` 设置作用空间。

# unlink

取消软链接

# rm

删除（`package.json`中）指定的包。

# ci

```shell
npm ci
# aliases: clean-install, ic, install-clean
```

与`npm install`类似。

| install | ci                                                 |     |     |
| ------- | -------------------------------------------------- | --- | --- |
|         | 必须存在`package-lock.json`、`npm-shrinkwrap.json` |     |     |
|         | 当锁文件与 package.json 的依赖不相同时，抛出错误。 |     |     |
|         | 只能安装全部依赖                                   |     |     |
|         | 若 node_modules 已经存在，则先删除，再创建。       |     |     |
|         | 不会修改 package.json 和锁文件。                   |     |     |

## configuration

|                        | 说明 | ult   |     |
| ---------------------- | ---- | ----- | --- |
| save                   |      |       |     |
| save-exact             |      |       |     |
| global                 |      |       |     |
| global-style           |      |       |     |
| legacy-bundling        |      |       |     |
| omit                   |      |       |     |
| strict-peer-deps       |      |       |     |
| package-lock           |      |       |     |
| foreground-scripts     |      |       |     |
| ignore-scripts         |      |       |     |
| audit                  |      |       |     |
| bin-links              |      |       |     |
| fund                   |      |       |     |
| dry-run                |      |       |     |
| workspace              |      |       |     |
| workspaces             |      |       |     |
| include-workspace-root |      |       |     |
| install-links          |      | false |     |

# pack

生成本地安装包`<name>-<version>.tgz`。  
可以使用`npm i` / `npm update` / `npm dedupe` / `npm uninstall`

- 多次打包会覆盖。
- 类似压缩。
- 可离线安装

```shell
npm pack [[<@scope>/]<pkg>...] [--dry-run] [--json]
```

|                     |                                                                                |         |       |
| ------------------- | ------------------------------------------------------------------------------ | ------- | ----- |
| `--dry-run`         | 不会                                                                           |         |       |
| `--json`            | 是否使用 json 格式输出                                                         | boolean | false |
| `--pack-detination` | 打包的目录                                                                     | string  | `.`   |
| `--workspace`       | 工作空间。不会。可选值：- 工作空间的名字。- 工作空间的目录。- 父工作空间的路径 | string  | -     |
| `--workspaces`      |                                                                                | boolean | false |

# unpublish

删除

```shell
# 删除指定版本
npm unpublish test@0.0.1
npm unpublish test@0.0.1-beta.0
npm unpublish test@0.0.1-beta.0 --force
# 删除包
npm unpublish test
npm unpublish test --force
```

# deprecate

```shell
npm deprecate <pkg>[@<version>] <message>
npm deprecate test '不再维护了'
npm deprecate test@0.0.1 '不再维护了'
```

# title

# title

# title

# title
