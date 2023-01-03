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
|`new SingleChain<T>(...p: T[])`|p是由需要加入链表的元素组成的数组|返回单向链表实例||||||
|`singleChain.head`||返回链首||||||
|`singleChain.length`||返回链表长度||||||
|`singleChain#toArray() => T[]`||返回由链表的元素组成的数组||||||
|`singleChain#createNode(v: T, p: N) => SingleChainElement[]`||内部使用的方法。用于创建单向链表的节点。||||||
|`singleChain#append(v: T) => void`||追回元素后返回链表长度||||||
|`singleChain#insert(v: T, p: N) => boolean`||把指定元素插入到指定下标。返回是否插入成功。||||||
|`singleChain#removeAt(p: N) => T | undefined`||返回被移删的元素||||||
|`singleChain#reverseSelft() => SingleChain`||使用递归的方式反转链表||||||
|`singleChain#reverse() => SingleChain`||使用循环的方式反转链表||||||
|`singleChain#clear() => void`||清空链表||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|DoublyChain|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new DoublyChain<T>(...p: T[])`|p是由需要加入链表的元素组成的数组|返回双向链表实例||||||
|`doublyChain.head`||返回链首||||||
|`doublyChain.tail`||返回链尾||||||
|`doublyChain.length`||返回链表长度||||||
|`doublyChain#toArray() => T[]`||返回由链表的元素组成的数组||||||
|`doublyChain#append(v: T) => number`||追回元素后返回链表长度||||||
|`doublyChain#insert(v: T, p: N) => boolean`||把指定元素插入到指定下标。返回是否插入成功。||||||
|`doublyChain#removeAt(p: N) => T | undefined`||返回被移删的元素||||||
|`doublyChain#clear() => void`||清空链表||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|SingleCircleChain|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new SingleCircleChain<T>(...p: T[])`|p是由需要加入链表的元素组成的数组|返回单向循环链表实例||||||
|`singleCircleChain.head`||返回链首||||||
|`singleCircleChain.tail`||返回链尾||||||
|`singleCircleChain.length`||返回链表长度||||||
|`singleCircleChain#toArray() => T[]`||返回由链表的元素组成的数组||||||
|`singleCircleChain#append(v: T) => number`||追回元素后返回链表长度||||||
|`singleCircleChain#insert(v: T, p: N) => boolean`||把指定元素插入到指定下标。返回是否插入成功。||||||
|`singleCircleChain#removeAt(p: N) => T | undefined`||返回被移删的元素||||||
|`singleCircleChain#clear() => void`||清空链表||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|DoublyCircleChain|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new DoublyCircleChain<T>(...p: T[])`|p是由需要加入链表的元素组成的数组|返回双向循环链表实例||||||
|`doublyCircleChain.head`||返回链首||||||
|`doublyCircleChain.tail`||返回链尾||||||
|`doublyCircleChain.length`||返回链表长度||||||
|`doublyCircleChain#toArray() => T[]`||返回由链表的元素组成的数组||||||
|`doublyCircleChain#append(v: T) => number`||追回元素后返回链表长度||||||
|`doublyCircleChain#insert(v: T, p: N) => boolean`||把指定元素插入到指定下标。返回是否插入成功。||||||
|`doublyCircleChain#removeAt(p: N) => T | undefined`||返回被移删的元素||||||
|`doublyCircleChain#clear() => void`||清空链表||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|Fifo|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new Fifo<K, V>(capacity: N) => Fifo`|capacity是容量|返回先进先出的实例||||||
|`fifo.capacity`||容量||||||
|`fifo.chain`||缓存数据的单向链表||||||
|`fifo#get(k: K) => V | undefined`||返回缓存中的指定key对应的数据||||||
|`fifo#put(k: K, v: V) => N`||追加或设置缓存数据后返回缓存的大小||||||
|`fifo#size() => N`||返回缓存的大小||||||
|`fifo#keys() => K[]`||返回缓存中的数据中的key组成的数组||||||
|`fifo#values() => V[]`||返回缓存中的数据中的value组成的数组||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|Lru|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new Lru<K, V>(capacity: N) => Lru`|capacity是容量|返回lru实例||||||
|`lru.capacity`||容量||||||
|`lru.chain`||缓存数据的双向链表||||||
|`lru.map`||缓存key的表||||||
|`lru#get(k: K) => v`||返回缓存中的指定key对应的数据||||||
|`lru#put(k: K, v: V) => number`||追加或设置缓存数据后返回缓存的大小||||||
|`lru#remove(k: K) => v | undefined`||返回被删除的元素||||||
|`lru#size() => number`||返回缓存的数据条数||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|Lfu|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new Lfu<K, V>(capacity: N) => Lfu`|capacity是容量|返回lru实例||||||
|`lfu.capacity`||容量||||||
|`lfu.chain`||缓存数据的双向链表||||||
|`lfu#get(k: K) => v`||返回缓存中的指定key对应的数据||||||
|`lfu#put(k: K, v: V) => number`||追加或设置缓存数据后返回缓存的大小||||||
|`lfu#remove(k: K) => v | undefined`||返回被删除的元素|||||待开发|
|`lfu#size() => number`||返回缓存的数据条数||||||
|`lfu#keys() => K[]`||返回缓存中由key组成的数组||||||
|`lfu#values() => V[]`||返回缓存中由value组成的数组||||||
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
