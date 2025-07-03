# sqlit3

## overview

> 为 node.js 开发的轻量数据库。  
> 它是预构建的包（prebuild）。  
> 需要 node@10+  
> 动态数据类型数据库

### feature

- feature0
- feature1
- feature2

## install

`npm i sqlit3`

## usage

同`./demo.md`

```js
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)')

  const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
  for (let i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }
  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`sqlit3.fn(param, first: string, second: boolean = true) => void`
description

`sqlit3.fn(param, [options: {a: string, b?: number}])`
description

```js
filename 合法文件名
mode One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE, sqlite3.OPEN_CREATE, sqlite3.OPEN_FULLMUTEX, sqlite3.OPEN_URI, sqlite3.OPEN_SHAREDCACHE, sqlite3.OPEN_PRIVATECACHE. The default value is OPEN_READWRITE | OPEN_CREATE | OPEN_FULLMUTEX.
cb 回调方法
new sqlite3.Database(filename, mode?, cb?) => Database

sqlite3.verbose() // 当出错是报出错误栈。方便debugger

Database.close(cb?) // 关闭db

// opt: {
// trance: F,  每次调用sql时触发。
// profile: F, 每次调用sql时触发。
// busyTimeout: N 超时时间
// }
Database.configure(opt, value) // 配置合法的数据选项

// sql 可以使用?也可以使用@或$开头
// param 用于替代sql中的?
// 可链式调用
// 建表、插入、更新、删除
Database.run(sql, parma?, cb?) => Database // 关闭db
// Directly in the function arguments.
db.run("UPDATE tbl SET name = ? WHERE id = ?", "bar", 2);
// As an array.
db.run("UPDATE tbl SET name = ? WHERE id = ?", [ "bar", 2 ]);
// As an object with named parameters.
db.run("UPDATE tbl SET name = $name WHERE id = $id", {
    $id: 2,
    $name: "bar"
});

// 查询一条数据
Database.get(sql, param?, cb?: (err, row?) => {}) => Database

// 查询所有数据
// rows 查询的到所有数据组成的数据。当无数据时，返回[]
// 当查询很大时，请使用Database.each/Database.prepare代替。
Database.all(sql, param?, cb?: (err, rows: []) => {}) => Database

// 每个查询结果都调用一次回调。
// 若运行成功且无结果，则不调用cb.
// 无法中止
// 查询多条数据
Database.each(sql, param?,
cb?: (err, row) => {},
complete?: () => {}, // 所有行完成后的回调方法
) => Database

// 执行sql语句
// 可以执行多条语句。
// 当失败时不会执行后续语句。
Database.exec(sql, cb?: (err: Error | null) => {}) => Database
database.run("CREATE TABLE foo (id INT)", function(e) {
  if (e !== null) {
    throw e;
  }
  //循环生成 sql 语句，批次插入多条数据
  var sql = "";
  for (var i = 0; i < 500; i++) {
    sql += "INSERT INTO foo VALUES(" + i + ");";
  }
  database.exec(sql, done);
});

// 执行后，会返回一个命令对象，这个命令对象可以反复执行。下面看看这个命令对象（statement ）的 api：
Database.prapare(sql, param?, cb?: (err) => {}) => Statement // 这里的 Statement 对象是可以复用的，避免了重复编译 sql 语句，因此项目中更推荐使用上述方法。
Statement#run([param, ...], [callback])
Statement#get([param, ...], [callback])
Statement#all([param, ...], [callback])
Statement#each([param, ...], [callback], [complete])

// Statement#map的快捷方式
Database.map(sql, cb?)

// 将已编译的 SQLite 扩展加载到数据库连接对象中。
Database.loadExtension(path, cb?)

// 允许用户中断长时间运行的查询。
Database.interrupt()
Database.serialize(cb?)
Database.parallelize(cb?)

Statement.bind(param?, cb?)
Statement.bind(cb?)
Statement.bind(cb?)
Statement.bind(cb?)
Statement.bind(cb?)
Statement.bind(cb?)
Statement.bind(cb?)
Statement.bind(cb?)
Statement.bind(cb?)


```

## 数据结构

NULL:表示空值。
INTEGER:表示带符号的整型，具体大小取决于存储值的范围。
REAL:表示浮点数字，存储为 IEEE 8 字节浮点数。官方不推荐此数据类型。
TEXT:表示字符串文本。
BLOB:表示二进制对象，用于存储图像、音频等二进制数据。

## 常用操作

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
