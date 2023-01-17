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
|`priorityQueue.highestPriority() => number \| undefined`||返回队列中元素的最高优先级||||||
|`priorityQueue.lowestPriority() => number \| undefined`||返回队列中元素的最低优先级||||||
|`priorityQueue.enqueue(element: T, priority: N = this.defaultPriority) => void`||入优先队列，返回队列的长度。||||||
|`priorityQueue.dequeue() => T \| undefinde`||返回出队列的元素||||||
|`priorityQueue.getHead() => T \| undefined`||返回队列首的元素||||||
|`priorityQueue.getTail() => T \| undefined`||返回队列尾的元素||||||
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
|`singleChain#removeAt(p: N) => T \| undefined`||返回被移删的元素||||||
|`singleChain#reverseSelft() => SingleChain`||使用递归的方式反转链表||||||
|`singleChain#reverse() => SingleChain`||使用循环的方式反转链表||||||
|`singleChain#clear() => void`||清空链表||||||
|`singleChain#slice(from: N, to: N = this.length) => void`||返回指定范围内的元素组成的单向链表||||||
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
|`doublyChain#removeAt(p: N) => T \| undefined`||返回被移删的元素||||||
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
|`singleCircleChain#removeAt(p: N) => T \| undefined`||返回被移删的元素||||||
|`singleCircleChain#clear() => void`||清空链表||||||
|`singleChain#slice(from: N, to: N = this.length) => void`||返回指定范围内的元素组成的单向循环链表||||||
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
|`doublyCircleChain#removeAt(p: N) => T \| undefined`||返回被移删的元素||||||
|`doublyCircleChain#clear() => void`||清空链表||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|HashMap|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new HashMap<T>(kind: HMK = 'separate', hash: HMH = 'djb2')`|T是要保存的值的类型。`type HashMapKind = 'separate' \| 'line'    type HashMapHash = 'djb2' | 'loselose'`|返回HashMap实例||||||
|`hashMap.box: SingleChain<G> \| HashMapBox<G>`|`HashMapBox<G>: {key: V, value: G}[]`||保存数据的容器。不要直接操作它。|||||
|`hashMap._size: N`||保存了多少条数据||||||
|`hashMap.kind: HashMapKind`||HashMap的种类。有2种，`'separate'`: 使用单向链表保存。分离链接。默认值。 `'line'`: 使用数组保存。线性探查。||||||
|`hashMap.hash: HashMapHash`||hash方法的种类名。有2种：`'djb2'`: 使用djb2 hash方法。默认值。`'loselose'`: 使用loselose hash方法。|||||未来可能支持自定义的hash方法。|
|`hashMap#createNode: (k: A, v: G) => HashMapBoxItem<G>`||返回一个节点||||||
|`hashMap#put: (k: A, v: G) => void`||添加一条数据。返回添加后的大小。||||||
|`hashMap#remove: (k: A) => G`||添加一条数据，返回数据的value.||||||
|`hashMap#get: (k: A) => G \| undefined`||返回数据||||||
|`hashMap#hashFn: (k: A) => N`||根据实例化时的参数hash指定的散列方法。||||||
|`hashMap#size: () => N`||返回保存了多少条数据|||||暂时暴露此方法|
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|hash方法|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`djb2HashFn: (k: A) => number`||最大无冲突数量 1013||||||
|`loseloseHashFn: (k: A) => number`||最大无冲突数量 37||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|BinaryTree|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new BinaryTree<T>()`||返回BinaryTree实例||||||
|`binaryTree.root: BinaryTreeOrNull<T>`||根节点||||||
|`binaryTree#createNode: (v: T) => BinaryTreeNode<T>`||返回一个节点||||||
|``` ```||缺少一个设置根节点的方法|||||使用`tree.root = tree.createNode(p)`设置|
|`binaryTree#insertAsLeft: (parent: BinaryTreeNode<T>, current: T) => void`||为指定节点插入左节点||||||
|`binaryTree#insertAsRight: (parent: BinaryTreeNode<T>, current: T) => void`||为指定节点插入右节点||||||
|`binaryTree#_preOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void`|cb的参数是node.value|前序遍历||||||
|`binaryTree#_inOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void`|cb的参数是node.value|中序遍历||||||
|`binaryTree#_postOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void`|cb的参数是node.value|后序遍历||||||
|`binaryTree#_levelTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void`|cb的参数是node.value|层次遍历||||||
|`binaryTree#isEmpty: () => B`||是否是空树||||||
|`binaryTree#height: (node: BinaryTreeNodeOrNull<T> = this.root) => N`||返回指根节点的树的高度。从1开始数。||||||
|`binaryTree#deep: (node: BinaryTreeNodeOrNull<T> = this.root) => N`||返回指定节点的深度。从0开始数。当root为null时返回-1.||||||
|`binaryTree#minDeep: () => N`||返回此树的最小深度。||||||
|`binaryTree#getLevelNode: (p: N) => BinaryTreeNode[]`||返回指定层数的节点组成的数组。|||||考虑该方法要不要处理为node.value组成的数组。|
|`binaryTree#isProper: () => B`||是否是真二叉树||||||
|`binaryTree#vertexCount: () => N`||返回树中节点的总数||||||
|`binaryTree#isFull: () => B`||是否是满二叉树||||||
|`binaryTree#isComplete: () => B`||是否是完全二叉树||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|BinarySearchTree|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|基于BinaryTree开发||可以使用二叉树的所有方法||||||
|`new BinarySearchTree<T>()`||返回BinarySearchTree实例||||||
|`binarySearchTree#insert: (v: T) => void`||插入一个节点||||||
|`binarySearchTree#search: (v: T) => boolean`||查找树中是否存在指定的值。返回boolean。||||||
|`binarySearchTree#traverse: (fn: Function, order: BinarySearchTreeOrder) => void`|`BinarySearchTreeOrder = 'preOrder' \| 'inOrder' \| 'postOrder' \| 'level'`。fn的参数是节点的value|使用指定顺序遍历树。||||||
|`binarySearchTree#min: () => T \| undefined`||返回树中最小的值||||||
|`binarySearchTree#max: () => T \| undefined`||返回树中最大的值||||||
|`binarySearchTree#findMinNode: (node: BinarySearchTreeNodeOrNull<T>) => BinarySearchTreeNodeOrNull<T>`||返回指定节点下的最小的节点||||||
|`binarySearchTree#findMaxNode: (node: BinarySearchTreeNodeOrNull<T>) => BinarySearchTreeNodeOrNull<T>`||返回指定节点下的最大的节点||||||
|`binarySearchTree#remove: (v: T) => void`||移除指定值的节点||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|AVLTree|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|``||||||||
|``||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|RedBackTree|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|``||||||||
|``||||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|order|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`bubbleSort(arr: any[], order = 'asc') => any[]`|`order: 'asc' \| 'des'`|冒泡排序。返回排好序的arr。会改变arr内元素的顺序。||||||
|`selectSort(arr: any[], order = 'asc') => any[]`|`order: 'asc' \| 'des'`|选择排序。返回排好序的arr。会改变arr内元素的顺序。||||||
|`mergeSort(arr: any[], order = 'asc') => any[]`|`order: 'asc' \| 'des'`|归并排序。返回排好序的arr。会改变arr内元素的顺序。||||||
|`insertSort(arr: any[], order = 'asc') => any[]`|`order: 'asc' \| 'des'`|插入排序。返回排好序的arr。会改变arr内元素的顺序。||||||
|`quickSort(arr: any[], order = 'asc') => any[]`|`order: 'asc' \| 'des'`|快速排序。返回排好序的数组。不会改变arr内元素的顺序。||||||
|`versionOrder(arr: S[]) => S[]`||快速排序。返回长序的数组。会改变arr内元素的顺序。||||||
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|Fifo|params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`new Fifo<K, V>(capacity: N) => Fifo`|capacity是容量|返回先进先出的实例||||||
|`fifo.capacity`||容量||||||
|`fifo.chain`||缓存数据的单向链表||||||
|`fifo#get(k: K) => V \| undefined`||返回缓存中的指定key对应的数据||||||
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
|`lru#remove(k: K) => v \| undefined`||返回被删除的元素||||||
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
|`lfu#remove(k: K) => v \| undefined`||返回被删除的元素|||||待开发|
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

> 我现在正在找工作。我想找一个技术骨干或前端 Leader 的岗位。有团队需要增加人手的可以联系我。18515195415@163.com
> 未来迭代计划。
> 未来迭代计划。
