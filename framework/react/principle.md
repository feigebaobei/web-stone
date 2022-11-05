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

## what is react fiber

- 它是一个对象
- react reconciler 基于它工作。（它是异步的）它是工作单元
- 一共有 2 个阶段
- 多个 fiber 对象组成树

### 目的

- 动画
- 回应速度

### 功能

- 可把工作分块，设置任务优先级。
- 停止或再继续工作。
- 重新工作或打断工作。

### old reconciler (fiber 出现前)

- 任务是同步的。
- 工作就像栈。
- 栈空了才能停止工作。

### new reconciler (fiber 出现后)

- 它是一个工作单元
- 当工作完成时 react process 把工作结果提交。生成新 dom

### 二个阶段

- render phase (processing)
  - 异步
  - 定义任务的优先级，工作可能停止、丢弃。
  - 开始的方法，如：beginWork() / copmleteWork()
- commit phase (committing)
  - 从 commitWork()开始
  - 同步

### fiber 的属性

- 总是 1-1 的关系
  - 1 个 fiber 对应一个组件/dom/...
- type 属性表示 tag
  - 一共有 0-24。 有几个重要的。如下
  - FunctionComponent 0
  - ClassComponent 1
  - HostComponent 5 div/p/...
  - Fragment 7
  - ContextConsumer 9
  - ContextProvider 10
- stateNode 引用
- child 第一个子元素
- sibling 下一个同级元素
- return 父元素

### Fiber & ReactElement

|     | fiber                                        | ReactElement |     |
| --- | -------------------------------------------- | ------------ | --- |
|     | 通常从 ReactElement 中生成                   |              |     |
|     | 共享 type / key 属性                         |              |     |
|     | 当 ReactElement 重新渲染时，Fiber 通常会复用 |              |     |
|     | 通常在初次挂载时创建                         |              |     |
|     |                                              |              |     |
|     |                                              |              |     |
|     |                                              |              |     |

```js
// 常见的创建fiber的方法
createFiberFromElement()
createFiberFromFragment()
createFiberFromText()
```

### fiber 如何工作

- state change
- 触发生命周期方法
- dom 改变
- 生成时间表
- 可分割工作为多块
- 分高优、低优处理
  - 高优 requestAnimationFrame()
  - 低优 requestIdleCallback()

```
    a1
    |
    b1 -- b2 -- b3
          |
          c1
          |
          c2
```

1. 从 beginWork() 开始
2. 一直处于此步骤
3. 到 comleteWork() 结束

### fiber tree

|     | current                 | workInProgress |     |
| --- | ----------------------- | -------------- | --- |
|     | 第一次生成的 fiber tree | 第二次生成的   |     |
|     | 与真实显示相同          | 可不同         |     |
|     |                         |                |     |
|     |                         |                |     |
|     |                         |                |     |
|     |                         |                |     |
|     |                         |                |     |

工作在 commit 阶段进行  
深度优先

## title

## title

## title

## title

## title

## title

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
