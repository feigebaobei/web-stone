# webpack 运行原理

|               |                                                                                      |                          |     |     |
| ------------- | ------------------------------------------------------------------------------------ | ------------------------ | --- | --- |
| 1. 初始化参数 | 结合 cli 与配置文件得到最终的参数                                                    |                          |     |     |
| 2. 开始编译   | 使用 no.1 的参数初始化 compiler 对象。加载所有插件。开始编译。                       |                          |     |     |
| 3. 确定入口   | 从 no.1 中取出入口文件                                                               |                          |     |     |
| 4. 编译模块   | 从入口文件开始，理出所有文件的依赖关系，生成依赖图谱。再使用对应的 loader 翻译模块。 |                          |     |     |
| 5. 输出资源   | 根据依赖图谱，生成若干 chunk(每个 chunk 包括若干模块)。列出输出列表。                | 这是修改内容的最后机会。 |     |     |
| 6. 完成输出   | 根据文件列表（文件名、路径）把文件写入到文件系统中。                                 |                          |     |     |

由三个阶段组成
|||||
|-|-|-|-|
|1. 初始化|整理参数，加载插件，实例化 compiler|||
|2. 编译|从入口开始，使用 loader 翻译对应的模块。生成依赖图谱。|||
|3. 输出|把翻译后的模块组合成 chunk，再写入文件系统。|||

若

## 目的

搞清 webpack 为什么这么设计。

## 出生

- 大型应用中前端必是独立的项目。独立的项目要有足够的效率，必须进行工程化。
- 具有复杂数据状态的应用开发过程必须要有合适的框架，采用数据驱动开发的方式增强可维护性。
- 复杂项目必须模块化管理。
  - 可提高公共内容的可复用性。
  - 增强团队协作能力。
- 重复性工作必须由自动化工具完成。
  - 提高工作效率。
  - 避免人为出错。

webpack 的功能：

- 支持模块化
- 解决重复性工作
- 支持前端项目工程化
- 解决代码兼容问题
- 兼容多种模块类型
- 打包、分块。

为了实践前端方向的模块化开发。

## [模块化](http://lixiaodan.org/language/javascript/modularity.html)

![6种规范]()

### 模块化历史

|               |             | 缺点                                                                                                                                   | 优点               |     |
| ------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --- |
| 文件划分方式  | script 标签 | 污染全局作用域。没有私有空间，所有模块内的成员都可以在模块外部访问或修改。容易命名冲突。无法管理模块间的依赖关系。难分辨成员所属关系。 |                    |     |
| 命名空间方式  | -           | -                                                                                                                                      | 解决了命名冲突问题 |     |
| iife+依赖参数 |             |                                                                                                                                        |                    |     |
|               |             |                                                                                                                                        |                    |     |
|               |             |                                                                                                                                        |                    |     |

### 模块化的期望结果

1. 页面中引入一个 js 入口文件
2. 其余模块内它控制。
3. 按需加载。

### 遍及后的结果

证明了：模块化思想是伟大的。可以帮你“统治”前端整个项目。

## 核心特性

loader
plugin

## 知识储备

- js
- node.js
- vue 或竞品

## 基本特性

## 配置方式

## 工作模式

## 基本工作原理

## loader 机制

## 插件机制

## 高阶内容

- source map
- hmr
- proxy
- webpack-dev-server
- tree-shaking
- sideEffects
- code spliting
- 常用优化插件
- 三种 hash
- 打包速度优化

## 竞品分析

- rollup
- parcel

## 如何模块化打包

### demo

```
npm init --yes
npm i webpack webpack-cli -D
npx webpack --version # 若看到版本号，则安装成功。
# 创建示例代码
npx webpack
# 在script中写
"build": "webpack"
```

在 mode 后分析打包结果。

### 配置文件

```
const path = require('path')
module.export = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output'),
    }
}
```

> `import { Configuration } from 'webpack'`可以在编写配置项时有类型提示。写完再注释它。

### 三种工作模式

- production 打包慢。优化打包结果。
- development 打包快。方便调试错误。
- none 无额外处理。在分析打包结果时使用。

```
npx webpack --mode xxx
```

配置文件中设置 mode 选项。

## loader

有了加载器才支撑前端项目模块化。
webpack 对待所有资源都认为是一种模块。“万物皆模块”。
webpack 对待前端纷杂的资源都认为它是模块。然后由一个逻辑分支（js）控制它。每一类模块由一种 loader 加载。

```
module.exports = {
    entry: '',
    output: {
        filename: '',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
```

css ==> css-loader ===> webpack ===> bundle.js

### 为什么由 js 载入 css

不是整个应该需要该资源，是当前模块需要该资源。
由一个逻辑分支管理资源。方便迭代。

### 常用的加载器

|              |     |     |     |     |
| ------------ | --- | --- | --- | --- |
| file-loader  |     |     |     |     |
| url-loader   |     |     |     |     |
| babel-loader |     |     |     |     |
| style-loader |     |     |     |     |
| css-loader   |     |     |     |     |
| sass-loader  |     |     |     |     |
| url-loader   |     |     |     |     |
| url-loader   |     |     |     |     |
| url-loader   |     |     |     |     |
| url-loader   |     |     |     |     |

### 写一个加载器

markdown ===> webpack ===> html

```
# about
hi
```

```
import about from './about.md'
clog('about', about)
```

```js
const marked = require('marked')
module.export = (source) => {
  // clog(source)
  // return 'hi'
  const html = marked(source)
  // const code = `module.exports = ${JSON.stringify(html)}`
  const code = `export default ${JSON.stringify(html)}`
  return code
}
```

```
...
module: {
    rules: [
        {
            test: /\.md$/,
            use: './markdown-loader',
        }
    ]
}
```

```
npx webpack
# or
npm run build
```

source ===> loader0 ===> loader1 ===> ... ===> jscode

或者 markdown-loader + html-loader

```js
const marked = require('marked')
module.export = (source) => {
  const html = marked(source)
  return html
}
```

```
...
rules: [
    {
        test: /\.md$/,
        use: ['html-loader', './markdown-loader'],
    }
]
```

## plugin

目的：增强 webpack 的**自动化**构建。

### 使用示例

清空上次打包结果
在 html 文件中自动引入打包结果（的入口文件）。
复制文件

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: '',
    output: {
        filename: ''
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'hi',
            // meta: {
            //     viewport: 'width=device-width'
            // },
            template: './src/index.html', // 指定模板
        }),
        new HtmlWebpackPlugin({
            title: 'hi',
            template: './src/about.html', // 指定模板
        }),
        new CopyWebpackPlugin(['public']) // 把指定目录中的内容复制到打包目录中
    ]
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
    <div class="container">
        <h1>title</h1>
        <div id="root"></div>
    </div>
</body>
</html>
```

### 原理

钩子

```
                        P0                  P1   P3        P2
                       |---|               |---||---|     |---|
                       |   |               |   ||   |     |   |
        |---|     |---||   ||---|     |---||   ||   ||---||   ||---|     |---|
        |   |     |   ||---||   |     |   ||---||---||   ||---||   |     |   |
    ----|   |-----|   |-----|   |-----|   |----------|   |-----|   |-----|   |----
```

[hooks list](https://webpack.docschina.org/api/compiler-hooks/#hooks)

### 开发一个插件

```js
class RemoveCommentsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('RemoveCommentsPlugin', (compilation) => {
      for (const name in compilation.assets) {
        // clog('name', name)
        if (name.endsWith('.js')) {
          let contents = compilation.assets[name].source()
          let noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length,
          }
        }
      }
    })
  }
}
```

- 了解常用插件。
- 面向切面编程 aop

## 简述原理

- 各种 loader 加载各种资源。
- plugin 完成各种自动化构建任务。
- 从入口文件开始根据` import``require `找到依赖的模块。递归寻找。得到依赖关系树。由 loader 加载这些资源，由 plugin 打包。输出到指定目录。

## 出生

## 出生

## 出生

## 出生

## 参考文献

[Webpack 教程 现代化前端应用的基石 共 13 讲](https://www.youtube.com/watch?v=E7evJYK_kLw&list=WL&index=4)
