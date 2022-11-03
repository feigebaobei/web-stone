# 介绍各方法的运行逻辑

## Children

## Component

虽然 react 包中是这样定义的，但是在实际运行中`setState`被 react-dom 中的方法重新赋值了。
原来这里只是设置了一个默认值。

```js
function Component(props, context, updater) {
  this.props = props
  this.context = context
  this.refs = emptyObject
  this.updater = updater || ReactNoopUpdateQueue
}
Component.prototype.isReactComponent = {}
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState')
}
Component.prototype.forceUpdate = function (callback) {
  // 我认为不应该开放强制执行的方法
  // 通常组件的更新是 state 或者 props 改变造成的，有时候数据没有改变，可以调用 forceUpdate() 强制让组件重新渲染。
  // 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。
  // 但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。
  // 通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。
  // 可在方法组件中使用。函数组件不包括 forceUpdate() 方法。
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
}

var ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false
  },
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate')
  },
  enqueueReplaceState: function (
    publicInstance,
    completeState,
    callback,
    callerName
  ) {
    warnNoop(publicInstance, 'replaceState')
  },
  enqueueSetState: function (
    publicInstance,
    partialState,
    callback,
    callerName
  ) {
    // 后三个参数
    warnNoop(publicInstance, 'setState')
  },
}
function warnNoop(publicInstance, callerName) {
  var _constructor = publicInstance.constructor // 发现总是 FiberNode
  var componentName =
    (_constructor && (_constructor.displayName || _constructor.name)) ||
    'ReactClass'
  var warningKey = componentName + '.' + callerName
  if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
    return
  }
  error(
    "Can't call %s on a component that is not yet mounted. " +
      'This is a no-op, but it might indicate a bug in your application. ' +
      'Instead, assign to `this.state` directly or define a `state = {};` ' +
      'class property with the desired state in the %s component.',
    callerName,
    componentName
  )
  didWarnStateUpdateForUnmountedComponent[warningKey] = true
}
```

## Fragment

## Profiler

## PureComponent

## StrictMode

## Suspense

## \_\_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

## cloneElement

## createContext

## createElement

```js
function createElementWithValidation (type, props, children) {
  // 验证参数
  var element = createElement.apply(this, arguments);
    function createElement(type, config, children) {
      // 设置初始值
      // 验证
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        function ReactElement (type, key, ref, self, source, owner, props) { // 这是工厂模式的函数
          let element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            ref: ref,
            props: props,
            _owner: owner,
            ...
          };
          Object.freeze(element.props); // 因为冻结了，所以不能改props
          Object.freeze(element);
          return element
        }
    }
  // 验证
  return element
}
```

## createFactory

## createRef

## forwardRef

## isValidElement

## lazy

## memo

## startTransition

## unstable_act

## useCallback

## useContext

## useDebugValue

## useDeferredValue

## useEffect

## useId

## useImperativeHandle

## useInsertionEffect

## useLayoutEffect

## useMemo

## useReducer

## useRef

## useState

应该在 react-dom 中被重新赋值了。

```js
var ReactCurrentDispatcher = {
  current: null,
}
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current
  return dispatcher
}
function useState(initialState) {
  var dispatcher = resolveDispatcher()
  return dispatcher.useState(initialState)
}
```

## useSyncExternalStore

会用，不知道原理。

## useTransition

## version

# 各对象

## ReactElement

这是 react 包中生成的对象。

```js
{
  "$$typeof": Symbol(react.element)
  "type": "h1", // html标签 | 构造函数
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
```

## 渲染过程

- 渲染阶段 调用 render()，再与上次渲染结果比对。尽量不要在此阶段编写副作用代码。
  - constructor
  - componentWillMount
  - componentWillReceiveProps
  - componentWillUpdate
  - getDerivedStateFromProps
  - shouldComponentUpdate
  - render
  - setState
- 提交阶段 react 应用变化时（增、删、改 dom 元素）。
  - 此阶段会调用 componentDidMount
  - componentDidUpdate.

# uml

react/react-dom 耦合地很严重，不好。

## 强制更新

```js
// 类组件
someMethod() {
   // Force a render with a simulated state change
   setUser({ ...user });
}
// 方法组件
const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
```

## title

在 react/share 中定义共享的变量、工具方法。  
即使是生产包中也包含了 dev 环境的判断

```js
share: {
  isValidElementType() 判断组件的type是否合法
}
ReactSymbols
  使用Symbol.for('str')定义用于全局范围的变量
ReactElement
  isValidElement 是否是合法ReactElement对象
  createElement
  ReactElement   本包中的核心方法。很多方法使用它。
    返回 {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key,
      ref: ref,
      props: props,
      _owner: owner, // fiber | null
      _store: {
        validated
      }
      _self
      _source
    }
  hasValidRef  ref是否合法
recenciler
  export type Fiber = {
    // These first fields are conceptually members of an Instance. This used to
    // be split into a separate type and intersected with the other Fiber fields,
    // but until Flow fixes its intersection bugs, we've merged them into a
    // single type.

    // An Instance is shared between all versions of a component. We can easily
    // break this out into a separate object to avoid copying so much to the
    // alternate versions of the tree. We put this on a single object for now to
    // minimize the number of objects created during the initial render.

    // Tag identifying the type of fiber.
    tag: WorkTag,

    // Unique identifier of this child.
    key: null | string,

    // The value of element.type which is used to preserve the identity during
    // reconciliation of this child.
    elementType: any,

    // The resolved function/class/ associated with this fiber.
    type: any,

    // The local state associated with this fiber.
    stateNode: any,

    // Conceptual aliases
    // parent : Instance -> return The parent happens to be the same as the
    // return fiber since we've merged the fiber and instance.

    // Remaining fields belong to Fiber

    // The Fiber to return to after finishing processing this one.
    // This is effectively the parent, but there can be multiple parents (two)
    // so this is only the parent of the thing we're currently processing.
    // It is conceptually the same as the return address of a stack frame.
    return: Fiber | null,

    // Singly Linked List Tree Structure.
    child: Fiber | null,
    sibling: Fiber | null,
    index: number,

    // The ref last used to attach this node.
    // I'll avoid adding an owner field for prod and model that as functions.
    ref:
      | null
      | (((handle: mixed) => void) & {_stringRef: ?string, ...})
      | RefObject,

    // Input is the data coming into process this fiber. Arguments. Props.
    pendingProps: any, // This type will be more specific once we overload the tag.
    memoizedProps: any, // The props used to create the output.

    // A queue of state updates and callbacks.
    updateQueue: mixed,

    // The state used to create the output
    memoizedState: any,

    // Dependencies (contexts, events) for this fiber, if it has any
    dependencies: Dependencies | null,

    // Bitfield that describes properties about the fiber and its subtree. E.g.
    // the ConcurrentMode flag indicates whether the subtree should be async-by-
    // default. When a fiber is created, it inherits the mode of its
    // parent. Additional flags can be set at creation time, but after that the
    // value should remain unchanged throughout the fiber's lifetime, particularly
    // before its child fibers are created.
    mode: TypeOfMode,

    // Effect
    flags: Flags,
    subtreeFlags: Flags,
    deletions: Array<Fiber> | null,

    // Singly linked list fast path to the next fiber with side-effects.
    nextEffect: Fiber | null,

    // The first and last fiber with side-effect within this subtree. This allows
    // us to reuse a slice of the linked list when we reuse the work done within
    // this fiber.
    firstEffect: Fiber | null,
    lastEffect: Fiber | null,

    lanes: Lanes,
    childLanes: Lanes,

    // This is a pooled version of a Fiber. Every fiber that gets updated will
    // eventually have a pair. There are cases when we can clean up pairs to save
    // memory if we need to.
    alternate: Fiber | null,

    // Time spent rendering this Fiber and its descendants for the current update.
    // This tells us how well the tree makes use of sCU for memoization.
    // It is reset to 0 each time we render and only updated when we don't bailout.
    // This field is only set when the enableProfilerTimer flag is enabled.
    actualDuration?: number,

    // If the Fiber is currently active in the "render" phase,
    // This marks the time at which the work began.
    // This field is only set when the enableProfilerTimer flag is enabled.
    actualStartTime?: number,

    // Duration of the most recent render time for this Fiber.
    // This value is not updated when we bailout for memoization purposes.
    // This field is only set when the enableProfilerTimer flag is enabled.
    selfBaseDuration?: number,

    // Sum of base times for all descendants of this Fiber.
    // This value bubbles up during the "complete" phase.
    // This field is only set when the enableProfilerTimer flag is enabled.
    treeBaseDuration?: number,

    // Conceptual aliases
    // workInProgress : Fiber ->  alternate The alternate used for reuse happens
    // to be the same as work in progress.
    // __DEV__ only

    _debugSource?: Source | null,
    _debugOwner?: Fiber | null,
    _debugIsCurrentlyTiming?: boolean,
    _debugNeedsRemount?: boolean,

    // Used to verify that the order of hooks does not change between renders.
    _debugHookTypes?: Array<HookType> | null,
  };
使用isReactWarning标记是否是react认为警告。

FiberRootNode 返回一个FiberRoot对象
FiberRoot: {
  tag = tag;
  containerInfo = containerInfo;
  pendingChildren = null;
  current = null; // 未来会被赋值 Fiber 对象
  pingCache = null;
  finishedWork = null;
  timeoutHandle = noTimeout;
  context = null;
  pendingContext = null;
  callbackNode = null;
  callbackPriority = NoLane;
  eventTimes = createLaneMap(NoLanes);
  expirationTimes = createLaneMap(NoTimestamp);
  pendingLanes = NoLanes;
  suspendedLanes = NoLanes;
  pingedLanes = NoLanes;
  expiredLanes = NoLanes;
  mutableReadLanes = NoLanes;
  finishedLanes = NoLanes;
  errorRecoveryDisabledLanes = NoLanes;
  entangledLanes = NoLanes;
  entanglements = createLaneMap(NoLanes);
  hiddenUpdates = createLaneMap(null);
  identifierPrefix = identifierPrefix;
  onRecoverableError = onRecoverableError;
  ...
}
createFiber 调用FiberNode方法并返回Fiber对象
Fiber: {
  // Instance
  tag = tag;
  key = key;
  elementType = null;
  type = null;
  stateNode = null;
  // Fiber
  return = null;
  child = null;
  sibling = null;
  index = 0;
  ref = null;
  pendingProps = pendingProps;
  memoizedProps = null;
  updateQueue = null;  // 更新队列
  memoizedState = null;
  dependencies = null;
  mode = mode;
  // Effects
  flags = NoFlags;
  subtreeFlags = NoFlags;
  deletions = null;
  lanes = NoLanes;
  childLanes = NoLanes;
  alternate = null;
  ...
}
createRoot(container, options?) {
  return createRootImpl(container, options);
            if (!isValidContainer(container)) {
              <!-- error -->
            }
            warnIfReactDOMContainerInDEV(container);
            const root = createContainer(
              container,
              ConcurrentRoot,
              null,
              isStrictMode,
              concurrentUpdatesByDefaultOverride,
              identifierPrefix,
              onRecoverableError,
              transitionCallbacks,
            );
                          return createFiberRoot(
                            containerInfo,
                            tag,
                            hydrate,
                            initialChildren,
                            hydrationCallbacks,
                            isStrictMode,
                            concurrentUpdatesByDefaultOverride,
                            identifierPrefix,
                            onRecoverableError,
                            transitionCallbacks,
                          );
                                    const root: FiberRoot = (new FiberRootNode(
                                      containerInfo,
                                      tag,
                                      hydrate,
                                      identifierPrefix,
                                      onRecoverableError,
                                    ): any);
                                    const uninitializedFiber = createHostRootFiber(
                                      tag,
                                      isStrictMode,
                                      concurrentUpdatesByDefaultOverride,
                                    );
                                    root.current = uninitializedFiber;
                                    uninitializedFiber.stateNode = root;
                                    initializeUpdateQueue(uninitializedFiber); // init 更新队列
                                    return root;


            listenToAllSupportedEvents(rootContainerElement); // 监听事件
            return new ReactDOMRoot(root);
                          ReactDOMRoot.prototype.render(children)
                            updateContainer(children, root, null, null);
                          ReactDOMRoot.prototype.unmount()
                            flushSync(() => {
                              updateContainer(null, root, null, null);
                            });
                            unmarkContainerAsRoot(container);
}





```
