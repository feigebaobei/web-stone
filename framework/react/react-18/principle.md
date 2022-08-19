# 介绍各方法的运行逻辑
## Children

## Component
虽然react包中是这样定义的，但是在实际运行中`setState`被react-dom中的方法重新赋值了。
原来这里只是设置了一个默认值。  
```js
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
}
Component.prototype.forceUpdate = function (callback) { // 我认为不应该开放强制执行的方法
// 通常组件的更新是 state 或者 props 改变造成的，有时候数据没有改变，可以调用 forceUpdate() 强制让组件重新渲染。
// 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。
// 但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。
// 通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。
// 可在方法组件中使用。函数组件不包括 forceUpdate() 方法。
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
}

var ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false;
  },
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },
  enqueueSetState: function (publicInstance, partialState, callback, callerName) { // 后三个参数
    warnNoop(publicInstance, 'setState');
  }
};
function warnNoop(publicInstance, callerName) {
  var _constructor = publicInstance.constructor; // 发现总是 FiberNode
  var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
  var warningKey = componentName + "." + callerName;
  if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
    return;
  }
  error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
  didWarnStateUpdateForUnmountedComponent[warningKey] = true;
}
```

## Fragment

## Profiler

## PureComponent

## StrictMode

## Suspense

## __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

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
应该在react-dom中被重新赋值了。  
```js
var ReactCurrentDispatcher = {
  current: null
};
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  return dispatcher;
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

```

## useSyncExternalStore
会用，不知道原理。

## useTransition

## version

# 各对象
## ReactElement
这是react包中生成的对象。  
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
- 渲染阶段 调用render()，再与上次渲染结果比对。尽量不要在此阶段编写副作用代码。
  - constructor
  - componentWillMount
  - componentWillReceiveProps
  - componentWillUpdate
  - getDerivedStateFromProps
  - shouldComponentUpdate
  - render
  - setState
- 提交阶段 react应用变化时（增、删、改dom元素）。
  - 此阶段会调用componentDidMount
  - componentDidUpdate.


# uml
react/react-dom耦合地很严重，不好。

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
