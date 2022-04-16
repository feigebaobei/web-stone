# 介绍各方法的运行逻辑
## Children

## Component
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
Component.prototype.forceUpdate = function (callback) { // 我认识不应该开放强制执行的方法
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

## useSyncExternalStore

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

# uml

## title
