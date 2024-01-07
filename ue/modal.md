# 弹层类设计

> 在主要结构框架上的窗口。以子窗口的形式出现在主界面上方。用户必须完成子窗口的内容、或主动关闭，才能回到主界面。  
> 包括：模态、抽屉、对话框、确认框。

## 特点

- 视觉优雅
- 简化视觉
- 节省屏幕空间
- 获取用户的注意
- 需要用户输入
- 展示额外信息

## 组成

```

    mask(或无)
        |--------------------------------------------------|
        |                      title                 close |
        |-                                                 |
        ||         |------------------------------------|  |
        ||         |                                    |  |
        |size      |                                    |  |
        ||         |             content                |  |
        ||         |                                    |  |
        ||         |                                    |  |
        ||         |------------------------------------|  |
        |-                                                 |
        |                 footer(一般包括cancel&ok button)  |
        |--------------------------------------------------|


```

## 关闭时机

- click mask
- click close
- click cancel
- click ok & success

### 实现方式

- 有半透明 mask。点击 mask 时关闭。
- 有全透明 mask。点击 mask 时关闭。
- 无 mask。打开时`window.addEventListener('click', closeFn, false)`. 在组件销毁时或 closeFn 执行时`window.removeEventListener('click', closeFn, false)`.
