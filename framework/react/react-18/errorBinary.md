https://zh-hans.reactjs.org/docs/error-boundaries.html

`static getDerivedStateFromError(error)` // 有错误时触发，用于渲染降级 ui  
`componentDidCatch(error, errorInfo)` // 捕获错误  
自定义错误边界的粒度。  
若不捕获错误，则会导致整个 react 树被卸载。请根据页面区域划分捕获错误。阻止全页面空白。  
errorInfo 组件栈  
error 抛出的错误

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
