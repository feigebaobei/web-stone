# webpack5

## overview
> 强大的打包工具
> node v10.13+

### feature
- feature0
- feature1
- feature2

## install
`npm i webpack`

## concepts / usage
```js
let path = require('path') // node内置包
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './path/to/entry.js',
    output: {
        path: path.resovle(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: { // 在这里为资源设置loader
        rules: [
            {test: /\.txt$/, use: 'raw-loader'}
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
    mode: 'production'
}
```


## entry points
开始打包的地方。
```ts
entry: string | [string]
```
demo
```ts
module.exports = {
    entry: './entry.js',
    entry: ['./entry1.js', './entry2.js'],
    entry: {
        main: './entry.js'
    },
    entry: {
        app: './index.js',
        first: './first.js'
    }
}
```
```ts
type EntryDescription = {
    dependon: string;       // 当前入口文件依赖着哪个文件，必须在依赖文件后加载。
    filename: string;       // 输出在硬盘上的文件
    import: string;         // 入口文件
    library: string;        // Specify library options to bundle a library from current entry.
    runtime: string;        // 设置运行时的chunk name
    publicPath: string;     // 为输出文件设置url。
}
// runtime / dependon 不能同时使用
// dependon 不能循环依赖
```
- 若打为多个包，则在某些无变动时，它的hash值不变，浏览器就可以使用缓存中的文件。
- 多页面应用。

## output
输出选项，不管入口文件有多少个。
demo
```ts
module.exports = {
    output: {filename: 'bundle.js'},
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: 'https://www.test.com/assets/[fullhash]/'
    },
}
```

## loaders
webpack的核心包并不大。它只认识js/json。其他类型的文件需要由loader转化为js，然后才能打包。
demo
`npm i -D style-loader css-loader sass-loader ts-loader`
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {modules: true}
                    },
                    {loader: 'sass-loader'},
                ]
            },
            {test: /\.ts$/, use: 'ts-loader'},
        ]
    }
}
```
不会行内写法。  
行内优先于配置文件。  

- 可链式调用。倒序执行。其运行结果，是下一个loader的入参。所有loader有规范。
- 可同步也可异步
- node.js运行loader
- 使用`options`对象为loader设置配置。  
- 通常package.json中`main:loader`

### 常用loader
- [style-loader]()         xxxx
- [css-loader]()         xxxx
- [sass-loader]()         xxxx
- [ts-loader]()         xxxx
- [title]()         xxxx
- [title]()         xxxx
- [title]()         xxxx
- [title]()         xxxx

## [plugin](/builder/webpack/plugin/index.html)
插件是webpack的主要部分。
插件是一个有`apply()`的对象，该方法被webpack compiler调用。

### 常用插件
### 内置插件

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## modules
## module resolution
## module federation
## dependency graph
## targets
## the manifest
## hot module replacement
## why webpack
## under the hood







## api
`webpack.fn(param, first: string, second: boolean = true) => void`
description

`webpack.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。