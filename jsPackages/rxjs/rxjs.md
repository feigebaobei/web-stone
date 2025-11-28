# `rxjs`

## overview

> 可扩展的响应式 js 库  
> 响应式：当执行一个有延迟的功能时，定义一个回调方法。当该功能有变化时调用回调方法  
> 基于观察者队列实现了对异步和基础事件的编程。  
> 流：随着时间而变化的数据。  
> 是一个基于可观测数据流 Stream 结合观察者模式和迭代器模式的一种异步编程的应用库。  
> 非常优秀的异步数据流的管理工具。  
> 流的本质是一个按时间顺序排列的进行中事件的序列集合。  
> observable 是一个可调用的未来值或事件的集合。它能被多个 observer 订阅，每个订阅关系相互独立、互不影响。  
> 可观察对象一般以`$`结尾。  
> 数据的生产者生产出数据以流的形式给消费者（observer）。
> 官网介绍了数据流程的二种方式，push:生产者主动，pull:消费者主动。rxjs 是 pull 形式的。
> 流式处理数据的思想体现之一。
> 响应式编程框架之一。

|     | 生产者                           | 消费者                           |
| --- | -------------------------------- | -------------------------------- |
| 拉  | 被动的：当请求时产生数据。       | 积极的：决定何时请求数据。       |
| 推  | 积极的：按照自己的节奏生成数据。 | 被动的：对接收到的数据做出反应。 |

### feature

- 可观察的
- 观察者
- 订阅
- 操作
- 主题
- 时间表

## install

`npm i rxjs`

## usage

同下文

```js
// 展示一个响应式功能
```

## 概念

| 英文       | 中文         | 说明                                                                                         | 用途                           |
| ---------- | ------------ | -------------------------------------------------------------------------------------------- | ------------------------------ |
| observable | 可观察的对象 | pull 式数据流。产生数据的地方，可使用 next/error/complete 产生数据。能产生该对象的方式很多。 | 用于定义消费者可以收到的数据。 |
| observer   |              | 数据的消费者。明确如何消费数据，有三种方式：next/error/complete.默认是 next.                 |                                |
| operator   | 处理者       | 有管道式和创建式                                                                             | 处理数据                       |
| observable | 可观察的对象 |                                                                                              |                                |
| observable | 可观察的对象 |                                                                                              |                                |
|            |              |                                                                                              |                                |
|            |              |                                                                                              |                                |

### observables

```js
let observable$ =  new Observable((subscriber) => {
    subscriber.next(1) // 把1传递给订阅者
    subscriber.next(2)
    subscriber.next(3)
    subscriber.error(4) // 把4传递给订阅者，并不向下执行。
    subscriber.complete(5) // 把5传递给订阅者，并不向下执行。
})
// 返回一个可观察对象
let subscription = observable$.subscribe(p => {...})
// 订阅observable$。当有新值时执行该参数（即方法）
subscription.unsubscribe() // 取消指定的订阅
```

### observer

**观察者**是可观察对象递送来数据的消费者。observabl$有三种方式递送数据的方法分别对应到观察者。

- next()
- error()
- complete()

```js
// defined
let observer = {
    next: x => {}
    error: x => {}
    complete: x => {}
}
// use
observable$.subscribe(observer) // 给可观察者定义一个观察者。
// 观察者使用以上三个方法处理接收到的数据。
```

### [operators](/jsPackages/rxjs/operators.html)

基于可观察者做若干操作。  
每个操作符提供的只是一些通用的简单功能，但通过链式调用，这些小功能可以组合在一起，用来解决复杂的问题。

[官网的 api 列表](https://rxjs.dev/guide/operators)

```js
observable$.pipe($operator())
// 不改变该observable$，返回一个新的observable$
// jQuery的链式调用是改变原jQuery对象。
```

#### 功能分类

- 创建类（creation）
- 转化类（transformation）
- 过滤类（filtering）
- 合并类（combination）
- 多播类（multicasting）
- 错误处理类（error Handling）
- 条件分支类（conditional&boolean）
- 数学和合计类（mathmatical&aggregate）
- 其他
  - 背压控制类（backpressure control）
  - 可连接类（connectable）
  - 高阶

### subscription

通常用于不再使用数据的对象。

```js
let subscription = observable$.subscribe(() => {...})
subscription.unsubscribe() // 不再使用数据
```

### subjects

一般特殊的可观察对象，支持多播。

### scheduler

## configuration

默认配置文件：`path/to/file.json`。

## [api](/jsPackages/rxjs/api.html)

## [principle](/jsPackages/rxjs/principle.html)

使用 rollup 打包。打包的配置文件是分层的。
在`<root>/src/index.js`中统一输出。

```ts
interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}
interface Unsubscribable {
  unsubscribe(): void;
}
interface Subscribable<T> {
  subscribe(observer: Partial<Observer<T>>): Unsubscribable;
}
class Observable<T> implements Subscribable<T> {
    constructor
    static create()
    list()
    subscribe()


}
```

### uml

```
                (管道)
             -------------
   提供者 --->  流          ---> 消费者
             -------------
```

## [竞品](/jsPackages/rxjs/principle.html)

## todo

### 这个库是做什么的？

### js 中的异步处理

- promise / async & await
- generators
- callback
- 事件监听
- 发布订阅
- setTimeout / setInterval

### new Observable 的参数 subscribe 与 observable$的属性 subscribe 是不同的，为什么使用相同的名字？

### rx 是一个思想很好的库。每个人都应该好好学习它。

### 未来迭代计划。

### 未来迭代计划。

### 未来迭代计划。

### 未来迭代计划。
