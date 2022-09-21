# overview
需要用到lerna
本示例展示了：
- 使用wp打包一个库，
- 在另一个项目中引入并使用该库
- 

# init project
使用lerna创建一个项目。然后执行：
```shell
lerna create first -y # 这是库包
lerna create test -y  # 这是测试库的包
```

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
创建`<first>/src/index.js`
```js
// 使用esm规范书写。不是必须使用esm规范。
import dataMap from './dataMap'
let numMap = (ns) => {
    return dataMap[ns]
}
export default numMap
```
创建`<first>/src/dataMap.js`
```js
export default {
    1: 'one',
    2: 'two',
    3: 'three',
    'one': 1,
    'two': 2,
    'three': 3,
}
```
创建`<first>/webpack.config.js`
```js
const path = require('path')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'webpack-number.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'webpackNumber',
            type: 'commonjs',
        },
        clean: true
    },
    externals: ['lodash'],
}
```
打包。
修改`<first>/package.json`
```json
...
"script": {
    ...
    "wp": "webpack"
}
...
```
在first目录下执行
```shell
npm run wp
```
再使用lerna把first/test建立依赖关系
```shell
leran add first --scopt test
```
创建`<test>/src/index.js`
```js
let clog = console.log
let numMap = require('first')
clog(numMap.webpackNumber.default(1))
clog(numMap.webpackNumber.default(2))
clog(numMap.webpackNumber.default('three'))
clog(numMap.webpackNumber.default('one'))
```

## 运行
在test目录下执行
``` shell
node src/index.js
```

## dir construct
```
<first>
|-- package.json
|-- src
    |-- index.js
    |-- dataMap.js
|-- webpack.config.js

<root>
|-- package.json
|-- src
    |-- index.js
|-- webpack.config.js
```

# usage
如何使用的。

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。