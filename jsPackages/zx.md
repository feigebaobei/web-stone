# zx

## overview

> 用于运行复杂的脚本。若使用 node.js 则需要引入若干脚本再使用。
> 使用 child_process 执行  
> node >= 16.0.0

### feature

- feature0
- feature1
- feature2

## install

`npm i zx -g`

## usage

若执行`*.mjs`，则可以在顶层`await`.  
若执行`*.js`，则可以在顶层`void async function() {....}()`.  
zx 的所有方法都会可以直接使用，即使没有引入。

### 使用 zx 执行 js 代码

```js
#!/usr/bin/env zx
let name = 'foo'
await $`mkdir /temp/${name}`
```

```shell
zx ./script.mjs
```

### 使用 zx 执行脚本文件

```shell
#!/usr/bin/env zx

# 可能需要执行
chmod +x ./script.mjs
./script.mjs
```

### $`command`

使用`spawn`执行并返回`ProcessPromise`对象

```js
await $`cd ${path}`
```

若执行一个方法，返回非零状态码，则返回`ProcessOutput`对象

```js
class ProcessPromise extends Promise<ProcessOutput> {
    stdin: Writable
    stdout: Readable
    stderr: Readable
    exitCode: Promise<number>
    pipe(dest): ProcessPromise
    kill(): Promise<void>
    nothrow(): this
    quiet: this
}
class ProcessOutput {
    readonly stdout: string
    readonly stderr: string
    readonly signal: string
    readonly exitCode: number
    toString(): string
}
```

### Functions

|            |                                                                    |     |     |     |
| ---------- | ------------------------------------------------------------------ | --- | --- | --- |
| cb()       | 改变当前工作目录                                                   |     |     |     |
| fetch()    | 使用`node-fetch`处理参数                                           |     |     |     |
| question() | 使用`readline`处理参数                                             |     |     |     |
| sleep()    | 使用`setTimout`处理参数                                            |     |     |     |
| echo()     | `console.log()`处理参数。                                          |     |     |     |
| stdin()    | 返回 stdin 的 string                                               |     |     |     |
| within()   | 创建一个异步上下文                                                 |     |     |     |
| retry()    | 尝试指定次数的回调方法。返返回第一次成功的结果，或返回最后的失败。 |     |     |     |
| spinner()  | 创建一个简单的 spinner                                             |     |     |     |

### Packages

下列包不需要引入就能直接使用：

- chalk
- fs-extra
- os
- path
- globby
- yaml
- minimist
- which

### configuration

|           |                 | default                  |     |
| --------- | --------------- | ------------------------ | --- |
| $.shell   | 设置运行的壳    | `/bin/base`              |     |
| $.spawn   | 指定`spawn`api. | `require(child_process)` |     |
| $.prefix  |                 | `est -euo pipefail`      |     |
| $.quote   |                 |                          |     |
| $.verbose |                 |                          |     |
| $.env     |                 |                          |     |
| $.cwd     |                 |                          |     |
| $.log     |                 |                          |     |

### polyfills

|              |     |     |     |
| ------------ | --- | --- | --- |
| \_\_filename |     |     |     |
| \_\_dirname  |     |     |     |
| require()    |     |     |     |

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
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

`zx.fn(param, first: string, second: boolean = true) => void`
description

`zx.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## 手动解析 & commander & zx

这三个方法分别对应写脚本的三个层次。

|              | 手动解析                                                  | commander                                                                                   | zx                                           |
| ------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 编写难度递减 |                                                           |                                                                                             |                                              |
| 无本质区别   |                                                           |                                                                                             |                                              |
| 逻辑         | 根据 stdin 取出参数。再喂入指定方法。由该方法执行核心功能 |                                                                                             |                                              |
| 贡献         | 开启了基于 node 编写的脚本。                              | 从别的语言中借鉴来编写方式。再经过特定格式取出参数。支持定义方法。由参数+方法得到执行结果。 | 让编写脚本更友好。                           |
|              |                                                           | 带来规范的编写方式                                                                          | 已经内置若干包。对外提供易于编写脚本的方法。 |
|              |                                                           |                                                                                             |                                              |

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
