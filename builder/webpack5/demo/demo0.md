# overview
概览概览概览概览。
本示例展示了：
- 如何使用webpack打包

# init project
```shell
mkdir projDir
cd projDir
npm init -y
mkdir src
mkdir dist
npm set-script b "webpack"
npm i webpack webpack-cli -D
npm i loadsh
npm i serve -g
```

## 创建文件
创建`<root>/src/index.js`
```js
import _ from 'loadsh'

let component = () => {
    let element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'webpack'], ' ')
    return element
}
document.body.appendChild(component())
```

## dir construct
```
<root>
|-- package.json
|-- src
    |-- index.js
|-- dist
    |-- index.html
```

## 打包
```shell
npm run b
serve dist
```

# usage
如何使用的。

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。