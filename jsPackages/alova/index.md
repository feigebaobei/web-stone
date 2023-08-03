# alova

## overview

> 基于多种请求方式，开发的请求策略库。（使用了适配器模式）
> 文档写的没有主次，没有深浅。看完一遍了还不能学会使用。

### feature

- 支持多种技术栈。vue/react/svelte
- 与 axios api 相似
- 打包后体积小。只有 axios 的 40%
- 支持 ts
- 请求共享，不会同时发出相同请求。
- 实时自动状态管理
- 支持 tree shaking

## install

`npm i alova`

|        |         |                                      |     |
| ------ | ------- | ------------------------------------ | --- |
| react  | >= 16.8 | 这个版本以后才有了 hooks             |     |
| vue    | 2.7 3.x | 开始使用 ts/use\*\*/Proxy/组成式 api |     |
| svelte | 任意    |                                      |     |

alova 是一个核心库。它有多种策略。  
（这就是它像适配器的地方）  
|||||
|-|-|-|-|
|[@alova/mock]()||||
|[@alova/scene-react]()||||
|[@alova/scene-vue]()||||
|[@alova/scene-svelte]()||||
|[@alova/adapter-uniapp]()||||
|[@alova/adapter-taro]()||||
|[@alova/adapter-axios]()||||
|[@alova/adapter-xhr]()||||

## usage

同`./demo.md`

```js
const alova = require('alova')
// or
// import alova from 'alova';
// TODO: DEMONSTRATE API
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

`alova.fn(param, first: string, second: boolean = true) => void`
description

`alova.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## axios & alova

|                |     | axios     | alova                        |     |     |
| -------------- | --- | --------- | ---------------------------- | --- | --- |
| 生日           |     |           |                              |     |     |
| 功能点         | 1   | 前端+后端 | 前端的 vue/react/svelte 框架 |     |     |
| 功能点         | 2   |           |                              |     |     |
| 底层逻辑       |     |           |                              |     |     |
| 使用的设计模式 |     |           |                              |     |     |
| 文档           |     |           |                              |     |     |
|                |     |           |                              |     |     |

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
