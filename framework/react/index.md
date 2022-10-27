# react

## overview

> 声明式  
> 基于组件的  
> 一次学习，多次使用  
> jsx 语法。（类似 xml，由 babel 解释。）  
> React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 组件的最佳写法应该是函数，而不是类。
> react 居然使用同步更新 dom.  
> reacr 是重运行时的。（vue/svelte 是重编译时的）

### feature

- react 家族的成员太多了。
- 更接近 js 语言
- feature2

## usage

```js
ReactDOM.render(React.createElement('span', {}, 'string'), document.querySelector('#id'))
=>
<div id="id">
    <span>string</span>
</div>
```

### 使用 npm 创建 react 项目

```shell
npx create-react-app proj-name
npx create-react-app proj-name --template cra-template-pwa # 创建pwa应用
# or
# yarn create react-app todo-app
cd proj-name
npm run start
```

### 使用 script 标签引入 react 脚本

v17 以前的用法：

1. 引入 react 脚本。
2. 使用`React.createElement`创建元素。
3. 使用`ReactDOM.render`渲染元素。

v18 以后的用法：

1. 引入 reacte 脚本
2. 使用`React.createRoot`创建根元素`root`。
3. 使用`root.render(reactElement对象)`渲染元素

```html
<!-- ... 其它html代码 -->
<!-- 引入基本的react包 -->
<script
  src="https://unpkg.com/react@18/umd/react.production.min.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
  crossorigin
></script>
<!-- 引入babel包可以使用jsx。它会使你的网站变慢，并且不适用于生产环境。 -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script type="text/babel">
  function MyApp() {
    return <p>string</p>
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<MyApp />)
</script>
<div id="root"></div>
```

## demo

- [demo0-first](/react/demo0/first.html)使用 script 标签引入 react
- [demo0-second](/react/demo0/second.html)
- [demo1]()

## 创建应用

|                                                          |                |     |
| -------------------------------------------------------- | -------------- | --- |
| [create-react-app](/framework/react/createReactApp.html) | spa            |     |
| [next.js]()                                              | 静态化和 ssr   |     |
| [gatsby]()                                               | react/静态网站 |     |

## api

请在各包中查看相应 api.

## react 家族成员

- [react-17 包](/framework/react/react-17/index.html) [react-18 包](/framework/react/react-18/index.html)
- [react-dom-17](/framework/react/react-dom-17/index.html) [react-dom-18](/framework/react/react-dom-18/index.html)
- 状态管理
  - React Context
  - mobx
  - react-tracked
  - redux
  - zustand
  - jotai
  - recoil
  - xstate
- [redux react-redux](/framework/react/redux/index.html)
- [react native](/framework/react/reactNative.html)
- [react-router react-router-dom react-router-native](/framework/react/router.html)
- [propType](/framework/react/propType.html)
- [react](/framework/react/react.html)
- [react-dom](/framework/react/react-dom.html)
- [react-script](/framework/react/react-script.html)
- [next](/framework/react/next/index.html)
- [GatsBy](/framework/react/gateby/index.html)
- [create react app](/framework/react/createReactApp.html)
- [react-snapshot](/framework/react/reactSnapshot.html)
- [react-snap](/framework/react/reactSnap.html)
- [title](/framework/react/title.html)
- [title](/framework/react/title.html)
- [title](/framework/react/title.html)
- [title](/framework/react/title.html)

## todo

react / react-dom 都用到了 react-reconciler，该包就是 fiber.

### 为什么要最常用的`react`/`react-dom`分开？怎么分清它们？

React 创建开销极小的普通对象。  
React DOM 会负责更新 DOM 来与 React 元素保持一致。

### 项目结构

### [性能优化](/optimizing/index.html)

### [性能]()

### title

### title

```js
useEffect(() => {
  let controller = new AbortController()
  let signal = controller.signal
  fetch(url, {signal}).then(...).catch(...)
  return () => {
    controller.abort()
  }
}, [id])
```
