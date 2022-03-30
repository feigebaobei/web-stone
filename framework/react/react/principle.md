# 运行原理

```js
import ReactDOM from 'react-dom';
ReactDOM.reader(                    // 把指定的h1元素渲染到#root dom中。
    <h1>hi boy!</h1>,
    $('#root')
)
```
可渲染一个h1标签，也可以渲染一个自定义组件`<App>`。

## [`reader`的工作逻辑](/framework/react/react-dom/principle.html)。

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
是react应用中最小的构建块。  
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
||方法组件|class组件|
|-|-|-|
||-|基于react.component方法|
|||原型链中有`isReactComponet / setState / forceUpdate`方法。所以在class组件中可以使用`setState`等。|
||返回element对象|返回element对象|
||使用useState等方法设置更新|使用setStatet设置更新|
|二者在此就已经分开了|调用createElement方法|Component是一个构造函数。|
||方法返回jsx，即createElement方法返回的element对象。|基于React.Component构造方法，调用其内部的render方法。|
||没有state|有state|
||没有生命周期|有生命周期|
||||
||||
||||
||||
||||

官方说方法组件会认

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

## 为什么官网说react element被创建后不能再变动
createElements方法中对element对象执行了
```
Object.freeze(element.props) // 可解释为什么props是只读的。
Object.freeze(element)
```
感觉作者好大胆。活的不好吗？非要搞成死的。
死的有什么好处呀？可保证element不被修改……。react根本就不用享元模式。也就不用搞成活的。

## 如何执行diff的？
## 为什么class组件使用render()返回东西？

## setState如何工作？
Component构造函数的原型对象上有setState方法。
```

Component.prototype.setState = function(partialState, callback) {
  ...
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```
其中updater是从参数中来的。参数中若无，则使用默认值ReactNoopUpdateQueue。ReactNoopUpdateQueue是中的方法只在开发环境中运行。
我搞不懂平时使用React.Component方法时一般不传递updater的，那么怎么执行setState方法中的updater方法。updater方法在哪儿传入的？

## 事件是如何运行的？
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 三种模式
|legacy|blocking|concurrent||
|-|-|-|-|
|这是当前 React app 使用的方式。当前没有计划删除本模式，但是这个模式可能不支持这些新功能。|目前正在实验中。作为迁移到 concurrent 模式的第一个步骤。|目前在实验中，未来稳定之后，打算作为 React 的默认开发模式。这个模式开启了所有的新功能。||

## fiber的运行逻辑
fiber使用双缓存机制，浏览器在处理canvas时也使用双缓存机制。

## title
## title
## title
## title
## 读源码的方法
记清变量名、方法名、属性名等。
理清方法间调用栈。

## title
