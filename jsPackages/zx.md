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

|           |     |     |     |     |
| --------- | --- | --- | --- | --- |
| cb()      |     |     |     |     |
| fetch()   |     |     |     |     |
| sleep()   |     |     |     |     |
| echo()    |     |     |     |     |
| stdin()   |     |     |     |     |
| within()  |     |     |     |     |
| retry()   |     |     |     |     |
| spinner() |     |     |     |     |

### Packages

### title

### title

### title

### title

### title

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

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
