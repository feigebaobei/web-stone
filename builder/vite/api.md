# api

## plugin api

可以内嵌其他插件。
vite 插件中可以使用 rollup 插件的所有钩子。
vite 的独有的钩子：
|||||
|-|-|-|-|
|config|解析 vite 配置前调用|||
|configResolved|解析 vite 配置后调用|读取配置并存储最终解析的配置||
|configResolved||||

## hmr api

`vite.fn(param, first: string, second: boolean = true) => void`
description

## js api

`vite.fn(param, [options: {a: string, b?: number}])`
description
