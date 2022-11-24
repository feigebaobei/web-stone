# config

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## 配置文件名

所有的配置文件都是平行的。  
|配置文件名|支持的扩展名|适用||
|-|-|-|-|
|babel.config._|.json .js .cjs .mjs|使用较多||
|.babelrc._|.json .js .cjs .mjs|||
|.babelrc||||
|package.json 中的 babel 字段||||

## 一库多包中使用

根目录中创建的配置文件会作用于所有子包。  
子包中的配置文件只会作用于该子包。

### 在子包中使用根目录中的配置文件

cli

```shell
babel --root-mode upward src -d dist_babel
```

@babel/regiser
这是一个脚本文件

```js
require('@babel/register')({
  rootMode: 'upward',
})
```

webpack

```js
module: {
  rules: [
    {
      loader: 'babel-loader',
      options: {
        rootMode: 'upward',
      },
    },
  ]
}
```

jest

```js
module.exports = require('babel-jest').default.createTransformer({
  rootMode: 'upward',
})
```

```json
"transform": {
    "^.+\\.jsx?$": "./path/to/wrapper.js"
}
```

## 配置文件中的 api

当使用 cjs 规范的配置文件时。如下：

```js
module.exports = function (api) {
    return {...}
}
```

| api                                              | 类型   | 说明               |     |
| ------------------------------------------------ | ------ | ------------------ | --- |
| api.version                                      | string | 当前 babel 的版本  |     |
| api.cache                                        |        | 如何管理缓存       |     |
| api.cache.forever()                              |        |                    |     |
| api.cache.never()                                |        |                    |     |
| api.cache.user(() => process.env.NODE_ENV)       |        |                    |     |
| api.cache.invalidate(() => process.env.NODE_ENV) |        |                    |     |
| api.cache(true)                                  |        |                    |     |
| api.cache(false)                                 |        |                    |     |
| api.env()                                        |        | 用于检查 envName   |     |
| api.env('production')                            |        |                    |     |
| api.env(['production', 'test'])                  |        |                    |     |
| api.env()                                        |        | 返回当前的 envName |     |
| api.env(envName => envName.startswith('test-'))  |        | 返回当前的 envName |     |
| api.caller(cb)                                   |        |                    |     |
| api.assertVersion(range)                         |        |                    |     |
