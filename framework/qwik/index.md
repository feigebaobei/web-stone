# qwik

## overview

> 尽可能延后加载、执行 js  
> 在服务端序列化应用和状态，然后在客户恢复。  
> 用户在请求页面时，在服务端完成事件监听器、应用状态。给到浏览器时是序列化好的 html  
> 序列化的数量与可交互组件的数量成正比  
> node v16.8+  
> $ 是代码拆分的边界。qwik 可把代码折成 chunks 碎片，比组件的粒度还小。  
> 采用 prefetch 加载代码  
> 开发环境中使用[vite](/builder/vite/index.html)

### feature

- feature0
- feature1
- feature2

## [前置环境](/framework/qwik/preEnv.html)

## install & usage

```shell
nvm use v16.13.2 # 高于 16.8 就行。
npm create qwik@latest
cd qwik-app
npm i
npm run start # 然后按提示在浏览器中打开相应url>
# npm run preview # 预览生产
```

## guide

### [think qwik](/framework/qwit/thinkQwik.html)

### [qwik city 路由](/framework/qwit/qwikCity.html)

### [qwik & react](/framework/qwit/qwik&react.html)

### [qwikloader](/framework/qwit/qwikloader.html)

### [think](/framework/qwit/thinkQwik.html)

### [think](/framework/qwit/thinkQwik.html)

### [think](/framework/qwit/thinkQwik.html)

### title

### title

```js

```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

`qwik.fn(param, first: string, second: boolean = true) => void`
description

`qwik.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

### 如何序列化 组件=》html

> 未来迭代计划。
> 未来迭代计划。
