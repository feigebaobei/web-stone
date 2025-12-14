# 原理

把 react / react-dom 的原理合并到这个文档中。  
**不必学习 react 的每一个细节。我们需要知道它的关键部分。**

## react 到底做了什么

### 核心概念

<!-- prettier-ignore-start -->
|     |          |            |     |
| --- | --------- | --------- | --- |
|     | recenciliation    | 调度器，用于处理 diff、更新视图       |     |
|     | root.render(...)  | 开始渲染视图        |     |
|     | virtual dom       | 虚拟 dom            |     |
|     | diffing algorithm | diff 算法。通过比较 current/workInProgress,得到最小变动.         |     |
|     | mvc 框架          |            |     |
|     | 双缓存            | current 表示当前展示的 vdom 树。workInProgress 表示本次更新后的 vdom 树。 |     |
|     | fiber             | 工作单元。根据 ReactElement 元素生成。         |     |
|     | ReactElement      | 使用 React.createElement 方法生成     |     |
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
### React Component & React Element & Component instance

|     | React Component      | React Element  | Component instance       |     |
| --- | ------ | ------ | ------ | --- |
|     | 组件。方法或 class                  | 一个基本核心对象            |             |     |
|     | 返回 jsx/ReactElement  |        | class 组件的实例。它是一个对象。 |     |
|     | 方法组件，直接调用。class 组件，创建一个实例后调用 render 方法。 | 可描述一个 dom.也可以描述一个 component instance | 有生命周期方法和初始化 state     |     |
|     |   | 在 class 组件时期用处大     |             |     |
<!-- prettier-ignore-end -->

### 渲染过程

1. 执行 class 组件的 render 方法或执行方法式组件，生成 Virtual DOM，它保存在内存中。每次执行都是新的`ReactElement`对象。
2. 同步 vdom 到 real dom。初始化时全部插入。
3. 当组件改变时生成新 vdom
4. 比对 2 个 vdom 的不同。再更新 dom
   1. 使用 diff 算法比对。也叫 recencilication

### recenciliation (也叫 diff / diffing)

基于 2 个前提工作：

- type 不同表示不同的元素。
- 各子元素的 key 惟一。

- 若 ReactElement 的 type 不同（fiberNode 的 type 来自 ReactElement 对象的 type），则使用新组件及其后代元素。
  - 会触发 unmount 生命周期方法
- 当 type 相同、属性不同时，更新当前元素，保留其他后代元素。

## what is react fiber

- 它是一个对象，由`ReactElement`对象生成。
- diff 基于它工作。diff 过程（render phase）是异步的。fiber 是工作单元.
- 多个 fiber 对象组成树(workInProgress/current)

### 引入 fiber 的目的

- 使动画流畅
- 加快反应速度

### fiber 的功能

- 可把工作分块，一个 fiber 对象就是一个工作单元。设置任务优先级。
- 每一个 ReactElement 都有一个对应的 FiberNode
- 它是可变对象，在渲染时不会重新创建。
- 包含组件的状态、dom
- 提供工作路径、时间表、暂停、打断
- 使用 createFiberFromTypeAndProps 创建 FiberNode
- 二叉树结构。child/sibling/return

### new reconciler (fiber 出现后)

- 它是一个工作单元
- 当工作完成时 react process 把工作结果提交。生成新 dom

### old reconciler (fiber 出现前)

- 任务是同步的。
- 工作就像栈。
- 栈空了才停止工作。

### Fiber & ReactElement

<!-- prettier-ignore-start -->
|    | ReactElement     | FiberNode   |   |
| --- | ---- | ---- | ---- |
|    | 由 jsx 代码生成  | 由 ReactElement 对象生成      |   |
|    | 从 jsx 代码中得到 type/key | 从 ReactElement 中取 type/key   |   |
|    | React.createElement  | createFiberFromElement / createFiberFromTypeAndProps / createFiber 等 |   |
|    | 这是 vdom,代表一个 dom     | 工作的单元  |   |
| 功能|   | 1. 寻迹。 2. 暂停。 3. 制定时间表  |   |
|    |   | 一直使用。若有变动，则修改属性。不销毁（除非删除dom节点）。通常在初次挂载时创建  | 修改是在 FiberNode 的替补节点上完成的。 |
| 如何 ReactElement => FiberNode |   |   |   |
<!-- prettier-ignore-end -->

```js
// 常见的创建fiber的方法
createFiberFromElement()
createFiberFromFragment()
createFiberFromText()
```

jsx 代码 => ReactElement => FiberRootNode/FiberNode

### current & workInProgress

<!-- prettier-ignore-start -->
|     | current          | workInProgress    |     |
| --- | --- | ----------- | --- |
|     | 第一次生成的 FiberNode 组成的树和每次更新后生成的树 | Fiber 在工作中生成的树  |     |
|     |     | 可以影响未来的状态和刷新屏幕        |     |
|     |     | fiber 的所有工作都是从此树开始      |     |
|     |     | 由 class 组件的 render 方法返回的或方法组件返回的 ReactElement 创建的     |     |
|     |     | 完成工作后此树被赋于 current        |     |
|     |     | 处理所有组件的进程、刷新屏幕。      |     |
|     |     | 每个节点的 alternate 指向另一棵树（current/workInProgress）上对应的节点 |     |
|     | 第一次生成的 fiber tree | 第二次生成的   |     |
|     | 与真实显示相同          | 可不同         |     |
|     |当前 dom 的 vdom 树| 改变的状态需要更新的节点树。|  |
||它是工作的终点|diff从此树开始执行||
|||每个节点使用 render 方法创建新的 ReactElement。再由新的 ReactElement 生成 workInProgress||
|||不为用户提供服务。是 react 内置的用于缓存的对象。||
<!-- prettier-ignore-end -->

副作用（side-effects）： 每次活动（如：改变 dom）和调用生命周期方法  
Fiber 的 Effecttag 属性是副作用函数  
副作用 tag  
Current 就是 fiberroot

FiberRootNode 下的第一个 FiberNode 是使用 FiberRootNode()创建的。

工作在 commit 阶段进行  
**深度优先**

1. 当完成所有 workInProgress 树的工作后
2. 开始同步更新 dom.
3. 此树成为 current 树。

react 只更新 dom

### fiber 如何工作

- state change
- 触发生命周期方法
- dom 改变
- 生成时间表
- 可分割工作为多块
- 分高优、低优处理
  - 高优 requestAnimationFrame() // 该方法是浏览器支持的处理异步任务的方法。
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

[https://vimeo.com/302222454](https://vimeo.com/302222454)

1. 从 beginWork() 开始
2. 一直处于此步骤
3. 到 completeWork() 结束

## 更新 dom 的二个阶段

也就是 react 内部更新 dom 的过程。

- render phase (processing)
  - 异步
  - 定义任务的优先级，工作可能停止（可以被打断）、丢弃。
  - 开始的方法，如：beginWork() / completeWork()
  - 此阶段处理 fiber。（diff 在此执行）
- commit phase (committing)
  - 同步
  - 从 commitWork()开始

|     |              |                          |                                             |     |     |
| --- | ------------ | ------------------------ | ------------------------------------------- | --- | --- |
|     | render phase | 异步                     | 操作 workInProgress/current，即 diff        |     |     |
|     |              | getDerivedStateFromProps | 被反对的生命周期方法不列出来                |     |     |
|     |              | shouldComponentUpdate    |                                             |     |     |
|     |              | render                   |                                             |     |     |
|     |              |                          |                                             |     |     |
|     | commit phase | 同步                     | [操作 dom](/language/javascript/opDom.html) |     |     |
|     |              | getSnapshotBeforeUpdate  | 执行 side-effect                            |     |     |
|     |              | componentDidMount        |                                             |     |     |
|     |              | componentDidUdate        |                                             |     |     |
|     |              | componentWillUnmount     |                                             |     |     |
|     |              |                          |                                             |     |     |

调用 setState/React.render 会把对应的 FiberNode 指定为需要更新的元素。

### render phase

使用 effectTag 标记该节点应该如何更新。更新 dom 的工作在 commit 阶段做。  
此阶段不能执行 side-effect
从根节点开始，然后深度优先，跳过不需要更新的节点 FiberNode，标记出需要更新的节点 FiberNode。

- nextUnitOfWork
- performUnitOfWork 参数是 workInProgress
- beginWork // 返回下一个子节点或 null
- completeUnitOfWork //
- completeWork

按照 FiberNode 形成的二叉树，深度优先。

### commit phase

从 completeWork 开始。  
主要在 commitRoot 方法中  
因为要改变视图，所以必须是同步。  
当调用`finishedWork`时更新视图。

- 标记了 Snapshot 的 fiberNode 会执行 getSnapshotBeforeUpdate 方法
- 标记了 Deletion 的 fiberNode 会执行 componentWillUnmount 方法
- 执行所有节点的插入、更新、删除操作 commitAllHostEffects。此步骤完成了从 current 到视图的工作。
- 设置新的 current
- 标记了 Placement 的 fiberNode 会执行 componentDidMount 方法
- 标记了 Update 的 fiberNode 会执行 componentDidUpdate 方法

## diff

### diff 策略

1. 忽略节点跨层级移动
2. 相同类型`type`的组件产生的 dom 结构相似。反之不相似。
3. 同层级组件之间使用 key 做惟一值。

### 同级之间的 diff

#### 复用节点

1. 在新节点列表中，从头开始取出一个节点 N。
2. 在旧节点列表中，取出相同 key 的节点 N'.
3. 设置 lastIndex = 0;此值表示该值前的已经已经排好序了。
4. 若 N'.index < lastIndex，则不移动。否则移动 N'到 lastIndex.再更新 N'.index = lastIndex
5. lastIndex++.
6. 直到完成所有新节点列表。

#### 增、减节点

```
在新节点列表中，从头开始取出一个节点N.
在旧节点列表中，若能取出相同key的节点N'.----------------------------------
  |                                                                |
  Y                                                                N
  |                                                                |
  V                                                                V
设置lastIndex = 0;此值表示该值前的已经已经排好序了。               lastIndex++
  |                                                                |
  |                                                                |
  |                                                                |
  V                                                                |
若N'.index < lastIndex，则不移动。否则移动N'到lastIndex.  <-------------
lastIndex++.
遍历完新节点列表。再遍历旧节点列表，删除在新节点列表中不存在的节点。
```

#### 不足

当最后一个节点移到第一个节点时，react 会把非最后一个节点依次移到后面。也就是会移到 n-1 次。  
开发时不要这么做。

#### 自己实现一个同级 diff 方法

```js
// 待测试
let oldChain = new SingleChain()
// {
//   value: 'a'
//   next
//   position
// }
oldChain.appen('a')
oldChain.appen('b')
oldChain.appen('c')
oldChain.appen('d')
// a -> b -> c -> d
let newChain = new SingleChain()
newChain.appen('b')
newChain.appen('e')
newChain.appen('c')
newChain.appen('a')
// b -> e -> c -> a
let f = (newChain, oldChain) => {
  // 遍历新节点列表
  let newChainCur = this.newChain.head
  let lastIndex = 0 // 其实newChainCur.position也可以使用
  while (newChainCur) {
    let oldChainCur = this.oldChain.head
    while (oldChainCur) {
      if (oldChainCur.value === newChainCur.value) {
        break
      }
      oldChainCur = oldChainCur.next
    }
    // 是否找到
    if (oldChainCur) {
      oldChain.removeAt(oldChainCur.position)
      oldChain.insert(oldChainCur, lastIndex)
    } else {
      oldChain.insert(newChainCur.value, lastIndex)
    }
    lastIndex++
    newChainCur = newChainCur.next
  }
  // 删除节点
  let index = this.newChain.length
  return oldChain.slice(0, index)
}
```

## 自己理出的过程

创建组件时

```js
createRoot() {
    // 经过若干验证参数
    var root = createContainer(container, ConcurrentRoot, null, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
                    return createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
                            let root = FiberRootNode(...)
                            var uninitializedFiber = createHostRootFiber(tag, isStrictMode); // 返回FiberNode对象
                                                        return createFiber(...)
                                                            return FiberNode(...)
                            root.current = uninitializedFiber;
                            uninitializedFiber.stateNode = root;
                            initializeUpdateQueue(uninitializedFiber)
                                fiber.updateQueue = {
                                    baseState: fiber.memoizedState,
                                    firstBaseUpdate: null,
                                    lastBaseUpdate: null,
                                    shared: {
                                    pending: null,
                                    lanes: NoLanes,
                                    hiddenCallbacks: null
                                    },
                                    callbacks: null
                                };
                            return
                            root;
    markContainerAsRoot(root.current, container); // 为了验证参数，在这里做标记
    var rootContainerElement = container.nodeType === COMMENT_NODE ? container.parentNode : container; // COMMENT_NODE 是注释节点的码值 8
    // rootContainerElement      dom
    listenToAllSupportedEvents(rootContainerElement);
        // 它里面调用的方法太多了。
        // listenToNativeEvent
    return new ReactDOMRoot(root);
                function ReactDOMRoot(internalRoot) {
                    this._internalRoot = internalRoot;
                }
                ReactDOMRoot.prototype.render = () => {
                    var root = this._internalRoot;
                    updateContainer(children, root, null, null);
                }
                ReactDOMRoot.prototype.unmount = () => {
                    var root = this._internalRoot;
                }
}
```

更新组件时

```
ReactDOMRoot
```

## 常用对象

```js
ReactElement
{
  "$$typeof": Symbol(react.element) // 惟一标记
  "type": "h1", // html标签 | 构造函数 | class组件名
  "key": null,  // 惟一键
  "ref": null,
  "props": {
    "children": "title"
  },
  "_owner": null,
  "_store": {},
  "_self": null
  "_source": null
}

FiberNode 也有人叫 Fiber
总是与组件一对一。
{
  "tag": 5,
  "key": null,          // key 兄弟间惟一
  "elementType": null,  // 构造函数 | html标签 | class组件名
  "type": null,         // 组件的类型。与elementType相同值。createFiberFromTypeAndProps
            // 一共有 0-24。 有几个重要的。如下
            // FunctionComponent 0
            // ClassComponent 1
            // HostComponent 5 div/p/...
            // Fragment 7
            // ContextConsumer 9
            // ContextProvider 10
  "stateNode": null,    // dom | FiberRootNode 的引用
  "return": null,       // 父 FiberNode
  "child": null,        // 第一个子元素 FiberNode
  "sibling": null,      // 后面的第一个兄弟元素 FiberNode
  "index": 0,           // 兄弟间下标。用于同级节点移动位置时。
  "ref": null,          // ref
  "pendingProps": {     // 这是被修改后的props。应该传入子组件或dom
    "children": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": "title"
      },
      "_owner": null,
      "_store": {}
    }
  },
  "memoizedProps": null,    // 输出更新后节点需要使用的props
  "updateQueue": null,      // 更新队列。详见下文。链表结构。
  "memoizedState": null,    // 上次渲染组件是使用的状态。初始化FiberNode节点时会赋初始值。
                            // 输出更新后节点需要使用的state
                {           // 这是一个hook对象
                  baseState,
                  next,         // 指向下一次useState对应的hook对象
                                // 又是链表
                  baseUpdate,
                  queue,
                  memoizedState, // useState返回的结果
                }
  "dependencies": null,
  "mode": 3,
  "flags": 0,               // 该节点的side-effect。功能同原来的effectTag
  "subtreeFlags": 0,
  "deletions": null,
  "lanes": 0,
  "childLanes": 0,
  "alternate": null,        // 指向在另一棵树上对应的节点
  "actualDuration": 0,      //
  "actualStartTime": -1,    // 好像是开始更新的时刻，相对于根组件被创建的时间。
  "selfBaseDuration": 0,
  "treeBaseDuration": 0,
  "_debugSource": null,
  "_debugOwner": null,
  "_debugNeedsRemount": false,
  "_debugHookTypes": null,
  // effectTag: xxxxx              // 该节点的side-effect 副作用
}

FiberRootNode
{
  "tag": 1,
  "containerInfo": {},      // 就是createRoot的第一个参数。dom类型。
  "pendingChildren": null,
  "current": null,          // FiberNode。它是在createRoot方法中被设置的。
  "pingCache": null,
  "finishedWork": null,
  "timeoutHandle": -1,
  "context": null,
  "pendingContext": null,
  "callbackNode": null,
  "callbackPriority": 0,
  "eventTimes": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  "expirationTimes": [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
  "pendingLanes": 0,
  "suspendedLanes": 0,
  "pingedLanes": 0,
  "expiredLanes": 0,
  "mutableReadLanes": 0,
  "finishedLanes": 0,
  "entangledLanes": 0,
  "entanglements": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  "identifierPrefix": "",
  "mutableSourceEagerHydrationData": null,
  "effectDuration": 0,
  "passiveEffectDuration": 0,
  "memoizedUpdaters": {},
  "pendingUpdatersLaneMap": [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
  "_debugRootType": "createRoot()"
}

update = {
  eventTime: eventTime,
  lane: lane,
  tag: UpdateState,
  payload: null,
  callback: null,
  next: null
};

current 指向 FiberRootNode

ReactWorkTags:
export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
// 还17 、 18 不在这里

flags 表示effect的编码
// 使用二进制很方便判断值，以后我也可以使用它。
export const NoFlags = /*                      */ 0b00000000000000000000000000;
export const PerformedWork = /*                */ 0b00000000000000000000000001;
// You can change the rest (and add more).
export const Placement = /*                    */ 0b00000000000000000000000010;
export const Update = /*                       */ 0b00000000000000000000000100;
export const ChildDeletion = /*                */ 0b00000000000000000000001000;
export const ContentReset = /*                 */ 0b00000000000000000000010000;
export const Callback = /*                     */ 0b00000000000000000000100000;
export const DidCapture = /*                   */ 0b00000000000000000001000000;
export const ForceClientRender = /*            */ 0b00000000000000000010000000;
export const Ref = /*                          */ 0b00000000000000000100000000;
export const Snapshot = /*                     */ 0b00000000000000001000000000;
export const Passive = /*                      */ 0b00000000000000010000000000;
export const Hydrating = /*                    */ 0b00000000000000100000000000;
export const Visibility = /*                   */ 0b00000000000001000000000000;
export const StoreConsistency = /*             */ 0b00000000000010000000000000;
export const LifecycleEffectMask =
  Passive | Update | Callback | Ref | Snapshot | StoreConsistency;
// Union of all commit flags (flags with the lifetime of a particular commit)
export const HostEffectMask = /*               */ 0b00000000000011111111111111;
// These are not really side effects, but we still reuse this field.
export const Incomplete = /*                   */ 0b00000000000100000000000000;
export const ShouldCapture = /*                */ 0b00000000001000000000000000;
export const ForceUpdateForLegacySuspense = /* */ 0b00000000010000000000000000;
export const DidPropagateContext = /*          */ 0b00000000100000000000000000;
export const NeedsPropagation = /*             */ 0b00000001000000000000000000;
export const Forked = /*                       */ 0b00000010000000000000000000;
// Static tags describe aspects of a fiber that are not specific to a render,
// e.g. a fiber uses a passive effect (even if there are no updates on this particular render).
// This enables us to defer more work in the unmount case,
// since we can defer traversing the tree during layout to look for Passive effects,
// and instead rely on the static flag as a signal that there may be cleanup work.
export const RefStatic = /*                    */ 0b00000100000000000000000000;
export const LayoutStatic = /*                 */ 0b00001000000000000000000000;
export const PassiveStatic = /*                */ 0b00010000000000000000000000;
// Flag used to identify newly inserted fibers. It isn't reset after commit unlike `Placement`.
export const PlacementDEV = /*                 */ 0b00100000000000000000000000;
export const MountLayoutDev = /*               */ 0b01000000000000000000000000;
export const MountPassiveDev = /*              */ 0b10000000000000000000000000;
```

## [使用本地 react/react-dom 调试源码](/framework/react/useLocalReact.html)

## hooks 的工作原理

更新是如何发生：

调用 useState，内部通过 setState 修改状态后，调用 scheduleUpdate 方法，从根节点执行完整的 dom-diff 比较，进行组件的更新。

为什么不能在条件语句或循环中使用 Hook？

从实现来看，每次 hook 的执行，都是从索引为 0 即第一个 hook 开始执行。也是依靠索引记录当前操作的 Hook，假如使用条件语句或者循环，那么 hook 执行的顺序可能与我们在数组中存放的顺序不一致，就会乱掉。因此不能在条件语句或循环中使用 Hook。
我看源码得到的结果是：各个状态组件一个链表，每个状态是一个节点。最后一个节点是当前状态。

方法组件中使用`memoizedState`属性保存 state。
`FiberNode.memoizedState`  
一个组件的多个 useState()使用链表的方式串起来。  
在方法组件更新时会执行完整的方法体。所以会依次执行 useState()。若把 useState()写在非顶级，则有可能不会执行全部 useState()，这样会引发`memoizedState`链出错。

hooks 的状态数据是存放在对应的函数组件的 fiber.memoizedState；  
一个函数组件上如果有多个 hook，他们会通过声明的顺序以链表的结构存储；

# 本地笔记

## Inside Fiber: in-depth overview of the new reconciliation algorithm in React

### side-effects

- **[操作 dom](/language/javascript/opDom.html) 的方法**
- **生命周期方法**
- ……

### effect list

根据 FiberNode 链表结构依次处理  
处理链表比处理树快。  
firstEffect 指向第一个节点。nextEffect 指向下一个节点。单向链表。

### root of the fiber tree

使用变量 container 指定根节点的容器。它是 dom 元素。  
current 指向 FiberRootNode  
根节点是 HostRoot  
FiberRootNode.stateNode 指向 HostRoot

## [In-depth explanation of state and props update in React](https://indepth.dev/posts/1009/in-depth-explanation-of-state-and-props-update-in-react)

### scheduling updates

```js
当组件需要更新时，也就是更新前。
fiber
{
    effectTag: 0,
    elementType: class ClickCounter,
    firstEffect: null,
    memoizedState: {count: 0},
    type: class ClickCounter,
    stateNode: {
        state: {count: 0}
    },
    updateQueue: {
        baseState: {count: 0},
        firstUpdate: {
            next: {
                payload: (state, props) => {…}
            }
        },
        ...
    }
}
fiber更新后
{
    effectTag: 4, // 源码中使用二进制表示   100
    // 因这里标记为 Update 所以会执行此节点的componentDidUpdate生命周期方法
    elementType: class ClickCounter,
    firstEffect: null,
    memoizedState: {count: 1},
    type: class ClickCounter,
    stateNode: {
        state: {count: 1}
    },
    updateQueue: {
        baseState: {count: 1},
        firstUpdate: null,
        ...
    }
}

另一个示例：
fiber更新前
{
    stateNode: new HTMLSpanElement,
    type: "span",
    effectTag: 0
    updateQueue: null
    ...
}
fiber更新后
{
    stateNode: new HTMLSpanElement,
    type: "span",
    effectTag: 4,
    updateQueue: ["children", "1"],
    ...
}
```

全局变量 nextUnitOfWork 表示在 workInProgress 树上下一个需要工作的 FiberNode。  
若此变量为空，则完成所有工作。

1. 当执行 setState 时，会在该组件对应的 FiberNode 的 uqdateQueue 中添加工作。
2. 进入 render 阶段。
3. 调用 renderRoot 方法。从 HostRoot(它是一个 FiberNode)开始，会跳过完成工作的 FiberNode，直到未完成工作的 FiberNode.
4. 调用 createWorkInProgress 方法，根据 ReactElement 创建 workInProgress.（可能没有此步）
5. 调用 beginWork 方法。根据 type 分别调用相应的方法。如`updateClassComponent() 、 updateFunctionComponent()`。会创建并挂载组件的实例或更新实例。
6. 调用 updateClassInstance 方法，去更新组件。然后依次调用：
   1. UNSAFE_componentWillReceiveProps() deprecated
   2. 执行 updateQueue 里的方法。会得到新的 state
   3. 使用新 state 调用 getDerivedStateFromProps 方法。
   4. 执行 shouldComponentUpdate 方法。若返回 false，则跳过整个渲染处理（包括该组件的 render 方法及其子组件的 render 方法）。否则执行更新。
   5. 调用 UNSAFE_componentWillUpdate（） deprecated
   6. 添加一个触发 componentDidUpdate()的 effect 在 render 阶段中是添加。实际执行在 commit 阶段。
7. 更新实例的 state/props。 为执行 render 方法做准备。
8. 执行 finishClassComponent 方法。react 会调用 render 方法，得到新组件实例，再执行 diffing 运算。
   1. 执行 createWorkInProgress 方法，根据新的 ReactElement 对象得到替补节点（它是 FiberNode）
   2. 在 FiberNode.pendingProps 的数据会作用于子组件。
   3. 子组件中使用 memoizedProps
   4. 为 nextUnitOfWork 赋值。 其中的处理逻辑同上。
9. 调用 updateHostComponent 方法，结束。

### commit phase

1. 从调用 completeRoot 方法开始。
2. 设置 FiberRootNode.finishedWork 为 null
3. 调用 commitBeforeMutationLifeCycles 方法。若标记 snapshot 则执行 getSnapshotBeforeUpdate()
4. 调用 commitAllHostEffects 方法。
5. 调用 updateDOMProperties 方法。设置了 dom 的属性。
6. 调用 finishedWork 方法。把 workInProgress 赋值给 current
7. 调用 commitAllLifecycles 方法。调用所有的生命周期方法。
   1. 调用 commitLifeCycles 方法。会更新 refs 引入。 componentDidMount 会只执行一次。

### 处理 FiberNode 的更新

全局变量保留了 workInProgress 中需要工作的 FiberNode。用它表明是否完成工作。  
使用`renderRoot()`从`HostRoot`FiberNode 开始工作（这是 render 阶段）。  
使用`createWorkInProgress()`创建一个该 FiberNode 的替补节点。更新操作都在这个替补节点上工作。

### [The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)

# 参考文档

- [youtobe philip fabinek react](https://www.youtube.com/watch?v=7YhdqIR2Yzo&t=422s)
- [https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)
- [https://indepth.dev/posts/1009/in-depth-explanation-of-state-and-props-update-in-react](https://indepth.dev/posts/1009/in-depth-explanation-of-state-and-props-update-in-react)
- [https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)
- []()
- []()
- []()

# 开拓

## babel 开创了前端中把一种功能换一种写法的思想。如:

```
<span id="#id">string</span>
=>
React.createElement('span', {id: '#id'}, string)
```

## 使用配置文件控制是否使用新代码。同时保持了新代码与老代码在项目中。优点是迭代平滑。
