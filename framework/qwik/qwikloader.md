# qwikloader

- 侦听器核心逻辑
- 其他属性用于反序列化
  - 渲染组件树
  - 处理状态

## 原理

使用事件委托来侦听所有事件，当点击时获取当前 dom 上的属性，经过规则解析后 import 加载进来

在 html 中使用 prefetch 实现预加载。尽量不影响主程序的加载。

1. 获取 html 中的 qwik/json
2. 通过解析 json 创建 state
3. 获取 container 中的 state
4. 创建反序列化 Dom 属性工具函数
5. 启动代理 proxy,实现 get/set 的发布订阅。
6. 重建 state
7. 触发 set 。触发 render

## title

## title

## title

## title
