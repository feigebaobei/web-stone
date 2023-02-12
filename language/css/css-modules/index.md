# css-modules

## overview

> 把 css 文件中的所有 class name 和动画名打包为一个默认对象输出。然后就可以使用`url(...)`/`@imports`使用了。

### feature

- 推荐不强制使用 camelCase 命名
- 组合
- 依赖
  - 与别的文件组合 `.a {compose: className from './style.css'}`
  - 与全局 class name 组合
  - 与预处理器一起使用
- `:global(...)`/`:local(...)`
-

## install

`npm i {{packageName}}`

## usage

```js
// 编译*.css，并在html中使用。
// 也可以在*.css中写多个class，然后在html中使用多个类。
// widget1.css
.button {...}
// widget1.js
import React from 'react'
import styles from './widget.css'
class Widget1 extends React.Component {
    render() {
        return (
            <button className={styles.button}>
                click me
            </button>
        )
    }
}
export default Widget1
// *.css中的类名会被编译为`<filename>_<classname>_<randomHash>`
// 可以使用嵌套的类名。定义时嵌套，使用时也嵌套。
// 可以在*.css中使用其他*.css的内容。
// util.css
.grape {...}
// widget2.css
.button {
    composes: grape from './util.css';
    ...
}
// css选择器中的html标签不会被编译
// css选择器中的媒体查询不好被编译
```

## configuration

默认配置文件：`path/to/file.json`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api

`{{packageName}}.fn(param, first: string, second: boolean = true) => void`
description

`{{packageName}}.fn(param, [options: {a: string, b?: number}])`
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
