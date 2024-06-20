# MutationObserver

提供了监视对 DOM 树所做更改的能力

## api

|          |                                                               |                                                                                                         |                                                                                                                                                                                                                                                                                                                                |     |     |     |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | --- | --- |
| 构造函数 | MutationObserver((MutationRecord, MutationObserver) => void)) | 创建并返回 MutationObserver 对象。用于监听 dom 发生变化。                                               |                                                                                                                                                                                                                                                                                                                                |     |     |     |
| 方法     | disconnect() => void                                          | 不再接收 dom 变化通知                                                                                   |                                                                                                                                                                                                                                                                                                                                |     |     |     |
|          | observe(dom, options?) =>                                     | 开始监听 dom 变化                                                                                       | options: {subtree?是否监听以该 dom 为根节点的子树,childList?是否监听该节点内的的增加删除,attributes?是否监听该节点的属性变化,attributeFilter?指定监听的属性组成的数组。若不指定，则监听全部属性,attributeOldValue?默认为 false,characterData?监听所有字符变化，默认为 false,characterDataOldValue?监听文本变化，默认为 false.} |     |     |     |
|          | takeRecords()                                                 | 从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。 |                                                                                                                                                                                                                                                                                                                                |     |     |     |
|          |                                                               |                                                                                                         |                                                                                                                                                                                                                                                                                                                                |     |     |     |
|          |                                                               |                                                                                                         |                                                                                                                                                                                                                                                                                                                                |     |     |     |
|          |                                                               |                                                                                                         |                                                                                                                                                                                                                                                                                                                                |     |     |     |
|          |                                                               |                                                                                                         |                                                                                                                                                                                                                                                                                                                                |     |     |     |

##dom

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id')

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true }

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.')
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.')
    }
  }
}

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback)

// 以上述配置开始观察目标节点
observer.observe(targetNode, config)

// 之后，可停止观察
observer.disconnect()
```
