# css-modules

## overview

> 把 css 文件中的所有 class name 和动画名打包为一个默认对象输出。然后就可以使用`url(...)`/`@imports`使用了。
> 让打包器处理。  
> 不是 react 的库，它支持很多 react 打包工具。

### feature

- 推荐不强制使用 camelCase 命名
- 组合
- 依赖
  - 与别的文件组合 `.a {compose: className from './style.css'}`
  - 与全局 class name 组合
  - 与预处理器一起使用
- `:global(...)`全局
- `:local(...)`局布
-

## install

`npm i {{packageName}}`

## usage

```js
// 编译*.css，并在html中使用。
// 也可以在*.css中写多个class，然后在html中使用多个类。
// widget1.module.css
.button {...}
// widget1.js
import React from 'react'
import styles from './widget.module.css'
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
// *.module.css中的类名会被编译为`<filename>_<classname>_<randomHash>`
// 可以使用嵌套的类名。定义时嵌套，使用时也嵌套。
// 可以在*.module.css中使用其他*.module.css的内容。
// util.module.css
.grape {...}
// widget2.module.css
.button {
    composes: grape from './util.module.css';
    ...
}
// css选择器中的html标签不会被编译
// css选择器中的媒体查询不好被编译
```

定义多个 class

```
// styles.module.css
.mybutton {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.primary {
  background-color: #007bff;
  color: white;
}
.secondary {
  background-color: #6c757d;
  color: white;
}
```

使用多个 class

```
import styles from './styles.module.css';
function MyButton() {
    return (
        <button className={`${styles.mybutton} ${styles.primary}`}>
    )
}
```

## composing classes

```css
.mybutton {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  composes: mybutton; /* 这里继承了mybutton类的样式 */
  background-color: #007bff;
  color: white;
}

.secondary {
  composes: mybutton; /* 这里继承了mybutton类的样式 */
  background-color: #6c757d;
  color: white;
}
```

## global classes

全局样式的 name 是惟一的。
全局样式与局布样式可以定义在一个文件中。

```css
:global(.myheader) {
  padding: 10px 20px;
  font-size: 50px;
  color: white;
  background-color: dodgerblue;
}
.myparagraph {
  font-size: 20px;
  color: white;
  background-color: purple;
}
```

```
import styles from './styles.module.css';
...
<div className={myheader}>...</div>
<div className={styles.myparagraph}>...</div>
```
