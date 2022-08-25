1. 同步更新组件。因更新过程中无i/o操作。
2. fiber：把任务分为小片。
3. 进程process, 线程thread, 纤维fiber:更加紧密的处理机制。
4. 执行过程：
```
1. reconciliation phase 可被打断
    componentWillMount          一般不应该被执行多次
    componentWillReceiveProps
    shouldComponentUpdate
    componentWillUpdate         一般不应该被执行多次

2. commit phase 不可被打断
    componentDidMount
    componentDidUpdate
    componentWillUnmount
```

## 源码分析
createElement
    |--createElementWithValidation
        |--createElement
            |--ReactElement

ReactElementr返回一个对象
```js
const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
};
```

Component.prototype = {
    isReactComponent
    setState
    forceUpdate
}
PureComponent.prototype = {
    isReactComponent
    setState
    forceUpdate
    isPureReactComponent
}

```
<!-- 使用context设置cb方法的this -->
function f0 (p, cb, context) {
    ...
    cb.call(context, ...rest)
}
```

多次出现一个方法返回一个对象。它使用了工厂模式。每调用一次该方法返回一个对象。

怎么设置`__DEV__`的？

在dev环境时为原型对象添加指定属性。
我没找到可以修改类的原型对象上的属性的办法。由此可见：操作构造函数及原型对象更方便。

react把每个功能都放在每一个文件中。单独去读每个文件的源码时发现不困难。

babel开创了前端中把一种功能由一种写法的思想。如:
```
<span id="#id">string</span>
=>
React.createElement('span', {id: '#id'}, string)
```

使用配置文件控制是否使用新代码。同时保持了新代码与老代码在项目中。优点是迭代平滑。