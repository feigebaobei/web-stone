# range

它是一个接口
Range 接口表示一个包含节点与文本节点的一部分的文档片段。

```
let range1 = Document.createRange()
let range2 = selection.getRangeAt(0)
let range3 = Document.caretRangeFromPoint()
```

|      |                            |                               |     |     |     |
| ---- | -------------------------- | ----------------------------- | --- | --- | --- |
| 属性 | 都是只读                   |                               |     |     |     |
|      | collapsed                  | 起点终点是否相同              |     |     |     |
|      | commonAncestorContainer    |                               |     |     |     |
|      | endContainer               | 包含终点的节点                |     |     |     |
|      | endOffset                  |                               |     |     |     |
|      | startContainer             |                               |     |     |     |
|      | startOffset                |                               |     |     |     |
| 方法 |                            |                               |     |     |     |
|      | collapse()                 | 折叠到边界的端点              |     |     |     |
|      | compareBoundaryPoints()    |                               |     |     |     |
|      | compareNode()              |                               |     |     |     |
|      | comparePoint()             |                               |     |     |     |
|      | cloneContents()            |                               |     |     |     |
|      | cloneRange()               | 克隆                          |     |     |     |
|      | createContextualFragment() |                               |     |     |     |
|      | deleteContents()           | 从 document 中移除 range 内容 |     |     |     |
|      | detach()                   | 从使用状态释放                |     |     |     |
|      | extractContents()          |                               |     |     |     |
|      | getBoundingClientRect()    |                               |     |     |     |
|      | getClientRects()           |                               |     |     |     |
|      | isPointInRange()           |                               |     |     |     |
|      | insertNode()               |                               |     |     |     |
|      | intersectsNode()           |                               |     |     |     |
|      | selectNode()               |                               |     |     |     |
|      | selectNodeContents()       |                               |     |     |     |
|      | setEnd()                   |                               |     |     |     |
|      | setStart(node, index)      | 第一个参数必须是 node.        |     |     |     |
|      | setEndAfter()              |                               |     |     |     |
|      | setEndBefore()             |                               |     |     |     |
|      | setStartAfter()            |                               |     |     |     |
|      | setStartBefore()           |                               |     |     |     |
|      | surroundContents()         |                               |     |     |     |
|      | toString()                 |                               |     |     |     |

## setStart(node, index)

表示设置光标到 node 元素的 index 下标。
当 node 是 HTMLElement 时。index 为 0 表示在该 HTMLElement 前面。
当 node 是 HTMLElement 时。index 为 1 表示在该 HTMLElement 后面。（没有中间的情况）
当 node 是 Text 时。index 可以是[0, Text.length - 1]之间的整数。光标可以在中间。

## 一个很好的示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
    <style>
      #edit {
        height: 200px;
        width: 500px;
        border: 1px solid red;
      }
    </style>
  </head>
  <body>
    <div id="edit" contenteditable>
      <span>one</span>
      <span>two</span>
      <span>three</span>
      <strong>four</strong>
    </div>
    <input type="text" id="emojiInput" />
    <button id="sendEmoji">发送表情</button>

    <script>
      let clog = console.log
      var sendEmoji = document.getElementById('sendEmoji')

      // 定义最后光标对象
      var lastEditRange

      // 编辑框点击事件
      document.getElementById('edit').onclick = function () {
        // 获取选定对象
        var selection = getSelection()
        // 设置最后光标对象
        lastEditRange = selection.getRangeAt(0)
      }

      // 编辑框按键弹起事件
      document.getElementById('edit').onkeyup = function () {
        // 获取选定对象
        var selection = getSelection()
        // 设置最后光标对象
        lastEditRange = selection.getRangeAt(0)
      }

      // 表情点击事件
      document.getElementById('sendEmoji').onclick = function () {
        // 获取编辑框对象
        var edit = document.getElementById('edit')
        // 获取输入框对象
        var emojiInput = document.getElementById('emojiInput')
        // 编辑框设置焦点
        edit.focus()
        // 获取选定对象
        var selection = getSelection()
        // 判断是否有最后光标对象存在
        if (lastEditRange) {
          // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
          selection.removeAllRanges()
          selection.addRange(lastEditRange)
        }
        // 判断选定对象范围是编辑框还是文本节点
        if (selection.anchorNode.nodeName != '#text') {
          console.log(1)
          // 如果是编辑框范围。则创建表情文本节点进行插入
          var emojiText = document.createTextNode(emojiInput.value)

          if (edit.childNodes.length > 0) {
            // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
            for (var i = 0; i < edit.childNodes.length; i++) {
              if (i == selection.anchorOffset) {
                edit.insertBefore(emojiText, edit.childNodes[i])
              }
            }
          } else {
            // 否则直接插入一个表情元素
            edit.appendChild(emojiText)
          }
          // 创建新的光标对象
          var range = document.createRange()
          // 光标对象的范围界定为新建的表情节点
          range.selectNodeContents(emojiText)
          // 光标位置定位在表情节点的最大长度
          range.setStart(emojiText, emojiText.length)
          // 使光标开始和光标结束重叠
          range.collapse(true)
          // 清除选定对象的所有光标对象
          selection.removeAllRanges()
          // 插入新的光标对象
          selection.addRange(range)
        } else {
          console.log(13)
          // 如果是文本节点则先获取光标对象
          var range = selection.getRangeAt(0)
          // 获取光标对象的范围界定对象，一般就是textNode对象
          var textNode = range.startContainer
          clog('textNode', textNode)
          // 获取光标位置
          var rangeStartOffset = range.startOffset
          // 文本节点在光标位置处插入新的表情内容
          textNode.insertData(rangeStartOffset, emojiInput.value)
          // 光标移动到到原来的位置加上新内容的长度
          range.setStart(textNode, rangeStartOffset + emojiInput.value.length)
          // 光标开始和光标结束重叠
          range.collapse(true)
          // 清除选定对象的所有光标对象
          selection.removeAllRanges()
          // 插入新的光标对象
          selection.addRange(range)
        }
        // 无论如何都要记录最后光标对象
        lastEditRange = selection.getRangeAt(0)
      }
    </script>
  </body>
</html>
```
