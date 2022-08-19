# overview
概览概览概览概览。
本示例展示了：
- 如何下载（安装）
- 如何打包
- 如何使用打包结果
- 与react结合使用
- 2种打包方式。1. 使用cli 2. 使用api

# init project
```shell
mkdir projDir
cd projDir
npm init
npm i reate react-dom
npm i esbuild -D
npm set-script build "esbuild app.jsx --bundle --outfile=out.js" # 需要npm v8+ 若设置不成功，则请手动编辑package.json中的脚本
npm set-script jsb "node ./jsb.js"
npm i serve -g
```

## 创建文件
创建`<root>/app.jsx`
```js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(React.createElement('span', {}, 'string'), document.querySelector('#id'))
```

创建`<root>/index.html`
```html
...
<body>
    <div id="id"></div>
    <script src="/out.js"></script>
</body>
...
```

创建`<root>/jsb.js`
```js
require('esbuild').build({
    entryPoints: ['app.jsx'],
    bundle: true,
    outfile: 'out.js',
}).catch(() => process.exit(1))
```

## dir construct
```
<root>
|-- package.json // 说明主要文件/目录的功能
|-- node_modules
|-- app.jsx
|-- index.html
|-- out.js
```

## 启动服务
```shell
npm run build
# or
# npm run jsb
serve
```
在浏览器中打开指定的url.若看到预期结果，则运行正确。  

# usage
如何使用的。

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。