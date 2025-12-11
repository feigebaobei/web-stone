# alilc-渲染原理简介

渲染侧使用 reactRenderer 渲染
搭建侧使用 simulatorRenderer 渲染
renderer-core 中有 6 个类组件

```
@alilc/lowcode-react-renderer ------> @alilc/lowcode-renderer-core
        ^
        |-- @alilc/lowcode-react-simulator-renderer
```

reactRenderer 用于渲染的包
import { adapter, rendererFactor } from '@alilc/lowcode-renderer-core'
返回 factory,该工厂函数返回一个 class 组件，继承自 rendererFactory。
用于舞台区、渲染侧渲染。
lowcode-react-simulator-renderer
该包的使用方法很奇怪，在其他包中为 window 挂载对象。如：host。然后在<root>/src/host.ts 中使用 window.LCSimulatorHost 取得。esm/cjs 随便选，偏偏用在 windows 上设置属性去实现。
模拟器渲染，渲染区域中挂载路由组件，根据 path 渲染对象 component,基于 react-renderer 包。
lowcode-renderer-core
baseRendererFactor
addonRendererFactor
pageRendererFactor
comonentRendererFactor
blockRendererFactor
tempRendererFactor
rendererFactor
整体调用流程 1. 在 react-simulator-renderer/src/index.ts 中设置 window.simulatorRenderer. 2. 在 designer/src/builtin-simulator/create-simulator.ts 中使用 no.1 3. 在 designer/src/builtin-simulator/host.ts 中使用 no.2 4. 在 designer/src/builtin-simulator/host-view.ts 中使用 no.3。这个文件用于渲染舞台区。
