# Selection

对象所对应的是用户所选择的 ranges（区域），俗称拖蓝。默认情况下，该函数只针对一个区域，我们可以这样使用这个函数：

```
var selObj = window.getSelection();
var range = selObj.getRangeAt(0);
```

|      |                    |                                      |     |     |
| ---- | ------------------ | ------------------------------------ | --- | --- |
| 属性 | 都是只读           |                                      |     |     |
|      | anchorNode         | 选区所在的节点                       |     |     |
|      | anchorOffset       | 选区起点在 anchorNode 中的位置位移量 |     |     |
|      | focusNode          | 选区所在的节点                       |     |     |
|      | focusOffset        | 选区终点在 anchorNode 中的位置位移量 |     |     |
|      | isCollapsed        | 起点、终点是否在同一位置             |     |     |
|      | rangeCount         | 选区包含的连续范围的数量             |     |     |
| 方法 |                    |                                      |     |     |
|      | getRangeAt         | 返回选区指定区域的引用               |     |     |
|      | collapse           | 将选区折叠为一个点                   |     |     |
|      | extend             |                                      |     |     |
|      | modify             |                                      |     |     |
|      | collapseToStart    |                                      |     |     |
|      | collapseToEnd      |                                      |     |     |
|      | selectAllChildren  |                                      |     |     |
|      | addRange           |                                      |     |     |
|      | removeRange        |                                      |     |     |
|      | removeAllRanges    |                                      |     |     |
|      | deleteFromDocument |                                      |     |     |
|      | toString           |                                      |     |     |
|      | containsNode       |                                      |     |     |
|      | deleteFromDocument |                                      |     |     |
|      | deleteFromDocument |                                      |     |     |
|      | deleteFromDocument |                                      |     |     |
|      |                    |                                      |     |     |
|      |                    |                                      |     |     |
|      |                    |                                      |     |     |

## 相关 api [range](/language/javascript/range.html)

与 range 有些 api 是相同作用。
