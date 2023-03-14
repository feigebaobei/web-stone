# mkdirp

## overview

> 像 node 内置的`mkdir p`  
> 支持 api/cli  
> 支持 cjs/esm  
> 这种脚本常说的 native（原生）就是 node 环境内置的 api

### feature

- feature0
- feature1
- feature2

## install

`npm i mkdirp`

## usage

```js

```

### api

### cli

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|`mkdirp(dir: string, opts: MkdirpOptions) => Promise<string | undefined>`||||||||||
|||||||||||
|`mkdirp.sync(dir: string, opts: MkdirpOptions) => string|undefined`||||||||||
|`mkdirp.manual, mkdirp.manualSync`||||||||||
|`mkdirp.native, mkdirp.nativeSync`||||||||||
<!-- prettier-ignore-end -->

## cli

```shell
$ mkdirp -h

usage: mkdirp [DIR1,DIR2..] {OPTIONS}

  Create each supplied directory including any necessary parent directories
  that don't yet exist.

  If the directory already exists, do nothing.

OPTIONS are:

  -m<mode>       If a directory needs to be created, set the mode as an octal
  --mode=<mode>  permission string.

  -v --version   Print the mkdirp version number

  -h --help      Print this helpful banner

  -p --print     Print the first directories created for each path provided

  --manual       Use manual implementation, even if native is available
```

## principle

此包的处理逻辑。

### uml

```

```

## 如何实现同时支持 api&cli

|     | api | cli |     |
| --- | --- | --- | --- |
|     |     |     |     |
|     |     |     |     |
|     |     |     |     |
|     |     |     |     |
|     |     |     |     |

## todo

> 未来迭代计划。
> 未来迭代计划。
