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

// 为准备好的语句绑定参数。不执行sql语句。
Statement.bind(param?, cb?: (err: Error | null) => {}) => Statement

// 重置以前的绑定的参数
Statement.reset(cb?) => Statement

// 明确结束一个sql语句。该语句后续的函数都抛出错误
Statement.finalize(cb?)

// 绑定并执行sql语句。
// 若已经使用bind绑定，则可以直接执行。
Statement.run(param?, cb?) => Statement

// 绑定参数并执行sql语句
Statement.get(param?, cb?: (err: Error | null, row) => {}) => Statement

// 绑定参数并执行sql语句
Statement.all(param?, cb?: (err: Error | null, rows) => {}) => Statement

//
Statement.each(param?, cb?: (err, row) => {})

// 以对象形式返回结果
Statement.map(sql, cb?)

let statement = db.prepare('insert into user (username) values ("one")')
statement.run()
```

## 数据结构

SQLite 支持列的亲和类型概念。任何列仍然可以存储任何类型的数据，当数据插入时，该字段的数据将会优先采用亲缘类型作为该值的存储方式。SQLite 目前的版本支持以下五种亲缘类型：
NULL:表示空值。
INTEGER:表示带符号的整型，具体大小取决于存储值的范围。
REAL:表示浮点数字，存储为 IEEE 8 字节浮点数。官方不推荐此数据类型。
TEXT:表示字符串文本。
BLOB:表示二进制对象，用于存储图像、音频等二进制数据。

## 何时关闭

- 退出应用
- 关闭服务

当多个线程操作时，其中有关闭数据库的，则其他线程再操作就出错了。所以不需要关闭。

## 常用操作

## principle

此包的处理逻辑。

### uml

```

```

## issue

### 安装失败

解决方案一：

```
npm i --unsafe-perm
```

解决方案二：

```
"node-pre-gyp": "0.12.0"
```

解决方案三：

```
npm i sqlite3 --build-from-source
```

解决方案四：

```
yarn add sqlite3
```

## 系统表

sqlite_master 表是只读的。不能对它使用 UPDATE、INSERT 或 DELETE。 它会被 CREATETABLE、CREATE INDEX、DROP TABLE 和 DROP INDEX 命令自动更新。
表结构：[
{
type: 'table',
name: 'students',
tbl_name: 'students',
rootpage: 2,
sql: 'CREATE TABLE students (name, address)'
}
]
sqlite_sequence 表也是 SQLite 的系统表。该表用来保存其他表的 RowID 的最大值。数据库被创建时，sqlite_sequence 表会被自动创建。该表包括两列。第一列为 name，用来存储表的名称。第二列为 seq，用来保存表对应的 RowID 的最大值。该值最大值为 9223372036854775807。当对应的表增加记录，该表会自动更新。当表删除，该表对应的记录也会自动删除。如果该值超过最大值，会引起 SQL_FULL 错误。所以，一旦发现该错误，用户不仅要检查 SQLite 文件所在的磁盘空间是否不足，还需要检查是否有表的 ROWID 达到最大值。

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
