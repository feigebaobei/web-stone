# 并查集 union-find

disjoint-set data structore 直译为不交集数据结构，用于处理不交集的合并及查询问题。
并查集是一种树型的数据结构，用于处理一些不相交集合的合并及查询问题（即所谓的并、查）。比如说，我们可以用并查集来判断一个森林中有几棵树、某个节点是否属于某棵树等。
并查集支持如下操作：

- 添加 make_set(x) 添加一个新集合。
- 查询 find(x) 查询特定元素属于哪个集合。通常是返回集合内的一个“代表元素”。
- 合并 union(x, y) 将 2 个集合合并为一个。

```js
// 未测试
class UnionFind() {
    constructor() {
        this.father = []

    }
    makeSet(x) {
        x.parent = x
    }
    find(x) {
        if (x.parent === x) {
            return x
        } else {
            return find(x.parent)
        }
    }
    union(x, y) {
        let xRoot = find(x)
        let yRoot = find(y)
        if (xRoot !== yRoot) {
            xRoot.parent = yRoot
        }
    }
}
```

节点是指向父元素的。
