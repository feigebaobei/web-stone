# build-scripts

## overview

> 基于 webpack-service 开发的包。用于构建。

### feature

- feature0
- feature1
- feature2

## install

`npm i build-scripts`

## usage

```json
// package.json
"scripts": {
"build": "build-scripts build"
},
```

## configuration

默认配置文件：`<root>/build.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|externals|||默认不支持任何字段。|object||||||
|plugins|||通过本地插件更改webpack config。每一项代表一个插件。按顺序插件插件。第一个项为插件名，第二项为该插件的参数。|[]||||||
|||||||||||
<!-- prettier-ignore-end -->

```json
{
  "plugins": [
    // 数组第一项为插件名，第二项为插件参数
    [
      "build-plugin-fusion",
      {
        "themePackage": "@icedesign/theme"
      }
    ]
  ]
}
```

### 自定义配置

自定义插件

```js
// build.plugin.js
module.exports = ({ context, onGetConfig }) => {
  // 这里面可以写哪些，具体请查看插件开发章节
  onGetConfig((config) => {})
}
```

```json
// build.json
{
  "plugins": ["build-plugin-app", "./build.plugin.js"]
}
```

## 开发插件

日后更新吧

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`build-scripts.fn(param, first: string, second: boolean = true) => void`
description

`build-scripts.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
