- [mysql](/db/mysql/index.html)
- [mongodb](/db/mongodb/index.html)
- [redis](/db/redis/index.html)
- [title](/db/title/index.html)
- [title](/db/title/index.html)
- [title](/db/title/index.html)
- [title](/db/title/index.html)

## NoSQL

not only sql 不仅仅是 sql

- 代表着不仅仅是 sql
- 没有声明性查询语言
- 没有预定义的模式
- kv 对存储，列存储、文档存储、图形数据库
- 最终一致性，而非 acid 属性
- 非结构化和不可预知的数据
- cap 定理
- 高性能、高可用性和可伸缩性

### cap 定理

- 一致性 consistency
- 可用性 availability
- 分区容错性 partition tolerance

三点无法同时满足。

- ca 单点集群，满足一致性，可用性的系统，通常在可扩展性上不太强大。
- CP - 满足一致性，分区容忍性的系统，通常性能不是特别高。
- AP - 满足可用性，分区容忍性的系统，通常可能对一致性要求低一些。

### 优点

- 高可扩展性
- 分布式计算
- 低成本
- 架构的灵活性，半结构化数据
- 没有复杂的关系

### 缺点

- 没有标准化
- 有限的查询功能
- 最终一致是不直观的程序

### 分类

|            | 代表                                              |     |     |     |
| ---------- | ------------------------------------------------- | --- | --- | --- |
| 列存储     | hbase/cassandra/hypertable                        |     |     |     |
| 文档存储   | mongodb/couchdb                                   |     |     |     |
| kv 存储    | tokyo cabinet/tyrant/berkeley db/memcachedb/redis |     |     |     |
| 图存储     | neo4j/flockdb                                     |     |     |     |
| 对象存储   | db4o/versant                                      |     |     |     |
| xml 数据库 | berkeley db xml/basex                             |     |     |     |

## RDBMS

- A(Atomicty)原子性
- C(Consistency)一致性
- I(Isolation)独立性
- D(Durability)持久性

- 高度组织化结构化数据
- 结构化查询语言
- 数据和关系都存储在单独的表中
- 数据操纵语言，数据定义语言
- 严格的一致性
- 基础事务

## nosql & RDBMS

|     | nosql | RDBMS |     |     |
| --- | ----- | ----- | --- | --- |
|     |       |       |     |     |
|     |       |       |     |     |
|     |       |       |     |     |
|     |       |       |     |     |
