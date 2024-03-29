# sql.js

## overview

> 它是一个 js sql 数据库。  
> 数据放在内存中。  
> 不用协同数据库变化。  
> 可引入已经存在的 sqlite file  
> 导出为 array 类型。  
> 使用[emscripten](/language/emscripten/index.html)语言编译 sqlite 为 webassembly  
> 文档中有错别字。

### feature

- 可创建关系型数据库。
- 可在浏览器中查询。
- 可打包
- dist 目录中包括 js/wasm/asm/worker.sql-xxx.js
- 输出为[Uint8Array](/language/javascript/typedArray.html)的数据。

## install

`npm i sql.js`

## usage

```js
const initSqlJs = require('sql.js') // 引入
// or window.initSqlJs
const SQL = await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
}) // init
const db = new SQL.Database() // 创建数据库
let sqlstr =
  "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');" // 必须要有引号
db.run(sqlstr) // 执行
const stmt = db.prepare('SELELCT * FROM hello WHERE a=:aval AND b=:bval')
const result = stmt.getAsObject({ ':aval': 1, ':bval': 'world' }) // {a: 1, b: 'world'}
stmt.bind([0, 'hello'])
while (stmt.step()) console.log(stmt.get())
stmt.free()
const res = db.exec('SELECT * FROM hello') // [{columns: ['a', 'b']}, values: [[0, 'hello'], [1, 'world']]}]
function add(a, b) {
  return a + b
}
db.create_function('add_js', add)
db.run("INSERT INTO hello VALUES (add_js(7, 3), add_js('hello ', 'world'));")
db.create_aggregate('json_agg', {
  init: () => [],
  step: (state, val) => [...state, val],
  finalize: (state) => JSON.stringify(state),
})
db.exec('SELECT json_agg(column1) FROM (VALUES ("hello"), ("world"))')
const binaryArray = db.export() // 导出数据
```

**在浏览器中使用**

```html
<script src="/dist/sql-wasm.js"></script>
<script>
  let config = {
    locateFile: 'xxxx',
  }
  initSqlJs(config).then((SQL) => {
    let db = new SQL.Database()
    db.run('CRAETE TABLE TEST (col1, col2)')
    db.run('INSERT INTO test VALUES (?,?), (?,?), [1, 111, 2, 222]')
    let stmt = db.prepare(
      'SELECT * FROM test WHERE col1 BETWEEN $start AND $end'
    )
    stmt.getAsObject({ $state: 1, $end: 1 })
    stmt.bind({ $start: 1, $end: 2 })
    while (stmt.step()) {
      let row = stmt.getAsObject()
      console.log(`row: ${JSON.stringify(row)}`)
    }
  })
</script>
```

**使用用户选择的文件创建 database**

```js

```

**从服务端加载 database**

```js
let sqlPromise = initSqlJs({
  locateFile: (file) => `https://path/to/${file}`,
})
let dataPromise = fetch('/path').then((res) => res.arrayBuffer())
const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
const db = new SQL.Database(new Uint8Array(buf))
```

**用 xhr 请求**

```js

```

**在 node 环境中使用**

```js
let fs = require('fs')
let initSqlJs = require('sql-wasm.js') // 可能需要从dist目录中引入。
let filebuffer = fs.readFileSync('test.sqlite')
initSqlJs().then((SQL) => {
  let db = new SQL.Database(filebuffer)
})
```

**写入硬盘**

```js
const fs = require('fs')
const data = db.export()
const buffer = Buffer.from(data)
fs.writeFileSync('filename.sqlite', buffer)
```

**与 web worker 一起使用**

```js

```

**支持 bigint**

```js

```

## api

待完善
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

> 找不到 sql-wasm.js  
> 未来迭代计划。
> 未来迭代计划。
