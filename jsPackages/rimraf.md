# rimraf

## overview

> 为 node 环境提供的 unix command `rm -rf`

### feature

- return promise
- --glob
- arrays of paths
- 支持 esm/cjs
- 优先使用原生实现，在 win 可接收到。原生实现更快、更可靠。
- 支持 cli/api

## install

`npm i rimraf`

## usage

```js
// 以esm为例。cjs同理
import rimraf from 'rimraf'
import { rimraf, rimrafSync, native, nativeSync } from 'rimraf'
```

## api

所有的删除方法都返回 boolean，表示是否删除成功。

<!-- prettier-ignore-start -->
|方法|参数|子参数|description|type|default|enum|demo|支持的环境||
|-|-|-|-|-|-|-|-|
|`rimraf(f, opts?) => Promise<Boolean>`||||||||||
||options|preserveRoot|是否保留根文件|||||||
|||tmp|不会，只在wind有效|||||wind||
|||maxRetries|最大尝试次数|||||wind/native||
|||backoff|不会|||||win||
|||maxBackoff|不会|||||wind||
|||retryDelay|尝试延迟|||100||native||
|||signal|使用AbortSignal打断执行|||||||
|||filter|自定义过滤要删除的文件|||||||
|`rimraf.sync(f, opts?) => Promise<B>``rimraf.rimrafSync(f, opts?) => Promise<B>`|||同步的删除|||||||
|`rimraf.native(f, opts) => Promise<B>`|||使用node内置的`fs.rm`去实现。node v14.14.0+|||||||
|`rimraf.nativeSync(f, opts) => Promise<B>` `rimraf.native.nativeSync(f, opts) => Promise<B>`||||||||||
|`rimraf.manual(f, opts) => Promise<B>`||||||||||
|`rimraf.manualSync(f, opts) => Promise<B>` ||||||||||
|`rimraf.window(f, opts) => Promise<B>`||||||||||
|`rimraf.window.sync(f, opts) => Promise<B>` `rimraf.windowSync(f, opts) => Promise<B>`||||||||||
|`rimraf.moveRemove(f, opts) => Promise<B>`||||||||||
|`rimraf.moveRemove.sync(f, opts) => Promise<B>` `rimraf.moveRemoveSync(f, opts) => Promise<B>`||||||||||
|||signal||||||||
<!-- prettier-ignore-end -->

## cli

```shell
rimraf version 4.3.0

Usage: rimraf <path> [<path> ...]
Deletes all files and folders at "path", recursively.

Options:
  --                   Treat all subsequent arguments as paths
  -h --help            Display this usage info
  --preserve-root      Do not remove '/' recursively (default)
  --no-preserve-root   Do not treat '/' specially
  -G --no-glob         Treat arguments as literal paths, not globs (default)
  -g --glob            Treat arguments as glob patterns
  -v --verbose         Be verbose when deleting files, showing them as
                       they are removed. Not compatible with --impl=native
  -V --no-verbose      Be silent when deleting files, showing nothing as
                       they are removed (default)
  -i --interactive     Ask for confirmation before deleting anything
                       Not compatible with --impl=native
  -I --no-interactive  Do not ask for confirmation before deleting

  --impl=<type>        Specify the implementation to use:
                       rimraf: choose the best option (default)
                       native: the built-in implementation in Node.js
                       manual: the platform-specific JS implementation
                       posix: the Posix JS implementation
                       windows: the Windows JS implementation (falls back to
                                move-remove on ENOTEMPTY)
                       move-remove: a slow reliable Windows fallback

Implementation-specific options:
  --tmp=<path>        Temp file folder for 'move-remove' implementation
  --max-retries=<n>   maxRetries for 'native' and 'windows' implementations
  --retry-delay=<n>   retryDelay for 'native' implementation, default 100
  --backoff=<n>       Exponential backoff factor for retries (default: 1.2)
```

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
