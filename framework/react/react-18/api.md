# api

## react api

```js
exports.Children
    可以用于处理this.props.children
    x.map()
    x.forEach()
    x.count()     // 子元素的数量
    x.only()      // 是否只有一个子元素
    x.toArray()   //
exports.Component
    常用于创建class组件
exports.Fragment
    这是一个内置组件。用于把多个子组件放在一起。
    简写 <></>
exports.Profiler

exports.PureComponent
    常用于创建class组件。较于Component多了shouldComponentUpdate()
exports.StrictMode
exports.Suspense
    这是一个内置组件。指定懒加载组件不具备渲染条件时（使用fallback属性指定）显示的内容。
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED= ReactSharedInternals;
exports.cloneElement(element, config?, children?)
    用于复制ReactElement
exports.createContext(defaultValue)
    创建一个Context对象。
    只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
exports.createElement(type, props?, children?)
    返回ReactElement元素
    约等于 <element.type {...element.props} {...props}>{children}</element.type>
exports.createFactory 已废弃
exports.createRef
    返回一个ref
exports.forwardRef((props, ref) => {
    <dom ref={ref}>...</dom>
})
    让方法式组件也支持ref属性。把ref透传下去
exports.isValidElement(obj)
    验证对象是否为ReactElement对象
exports.lazy(() => {return Promise})
    参数是一个方法，该方法返回一个Promise，该promise返回一个组件。
    用于动态加载组件。可缩减bundle的体积。
    需要与React.Suspense结合使用
exports.memo(Comp, manualEqual)
    是高阶组件
    当props、useState/useReducer/useContext改变时重新渲染组件
    comp 是组件
    manualEqual(prevPreps, nextProps) 用于比较二者。若返回true则不渲染。
    用性能优化，不能用于阻止渲染。
    shouldComponentUpdate 用于阻止渲染
exports.startTransition(fn)
    明确指定降低ui更新优先级的更新。
exports.unstable_act
exports.useCallback
exports.useContext
exports.useDebugValue
exports.useDeferredValue
exports.useEffect
exports.useId
exports.useImperativeHandle
exports.useInsertionEffect
exports.useLayoutEffect
exports.useMemo
exports.useReducer
exports.useRef
    （方法组件上不能使用ref属性）
exports.useState
exports.useSyncExternalStoreuseSyncExternalStore;
exports.useTransition
exports.version
```

## component api

```js
component.setState(cb)
component.forceUpdate(cb)
    class组件中可使用此方法触发强制刷新，并调用cb
```

## reactdom api

```js
createPortal(child, container)
    把child渲染到container
flushSync(cb)
    同步调用cb
createRoot(element, container, cb?)
hydrate(element, container, cb?)
createRoot()
createRoot()
createRoot()
createRoot()
createRoot()
createRoot()
createRoot()

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
