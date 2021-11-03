# overview
本示例展示了：  
- 使用snowpack创建一个项目。  
- 执行开发、打包、访问。  

# init project
```
mkdir projDir
cd projDir
npm init -y
npm i snowpack serve -g
npm i canvas-confetti
npm set-script dev "snowpack dev"
npm set-script build "snowpack build"
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
import confetti from 'canvas-confetti';
confetti.create(document.getElementById('canvas'), {
  resize: true,
  useWorker: true,
 })({ particleCount: 200, spread: 200 });
```

创建`<root>/index.css`
``` css
body {
    color: red;
}
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
    <link rel="stylesheet" type="text/css" href="/index.css" />
    <script type="module" src='./index.js'></script>
</head>
<body>
    <h1>hi stone</h1>
</body>
</html>
```

## 运行命令
```
npm run dev // 可看到开发时的效果。
npm run build // 打包。生成<root>/build/
serve build // 打开相应url，可看到打包后的效果。
```

# usage
如何使用的。

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。