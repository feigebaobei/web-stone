# drag & drop

## setup

必要条件：

- 为可拖动元素设置`draggable="true"`
- 在可放置元素设置`@dragover="$event => $event.preventDefault()"`

```html
<div class="dropzone">
  <div id="draggable" draggable="true">这个 div 可以拖动</div>
</div>
<div
  class="dropzone"
  id="droptarget"
  @dragover="dragoverHandler"
  @drop="dropHandler"
></div>
```

```
let ondragoverHandler = ($event) => {
 $event.preventDefault()
}
let dropHandler = ($event) => {
    $event.
}
```

## 事件

DragEvent.dataTransfer // dragEvent 的数据

包括如下事件

```
Event <---- UIEvent <---- MouseEvent <---- DragEvent
```

事件顺序
dragstart -> dragenter -> dragover -> drop -> dragend

### dragstart 开始拖元素时触发

### dragenter 拖进 drop 元素时触发

### dragover 拖到 drop 元素上时触发

### drop 放入到 drop 元素时触发

### dragleave 当元素离开 drop 元素时触发

### drag 被拖动时触发

### dragend 放开拖动元素时触发

### DataTransfer

当拖拽发生时，数据必须与被拖拽的项目相关联。它持有拖拽数据。  
它为拖动事件之间担任数据传递的角色。  
在 dragover/dragleave 事件对象中无 dataTransfer 属性。

```
new DataTransfer() // 返回一个DataTransfer对象
```

|      |                     |                                                              |                                                                            |
| ---- | ------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| 属性 |                     |                                                              |                                                                            |
|      | dropEffect          | 得到或设置拖动类型                                           | 'none' / 'copy' / 'link' / 'move'                                          |
|      | effectAllowed       | 所有可用的操作类型                                           | none, copy, copyLink, copyMove, link, linkMove, move, all or uninitialized |
|      | files               | 本地文件的列表                                               |                                                                            |
|      | items 只读          | 拖动数据列表的 DataTransferItemList 对象                     |                                                                            |
|      | types 只读          |                                                              |                                                                            |
| 方法 |                     |                                                              |                                                                            |
|      | clearData(key?)     |                                                              |                                                                            |
|      | getData(key)        | 返回 dataTransfer 对象上的指定数据，若不存在则返回空字符串。 |                                                                            |
|      | setData(key, value) |                                                              |                                                                            |
|      | setDragImage()      | 自定义拖动图像                                               |                                                                            |
|      | addElement()        |                                                              |                                                                            |
| 属性 |                     |                                                              |                                                                            |
|      |                     |                                                              |                                                                            |
|      |                     |                                                              |                                                                            |

```
let img = new Image()
img.src = './path/to/file.png'
$event.dataTransfer.setDragImage(img, x, y)

```