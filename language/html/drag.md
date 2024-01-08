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

### [DataTransfer](/language/javascript/dataTransfer.html)
