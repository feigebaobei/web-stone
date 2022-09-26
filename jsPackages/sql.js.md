# sql.js

## overview
> 它是一个js sql 数据库。  
> 数据放在内存中。  
> 不用协同数据库变化。  
> 可引入已经存在的sqlite file  
> 导出为array类型。  
> 使用[emscripten](/language/emscripten/index.html)语言编译sqlite为webassembly
> 可打包  

### feature
- 可创建关系型数据库。  
- 可在浏览器中查询。  
- feature1
- feature2

## install
`npm i sql.js`

## usage
同`./demo.md`
```
const sql.js = require('sql.js');
// or
// import sql.js from 'sql.js';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`sql.js.fn(param, first: string, second: boolean = true) => void`
description

`sql.js.fn(param, [options: {a: string, b?: number}])`
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