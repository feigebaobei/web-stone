# `workbox-window`

## overview

> 简化 sw 注册、更新。
> 避免发生使用 sw 的错误。  
> 简化 window/sw scope 之间的 message

### feature

- feature0
- feature1
- feature2

## install

`npm i workbox-window`

## usage

```js
import { Workbox } from 'workbox-window'

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js')

  wb.register()
}
```

## configuration

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api

`workbox-window.fn(param, first: string, second: boolean = true) => void`
description

`workbox-window.fn(param, [options: {a: string, b?: number}])`
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
