# 运行原理

```js
import ReactDOM from 'react-dom';
ReactDOM.reader(                    // 把指定的h1元素渲染到#root dom中。
    <h1>hi boy!</h1>,
    $('#root')
)
```
可渲染一个h1标签，也可以渲染一个自定义组件`<App>`。

## `reader`的工作逻辑。
```js

function render(
  element: React$Element<any>,
  container: Container,
  callback: ?Function,
) {
    // ...
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}


function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback: ?Function,
) {
    let fiberRoot: FiberRoot;
    // ...
    return getPublicRootInstance(fiberRoot);
}
```
react-consiler 正如其名，react的调解人。
这个包中使用了fiber去调解工作的。
fiber翻译是“纤维”。it世界中有进程、线程。react的团队搞出了纤维。控制粒度越来越细了。上层语言控制太细不是什么好事。
react居然的js的世界中使用同步渲染。细想一下，原来是为了控制dom元素。浏览器也是这么做的。js语言中大多是异步的。


## jsx
jsx是经过babel处理为`createElement`才能正常运行的。
createElement方法

```js
//demo
let str = 'string'
<span>{str}</span>
=>
let str = 'string'
React.createElement('span', {}, str)
```

## createElement
createElement在dev环境中使用`createElementWithValidation`，在生产环境中使用`createElementProd`
react包中有在方法中判断是否是开发环境的。有分别写开发、生产环境的方法，再根据环境分别使用的。
检查了参数后返回了一个element对象。

### createElementWithValidation方法
```
function createElementWithValidation (type, props, children) {
    const element = createElement.apply(this, arguments);
        hasValidRef(config) // 判断props是否正确
        warnIfStringRefCannotBeAutoConverted(config) // 判断props是否可以转化
        hasValidKey(config) // 判断props中是否不存在key
        checkKeyStringCoercion(...) // 判断是否可以强制转换为string
        // 还有别的检测
        return ReactElement(...) // 创建并返回element
                  return element
    return element
}
```
返回一个element对象
#### element对象
```
{
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
    ...
}
```
### createElementProd方法
同`createElementWithValidation方法`
2个方法都相同了还写2个方法有意义么？

## Component
```
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {}
Component.prototype.setState = {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
}

Component.prototype.forceUpdate = {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
}
```
## PureComponent
与`Component`一样。
react又搞了一对一样的。为什么不删除一个？

## Children
操作children的方法
```
{
  map,
  forEach,
  count,
  toArray,
  only,
};
```

## cloneElement
开发环境调用`cloneElementWithValidation`，生产环境调用`cloneElementProd`。

### cloneElementWithValidation
```
return newElement = cloneElement.apply(this, arguments);
                        return ReactElement(element.type, key, ref, self, source, owner, props);
```
### cloneElementProd
与`cloneElementWithValidation`相同

## createContext

```
export function createContext {
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };
  ...
  context.Consumer = context;
  return context;
};

context:
{
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: (null: any),
    Consumer: (null: any),
};
```

## createFactory
开发环境createFactoryWithValidation 生产环境createFactoryProd;  
createFactory 与 createElement 相同。
### createFactoryWithValidation
```
return validatedFactory = createElementWithValidation.bind(null, type);
```

## createMutableSource
```
export function createMutableSource {
  return mutableSource = {
    _getVersion: getVersion,
    _source: source,
    _workInProgressVersionPrimary: null,
    _workInProgressVersionSecondary: null,
  }
}
```

## createRef
export function createRef() {
  return refObject = {
    current: null,
  };
}

## forwardRef
```
function forwardRef () {
  ...
  return elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  }
}
```

## lacy
```
function lazy () {
  return lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: payload,
    _init: lazyInitializer,
  }
}
function lazyInitializer () {
    if (payload._status === Uninitialized) {
        const thenable = payload._result();
        thenable.then(..., ...)
    }
    if (payload._status === Resolved) {
        return payload._result.default;
    } else  {
        throw payload._result;
    }
}
```

## memo
```
function memo (type, compare) {
    return elementType = {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: compare === undefined ? null : compare,
    };
}
```

## startTransition
```
function startTransition(scope) {
    const prevTransition = ReactCurrentBatchConfig.transition;
    ReactCurrentBatchConfig.transition = {};
    const currentTransition = ReactCurrentBatchConfig.transition;

    try {
        scope();
    } finally {
        ReactCurrentBatchConfig.transition = prevTransition;
    }
}
```

## cloneElementProd 0xeacb
## Profiler 0xead2
## StrictMode 0xeacc
## Suspense 0xead1
## SuspenseList 0xead8
## Profiler 0xead2
## Profiler 0xead2
## Profiler 0xead2
## Profiler 0xead2
## Profiler 0xead2
## Profiler 0xead2
## Profiler 0xead2
## Profiler 0xead2

## 方法组件与class组件

## useState
```
function useState<S>(
    initialState: (() => S) | S,
) {
    const dispatcher = resolveDispatcher();
                            return dispatcher = ReactCurrentDispatcher.current;
                                                    {current}
    return dispatcher.useState(initialState);
}
```
不知道`dispatcher`对象从哪来的。  
好像是在fiber中赋值的dispatcher。  

### dispatcher
是`react-reconciler`包中的对象。


## useState
## useState
## useState
## useState

## hooks怎么运行
只能在function组件内的顶级中使用。


