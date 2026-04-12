# 树

## 概念

|      |            |                |
| ---- | ---------- | -------------- |
| 树   |            |                |
| 节点 |            | 根节点、子节点 |
| 度   | 节点的分支 |                |
| 深度 |            |                |
| 高度 |            |                |
| 森林 |            |                |
| 空树 | 根节点为空 |                |
| 节点 |            |                |
| 节点 |            |                |
| 节点 |            |                |
| 节点 |            |                |

## 二叉树

|            |                                              |     |     |
| ---------- | -------------------------------------------- | --- | --- |
| 满二叉树   | 非子节点的节点都是 2 度。                    |     |     |
| 完全二叉树 | 非最后一层为满二叉树，最后一层从左到右分布。 |     |     |

## hafman tree

父节点的值是子节点的值的和。
左子节点的值 <= 右子节点的值

```js
let createTree = (arr) => {
  let createNode = (v) => {
    return {
      left: null,
      value: v,
      right: null,
    }
  }
  let merge = (aNode, bNode) => {
    let cNode = createNode(aNode.value + bNode.value)
    if (aNode.value <= bNode.value) {
      cNode.left = aNode
      cNode.right = bNode
    } else {
      cNode.left = bNode
      cNode.right = aNode
    }
    return cNode
  }
  while (arr.length > 1) {
    arr.sort((a, b) => a - b)
    let aNode = arr.shift()
    let bNode = arr.shift()
    let cNode = merge(aNode, bNode)
    arr.unshift(cNode)
  }
  return { root: arr[0] }
}
```

## title

## title

## title

## title
