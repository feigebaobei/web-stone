# overview
基于`./demo0.md`
本示例展示了：
- 如何使用外部包
- 如何使用css执行hmr

# init project
```
npm i canvas-confetti
```

## 创建文件
修改`<root>/index.js`
```
...
import confetti from 'canvas-confetti'
confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
})({particleCount: 200, spreed: 200})
```

创建`<root>/index.css`
``` css
body {
    font-family: sans-serif;
}
```

修改`<root>/index.html`
``` html
...
<head>
    ...
    <link rel="stylesheet" type="text/css" href="./index.css" />
<head>
```
修改`<root>/index.js`

## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- xxxx
|-- xxxx
|-- xxxx
```

# usage
如何使用的。

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。