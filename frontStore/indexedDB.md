# indexDB

> IndexedDB 是一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。
> 受同源（协议、域名、端口号）限制  
> api 很强大。强大到有点复杂。
> 现在是异步 api.（以前还有同步 api）  
> indexDB 用于缓存数据，service worker 用于缓存资源。
> https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API

IndexedDB 是一个浏览器内建的数据库，它比 localStorage 强大得多。

- 通过支持多种类型的键，几乎可以存储任何类型的值。（不能存储循环引用的对象）
- 支撑事务的可靠性。
- 支持键值范围查询、索引。
- 和 localStorage 相比，它可以存储更大的数据量。
- 键的类型必须是数字、日期、字符串、二进制或数组。可以通过键来搜索、删除、更新值。
-

## usage

```ts
let openRequest = indexedDB.open(name, version) // 打开一个数据库
// name    string       数据库的名称
// version 一个正整数版本           默认为1
```

## api

```ts
openRequest: {
    success: (event) => {} // 数据库准备就绪时
    error: (event) => {} // 打开失败
    upgradeneeded: (event) => { // 已经准备就绪。
        event: {
            oldVersion: number, // 现有的db版本（即数据库版本）
        }
    }
    versionchange: (event) => {} // db版本改变时
    close: () => {
        //
    }
    onblocked: (event) => {} // 在其他地方有一个过时的db版本的连接未关闭，造成无法建立新的连接。
    result: xxxx
}
db: {
    createObjectStore: (name: S, keyOptions?: {
        keyPath,
        autoIncrement: B
    }) => {}
    transaction: () => {}
}
```

## 概念

|        |                            |                                                  |
| ------ | -------------------------- | ------------------------------------------------ |
| 对象库 | 对应其他数据库中的表或集合 | 它是储存数据的地方。一个数据库可能有多个存储区。 |
| 事务   |                            |                                                  |
| 对象库 |                            |                                                  |
| 对象库 |                            |                                                  |
| 对象库 |                            |                                                  |

## 生命周期

## 事务

readonly 事务能同时访问同一存储区。  
readwrite 事务不能够同时访问同一存储区。此事务会“锁定”存储区进行写操作。下一个事务必须等待前一个事务完成，才能访问相同的存储区。

一个事务可能有多个相关的请求，这些请求必须全部成功或全部失败。那么我们如何将事务标记为已完成，并不再请求呢？
在下一个版本 3.0 规范中，可能会有一种手动方式来完成事务，但目前在 2.0 中还没有。

```
let transaction = db.transaction('books', 'readwrite')
```

### title

### title

### title
