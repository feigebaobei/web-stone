mongodb 是由 c++语言编写的。基于分布式文件存储的开源数据库。 => 方便扩展  
将数据保存为一个文档。数据结构由 kv 对组成。  
最像关系型数据库的非关系型数据库。
面向文档存储的数据库。

##启动

```
// 在服务器或本地启动mongodb服务
cd <path>/mongodb/bin
./mongod
// 在服务器上的后台运行mongodb
./mongod --fork --logpath=/data/log/log.log
// 检查启动的结果
netstat -an| grep 27017
```

## 关闭

```
我不会
```

##concept

|             |        |                              |
| ----------- | ------ | ---------------------------- |
| database    | 数据库 | 多个集合                     |
| collection  | 集合   | 多个文档是一个集合。{},{},{} |
| document    | 文档   | 一个{...}就是一个文档        |
| field       | 域     |                              |
| index       | 索引   |                              |
| primary key | 主键   |                              |

以上是 mongodb 的几个数据级别。下面聊聊它们的基本用法。

## 数据级别的基本用法

数据库

```
./mongo
show dbs // 列出数据库
use dbname // 创建数据库并使用
db.dropDatabase() // 删除当前数据库
```

集合

```
db.createCollection(name, options)
name 集合名
options
  capped      bool       false 是否创建固定大小的集合。
  autoIndexId bool       false 是否使用_id字段创建索引
  size        number(kb) --    固定集合时的最大值
  max         number     --    集合中文档的最大数量
show collections // 查看所有集合
show tables      // 查看所有集合
db.<colname>.insert(<dom>)
db.<colname>.drop() // 删除当前集合
db.<colname>.insertOne(<dom>) // 插入一个文档
db.<colname>.insertMany([<dom>]) // 插入多个文档
db.collection.update(<query>, <update>, options>) // 更新文档
options
  upsert       bool false 是否在不存在更新记录时插入数据。
  multi        bool false 是否更新多条记录。
  writeConcern            抛出异常的级别
db.<colname>.remove(<query>, options)
options
  justOne      bool false
  writeConcern 抛出异常的级别
db.<colname>.find(query, projection) // 查询文档
db.<colname>.find().pretty()
```

文档

```
db.<colname>.insert(doc) // 保存文档
db.<colname>.insertOne(doc, {writeConcern: <doc>})
db.<colname>.replaceOne(doc)
db.<colname>.insertMany([doc], {writeConcern: <doc>, ordered: <bool>})
db.<colname>.save(doc) // 已经弃用
db.<colname>.remove(query, {
  justOne: boolean,
  writeConcern: boolean
})
db.<colname>.find(query, projection) // 查询文档
db.<colname>.find(query, projection).pretty() // 格式化查询结果
db.<colname>.findOne(query, projection) // 返回一个文档
```

条件操作符

|     |      |     |
| --- | ---- | --- |
| >   | $gt  |     |
| <   | $lt  |     |
| >=  | $gte |     |
| <=  | $lte |     |

```
// demo
db.user.find({likes: {$lt: 200, $gt: 100}})
// 类似： select * from user where likes>100 and likes<200
```

## mongodb 数据类型

|                    |                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| String             | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。                              |
| Integer            | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。                                       |
| Boolean            | 布尔值。用于存储布尔值（真/假）。                                                                          |
| Double             | 双精度浮点值。用于存储浮点值。                                                                             |
| Min/Max            | keys 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。                                          |
| Array              | 用于将数组或列表或多个值存储为一个键。                                                                     |
| Timestamp          | 时间戳。记录文档修改或添加的具体时间。                                                                     |
| Object             | 用于内嵌文档。                                                                                             |
| Null               | 用于创建空值。                                                                                             |
| Symbol             | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。                     |
| Date               | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object             | ID 对象 ID。用于创建文档的 ID。                                                                            |
| Binary             | Data 二进制数据。用于存储二进制数据。                                                                      |
| Code               | 代码类型。用于在文档中存储 JavaScript 代码。                                                               |
| Regular expression | 正则表达式类型。用于存储正则表达式。                                                                       |

objectId 类似唯一主键。可以很快的去生成和排序。包含 12bytes。
0 1 2 3 4 5 6 7 8 9 10 11
时间戳 |机器 |pid |随机数

## 连接 mongodb

```
mongodb://[username:password@]host1[:port1][,host2[:port2],...][/[database][?options]]
// 使用默认接口链接
mongodb://localhost
// 使用shell连接
./mongo
```

mongodb:// 固定的格式，必须要指定。  
username:password@ // 可选项。  
host1 // 至少指定一个 host。  
post // 可以省略，默认为 27017  
/database // 若指定 username:password@。连接登录指定数据库。若不指定默认打开 test 数据压力开关。

?options // 是连接选项。若不使用/database，则前面需要加上/。所有连接选项都是 kv 格式。多个连接选项之间使用&或;隔开。

**options**

|                 |                                                     |     |
| --------------- | --------------------------------------------------- | --- |
| replicaSet=name | 验证 replica set 的名称。Impliesconnect=replicaSet. |     |
| key             |                                                     |     |
| key             |                                                     |     |
| key             |                                                     |     |
| key             |                                                     |     |
| key             |                                                     |     |
| key             |                                                     |     |
| key             |                                                     |     |
| key             |                                                     |     |

**基本 command line**

show dbs // 显示全部的 db  
use dbname // 使用 dbname 数据库

**db 命名**

- 不能有空格
- 不能有.$/\
- 全部小写
- 最多 64 字节（也就是最多 64 个字母）

###db

元数据

dbname.system.\* // namespaces/indexes/profile/users  
dbname.local.sources

数据类型

|                    |     |                                                                                                                                                                      |
| ------------------ | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| String             |     |                                                                                                                                                                      |
| Integer            |     |                                                                                                                                                                      |
| Boolean            |     |                                                                                                                                                                      |
| Double             |     |                                                                                                                                                                      |
| Min/Max keys       |     |                                                                                                                                                                      |
| Array              |     |                                                                                                                                                                      |
| Timestamp          |     |                                                                                                                                                                      |
| Object             |     |                                                                                                                                                                      |
| Null               |     |                                                                                                                                                                      |
| Symbol             |     |                                                                                                                                                                      |
| Date               |     |                                                                                                                                                                      |
| Object ID          |     | 类似唯一主键。可以很快生成的排序。包含 12bytes。由 4 个字节表示 unix 时间，之后 3 个字节是机器标识码，再之后 2 个字节是由进行 id 组成的 pid，最后 3 个字节是随机数。 |
| Binary Data        |     |                                                                                                                                                                      |
| Code               |     |                                                                                                                                                                      |
| Regular expression |     |                                                                                                                                                                      |

## 常用的方法

```
db.colname.find(query) // 查询
.sort({key: 1}) // 按指定key排序
.limit(number) // 读取指定数量的数据
.skip(number) // 跳过指定数量的数据
```

### 索引

若不使用索引则查询效率很低。
索引是对数据库表中一列、多列的值进行排序的一种结构。

```
db.collection.createIndex(keys, options)
  keys: {
    key0: 1, // 1 表示升序。-1 表示降序。
    key2: -1
  }
  options: {
    background:        boolean         false 是否以后台方式创建索引
    unique:            boolean         false 是否是唯一索引
    name:              string
    dropDups:          boolean
    sparse:            boolean
    expireAfterSecond: integer
    v:                 index | version
    weights:           document
    default_language:  string
    language_overrie:  string
  }
```

### 聚合

### 副本

### 分片

### 备份

### 恢复

### 监控

##node 操作 mongodb(基础)

node 中常用 mongoose 作为 mongodb 的驱动。
总共分三步:

1. 引入 mongodb.MongoClient
1. 连接 mongodb
1. 创建/连接 collection
1. 操作数据库

```
    let MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/mongotest', {useNewUrlParse: true}, (err, client) => {
      let students = client.db('students')
      // students.createCollection('site') //创建集合
      // 链接集合
      students.collection('site').find({}) // 操作db
    })
```

关闭 mongodb

```
  let MongoClient = require('mongodb').MongoClient
  MongoClient.connect('mongodb://localhost:27017/mongotest', {useNewUrlParse: true}, (err, client) => {
    console.log('connected to mongdb')
    client.close() // 关闭mongodb
  })
```
