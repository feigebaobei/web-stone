# 状态管理

所有的状态管理包都是使用“单例模式”。在项目中的结构如下：

```
|------------|   设置值     |----------|
|            | ----------> |          |
|            |             |          |
|            |   请求值     |          |
|   高层部分  | ----------> |  状态管理  |
|            |             |          |
|            |   返回值     |          |
|            | <---------- |          |
|------------|             |----------|
|-------------------------------------|
|                基础部分              |
|-------------------------------------|
```

## 常见包

- [React Context]()
- [mobx]()
- [react-tracked]()
- redux
  - [redux](/jsPackages/redux.html)
  - [react-redux](/jsPackages/react-redux.html)
  - [@reduxjs/toolkit]()
- [zustand]()
- [jotai]()
- [recoil]()
- [xstate]()
- [vuex]()
- [useSyncExternalStore]()
- [pinia](/jsPackages/pinia.html)
- [title]()
- [title]()
- [title]()
- [title]()

## title

## title

## title

## title

## title

## todo

### 为什么会有这么多状态管理包

- 逻辑简单。只使用单例模式。开发成本低。100+ ~ x000 行就能完成。
- 前端框架多，每个框架都需要有自己的状态管理包。
- 抽象逻辑不一样。

## title
