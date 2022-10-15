# `crtp-cli`

## overview

> 使用模板初始化文件

### feature

- 使用模板板初始化文件
- 管理模板

## install

`npm i -g crtp-cli`

## usage

<!-- 同`./demo.md` -->

```
crtp init <fileType> --file [file...] --packageName [packageName] // v0.0.2时删除该api
crtp initFile <fileType> --file [file...] --packageName [packageName] // 是 crtp init的别名
crtp addFile <filename> --file <file> // 添加模板文件
crtp listFile // 列出本地的模板文件
crtp lsFile // 同listFile
crtp isExistFile <filename> // 指定的模板文件是还在本地存在
crtp delFile <filename> // 删除本地的模板文件
crtp initProj <projName> --packageName [packageName] --packageVersion [packageVersion] --packageMain [packageMain] --lernaInit [lernaInit] --readme [readme] --no-readme [readme] --gitignore [gitignore] --no-gitignore [gitignore] // 初始化一个项目。
```

## configuration

默认配置文件：`path/to/file.json`。

## api

`crtp-cli.fn(param, first: string, second: boolean = true) => void`
description

`crtp-cli.fn(param, [options: {a: string, b?: number}])`
description

## principle

主要使用基于`commander`/`chalk`/`child_process`开发此包。  
在子进程中运行命令行的逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
