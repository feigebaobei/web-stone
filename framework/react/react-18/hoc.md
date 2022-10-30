# hoc 高阶组件

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
