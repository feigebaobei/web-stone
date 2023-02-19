# title

## 伸展树 splayTree

- 比 avlt 宽松一些
- 局部性
  - 刚被访问过的数据，可能还会很快被访问。
- 利用了中序遍历不变的特性。
- 一次向上追溯 2 层 v, p = v.parent, g = p.parent. avlt 是每次向上追溯一层。
- 对应路径的长度减头。可减少树的高度为原来的一半。因为它每次都会在 g 节点的左或右增加节点。

## b-tree

## title

## title
