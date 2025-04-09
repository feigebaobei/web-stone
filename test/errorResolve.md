# 错误 & 解决方案

## js 错误

- TypeError 以错误的数据类型执行逻辑
- ReferenceError 引用未声明变量
- SyntaxError js 语法错误
- RangeError 数值超出允许的范围
- URIError encodeURI/decodeURI 方法使用不当

```js
// 使用try...catch解决
// window.onerror
```

## 网络错误

- 404 not found
- 500 internal server error
- 连接超时或网络中断

```js
// 使用promiseObj.catch解决
一般在axios.interceptors、fetch.catch中处理。
```

## 资源加载错误

- 图片加载失败
- 样式表加载失败
- 脚本加载失败

```js
// 使用window.onerror解决
// dom节点.addEventListener('error', () => {...})
```

## Promise 异步错误

```js
.catch
或
window.addEventListener('unhandledrejection', function (ev) {})
```

## 用户界面错误 （ui errors）

- 用户在表单中输入无效数据
- 用户尝试执行不允许的操作

## 三方库、框架错误

- 通常库、框架会内部处理此错误。

# 解决方案

window.onerror <=> window.addEventListener('error', fn)
window.onerror 会捕获未被 try...catch 捕获的错误。不能捕获 SyntaxError 和 异步错误(含网络错误)
event.preventDefault()会防止默认处理。（例如在控制台中输出）
try...catch 不能捕获 SyntaxError 和 异步错误
语法错误在编辑时就能发现。
js 运行时错误会触发 window.onerror

# vue

```js
Vue.config.errorHanddler = (err, vm, info) => {
    ...
}
```

# react

```js
// react@16+
componentDidCatch(error, info) {
    ...
}
```

在哪个类组件中使用此方法，就把错误拦截到哪个组件内，不再冒泡上去。
