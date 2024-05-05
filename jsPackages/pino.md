# pino

## overview

> 这是一个家族。
> pino-pretty 格式化工具
> 低开销日志工具。

### feature

- feature0
- feature1
- feature2

## install

`npm i pino`

## usage

### pino with express

```js
const logger = require('pino')()
logger.info('str')
let child = logger.child({ a: 'property' })
child.info('str')
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
|`pino([opitons], [destination]) => logger`||||||||||
||options|||||||||
||options|name|日志的名字|string|undefined|||||
||options|level|记录大于等于此级别的日志|string|'info'|`'fatal'60,'error'50,'warn'40,'info'30,'debug'20,'trace'10,'silent'无限`||||
||options|levelComparison||||||||
||options|customLevels||||||||
||options|useOnlyCustomLevels||||||||
||options|depthLimit||||||||
||options|edgeLimit||||||||
||options|mixin||||||||
||options|mixinMergeStrategy||||||||
||options|redact||||||||
||options|hooks||||||||
||options|hooks.logMethod||||||||
||options|formatters(options: {level, bindings, log})||||||||
||options|serializers||||||||
||options|msgPrefix||||||||
||options|base||||||||
||options|enabled||||||||
||options|crlf||||||||
||options|timestamp||||||||
||options|messageKey||||||||
||options|errorKey||||||||
||options|nestedKey||||||||
||options|browser||||||||
||options|transport||||||||
||options|onChild||||||||
||destination|||||||||
||destination|||||||||
|||||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|logger instance|属性|description|type|default|enum|demo||||
|-|-|-|-|-|-|-|-|-|-|
|logger.info(message)||||||`logger.info('%o hello %s', {k: 2}, 'world')`||||
|logger.trace([mergingObject][,message], [...interpolationValues])||||||||||
|logger.debug([mergingObject][,message], [...interpolationValues])||||||||||
|logger.info([mergingObject][,message], [...interpolationValues])||||||||||
|logger.warn([mergingObject][,message], [...interpolationValues])||||||||||
|logger.error([mergingObject][,message], [...interpolationValues])||||||||||
|logger.fatal([mergingObject][,message], [...interpolationValues])||||||||||
|logger.silent||||||||||
|logger.child(bindings, [options]) => logger||||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|pino的静态属性|description|type|default|enum|demo|||||
|-|-|-|-|-|-|-|-|-|-|
|pino.destination([opts]) => SonicBoom||||||||||
|pino.transport(opts) => ThreadStream||||||||||
|pino.multistream(streamArray, opts) => MultiStream||||||||||
|pino.stdSeriallizers(O)||||||||||
|pino.stdTimeFunctions(O)||||||||||
|pino.symbols(O)||||||||||
|pino.version||||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|browser api|属性|description|type|default|enum|demo||||
|-|-|-|-|-|-|-|-|-|-|
|asObject|||B|||`let pino = require('pino')({browser: {asObject: true}})`||||
|formatters|||O|||||||
|write|||F/O|||||||
|serialize|||B/A[]|||||||
|transmit|||O|||||||
|disabled|||B|||||||
<!-- prettier-ignore-end -->

`pino.fn(param, first: string, second: boolean = true) => void`
description

`pino.fn(param, [options: {a: string, b?: number}])`
description

## demo

```

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

看别人做的东西挺有意思的。看他们的 api 如何设计的，推断出它有哪些功能。再推断出如何使用（用例图）。
选项式调用。链式调用（声明式调用）。
每个选项一个功能。若太多，不好记忆。方便处理繁杂的参数。
链式调用没有简化繁杂的参数。
静态方法也挺好用。

```
O({childLevel: n}) // 可直接设置childLevel
let logger = O({...})
logger.child()     // 可链式调用
```

level 的值之间有空间。
