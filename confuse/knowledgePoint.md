vue 原理
react 原理
组件间传递数据
树的结构
开发组件库时如何处理易用性、可扩展性、性能？

> 1. 易用性
>    设置 props 的默认值，减小配置量。允许用户修改。支持多种 props.
>    事件名、props 命名、样式规则统一。
>    不做特殊处理，如：样式穿透等
> 2. 性能
>    按需加载、懒渲染
>    减小渲染层数
>    事件节流、防抖
>    减小不必要的渲染。v-once、静态元素、computed、useMemo、useCallback
>    支持 tree-shaking
>    谨慎使用 css-in-js
> 3. 可扩展性
>    支持 slots/config
>    主题系统
>    开放钩子
>    允许操作底层
>    重绘、回流。  
>    proxy
>    js

    proxy

ts

# js [操作 dom](/language/javascript/opDom.html)

反转单向链表
[设计模式](/engineered/design-pattern.html)
响应式 /Users/cat/Documents/code/personal/web-stone/language/javascript/proxyReflect.md

xhr
正则
位运算
设计原理
worker
正向代理、反向代理。
web component
message 通信
协议
做组件库时如何做到关注点分离、易用性、功能边界、功能、性能。
开发中遇到异步情况。实例
[性能](/confuse/performance.html)
算法
如何高效使用 ai 工具
虚拟滚动
节流、防抖
