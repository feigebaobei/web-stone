# 前端优化

**千万不要过度优化**

## 文件结构

样式放在 head 中。  
脚本放在 body 结束前。  
css 中使用 Sprite 图。

## [高性能网站建设（十几年前的书了）](/books/highPerformanceWeb.html)

## 使用生产版本的脚本

## 访问打包后的文件

## 打包是压缩

## 使用虚拟化长列表`react-window` `react-virtualized`。

## 使用 canvas 绘制 （ant-v 就是使用 canvas 做的表格）

## 按需加载

# 优化 react 应用

- 分块
  - 代码分割 & tree shake 使用 import 可实现
- 懒加载、懒方法
  - 懒加载不是立即需要的组件
- 阻止不必要的渲染
  - 纯组件
  - shouldComponentUpdate()
- 使用缓存
  - useCallback(fn, deps)
  - useMemo(fn, deps)
  - React.memo(fn, deps)
  - 避免使用内建对象
  - 避免使用匿名函数

## 代码分割 & tree shake

使用`import`处理各子包

## 懒加载不是立即需要的组件

```js
let C = React.lazy(() => import('./file.js'))
export default class B extends React.Componen {
    render() {
        return (<React.Suspense fallback="loading..."><C/></React.Susponse>)
    }
}
```

使用自定义的懒加载方法

```js
import React from 'react'
let asyncComp = (importComp) => {
  return class extends React.Component {
    constructor() {
      this.state = {
        comp: null,
      }
    }
    componentDidMount() {
      importComp().then((res) => {
        this.setState({ comp: res.default })
      })
    }
    render() {
      let C = this.state.comp
      return C ? <C {...this.props} /> : null
    }
  }
}
export default asyncComp

import asyncComp from './asyncComp'
let A = asyncComp(() => import('./file'))
```

## 纯组件 & shouldComponentUpdate() 阻止不必要渲染

```js
class B extends React.PureComponent {
  render() {
    return jsx
  }
}
```

## useCallback(fn, deps)

## useMemo(fn, deps) 缓存大量计算

## React.memo((props) => {return jsx}) 缓存组件

## 避免直接内建对象

```js
function C(props) {
  let aProps = { k: 'v' }
  return <A {...aProps} />
}
```

## 避免使用匿名函数

# 优化 vue 项目

## title

## title

## title

## title

# 优化

- 同步 =》 异步
- worker(类似多线程)
- 使用优秀的数据结构
- 使用巧妙的算法
- 整理数据，减少脏数据

# 打包

|              |                                                   |          |
| ------------ | ------------------------------------------------- | -------- |
| babel-loader | cache: true                                       | 使用缓存 |
|              | happypack / thread-loader / terser-webpack-plugin | 利用多核 |
|              | dllPlugin                                         |          |
|              | tree-shaking                                      |          |
|              | external                                          |          |
|              | noParse                                           |          |

## title

## title

## title

# 测试性能

- `<Profiler/>`
