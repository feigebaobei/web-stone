# 学到的东西

与队友合作。

# 被离职原因

没有做太多老大的工作。
我平时做业务团队的工作比较多，做老大的工作比较少。在裁员是从最不重要的开始裁。

# done

2025.11.26
装饰器
proxy
reflect
策略模式
abc

2025.11.27
依赖注入
切面编程.就是使用装饰器

2025.12.01
rx 源码
observable 能不能支持多个订阅者
可以有多个订阅者
subject 能不能多发多收
能
缺点 ### 适用范围
小范围使用，或把响应层做的很薄。
i++ ++i， 谁在前先算谁

2025.12.02
es6 解构
（[x]=[1]）
let {length} = 'str'
function ({x = 2, y = 1} = {}) {}
([x, y] = [y, x])
正则
写一个重试的方法
写一个记录 class 中方法执行的装饰器方法

2025.12.03
2025.12.04
for...of 作用于 iterator 对象
Array#at(n)
2025.12.05
整理《browser-use 解读》的笔记
写一个排序版本号的方法
写一个单例的装饰器 x
2025.12.06
在一推 promise 中最多同时运行 3 个
2025.12.07
写一个红绿灯的方法
2025.12.08
es6
修饰方法的四个方法
装饰器
代理
高阶方法
柯理化
cjs & esm
写一个 trace 装饰器
写一个单例装饰器
写一个可以取消的装饰器 x
console 的用法
2025.12.09
2025.12.10
为公司贡献的教程
angular-路由与导航
渲染原理简介
与 pw 结合的录制用户操作的浏览器扩展程序
ts-类型保护与高级类型
组件使用介绍（四）
ms-cli 对重复代码或相似代码的解决方案
webpack-原理浅析
分享《代码大全》
vite-plugin 应用篇
2025.12.11
贡献的方法、组件
uniqueReq
getType
separateClickAndDblclick
sleep
transformRegExp
整理昨天的分享
2025.12.12
export & import
symbol
ts
通读官网
处理类型的工具方法 及 增强的工具方法
修饰符
is
js 支持的数据类型 8 种
整理 promise
indexDB
2025.12.13
2025.12.14
写一个状态机方法
设计模式
反转单向链表
set & map 循环
操作 dom
2025.12.15
2025.12.16
IntersectionObserver
性能
内置组件 keepAlive transition transitionGroup teleport suspense
2025.12.17
dsa Big-O
vue3 读源码，怎么渲染的。
怎么渲染子元素的。
vue3 怎么缓存的
2025.12.18
vue2/vue3 的响应式原理不同
vue2 如何封装操作数据的方法的（push/pop/sort/reverse/....）
diff 运算
2025.12.19
自定义指令
组件之间传递数据 props emit provide+inject eventBus 状态管理 还有 vue3 的响应式
2025.12.20
2025.12.21
2025.12.22
css modules
学习 react@19
2025.12.23
react 组件在挂载时、改变 state 时、改变 props 时、改变订阅的 context 时、父组件渲染是渲染。
2025.12.24
"dependencies": {
"react": "^19.2.0",
"react-dom": "^19.2.0",
"react-router": "^7.11.0"
},
"react": "file:../third/react/package/react",
2025.12.25
昨天晚上在睡梦中悟得 jsx=》react.createElement 是在运行时完成的。vue 才是在编译时完成的。所有我需要在 fiberRoot.render()中找怎么转换的。
2025.12.26
位运算
MessageChannel
2025.12.27
hooks 逻辑
读 react@19 源码
vue/react/angular 的原理
https://zhuanlan.zhihu.com/p/18181370720
vue react angular
重打包 重运行时
react & vue 不同
react 来一遍
组件之间传递数据
策略模式
浏览器的 重绘、回流
浏览器的 performance 对象
lighthouse 直接看，没什么东西。
2025.12.28
虚拟列表原理
tcp 丢包
2025.12.29
虚拟列表原理
clientHeight & offsetHeight 等
2025.12.30
图片响应式
前端性能指标，如何提升。
skills
复习前端性能
2025.12.31
2026.01.01
worker 线程
事件总线
http 及其他通信协议
cors
2026.01.02
postMessage 之间的区别
2026.01.03
sse
signal
2026.01.04
WebSocket
加密 签名
自定义标签
shadowDOM template slot
html
自定义事件 customEvent
前端性能指标，如何提升。
2026.01.05
复习 react / vue 原理
复习 postmessage
2026.01.06
常用算法
深度优先、广度优先、最近最少使用家族。
排序
lru lfu 的区别在于是否统计访问次数
2026.01.07
symbol
Symbol(xxx)
Symbol.for(xxx)
Symbol.keyFor(xxx)
set / map 遍历方法
设计模式 桥接模式
2026.01.08
string/ array/ number/ object/ date/常用方法、属性
ts never 类型
fifo/lru/lfu
2026.01.09
在马上消费做过哪些项目

# todo

正则
自定义标签
管理状态 pinia 等
前端工程化
现在的前端发展趋势
babel
ai 组件库
css 和 预处理器
打包工具。总结打包工具。 vite / parsel / rsbuild 等
错误级别
其他编程范式
多租户是什么意思
在项目中做了哪些“解决方案”级别的贡献
ors 全项目使用统一的搜索组件。从杂乱的代码收拾出来。
webui
dom 的事件
如何完成设计工作的
定义类型
定义模块
模块之间协同工作
定义数据结构
有产出就能发展好，即使在组织调整中也会成为领导。
对方工公司是做什么的？团队是做什么的？需要招什么样的人加入？
hippy 和竞品
uni-app weex rn
这些跨端开发框架都是减少各端差异，但是不能全部解决这些差异。开发者仍需要关注各端差异。
动画框架 lottie
ddd & xxx
浏览器及其原理
查看岗位描述
主动解决了什么问题。有什么效果。在工作中遇到过什么事情。可以做什么优化。
从 0 开始创建 webui 项目
专业特长。列出专业贡献。
微卡片
低代码
专利
把事情做成。
前后端通信规范
webui 中使用的数据结构、算法。优先队列处理异步事件的先后。定长队列处理非重要事件。
在低代码方面。整理 ali 的低代码核心逻辑。自创了一个低代码平台。
在 webui 中。从 0 创建项目 webui 核心代码。
在 bi 项目中攻克可编辑分词。
