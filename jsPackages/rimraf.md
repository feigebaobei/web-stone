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

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
