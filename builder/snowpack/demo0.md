# overview
本示例展示了：  
- 如何使用snowpack  

# init project
```
mkdir projDir
cd projDir
npm init -y
npm i snowpack -D
npm set-script dev "snowpack dev"
```

## 创建文件
创建`<root>/index.hellow-world.js`
``` js
let {log} = console
export function hw() {
    log('hw by li')
}
```

创建`<root>/index.js`
``` js
import {hw} from './hello-world.js'
hw()
```

创建`<root>/index.html`
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="module" src='./index.js'></script>
</head>
<body>
    <h1>hi stone</h1>
</body>
</html>
```

## 运行命令
`npm run dev`

# usage
如何使用的。

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。