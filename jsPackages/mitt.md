# mitt

## overview

> TODO: description

### feature

- feature0
- feature1
- feature2

## install

`npm i mitt`

## usage

同`./demo.md`

```js
import mitt from 'mitt'
// const mitt = require('mitt');
const emitter = mitt()
// listen to an event
emitter.on('foo', (e) => console.log('foo', e))
// listen to all events
emitter.on('*', (type, e) => console.log(type, e))
// fire an event
emitter.emit('foo', { a: 'b' })
// clearing all events
emitter.all.clear()
// working with handler references:
function onFoo() {}
emitter.on('foo', onFoo) // listen
emitter.off('foo', onFoo) // unlisten
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
|mitt.all()|||列出已注册的事件名与回调方法|||||||
|mitt.on(en: S, f: F)|||注册事件名与回调方法|||||||
|mitt.off(en: S, f?: F)|||解绑指定的或全部的事件|||||||
|mitt.emit(en: S)|||触发指定的事件|||||||
<!-- prettier-ignore-end -->

## principle

它的逻辑太简单了。都让我想起了`plugincomb`
把所有注册的回调方法与事件名放在 map 对象中。在 emit 时调用。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
