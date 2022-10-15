# `siroc`

## overview

> 为开发 node 应用做的零配置框架。  
> 正在迭代更新，欢迎指出回馈。  
> 其实还中需要在`package.json`中做配置的。

### feature

- 为应用支持零配置
- 可基于该包扩展命令
- 可监听

## install

`npm i siroc -g`

## usage

```
// package.json
{
  "exports": {
    ".": {
      // This will be compiled in CJS and matched to src/index.ts
      "require": "./dist/index.js",
      // This will be compiled in ES and matched to src/index.ts
      "import": "./dist/index.es.js"
    },
    // src/templates will be lightly transpiled with mkdist and copied to dist/templates
    "./templates/*": "./dist/templates/*",
    // siroc will not touch this
    "./package.json": "./package.json"
  },
  // This will be compiled in CJS and matched to src/index.ts
  "main": "./dist/index.js",
  // This will be compiled in ES and matched to src/index.ts
  "module": "./dist/index.es.js",
  // Types will be generated for src/index.ts
  "types": "./dist/index.d.ts",
  "bin": {
    // This will be compiled in CJS and matched to src/cli/index.ts
    "siroc": "bin/cli.js",
    // This will be compiled in CJS and matched to src/cli/runtime.ts
    "siroc-runner": "bin/runtime.js"
  }
}
```

## configuration

### 配置文件

默认配置文件：`<root>/siroc.config.js` / `<root>/siroc.config.ts` / `<root>/siroc.config.json`。  
或者在`package.json`中设置`siroc`字段。  
在一库多包是使用时，上层的配置会被下层的配置继承，后者也可覆盖前者。  
main 被默认打包为 cjs 规范。  
module 被默认打包为 es 规范。  
browser 被默认打包为 umd 规范。  
bin 被默认打包为 cjs 规范。

| key | description | default | enum | demo |     |     |
| --- | ----------- | ------- | ---- | ---- | --- | --- |
|     |             |         |      |      |     |     |
|     |             |         |      |      |     |     |
|     |             |         |      |      |     |     |

### 在 package.json 中配置

有必填字段：`bin`/`main/module/broser`/`types`/`exports`

## cli

`siroc build`  
把`src/index.js`或`src、index.ts`打到`package.json`中`main`字段指定的文件中。  
若在一库多包项目使用 siroc，可以指定工作空间。`yarn siroc build @mypackage/cli`
可使用监听模式。`yarn siroc build --watch`  
build hooks:

- build:extend
- build:extendRollup
- build:done

`siroc dev`  
`siroc run`

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
