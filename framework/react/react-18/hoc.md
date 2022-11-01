# hoc 高阶组件

- 组件：把 props => ui
- hoc：把组件 => 另一个组件
- 将组件包装在容器内，组成新组件。
- 是纯函数，无副作用。
- 不应用修改传入的组件，而是修改组合方式。
- 与容器组件相似
- 在组件树中横截面操作
  - 属性代理 (修改 props。如：增删改 hoc
- 不要在 render 中使用 hoc
- 解决“横切关注点”问题

## hoc & ref

```js
function wrap(Comp) {
  class Inner extends React.Component {
    render() {
      let { forwardRef, ...rest } = this.props
      return <Comp ref={this.props.forwardRef} {...rest}></Comp>
    }
  }
  return React.forwardRef((props, ref) => {
    return <Inner {...props} forwardRef={ref} />
  })
}
```

## 反向继承

这种写法有点像装饰器。

```js
function wrap(Comp) {
  return class extends Comp {
    // 还可以调用生命周期方法
    // componentDidMount() {
    //     super.componentDidMount()
    // }
    render() {
      return (
        <>
          {super.render()}
          <button onClick={supper.buttonClickHandler.bind(this)}>button</button>
        </>
      )
    }
  }
}
```

## hoc & funtion

```js

```

## hoc & 错误边界

```js
// 待测试
export default function (Comp) {
  return class extends React.Component {
    constructor() {
      super()
    }
    static getDerivedStateFromError(error) {
      //
    }
    componentDidCatch(error, errorInfo) {
      //
    }
    render() {
      return <Comp {...this.props}>{this.props.children}</Comp>
    }
  }
}
```

## hoc & 操作数据的方法

```js
// 定义
function HOC(WC, sf) {
    return function (props) {
        let [d, setD] = setState(sf(props))
        let f = (o) => {
            setD(sf({...props, ...o}))
        }
        return <WC d={d} onEvent={f} />
    }
}
// 使用
let C = function (props) {...}
let A = HOC(C, () => {...})
let B = HOC(C, () => {...})
<A />
<B />
```
