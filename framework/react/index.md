# `react`

## overview

> 声明式  
> 基于组件的  
> 一次学习，多次使用  
> jsx语法。（类似xml，由babel解释。）  
> React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 组件的最佳写法应该是函数，而不是类。
> react居然使用同步更新dom.  
> reacr是重运行时的。（vue/svelte是重编译时的）

### feature

- react家族的成员太多了。
- feature1
- feature2

## usage
```js
ReactDOM.render(React.createElement('span', {}, 'string'), $('#id'))
=>
<div id="id">
    <span>string</span>
</div>
```
### 使用script标签引入react脚本
v17以前的用法：
1. 引入react脚本。
2. 使用`React.createElement`创建元素。
3. 使用`ReactDOM.render`渲染元素。
   
v18以后的用法：
1. 引入reacte脚本
2. 使用`React.createRoot`创建根元素`root`。
3. 使用`root.render(reactElement对象)`渲染元素

```html
<!-- ... 其它html代码 -->
<!-- 引入基本的react包 -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<!-- 引入babel包可以使用jsx。它会使你的网站变慢，并且不适用于生产环境。 -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script type="text/babel">
  function MyApp () {
    return <p>string</p>
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<MyApp />)
</script>
```

### 使用npm创建react项目
```shell
npx create-react-app proj-name
# or
# yarn create react-app todo-app
cd proj-name
npm run start
```

## demo

- [demo0-first](/react/demo0/first.html)使用script标签引入react  
- [demo0-second](/react/demo0/second.html)  
- [demo1]()  

## api
请在各包中查看相应api.

## react家族成员

- [react-17包](/framework/react/react-17/index.html) [react-18包](/framework/react/react-18/index.html)  
- [react-dom-17](/framework/react/react-dom-17/index.html)  [react-dom-18](/framework/react/react-dom-18/index.html)  
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
- [title](/framework/react/title.html)  
- [title](/framework/react/title.html)  
- [title](/framework/react/title.html)  
- [title](/framework/react/title.html)  

## todo
react / react-dom都用到了react-reconciler，该包就是fiber.

### 为什么要最常用的`react`/`react-dom`分开？怎么分清它们？
### 项目结构