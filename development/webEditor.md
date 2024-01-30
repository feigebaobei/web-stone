# web 编辑器

## 知识储备

- contenteditable
- selection 对象
- range 对象
- dom 对象
- node 接口的实现对象
  - 元素节点
  - 属性节点
  - 文本节点
- 事件点的坐标

## 要实现的功能点

- 多个编辑区
- 支持多人协会编辑（在不同的编辑区）
- 可插入文本、可追加文本、可选中文本、可删除文本、可删除选中的文本、按方向键可移动光标。

## 项目架构

由 editableAreaCore 包提供可编辑区的类。

```
     1            n                    1          n
Page --------------- EditableAreaCore --------------- 可编辑区

```

EditableAreaCore 提供 api。

## 竞品

- [CKEditor]()
- [KissyEditor]()
- [Quill]()
- [ProseMirror]()
- [Draftjs]()
- [Slatejs]()
- [BlockSuite]()
- [CKEditor]()
- [CKEditor]()
- [CKEditor]()
