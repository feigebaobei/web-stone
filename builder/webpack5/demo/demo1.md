# overview
概览概览概览概览。
本示例展示了：
- 多入口打包  
- 使用插件：`html-webpack-plugin`  
- 使用loader处理资源  

# init project
```shell
mkdir projDir
cd projDir
npm init -y
mkdir src
mkdir dist
npm set-script b "webpack"
npm i webpack webpack-cli html-webpack-plugin css-loader style-loader -D
npm i lodash
# npm i 
npm i serve -g
```

## 创建文件
创建`<root>/src/index.js`
```js
import _ from 'lodash';
import printMe from './print.js';
import './style.css'
import first from './first.jpeg'

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);
    element.classList.add('red')
    let img = document.createElement('img')
    img.src = first
    element.appendChild(img)

    return element;
}

document.body.appendChild(component());
```

创建`<root>/src/print.css`
```js
export default function printMe() {
    console.log('I get called from print.js!');
}
```

创建`<root>/src/style.css`
```css
.red {
    color: red;
    background: url('./first.jpeg');
}
```
创建`<root>/webpack.config.js`
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        // print: './src/print.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hi string'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist3'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpeg|jpg)$/i,
                type: 'asset/resource',
            }
        ]
    }
}
```
创建`<root>/src/first.jpeg`

## dir construct
```
<root>
|-- package.json
|-- src
    |-- index.js
    |-- print.js
    |-- style.css
    |-- first.jpeg
|-- dist3
    |-- index.html
    |-- xxxx
|-- webpack.config.js
```

## 打包
```shell
npm run b
serve dist3
```

# usage
如何使用的。

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。