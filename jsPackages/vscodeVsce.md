# @vscode/vsce

## overview

> vs code extensions

### feature

- feature0
- feature1
- feature2

## install

`npm i @vscode/vsce`

## usage

```js
vsce --help

Usage: vsce <command> [options]

Options:
  -V, --version                        output the version number
  -h, --help                           display help for command

Commands:
  ls [options]                         Lists all the files that will be published
  package [options] [<version>]        Packages an extension
  publish [options] [<version>]        Publishes an extension
  unpublish [options] [<extensionid>]  Unpublishes an extension. Example extension id: microsoft.csharp.
  ls-publishers                        List all known publishers
  delete-publisher <publisher>         Deletes a publisher
  login <publisher>                    Add a publisher to the known publishers list
  logout <publisher>                   Remove a publisher from the known publishers list
  verify-pat [options] [<publisher>]   Verify if the Personal Access Token has publish rights for the
                                       publisher.
  show [options] <extensionid>         Show extension metadata
  search [options] <text>              search extension gallery
  help [command]                       display help for command
```

## commands

```shell
vsce ls
vsce package # 打包
vsce login PUGLISER_NAME # 登录
    npx vsce login MichaelCurrin
vsce publish # 发布
vsce package # 打包
vsce package # 打包
```

## script

```js
// package.json
{
    "scripts": {
        "vscode:prepublish": "npm run compile"
    }
}
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`@vscode/vsce.fn(param, first: string, second: boolean = true) => void`
description

`@vscode/vsce.fn(param, [options: {a: string, b?: number}])`
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
