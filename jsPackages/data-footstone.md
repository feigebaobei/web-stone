# data-footstone

## overview

> 使用 ts 编写基本的数据结构。

### feature

- stack
- queue
- hashMap
- tree
- graph 简单

## install

`npm i data-footstone`

## usage

```js
import { Stack } from 'data-footstone'
let s = new Stack()
s.push(1, 2, 3, 4)
s.toArray() // [1,2,3,4]
s.pop() // 4
s.pop() // 3
s.peek() // 2
s.isEmpty() // false
s.clear() // 清空栈
```

## api

<!-- prettier-ignore-start -->
|stack|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new Statck<T>()`||返回栈实例||||||
|`stack#toArray() => T[]`||返回栈内元素组成的数组||||||
|`stack#push(...p: T[]) => number`||把参数依次入栈，返回栈的长度。||||||
|`stack#pop() => T`||弹出栈顶元素||||||
|`stack#peek() => T`||返回栈顶元素||||||
|`stack#isEmpty() => boolean`||是否是空栈||||||
|`stack#clear() => void`||清空栈||||||
|`stack#size() => number`||返回栈大小||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|queue|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new Queue<T>()`||返回队列实例||||||
|`queue#enqueue(...p: T[]) => number`||把参数依次入队列，返回队列的长度。||||||
|`queue#dequeue() => T`||出队列||||||
|`queue#toArray() => T[]`||队列内的元素组成的数组||||||
|`queue#getHead() => T`||返回队首元素||||||
|`queue#getTail() => T`||返回队尾元素||||||
|`queue#size() => number`||返回队列长度||||||
|`queue#isEmpty() => boolean`||返回队列是否为空||||||
|`queue#clear() => void`||清空队列||||||
|`queue#reverse() => Queue`||返回反向后的队列||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|PriorityQueue|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new PriorityQueue<T>(defaultPriority: N = 0)`|defaultPriority 默认优先级|返回优先队列实例||||||
|`priorityQueue.highestPriority() => number | undefined`||返回队列中元素的最高优先级||||||
|`priorityQueue.lowestPriority() => number | undefined`||返回队列中元素的最低优先级||||||
|`priorityQueue.enqueue(element: T, priority: N = this.defaultPriority) => void`||入优先队列，返回队列的长度。||||||
|`priorityQueue.dequeue() => T | undefinde`||返回出队列的元素||||||
|`priorityQueue.getHead() => T | undefined`||返回队列首的元素||||||
|`priorityQueue.getTail() => T | undefined`||返回队列尾的元素||||||
|`priorityQueue.size() => number`||返回队列的长度||||||
|`priorityQueue.isEmpty() => number`||返回队列是否为空||||||
|`priorityQueue.clear() => void`||清空队列||||||
|``||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|SingleChain|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|``||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|DoublyChain|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|``||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|SingleCircleChain|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|``||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|DoublyCircleChain|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|``||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
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
