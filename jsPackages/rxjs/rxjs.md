# `rxjs`

## overview
> 可扩展的响应式js库  
> 响应式：当执行一个有延迟的功能时，定义一个回调方法。当该功能有变化时调用回调方法  
> 基于观察者队列实现了对异步和基础事件的编程。  
> 流：随着时间而变化的数据。  
> 是一个基于可观测数据流 Stream 结合观察者模式和迭代器模式的一种异步编程的应用库。  
> 非常优秀的异步数据流的管理工具。  
> 流的本质是一个按时间顺序排列的进行中事件的序列集合。  
> observable是一个可调用的未来值或事件的集合。它能被多个observer订阅，每个订阅关系相互独立、互不影响。  
> 可观察对象一般以`$`结尾。  
> 数据的生产者生产出数据以流的形式给消费者（observer）。  





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
```js
// 展示一个响应式功能


```

## 概念
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

### operators
基于可观察者做要若干操作。
```js
observable$.pipe($operator())
// 不改变该observable$，返回一个新的observable$
// jQuery的链式调用是改变原jQuery对象。
```

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

## api

## principle
使用rollup打包。打包的配置文件是分层的。
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

## todo
### 这个库是做什么的？
### js中的异步处理
- promise / async & await
- generators
- callback
- 事件监听
- 发布订阅
- setTimeout / setInterval






### new Observable的参数subscribe与observable$的属性subscribe是不同的，为什么使用相同的名字？

### rx是一个思想很好的库。每个人都应该好好学习它。

### 未来迭代计划。
### 未来迭代计划。
### 未来迭代计划。
### 未来迭代计划。