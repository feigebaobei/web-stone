# 原理

把 react / react-dom 的原理合并到这个文档中。

## react 到底做了什么

### 核心概念

- recenciliation
- rendering
- virtual dom
- diffing algorithm

### React Component & React Element & Component instance

|     | React Component                                                  | React Element                                    | Component instance               |     |
| --- | ---------------------------------------------------------------- | ------------------------------------------------ | -------------------------------- | --- |
|     | 组件。方法或 class                                               | 一个基本核心对象                                 |                                  |     |
|     | 返回 jsx/ReactElement                                            |                                                  | class 组件的实例。它是一个对象。 |     |
|     | 方法组件，直接调用。class 组件，创建一个实例后调用 render 方法。 | 可描述一个 dom.也可以描述一个 component instance | 有生命周期方法和初始化 state     |     |
|     |                                                                  | 在 class 组件时期用处大                          |                                  |     |
|     |                                                                  |                                                  |                                  |     |
|     |                                                                  |                                                  |                                  |     |
|     |                                                                  |                                                  |                                  |     |

### 渲染过程

1. 执行 class 组件的 render 方法或执行方法式组件，生成 Virtual DOM，它保存在内存中。
2. 同步 vdom 到 real dom。初始化时全部插入。
3. 当组件改变时生成新 vdom
4. 比对 2 个 vdom 的不同。再更新 dom
   1. 使用 diff 算法比对。也叫 recencilication
5.

### recenciliation

- 若 ReactElement 的 type 不同，则使用新组件及其后代元素。
  - 会触发 unmount 生命周期方法
- 属性不同时。更新属性，实例不变，状态不变。
- 使用 key props 比对。

### diff 算法

## 常用对象

```js
ReactElement
FiberNode 也叫 Fiber
FiberRootNode
ReactElement
ReactElement
ReactElement
```

## title

## title

## title

## title

## title

## title

## title

## title

## title

## title

## title

# 参考文档

- [youtobe philip fabinek react](https://www.youtube.com/watch?v=7YhdqIR2Yzo&t=422s)
- []()
- []()
- []()
- []()
- []()
- []()
