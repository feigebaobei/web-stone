# dataTransfer

> 当拖拽发生时，数据必须与被拖拽的项目相关联。它持有拖拽数据。  
> 它为拖动事件之间担任数据传递的角色。  
> 在 dragover/dragleave 事件对象中无 dataTransfer 属性。

```js
new DataTransfer() // 返回一个DataTransfer对象
```

<!-- prettier-ignore-start -->

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

<!-- prettier-ignore-start -->

```js
let img = new Image()
img.src = './path/to/file.png'
$event.dataTransfer.setDragImage(img, x, y)
```
