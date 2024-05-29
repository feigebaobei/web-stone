# g2plot

## overview

> 基于 g2 搞的。

### feature

- 支持方法操作 dom，不支持组件。
- feature1
- feature2

## install

`npm i g2plot`

## usage

同`./demo.md`

```js
const g2plot = require('g2plot')
// or
// import g2plot from 'g2plot';
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

内部使用面向对象的方式编写代码。api 分为基类 api 与子类 api.

<!-- prettier-ignore-start -->
|能用api|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|创建实例|container|指定dom||||||||
||options|全量配置项||||||||
|render()||||||||||
|update()||||||||||
|changeData()||||||||||
|changeSize()||||||||||
|destroy()||||||||||
|on()||||||||||
|once()||||||||||
|off()||||||||||
|setState()||||||||||
|getState()||||||||||
|addAnnotations()||||||||||
|removeAnnotations()||||||||||
<!-- prettier-ignore-end -->

`g2plot.fn(param, first: string, second: boolean = true) => void`
description

`g2plot.fn(param, [options: {a: string, b?: number}])`
description

## principle

基于 g2 封装了一薄层。
基于 plot 基类，基于若干图表。
plot 调用 g2 的能力。

### uml

```

```

## todo

> api 之间有重叠，不好。可以设置快捷 api，但是不要让多个 api 有重叠。
> 未来迭代计划。
> 未来迭代计划。
