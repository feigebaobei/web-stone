# no.2

## stack

10 -》 2  
减而治之、分而治之不能正常运行时，使用使用栈处理。

栈混洗：2 个栈之间多次执行 pop/push.  
排列情况 <= n!  
![](/coursera/dsa/2/stackSum.png)  
任意三个元素能否按某相对次序出现于混洗中，与其它元素无关。  
123 =》 312 是禁形。  
n 个括号组成的合法表达式，就是 n 个括号的栈混洗的过程。  
合法的括号匹配与合法的栈混洗之间存在一一对应关系。  
**邓老师的代码非常严谨**  
逆波兰表达式，可以不使用括号表示优化级。  
示例都是使用 0，1，2，3，4，……,9 的。经过计算后结果都是 2013.

```js
// 中缀 =》 rpn
```

## queue

# no.3 树

## overview

- 按层次关系分
- 树是特殊的图。连通无环图。
- 半线性。前驱惟一，后续不惟一。
-

## 概念

|                      |                    |                                  |
| -------------------- | ------------------ | -------------------------------- |
| vertex               | 节点               |                                  |
| edge                 | 边                 |                                  |
| 有根树               |                    |                                  |
| subTree              | 子树               |                                  |
| parent/child/sibling |                    | react 中把它们使用链表连接起来。 |
| degree               | 度                 | 该节点的孩子的数量               |
| 有序树               | 兄弟节点之间有顺序 |                                  |
| 连通性               |                    |                                  |
| 无环性               |                    | 任一节点与根节点之间存在唯一路径 |
| 通路                 |                    |                                  |
| 连通图               |                    |                                  |
| 无环图               | acyclic            |                                  |
| 无环连通图           |                    |                                  |
| 极小连通图           |                    |                                  |
| 极大无环图           |                    |                                  |
| 深度                 | 从根向叶           | 根节点深度为 0                   |
| 高度                 | 从叶向根           | 叶子点高度为 1                   |
| 空树                 | 根节点为 null      | 空树的高度是-1                   |
| 子节点               | 使用方形表示       |                                  |
| 非子节点             | 使用圆形表示       |                                  |
| title                |                    |                                  |

## 树的表示法

|              |                            |     |     |
| ------------ | -------------------------- | --- | --- |
| root         |                            |     |     |
| parent       |                            |     |     |
| firstChild   |                            |     |     |
| nextSibling  |                            |     |     |
| insert(i, e) | 把 e 作为第 i 个子节点插入 |     |     |
| remove(i)    |                            |     |     |
| traverse()   | 遍历                       |     |     |

```ts
interface node<T> {
  value: A
  parent: node<T>
  children: Chain<T>
}
```

### 长子+兄弟法

表示兄弟节点之间的关系。  
||||
|-|-|-|
|firstChild|长子||
|nextSibling|下一个兄弟||

```ts
interface node<T> {
  value: T
  parent: node<T>
  firstChild: node<T>
  nextSibling: node<T>
}
```

## 二叉树 binary tree

度 <= 2  
最多有（2^(h+1)-1）个节点  
可以用于表示“树”

按每层节点数量可分为：

- 单链表
- 满二叉树

特点：

- 宽度增长为指数式
- 高度增长为对数式  
  也就是宽度增长更快。

还原树：

- 可以根据“先序遍历”拓扑出树结构。别的遍历方式不行
- 当树是真二叉树时，使用使用 preorder/inorder/postorder 方式还原。

### 遍历

![](/coursera/dsa/2/inOrder.png)  
![](/coursera/dsa/2/preOrder.png)  
![](/coursera/dsa/2/postOrder.png)

### 真二叉树 proper binary tree

每个节点的出度是 0 或 2.  
意义：只需要在思想上认为度总是 2，不需要在实际中真的兑现。

### 满二叉树 full binary tree

叶子节点在最后一层上的真二叉树。

### 完全二叉树 complete binary tree

非最后一层为满二叉树，最后一层从左到右分布。

- 叶子节点只能出现在最好二层。

### 遍历

- 先序
  - 先自上而下左侧节点，再自下而上右铡节点。
  - 使用栈保存右侧节点
  - 使用深度优先。
- 中序
  - 先自下而上左侧节点，再
- 后序
- 层次（广度优先）

中序处理方法与事件捕获阶段、当前阶段、冒泡阶段，很像。

## 多叉树

使用二叉树表示。  
二叉树的子节点是 left/right.长子兄弟表示法的子节点是 firstChild、兄弟是 nextSibling。都是二个叉。

# no.4 图 graph

## 概念

|                        |                                      |                                      |     |
| ---------------------- | ------------------------------------ | ------------------------------------ | --- |
| 图                     |                                      |                                      |     |
| vertex                 | 顶点                                 |                                      |     |
| edge                   | 边                                   |                                      |     |
| adjacency              | 邻接                                 | v-v                                  |     |
| incidence              | 关联                                 | v-e                                  |     |
| 强连通                 | 2 个双向连通                         |                                      |     |
| 有向图、无向图、混合图 | 连接 2 个顶点的边是否有方向          | 一对有向边可表示一个无向边           |     |
| 路径                   | 由顶点组成的数组                     |                                      |     |
| 简单路径               | 路径中无重复节点。                   |                                      |     |
| 复杂路径               |                                      |                                      |     |
| 环路                   | 路径的起点与终点相同。               |                                      |     |
| 简单环路、复杂环路     |                                      |                                      |     |
| 欧拉环                 | 经过所有边且不重复的环               |                                      |     |
| 哈密尔顿环             | 经过所有顶点，且不重复的环           |                                      |     |
| 平面图                 | 可以嵌于平面的图。不相邻的边不能相交 |                                      |     |
| 完全图                 | 任意 2 个顶点之间都有边。            |                                      |     |
| 可达区域               |                                      | 多个可达区域就是多棵树。也就是森林。 |     |
| 活动期                 | fTime-dTime                          |                                      |     |
| dTime                  | 开始活跃的时间                       |                                      |     |
| fTime                  | 结束活跃的时间                       |                                      |     |
| vertex                 |                                      |                                      |     |
| vertex                 |                                      |                                      |     |
| vertex                 |                                      |                                      |     |
|                        |                                      |                                      |     |

### 矩阵

|          |           | 无权图            | 有权图                       | 无向图         |                | 扩展                       |
| -------- | --------- | ----------------- | ---------------------------- | -------------- | -------------- | -------------------------- |
| 邻接矩阵 | n 行 n 列 | 用 1 表示是否连通 | 用 w 表示权重                | 关于对角线对称 | 空间与边数无关 | 当顶点数量改变时它不太灵活 |
| 关联矩阵 | n 行 e 列 | 用 1 表示是否连通 | 常用于边的数量比顶点的数量多 |                |                |                            |

### 顶点

```ts
interface Vertex {
  data: xx
  inDegree: xx
  outDegree: xx
  status: xx // undiscovered / discovered / visited
  dTime: xx
  fTime: xx
  parent: xx
  // 构造新顶点
}
```

### 边

```ts
interface Edge {
  data: xx
  weight: xx
  status: xx
  // 构造新边
}
```

### 平面图

满足以下公式：

```js
v-e+f-c=1

v: 顶点
e: 边
f: 区域面片
c: 连通域的总数

e <= 3n-6 = O(n) << n*n
此时空间利用率约等于 1/n
```

## 广度优先搜索

代繁为简  
graph ------> tree ------> sequence
非线性结构 ---> 半线性结构 --> 线性结构

## 深度优先搜索

|               |                                         |     |
| ------------- | --------------------------------------- | --- |
| u 是 v 的后代 | `iff active[u] 包含于 active[v]`        |     |
| u 是 v 的祖先 | `iff active[u] 包含 active[v]`          |     |
| u 是 v 无关   | `iff active[u] 与 active[v] 的交集为空` |     |

使用引方法可快速判断 2 个顶点之间是否是祖先、后代关系（O(1)）。比`parent`方法快很多（O(n)）。

|                           |     |     |
| ------------------------- | --- | --- |
| u 是 v 的祖先             |     |     |
| u 是 v 的后代             |     |     |
| u 是 v 的兄弟             |     |     |
| u 是 v 属于不同的连通分量 |     |     |

# no.5 二叉搜索树 BST

|                |                                                                                         |                            |                                                              |
| -------------- | --------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------ |
| 二叉搜索树     | 任一节点均不小于、不大于它的左、右后代                                                  | 由局部特性决定了全局特性。 | 使用中序遍历，则单调非降。此特性可用于判断是否是二叉搜索树。 |
| call-by-key    |                                                                                         |                            |                                                              |
| 词条           |                                                                                         |                            |                                                              |
| 单调非降       |                                                                                         |                            |                                                              |
| 平均高度       | 根号 n                                                                                  | catalan(n )                |                                                              |
| 理想平衡       | 高度等于 log2n 时。                                                                     |                            |                                                              |
| 适度平衡       | 高度渐进地不超过 logn                                                                   |                            |                                                              |
| 平衡二叉搜索树 | BBST                                                                                    |                            |                                                              |
| 等价 bst       | 上下可变：连接关系可不同，承袭关系可能颠倒。 左右不乱：中序遍历结果相同，全局单调非降。 | `1<avlt<logn`              | `rbt = 1 * 2`                                                |
|                |                                                                                         |                            |                                                              |
|                |                                                                                         |                            |                                                              |

```ts
interface Node<T> {
  key: N
  value: T
  clone: () => Node<T>
  'operator<': (otherNode) => B
  'operator>': (otherNode) => B
  'operator===': (otherNode) => B
  'operator!==': (otherNode) => B
}
```

## avl tree

<!-- prettier-ignore-start -->
|  |  |    |      |
| --------- | ----- | - | ------- |
| avl    | Adelson-Velsky & E. Landis     | 不一定是完全二叉树   |      |
| 平衡因子     | 左子树高度 - 右子树高度  | `tree.height(node.left) - tree.height(node.right)` | 要求 绝对值 <= 1 |
|  | 高度为 h 的树，最少包含`S(h) = fib(h + 3) - 1`个节点。 | `S(h) = 1 + S(h - 1) + S(h - 2)` |      |
| 旋转   |  |    |      |
| 单旋转 | 节点排列朝同一方向       |    |      |
| 双旋转 | 节点排列成之字形   |    |      |
| 左旋转 | zag |          |      |
| 右旋转 | zig |          |      |
| 查询、插入、删除   | O(logn)      | 占用空间 n     |      |
| 不改变中序遍历顺序 |  |    |      |
| 插入   | O(1)次操作   | 有可能使祖先节点失衡。非祖先节点总是平衡。   |      |
| 删除   | O(logn)次操作      | 最多一个祖先节点失衡。     |      |
|  |  |          |      |
<!-- prettier-ignore-end -->

各种旋转只是为达到平衡的手段。
左右

### 旋转

### 3+4 重构

- 简单
- 安全
- 鲁棒（原子）性

```
        b
    a       c
  t0  t1  t2  t3
```

```js
let connect34 = (a, b, c, t0, t1, t2, t3) => {
  a.left = t0
  t0 && t0.parent = a
  a.right = t1
  t1 && t1.parent = a
  c.left = t2
  t2 && t2.parent = c
  c.right = t3
  t3 && t3.parent = c
  b.left = a
  a.parent = b
  b.right = c
  c.parent = b
  return b // 返回该子树的根节点
}
let rotateAt = (v) => {
  // v是孙辈的节点
  let p = v.parent, g = p.parent
  if (p['operator!=='](g.left)) {
    if (v['operator!=='](p.left)) {
      // v p g
      connect34(v, p, g, v.left, v.right, p.right, g.right)
    } else  {
      // p v g
      connect34(p, v, g, p.left, v.left, v.right, g.right)
    }
  } else {
    if (v['operator!=='](p.left)) {
      // g v p
      connect34(g, v, p, g.left, v.left, v.right, p.right)
    } else  {
      // g p v
      connect34(g, p, v, g.left, p.left, v.left, g.right)
    }
  }
}
```

使用中序遍历方法判断出 3 个节点与 4 棵树。

## splay tree 伸展树

- 不受平衡因素影响。
- 最近被访问过的节点，有可能很快会再次被访问。（局部性）
- 把最近访问的元素移到树根。自下而上，遂层单旋。
- tarjan 提出每次上升 2 层。先旋转祖父节点，再旋转父节点。
- 有折叠效果。高度减半。
- 基于 bst
- 不记录高度、平衡因子。
- 分摊复杂度为 O(logn)
- 适用于局部性强的用例。`k(使用的数据量) <<n(数据总量) <<m(操作次数)`
  - 经过若干次访问。复杂度变为`O(logk)`
  - 任何连续 m 次操作，都可在`O(mlogk + nlogn)`内完成。
- 不能保证单次最坏情况不出现。不适用于效率敏感用例。
-

```ts
interface SplayTree<T> extends BinarySearchTree<T> {
  splay: (v: node) => void
  search: (k: N) => node
  insert: (k: N, v: T) => node
  remove: (k: N) => void
}
```

## title

## title

## title

## title

## title

## title

## title

# no.6
