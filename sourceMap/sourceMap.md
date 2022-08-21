# `source-map`

## overview
使用source map生成代码或使用代码生成source map.

### feature
- source map => code
- code => source map

## install
`npm i source-map`

## usage
```
// use with node
const source-map = require('source-map');
// use with browser
<script src="https://unpkg.com/source-map@0.7.3/dist/source-map.js"></script>
<script>
    sourceMap.SourceMapConsumer.initialize({
        "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.3/lib/mappings.wasm"
    });
</script>
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`source-map.fn(param, first: string, second: boolean = true) => void`
description

`source-map.fn(param, [options: {a: string, b?: number}])`
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