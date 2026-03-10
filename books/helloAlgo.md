# hello algo

> 面试是被问到背包问题。我没答上来，面试官没给机会。我着急了。把基本的算法都复习了。

# 第 0 章 前言

# 第 1 章 初识算法

算法：是在有限时间内解决特定问题的一组指令或操作步骤。有以下特性：

- 问题是明确的，含清晰的输入与输出。
- 具有可行性，能够在有限步骤、时间和内存空间下完成。
- 各步骤有确定的含义，在相同的输入和运行条件下，输出始终相同。

数据结构：是组织和存储数据的方式，涵盖数据内容（盒子）、数据之间关系（指针）和数据操作方法（方法）。具有以下设计目标：

- 空间占用尽量小，以节省计算机内存。
- 数据操作尽可以快速，涵盖数据访问、添加、删除、更新等。
- 提供简洁的数据表示和逻辑信息，以便算法高效运行。
  设计数据结构是一个充满权衡的过程。

# 第 2 章 复杂度分析

复杂度分析能够体现算法运行所需时间和空间资源与输入数据规模之间的关系。它描述了随着输入数据规模的增加、算法执行所需时间和空间的增长趋势。
时间资源对应时间复杂度
空间资源对应空间复杂度
输入数据规模的增加反映了算法运行效率与输入数据规模之间的关系。
时间和空间的增长趋势反映了增长的快慢。

## 迭代

for 循环，适合预告知道迭代次数。
while，适合判断条件。
嵌套循环

## 递归

递归：传入更小或更简单的参数，直到“终止条件”再逐层返回。

```js
let f = (n) => {
  if (n === 1) {
    return 1
  } else {
    return n + f(n - 1)
  }
}
```

遇到终止条件就是递转归时。
递：问题越来越简单。
归：返回到上一层。
尾递归可以减少占用内存空间。

|          | 迭代                 | 递归                 |                                        |
| -------- | -------------------- | -------------------- | -------------------------------------- |
| 实现方式 | 循环                 | 函数调用自身         |                                        |
| 时间效率 | 效率高（无函数调用） | 每次调用函数都有开销 | 实际开发中基本无差别，所以不考虑区别。 |
| 内存使用 | 固定大小内存         | 可能占用大量栈空间   |                                        |
| 乱用问题 | 适用于简单问题       | 适用于要问题分解     |                                        |

## 时间复杂度

- 确定运行平台
- 评估各种操作所需时间。如：+需要 1ns，\*需要 10ns，print()需要 5ns 等。
- 所有的计算操作。

## 时间增长趋势

## 函数渐近上界

操作次数 T(n)
T(n)=O(f(n)) 不会

时间复杂度由 T(n)中最高阶的项来决定。当 n 趋于无穷大时，最高阶的项将发挥主导作用，其他项可以忽略。

常见类型
O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)
常数阶 对数阶 线性阶 线性对数阶 平方阶 指数阶 阶乘阶  
 每轮减小一半 循环 常出现在嵌套 嵌套循环
循环中，2 层
分别是 O(n)、
O(log n)

最差时间复杂度 O
最佳时间复杂度 Ω
平均时间复杂度 Θ

空间复杂度
一般只关注最差空间复杂度：最差输入数据为准或以算法运行中峰值内存为准。
O(1) < O(log n) < O(n) < O(n^2) < O(2^n)
常数阶 对数阶 线性阶 平方阶 指数阶
数组、链表、 二维列表
栈、队列

# 第 3 章 数据结构

|        |      |                              |     |
| ------ | ---- | ---------------------------- | --- |
| 线性   |      | 数组、链表、栈、队列、哈希表 |     |
| 非线性 | 树形 | 树、堆、哈希                 |     |
|        | 网状 | 图                           |     |

在算法程序运行时，正在处理的数据主要存储在内存中。
存储数组的内存空间是连续的。
存储链表的内存空间是分散的。

# 第 4 章 数组与链表

```js
let arr = new Array(5).fill(0) // 初始化数组
arr[2] // 访问元素。本质是内存地址的偏移量。
arr.split(index, len, item) // 插入元素
arr.split(index, len) // 删除len个元素
arr.forEach(...) // 遍历数组
arr.find(...) // 查找元素
arr.sort(...) // 排序
```

数组的优点

- 空间效率高
- 支持任一访问
- 缓存局部性
  数组的缺点
- 插入与删除效率低
- 长度不可变（js 语言的数组可变）
- 空间浪费
  数组的应用
- 任一访问
- 排序&搜索
- 查找表
- 机器学习
- 实现其他数据结构

```js
// 初始化链表
let n0 = new Node()
n0.next = n1
// 插入节点
// 删除节点
// 访问节点 access
// 查找节点 find
```

|          | 数组                           | 链表           |     |
| -------- | ------------------------------ | -------------- | --- |
| 存储方式 | 连续内存空间                   | 分散内存空间   |     |
| 容量扩展 | 长度不可变                     | 可灵活扩展     |     |
| 内存效率 | 元素占用内存少，但可能浪费空间 | 元素占用内存多 |     |
| 访问元素 | O(1)                           | O(n)           |     |
| 添加元素 | O(n)                           | O(1)           |     |
| 删除元素 | O(n)                           | O(1)           |     |

常见链表

- 单向链表
- 环形链表
- 双向链表

链表的典型应用

- 栈&队列
- 哈希表
- 图
- 高级数据结构：红黑树、b 树、
- 浏览器历史
- lru
- 时间片轮转调度算法
- 数据缓冲区

|        | 硬盘                                       | 内存                                   | 缓存                                                |
| ------ | ------------------------------------------ | -------------------------------------- | --------------------------------------------------- |
| 用途   | 长期存储数据，包括操作系统、程序、文件等。 | 临时存储当前运行的程序和正在处理的数据 | 存储经常访问的数据和指令，减少 cpu 访问内存的次数。 |
| 易失性 | 断电后数据不会丢失                         | 断电后数据会丢失                       | 断电后数据会丢失                                    |
| 容量   | 较大。tb 级别                              | 较小。gb 级别                          | 非常小，mb 级别                                     |
| 速度   | 较慢，x00-x000mb/s                         | 较快，x0gb/s                           | 非常快，x0-x00gb/s                                  |
| 价格   | 较便宜，0.x-x 元/bg                        | 较贵，x0-x00 元/bg                     | 非常贵，随 cpu 打包计价                             |

## 数据结构的缓存效率

缓存会采取以下数据加载机制：

- 缓存行
- 预取机制
- 空间局部性
- 时间局部性

# 第 5 章 栈与队列

## 栈：先入后出的逻辑

| 方法   | 描述         | 时间复杂度 |     |
| ------ | ------------ | ---------- | --- |
| push() | 入栈         | O(1)       |     |
| pop()  | 出栈         | O(1)       |     |
| peek() | 访问栈顶元素 | O(1)       |     |

栈的应用

- 浏览器的后退&前进
- 软件的撤销与反撤销
- 程序内存管理

## 队列：先入先出的线性

| 方法名 | 描述         | 时间复杂度 |     |
| ------ | ------------ | ---------- | --- |
| push() | 元素入队     | O(1)       |     |
| pop()  | 队首出队     | O(1)       |     |
| peek() | 访问队首元素 | O(1)       |     |

## 双向队列

pushFirst()
popFirst()
pushLast()
popLast()
peekFirst()
peekLast()

# 第 6 章 哈希表

添加、删除、查询的时间复杂度都是 O(1)

```js
index = hash(key) % capacity
```

## 哈希冲突：哈希方法的返回值相同。

解决方案：

- 扩容哈希表
- 链式地址。（哈希表的元素是链表。）
- 开放寻址（也叫线性探测）。（当哈希表中指定位置存在元素时向后线性遍历。）

## 哈希算法

决定了碰撞因子。

目标：

- 确定性
- 效率高
- 均匀分布

应用：

- 密码存储
- 数据完整性检查
- 应用在密码学上
  - 单向性。无法通过哈希值推出原数据。
  - 抗碰撞性。很难找到相同哈希值的 2 个不同原数据。
  - 雪崩效应。微小不同的 2 个原数据对应的哈希值显著不同。

设计哈希算法

- 加法哈希。每个字母的 ascii 码相加。以和为哈希值。
- 乘法哈希。每轮乘一个常数，再求 ascii 码的和。
- 异或哈希。每个元素通过异或操作得到一个哈希值。
- 旋转哈希。

常见的哈希算法：

- md5&sha-1.已多次被成功攻击。在安全方面被弃用。
- sha-2.最安全的哈希算法。
- sha-3。开销比 sha-2 低。

# 第 7 章 树

完美二叉树（也称满二叉树，所有层的节点都被填满。）反映了自然界中常见的细胞分裂现象。
完全二叉树仅允许最底层节点未填满，并且最底层从左到右依次连续填充。
完满二叉树，所有节点都有 0 或 2 个节点。
平衡二叉树，左右子树的高度差不超过 1.

|                             | 完美二叉树（最佳结构） | 链表（最差结构） |     |
| --------------------------- | ---------------------- | ---------------- | --- |
| 第 i 层的节点数量           | 2^(i-1)                | 1                |     |
| 高度为 h 的树的叶子节点数量 | 2^h                    | 1                |     |
| 高度为 h 的树的节点总数     | 2^(h+1)-1              | h+1              |     |
| 节点总数为 n 的树的高度     | log2(n+1)-1            | n-1              |     |

## 二叉树的遍历

- 层序遍历，广度优先遍历（bfs）
- 前序遍历，都是深度优先遍历（dfs）,即：先走到头，再回溯继续。
- 中序遍历
- 后序遍历

```js
let f = (node, cb) => {
  let queue = [node]
  while (queue.length) {
    let t = queue.shift()
    cb(t)
    if (t.left) {
      queue.push(t.left)
    }
    if (t.right) {
      queue.push(t.right)
    }
  }
}
// 时间复杂度 O(n)
// 空间复杂度 O(n)

let preOrder = (node, cb) => {
  if (!node) {
    return
  }
  cb(node)
  preOrder(node.left)
  preOrder(node.right)
}
let inOrder = (node, cb) => {
  if (!node) {
    return
  }
  inOrder(node.left)
  cb(node)
  inOrder(node.right)
}
let postOrder = (node, cb) => {
  if (!node) {
    return
  }
  postOrder(node.left)
  postOrder(node.right)
  cb(node)
}
// 时间复杂度 O(n)
// 空间复杂度 O(n)
```

## 二叉搜索树

二叉搜索树的条件：

- 左子树的节点的值 \< 当前节点的值 \< 右子树的节点的值
- 不允许节点重复

```js
// 查找节点
let search = (v) => {
  let cur = this.root
  while (cur) {
    if (cur.value === v) {
      break
    } else if (cur.value < v) {
      cur = cur.left
    } else if (v < cur.value) {
      cur = cur.right
    } else {
      cur = null
      break
    }
  }
  return cur
}
// 插入节点
let insert = (v) => {
  if (this.root) {
    let cur = this.root
    let pre
    while (cur) {
      if (cur.value === v) {
        throw new Error('节点值不能重复')
      } else {
        pre = cur
        if (cur.value < v) {
          cur = cur.right
        } else {
          cur = cur.left
        }
      }
    }
    let node = createNode(v)
    if (pre.value < v) {
      pre.right = node
    } else {
      pre.left = node
    }
  } else {
    this.root = createNode(v)
    return
  }
}
// 时间复杂度 O(log n)
// 删除节点
let remove = (v) => {
  if (this.root) {
    let cur = this.root
    let pre
    while (cur) {
      if (cur.value === v) {
        break
      }
      pre = cur
      if (cur.value < v) {
        cur = cur.right
      } else {
        cur = cur.left
      }
    }
    if (cur) {
      // 找到
      if (cur.left && cur.right) {
        // 2个节点
        let r = cur
        let t = cur.right
        let tp
        while (t.left) {
          tp = t
          t = t.left
        }
        // cur.value = t.value // 这里采用只处理值的方式。也可以移到节点。
        if (pre.left === cur) {
          pre.left = t
          t.left = cur.left
          t.right = cur.right
        } else {
          pre.right = t
          t.left = cur.left
          t.right = cur.right
        }
        tp.left = null
        return r
      } else {
        // 0或1
        let child = cur.left || cur.right // node | null
        if (cur === this.root) {
          // return cur
          this.root = child
        } else {
          if (pre.left === cur) {
            pre.left = child
          } else {
            pre.right = child
          }
        }
        return cur
      }
    } else {
      // 没找到
      return null
    }
  } else {
    return null
  }
}
```

在二叉搜索树上使用中序遍历时，是递增的。复杂度是 O(n).

|          | 无序数组 | 二叉搜索树 |     |
| -------- | -------- | ---------- | --- |
| 查找元素 | O(n)     | O(log n)   |     |
| 插入元素 | O(1)     | O(log n)   |     |
| 删除元素 | O(n)     | O(log n)   |     |

二叉搜索树的常见应用

- 用作系统的多级索引，可以实现高效查找、插入、删除操作。
- 作为其他搜索算法的底层数据结构。
- 用于存储数据流，以保持其有序状态。

## avl 树（平衡二叉搜索树）

为了解决二叉搜索树成为链表的极端情况。可以使各种操作（查、增、删）的时间复杂度保持在 O(logn)级别。

```js
let createNode = (v) => {
  return {
    value: v,
    left: null,
    right: null,
    height: 0,
  }
}
```

叶子节点的高度为 0.空节点的高度为-1.

```js
class AVLTree {
  constructor() {
    this.root = null
  }
  height(node) {
    return node === null ? -1 : node.height
  }
  updateHeight(node) {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1
  }
  balanceFactor(node) {
    if (node) {
      return this.height(node.left) - this.height(node.right)
    } else {
      return 0
    }
  }
  // 向右旋转
  //         N
  //     N
  // N
  rightRotate(node) {}
  // 向左旋转
  // N
  //     N
  //         N
  leftRotate(node) {}
  // 先左旋再右旋
  //         N
  // N
  //     N
  // 先右旋再左旋
  // N
  //         N
  //     N
  // 旋转
  rotate(node) {
    let balanceFactor = this.balanceFactor(node)
    if (balanceFactor > 1) {
      // 左偏树
    }
    if (balanceFactor < -1) {
      // 右偏树
    }
    return node
  }
  // 插入节点
  insert() {}
  // 删除节点
  remove(v) {}
}
```

| 失衡节点的平衡因子 | 子节点的平衡因子 | 应采用的旋转方法 |     |
| ------------------ | ---------------- | ---------------- | --- |
| >1                 | >=0              | 右旋             |     |
| >1                 | <0               | 先左旋后右旋     |     |
| <-1                | <=0              | 左旋             |     |
| <-1                | >0               | 先右旋再左旋     |     |

avl 树的典型应用：

- 组织和存储大型数据，适用于高频查找、低频增删的场景。
- 用于构建数据库中的索引系统
- 基于平衡二叉树开发的红黑树的平衡条件更宽松，插入与删除的旋转操作更少，节点增删操作的平均效率更高。

# 第 8 章 堆

堆是完全二叉树。
小顶堆：任意节点的值 <= 其子节点的值
大顶堆：任意节点的值 >= 其子节点的值

# 第 9 章 图

图是非线性数据结构，由顶点(vertex)和边(edge)组成。图的表示方式：邻接矩阵、邻接表。

- 线性关系用链表
- 分治关系用树
- 网络关系用图

无向图：也就是双向连接关系。
有向图：由一边指向别一边，反之不通。
从一个顶点出发可以到达其他任意顶点是连通图，反之是非连通图。
有权图：边具有权重属性。
度：表示一个顶点拥有边数。入度表示指向该节点的边，出度表示从该顶点指出的边。

```
    1----5----4
    |\  /     |
    | \/      |
    3--2-------
```

## 邻接矩阵

若矩阵`Vi`与`Vj`连通，则用`M[i, j] = 1`表示，反之用`M[i, j] = 0`表示。本质是二维数组。
关于从左上角到右下角的对角线对称。

|     | 1   | 2   | 3   | 4   | 5   |
| --- | --- | --- | --- | --- | --- |
| 1   | -   | 1   | 1   | 0   | 1   |
| 2   | 1   | -   | 1   | 1   | 1   |
| 3   | 1   | 1   | -   | 0   | 0   |
| 4   | 0   | 1   | 0   | -   | 1   |
| 5   | 1   | 1   | 0   | 1   | -   |

- 顶点不能与自身连接，所以对角线无意义。
- 关于对角线对称。
- 若把 1/0 改为权重值，就是有权图了。

时间复杂度：O(1)
空间复杂度：O(n^2)

## 邻接表

用 n 个链表表示图。第 i 个链表表示第 i 个节点相连的顶点。
可以在数组、map、链表中放链表。
用邻接表（哈希表）的时间效率、空间效率最优。

```
1-2-3-5
2-1-2-4-5
3-1-2
4-2-5
5-1-2-4
```

O(n) O(log n) O(1)
链表 ------> avl 树或红黑树 ------> 哈希表

| 常见的图 | 顶点 | 边                   | 图计算问题   |
| -------- | ---- | -------------------- | ------------ |
| 社交网络 | 用户 | 好友关系             | 潜在好友推荐 |
| 地铁线路 | 站点 | 站点间的连通性       | 最短路线推荐 |
| 太阳系   | 星体 | 星体间的万有引力作用 | 行星轨道计算 |

```js
// 我写的，与原文逻辑相同。
class Chain {}
class GraphNode {
  constructor() {}
  is(node) {}
}
class GraphAdjMat {
  constructor(vertices, edges) {
    // 初始化邻接表、邻接矩阵、邻接map.
    this.vertices = [] // 所有点组成的数组
    // this.adjMat = [] // 邻接矩阵
    // this.adjArr = [] // 邻接表
    // this.adjChain = new Chain()
    this.adjMap = new Map() // 邻接map
    for (let v of vertices) {
      this.addVertex(v)
    }
    for (let e of edges) {
      this.addEdges(e[0], e[1])
    }
  }
  size() {
    return this.vertices.length
  }
  // 添加点
  addVertex(v) {
    this.vertices.push(v)
    // let tArr = Array.from({length: this.size()}, () => 0)
    // tArr[0] = v
    // this.adjMat.push(tArr)
    // this.adjMat.forEach(arr => arr.push(0))

    // this.adjArr.push(new Chain(v))

    this.adjMap.set(v, [])
  }
  // 添加边
  addEdge(v0, v1) {
    // 无向图
    if (this.adjMap.has(v0) && this.adjMap.has(v1) && !v0.is(v1)) {
      this.adjMap.get(v0).push(v1)
      this.adjMap.get(v1).push(v0)
    }
  }
  // 删除点
  removeEdge(v) {
    if (this.adjMat.has(v)) {
      this.adjMap.delete(v)
      this.adjMap.forEach((arr, key, map) => {
        let index = arr.findIndex((item) => item.is(v))
        arr.splice(index, 1)
      })
    }
  }
  // 删除边
  removeVertex(v0, v1) {
    if (this.adjMap.has(v0) && this.adjMap.has(v1)) {
      let index = this.adjMap.get(v0).findIndex((v) => v.is(v1))
      this.adjMap.get(v0).splice(index, 1)
      index = this.adjMap.get(v1).findIndex((v) => v.is(v0))
      this.adjMap.get(v1).splice(index, 1)
    }
  }
  // 打印图
  print() {
    clog(this.vertices)
    this.adjMap.forEach((value) => {
      clog(value)
    })
  }
  // 是否邻接
  isAdj(v0, v1) {
    // 无向图需要判断1个方向
    if (this.adjMap.has(v0) && this.adjMap.has(v1)) {
      return this.adjMap.get(v0).some((v) => v.is(v1))
    }
    // 有向图需要判断2个方向
  }
  // 广度优先
  bfs(v, fn) {
    let queue = [v]
    let tag = new Map()
    // 不存在 未搜索
    // 1 可访问
    // 2 已处理
    tag.set(v, 1)
    while (queue.length) {
      let t = queue.shift()
      fn(t)
      tag.set(t, 2)
      this.adjMap.get(t).forEach((item) => {
        if (tag.has(item)) {
        } else {
          tag.set(item, 1)
          queue.push(item)
        }
      })
    }
  }
  // 深度优先
  dfs(v, fn) {
    let tagMap = new Map()
    let f = (v, fn) => {
      fn(v)
      tagMap.set(v, 1)
      this.adjMap.get(v).forEach((itemV) => {
        if (!this.map.has(itemV)) {
          f(itemV, fn)
        }
      })
    }
    f(v, fn)
  }
}
```

广度优先遍历是一种由近及远的遍历方式。
深度优先遍历是一种优先走到底、无路可走再回头的遍历方式。

# 第 10 章 搜索

二分查找，是一种基于分治策略的高效搜索算法。它利用数据的有序性，每轮缩小一半搜索范围。直到找到目标或搜索区间为空为止。

- 适用于有序数据。
- 仅适用于数组。不适用于链式数据。
- 小数据量下，线性查找性能更佳。

把线性查找改变为哈希查找可以降低算法的时间复杂度。

## 自适应搜索

用于在特定数据结构中快速检索目标元素。

|              | 线性搜索 | 二分查找      | 树查找        | 哈希查找      |     |     |
| ------------ | -------- | ------------- | ------------- | ------------- | --- | --- |
| 查找元素     | O(n)     | O(log n)      | O(log n)      | O(1)          |     |     |
| 插入元素     | O(1)     | O(n)          | O(log n)      | O(1)          |     |     |
| 删除元素     | O(n)     | O(n)          | O(log n)      | O(1)          |     |     |
| 额外空间     | O(1)     | O(1)          | O(n)          | O(n)          |     |     |
| 数据预处理   | /        | 排序 O(nlogn) | 建树 O(nlogn) | 建哈希表 O(n) |     |     |
| 数据是否有序 | 无序     | 有序          | 有序          | 无序          |     |     |

# 第 11 章 排序

理想排序算法：运行快、原地、稳定、自适应、能用性好。

## 选择排序

在未排序区间内找到最小元素的下标，与下标为 i 的元素交换。

```
let f = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let k = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[k]) {
                k = j
            }
        }
        [arr[k], arr[i]] = [arr[i], arr[k]]
    }
}
```

时间复杂度 O(n^2)
空间复杂度 O(1) 原地排序

## 冒泡排序

冒泡过程示意：
413152
131425
113245
112345
每一轮都会的无序区间内最大元素排序。

```js
let f = (arr) => {
    for (let i = arr.length - 1; i > 0 i++) {
        let flag = false // 表示未排序区间是否已经有序
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                flag = true
            }
        }
        if (!flag) {
            break;
        }
    }
}
```

时间复杂度 O(n^2)
空间复杂度 O(1) 原地排序

## 插入排序

1. 设第一个元素已经完成排序。
2. 依次把未排序的元素插入到已经排序区间的正确位置。

```js
let f = (arr) => {
  if (arr.length <= 1) {
    return
  }
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i]
    // 找到有序区间的合适位置
    let j = i - 1
    while (j >= 0) {
      if (cur < arr[j]) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
      j--
    }
    arr[j + 1] = cur
  }
}
```

时间复杂度 O(n^2)
空间复杂度 O(1) 原地排序

## 快速排序

哨兵划分的实质是将一个较长的排序问题简化为 2 个较短数组的排序问题。

- 以数组最左端元素为基准数（也可以是其他位置），初始化 2 个指针 i/j，分别指向最左端、最右端。
- 基于数组设置一个循环，每轮向右移动 i，找到一个比不基准数小的元素；向左移动 j，找到一个比基准数大的元素；再交换；直到 ij 交叉时停止。
- 把基准数交换到 2 个子数组的交界线。

```js
let swap = (arr, i, j) => {
  let t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}
let _f = (arr, left, right) => {
  // 以arr[left]为基准数
  let i = left,
    j = right
  while (i < j) {
    while (i < j && arr[j] >= arr[left]) {
      j -= 1 // 从右向左，找到第一个小于基准数的元素
    }
    while (i < j && arr[i] <= arr[left]) {
      i += 1 // 从左向向，找到第一个大于基准数的元素
    }
    this.swap(arr, i, j)
  }
  swap(arr, i, left) // 把基准数交换到2个子数组的交界线。
  return i
}
let f = (arr, left = 0, right = arr.length) => {
  if (left >= right) {
    return
  }
  let pivot = _f(arr, left, right) // 哨兵划分
  f(arr, left, pivot - 1)
  f(arr, pivot - 1, right)
}
```

时间复杂度 O(nlogn)
空间复杂度 O(n) 原地排序

> 用遍历的思维解决现实问题
> 数据结构我已经会了，它是整理数据的。
> 在这种结构下满足特定规律。利用这种规律去解决现实问题，应该被叫做“技巧”。算不上“算法”。

优化基准数

```js
let medianThree = (arr, leftIndex, midIndex, rightIndex) => {
  let l = arr[leftIndex],
    m = arr[midIndex],
    r = arr[rightIndex]
  // m在中间
  if ((l <= m && m <= r) || (r <= m && m <= l)) {
    return midIndex
  } else if ((m <= l && l <= r) || (r <= l && l <= m)) {
    // l在中间
    return leftIndex
  } else {
    // r在中间
    return rightIndex
  }
}
```

## 归并排序

先分到数组只有一个元素再合并在一起。

## 链表排序

可以将链表排序任务的空间复杂度优化到 O(1)

## 堆排序

## 桶排序

处理大数据量时表现很好。

1. 创建若干桶。按大小分别放入这些桶。
2. 分别排序各桶内数据。（可以在针对性事务上把容量多的桶分开，把空桶删除，把容量小的桶合并。）
3. 多个桶的数组依次合并到一个数组中。

```js
let f = (arr, n = 2) => {
  let k = arr.length / n
  let a = []
  for (let i = 0; i < k; i++) {
    a.push([])
  }
  // ...
}
```

## 计数排序

通过统计元素数量来实现排序。常用于整数数组。
实质是桶排序。

1. 以非负数为下标缓存出现的次数。
2. 根据出现次数填入数组

```js
let f = (arr) => {
  let min = Math.min(...arr)
  let max = Math.max(...arr)
  let a = new Array(max - min + 1).fill(0)
  arr.forEach((item) => {
    a[item - min]++
  })
  let r = []
  a.forEach((item, index) => {
    for (let i = 0; i < item; i++) {
      r.push(index + min)
    }
  })
}
```

## 基数排序

适用于大数据量排序。
不会

# 第 12 章 分治

难题被逐层拆解，每一次拆解都使它变得更简单。
分而治之提示了一个重要事实：从简单做起，一切都不再复杂。

- 分：递归地把原问题分解为若干子问题，直到方便解决为止。
- 治：把子问题的解合并成为原问题的解。

## 汉诺塔问题

给定三根柱子，记为 A、B 和 C 。起始状态下，柱子 A 上套着 𝑛 个圆盘，它们从上到下按照从小到大
的顺序排列。我们的任务是要把这 𝑛 个圆盘移到柱子 C 上，并保持它们的原有顺序不变（如图 12‑10
所示）。在移动圆盘的过程中，需要遵守以下规则。

1. 圆盘只能从一根柱子顶部拿出，从另一根柱子顶部放入。
2. 每次只能移动一个圆盘。
3. 小圆盘必须时刻位于大圆盘之上。

当 n=1 时，f(1)=1
当 n=2 时，f(2)=2f(1)+1=3
当 n=3 时，f(3)基于 f(2)和 f(1)完成。f(3)=2f(2)+1=7
当 n=4 时，f(4)=2f(3)+1=15

```js
let f = (n) => {
  if ((n = 1)) {
    return 1
  } else {
    return f(n - 1) * 2 + 1
  }
}
```

# 第 13 章 回溯

从初始状态出发，暴力搜索所有可能的解决方案，当遇到正确的解时记录，直到尝试完所有解决方案。

## 回溯算法

### dfs

给定一棵二叉树，搜索并记录所有值为 7 的节点，请返回节点列表。

```
let arr = []
let f = (node, arr) => {
    if (node) {
        if (node.value === 7) {
            arr.push(node)
        }
        f(node.left)
        f(node.right)
    } else {
        return
    }
}
f(root, arr)
```

当算法运行中遇到某个状态无法继续前进或无法得到满足时，撤销上一步的选择，退回到之前的状态并尝试其他可能的解决方案。

### 在二叉树中搜索所有值为 7 的节点，请返回根节点到这些节点的路径。

```js
let f = (node, path, res) => {
  if (node) {
    path.push(node)
    if (node.value === 7) {
      res.push([...path])
    }
    f(node.left, path, res)
    f(node.right, path, res)
    path.pop()
  } else {
    return
  }
}
let res = []
f(root, [], res)
```

### **剪枝** 这是回溯算法的重点

复杂的回溯问题一般有多个约束条件，这些约束条件被称为“剪枝”。
在二叉树中搜索所有值为 7 的节点，请返回根节点到这些节点的路径，并要求路径中不包含值为 3 的
节点。

```js
let f = (node, path, res) => {
  if (!node || node.value === 3) {
    // 可以把这个判断条件抽象为一个返回boolean的方法。
    return
  } else {
    path.push(node)
    if (node.value === 7) {
      res.push([...path])
    }
    f(node.left, path, res)
    f(node.right, path, res)
    path.pop()
  }
}
```

> 我发现作用在非线性结构（树、图）上使用回溯算法。不知道在线性结构（数组、链表）上能不能使用回溯算法。

## 例题

全排列问题：给定一个集合，求出其所有可能的排列。

```js
let f = (arr, state = []) => {
  if (state.length === arr.length) {
    res.push([...state])
    return
  } else {
    arr.forEach((item) => {
      if (!state.includes(item)) {
        state.push(item)
        f(arr, state)
        state.pop()
      }
    })
  }
}
```

> 循环时初始化为[]。和 arr.push(x) & arr.pop()相同效果。
> 把现实问题转换为代码问题，再用代码实现。

给定一个正整数数组 nums 和一个目标正整数 target ，请找出所有可能的组合，使得组合中的元素
和等于 target 。给定数组无重复元素，每个元素可以被选取多次。请以列表形式返回这些组合，列
表中不应包含重复组合。

```js
let t = []
let f = (arr, target, state = []) => {
  if (sum(state) === target) {
    // 可以在这里剪枝 1
    let p = state.reduce((r, c) => {
      r *= c
      return r
    }, 1)
    if (!t.includes(p)) {
      // 利用积相等去重
      t.push(p)
      res.push([...state])
    }
    return
  } else {
    arr.forEach((item) => {
      let s = sum(state)
      // 可以在这里剪枝 2
      if (s < target) {
        state.push(item)
        f(arr, target, state)
        state.pop()
      }
    })
  }
}
```

汉诺塔问题：给定三根柱子和一系列大小不同的圆盘，要求将所有圆盘从一根柱子移动到另一根柱子，

```js
let move = (a, c) => {
  c.unshift(a.shift())
}
let _f = (n, a, b, c) => {
  if (n === 1) {
    move(a, c)
  } else {
    _f(n - 1, a, c, b)
    move(a, c)
    _f(n - 1, b, a, c)
  }
}
let f = (a = [1, 2, 3], b = [], c = []) => {
  let n = a.length
  _f(n, a, b, c)
}
// n=1 a-c
// n=2 1a-b,2a-c,1b-c
// n=3 1a-c,2a-b,1c-b,3a-c,1b-1,2b-c,1a-c
// n=4
// f(n, a, b, c) // 把n个盘子从a借助b移到c
// f(1, a, b, c) a-c
// f(2, a, b, c) {
//     f(1, a, c, b)
//     move(a, c)
//     f(1, b, a, c)
// }
// 要想 4a-c, 先要 前3在b
//            要想 前3在b
```

> 必须全对。

𝑛 皇后：在 𝑛 × 𝑛 的棋盘上放置 𝑛 个皇后，使得它们互不攻击。

```js
// todo
let state = new Array(n).fill([])
```

数独：在 9 × 9 的网格中填入数字 1 ~ 9 ，使得每行、每列和每个 3 × 3 子网格中的数字不重复。

```
todo
```

图着色问题：给定一个无向图，用最少的颜色给图的每个顶点着色，使得相邻顶点颜色不同。

```
todo
```

## 常见数据结构的回溯操作

```js
arr.push(x)
arr.pop()

stack.push()
stack.pop()

// 队列不能回溯
// queue.enqueue()
// queue.dequeue()

chain.append()
chain.removeAt(chain.size() - 1)

set.add(x)
set.delete(x)

map.set(k, v)
map.delete(k)

tree.append(v)
tree.remove(v)

let preValue = arr[i]
arr[i] = newValue
arr[i] = preValue

n++
n--
n+a
n-a
n*a
n/a
...
```

只要是正负操作就都算回溯操作

# 第 14 章 动态规划

一种重要的算法范式，把一个问题分解为一系列更小的问题，并通过存储子问题的解来避免重复计算。

> 用 dp 数组存储子问题的解。
> 从小问题开始解决。
> 不需要递归。
> 需要初始状态，状态转换方法(即：递推公式)

给定一个共有 𝑛 阶的楼梯，你每步可以上 1 阶或者 2 阶，请问有多少种方案可以爬到楼顶？

```js
// 暴力搜索
let map = new Map()
map.set(1, 1)
map.set(2, 2)
let f = (n) => {
  if (n <= 2) {
    return map.get(n)
  } else {
    let t = f(n - 2) + f(n - 1)
    map.set(n, t)
    return t
  }
}
// 用回溯方法解决
let f = (n, choices, state = [0]) => {
  if (state[state.length - 1] === n) {
    res.push([...state])
  } else {
    for (let item of choices) {
      let t = state[state.length - 1] + item
      if (t <= n) {
        state.push(t)
        f(n, choices, state)
        state.pop()
      }
    }
  }
}
// 动态规划
let f = (n) => {
  if (n === 1 || n === 2) {
    return n
  }
  let dp = new Array(n + 1).fill(-1)
  // 需要初始状态
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    // 状态转换方法
    dp[i] = dp[i - 2] + dp[i - 1]
  }
  return dp[n]
}
// 优化空间复杂度
let f = (n) => {
  if (n === 1 || n === 2) {
    return n
  }
  let a = 1
  let b = 2
  for (let i = 3; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}
```

## 最优子结构

原问题的最优解是从子问题的最优解构建得来的。
dp[1] = cost[1] dp[2] = cost[2]
dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]

## 无后效性

给定一个状态，它的未来发展只与当前状态有关，而与过去经历的所有状态无关。

给定一个共有 𝑛 阶的楼梯，你每步可以上 1 阶或者 2 阶，但不能连续两轮跳 1 阶，请问有多少种方案可以爬到楼顶？

```js
let f = (n) => {
  if (n === 1 || n === 2) {
    return n
  }
  let dp = new Array(n + 1).fill([0, 0, 0])
  // 初始状态
  dp[1][1] = 1 // 处于第阶并且上一轮跳了j阶
  dp[1][2] = 0
  dp[2][1] = 0
  dp[2][2] = 1
  for (let i = 3; i <= n; i++) {
    dp[i][1] = dp[i - 1][2]
    dp[i][2] = dp[i - 2][1] + dp[i - 2][2]
  }
  return dp[n][1] + dp[n][2]
}
```

给定一个共有 𝑛 阶的楼梯，你每步可以上 1 阶或者 2 阶。规定当爬到第 𝑖 阶时，系统自动会在第 2𝑖
阶上放上障碍物，之后所有轮都不允许跳到第 2𝑖 阶上。
这是“有后效性”的问题。难以用“动态规划”解决。可以使用启发式搜索、遗传算法、强化学习等解决。

## 动态规划的解题思路

1. 判断一个问题是不是动态规划问题。
2. 如何入手解决动态规范问题。

回溯问题通常满足“决策树模型”。
动态规划问题会在回溯问题上会增加、减少一些限制。如：

- 最大、最小，
- 能使用列表、矩阵、树表示。
- 为找出所有可能的解决方案。
- 有明显的排列组合特征。

### 求解步骤

给定一个 𝑛 × 𝑚 的二维网格 grid ，网格中的每个单元格包含一个非负整数，表示该单元格的代价。机器人以左上角单元格为起始点，每次只能向下或者向右移动一步，直至到达右下角单元格。请返回从左上角到右下角的最小代价和。

1. 第一步，思考每轮决策，定义状态，从而得到 dp 表。
2. 找出最优子结构，进而推导出状态转移方程。
3. 第三步，确定边界条件和状态转移顺序。

> 初始化 dp 表，设置初始值。
> 填满 dp 表。
> 在 dp 表中取出符合题意的值。

```js
// dp[i, j] = min(dp[i-1, j], dp[i, j-1]) grid[i, j]
let f = (grid) => {
  let n = grid.length
  let m = grid[0].length
  let dp = new Array({ length: n }, () => {
    return new Array({ length: m }, () => 0)
  })
  dp[0][0] = grid[0][0]
  for (let i = 1; i <= n; i++) {
    dp[i][0] = grid[i - 1][0] + grid[i][0]
  }
  for (let i = 1; i <= m; i++) {
    dp[0][i] = grid[0][i - 1] = grid[0][i]
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; i < m; j++) {
      dp[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j]
    }
  }
  return dp[n - 1][m - 1]
}
```

## 0-1 背包问题

给定 𝑛 个物品，第 𝑖 个物品的重量为 𝑤𝑔𝑡[𝑖 − 1]、价值为 𝑣𝑎𝑙[𝑖 − 1] ，和一个容纳重量为 𝑐𝑎𝑝 的背包。每个物品只能选择一次，问在限定背包容量下能放入物品的最大价值。

```js
// dp表内表示此时的最大价值
let f = (w, v, cap) => {
  let n = w.length
  // 初始化
  let dp = new Array(cap + 1).fill(0).map(() => new Array(n + 1).fill(0))
  // 能不能放进入 <=> 不放与放的最大值
  for (let c = 1; c <= cap; c++) {
    for (let i = 1; i <= n; i++) {
      // 不会
      // if (w[i] > c) {
      //     dp[c][i] = d[c][i - 1]
      // } else {
      //     dp[c][i] = Math.max(
      //         dp[c][i - 1],
      //         dp[c][i - 1] + v[i - 1]
      //     )
      // }
    }
  }
}
// 我会用贪心算法求解
let f = (wList, vList, cap) => {
  let vpList = []
  wList.forEach((w, index) => {
    vpList.push({
      w: w,
      v: vList[index],
      vp: vList[index] / w,
    })
  })
  vpList.sort((a, b) => b.vp - a.vp)
  let box = []
  let resetCap = cap
  for (let i = 0; i < vpList.length; i++) {
    if (vpList[i].w <= resetCap) {
      box.push(vpList[i])
      resetCap -= vpList[i].w
    } else {
      break
    }
  }
  return box
}
```

## 完全背包问题

给定 𝑛 个物品，第 𝑖 个物品的重量为 𝑤𝑔𝑡[𝑖 − 1]、价值为 𝑣𝑎𝑙[𝑖 − 1] ，和一个容纳重量为 𝑐𝑎𝑝 的背包。每个物品可以重复选取，问在限定背包容量下能放入物品的最大价值。

```js
// 贪心解法
let f = (wList, vList, cap) => {
  let vpList = []
  wList.forEach((w, i) => {
    vpList.push({
      w: w,
      v: vList[i],
      vp: vList[i] / w,
    })
  })
  vpList.sort((a, b) => b.vp - a.vp)
  let resetCap = cap
  let box = []
  while (resetCap < vpList[vpList.length - 1].w) {
    for (let i = 0; i < vpList.length; i++) {
      if (vpList[i].w <= resetCap) {
        box.push(vpList[i])
        resetCap -= vpList[i].w
        break
      }
    }
  }
  return box
}
```

## 多重背包问题

给定 𝑛 种硬币，第 𝑖 种硬币的面值为 𝑐𝑜𝑖𝑛𝑠[𝑖 − 1] ，目标金额为 𝑎𝑚𝑡 ，每种硬币可以重复选取，问能够凑出目标金额的最少硬币数量。如果无法凑出目标金额，则返回 −1 。

```js
// dp[i][j] 表示 第i次拿j号硬币时对应的硬币数量
// dp[0]
// dp[i] = min(dp[i - 1]) + 1
let f = () => {}

// 这是我写的
let f = (coins, amt) => {
  let sum = 0
  let box = []
  while (sum < amt) {
    for (let i = 0; i < coins.length; i++) {
      if (coins[i] <= amt - sum) {
        sum += coins[i]
        box.push(coins[i])
        break
      }
    }
  }
  return box.length || -1
}

// 求硬币和的组合数
let f = (coins, amt, state = []) => {
  if (sum(state) === amt) {
    let t = state.reduce((r, c) => {
      return (r *= c)
    }, 1)
    if (!unique.includes(t)) {
      unique.push(t)
      res.push([...state])
      return
    } else {
      return
    }
  } else {
    for (let i = 0; i < coins.length; i++) {
      state.push(coins[i])
      if (sum(state) < amt) {
        f(coins, amt, state)
      }
      state.pop()
    }
  }
}
```

## 编辑距离

输入两个字符串 𝑠 和 𝑡 ，返回将 𝑠 转换为 𝑡 所需的最少编辑步数。你可以在一个字符串中进行三种编辑操作：插入一个字符、删除一个字符、将字符替换为任意一个字符。

```js
let f = (s, t) => {
  let n = s.length
  let m = t.length
  let dp = new Array(n + 1).fill(0).map((item) => new Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    dp[i][0] = 0
  }
  for (let i = 0; i <= m; i++) {
    dp[0][i] = i
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s.chatAt(i - 1) === t.chatAt(j - 1)) {
        // 若相同
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        // 若不相同，则需要一次编辑（插入、删除、替换）
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
      }
    }
  }
  return dp[n][m]
}
```

- 不考虑时间时，所有动态规划问题都可以使用回溯（暴力搜索）求解，但递归树中有大量重叠子问题。通过引入记忆列表，可以存储所有计算过的子问题。保证重叠子问题只计算一次。
- 动态规划是一种从底到顶的递推式解决方案。如同“填写表格”一样。
- 子问题分解是一种能用的算法思路，在分治、动态规划、回溯中具有不同的性质。
- 动态规划有 3 个特性：重叠子问题、最优子结构、无后效性。
- 原问题的最优解可以从子问题的最优解中得到。
- 有后效性无法用动态规划解决。

# 第 15 章 贪心

贪心算法（greedy algorithm）常用于解决优化问题的算法。基本思想是在每个决策时选择最优解决。多次叠加局部最优解，得到全局最优解。

给定 𝑛 种硬币，第 𝑖 种硬币的面值为 𝑐𝑜𝑖𝑛𝑠[𝑖 − 1] ，目标金额为 𝑎𝑚𝑡 ，每种硬币可以重复选取，问能够凑出目标金额的最少硬币数量。如果无法凑出目标金额，则返回 −1 。

```js
// 参考 多重背包问题
98 - 50 = 48
98 - 49 = 49
98 - 1  = 97
```

贪心算法不能总是得到最优解决，可以得到近似最优解。动态规划可以得到最优解。

给定 𝑛 个物品，第 𝑖 个物品的重量为 𝑤𝑔𝑡[𝑖 − 1]、价值为 𝑣𝑎𝑙[𝑖 − 1] ，和一个容量为 𝑐𝑎𝑝 的背包。每个物品只能选择一次，但可以选择物品的一部分，价值根据选择的重量比例计算，问在限定背包容量下背包中物品的最大价值。

```js
class Item {
  constructor(w, v) {
    this.weight = w
    this.value = v
    this.vw = v / w
  }
}
let f = (w, v, c) => {
  let items = w.map((a, i) => new Item(a, v[i]))
  items.sort((a, b) => b.vw - a.vw)
  let resValue = 0
  let restW = c
  let res = []
  for (let item of items) {
    if (item.weight <= restW) {
      res.push(item)
      restW -= item.weight
      if (!restW) {
        break
      }
    } else {
      let wt = (item.weight - restW) / item.weight
      let vt = (item.value * wt) / item.weight
      res.push({
        value: restW * item.vw,
        weight: restW,
        vw: item.vw,
      })
      break
    }
  }
  return res
}
```

输入一个数组 ℎ𝑡 ，其中的每个元素代表一个垂直隔板的高度。数组中的任意两个隔板，以及它们之间的空间可以组成一个容器。
容器的容量等于高度和宽度的乘积（面积），其中高度由较短的隔板决定，宽度是两个隔板的数组索引之差。请在数组中选择两个隔板，使得组成的容器的容量最大，返回最大容量。

```js
// 暴力
let f = (arr) => {
  let res = []
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length; j++) {
      let w = j - i
      let h = Math.min(arr[i], arr[j])
      let s = w * h
      res.push(s)
    }
  }
  // let res = 0
  // res = Math.max(res, w * h)
  return Math.max(...res)
}
// 动态规划
// dp[i][j] 第i&j柱子形成的面积
// dp[0][0] = 0

// 贪心
let f = (ht) => {
  let i = 0
  let j = ht.length - 1
  let res = 0
  while (i < j) {
    res = Math.max(res, (j - i) * Math.min(ht[i], ht[j]))
    if (ht[i] > ht[j]) {
      j--
    } else {
      i++
    }
  }
}
```

## 最大切分乘积问题

给定一个正整数 𝑛 ，将其切分为至少两个正整数的和，求切分后所有整数的乘积最大是多少。

```js
// 只想到了分成2个正整数的解决方案。
// 没看懂作者解决方案。
let f = (n) => {
  let res = 0
  let a = 1
  let p = Math.floor(n / 2)
  while (a < p) {
    res = Math.max(res, a * (n - a))
    a++
  }
  return res
}
```

# 第 16 章 附录
