# indexedDB

> IndexedDB 是一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。
> 受同源（协议、域名、端口号）限制 。同源共享一个数据库。  
> api 很强大。强大到有点复杂。
> 现在是异步 api.（以前还有同步 api）  
> indexedDB 用于缓存数据，service worker 用于缓存资源。
> https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API

IndexedDB 是一个浏览器内建的数据库，它比 localStorage 强大得多。

- 通过支持多种类型的键，几乎可以存储任何类型的值。（不能存储循环引用的对象）
- 支撑事务的可靠性。
- 支持键值范围查询、索引。
- 和 localStorage 相比，它可以存储更大的数据量。
- 键的类型必须是数字、日期、字符串、二进制或数组。可以通过键来搜索、删除、更新值。
- 存储容量大，依据浏览器规则不同在 5M-512M 之间，并且用户清除浏览器缓存时不会将其清除，在移动端不会受到 ios 无痕模式的影响，所以在一定程度来说，要比 storage 好上一些。

## usage

```ts
// let indexedDB = window.indexedDB
let openRequest: IDBRequest = indexedDB.open(name, version) // 打开一个数据库。这里可以比较版本、升级数据库。
// name    string           数据库的名称
// version 一个正整数版本     默认为1
```

## api

```ts
indexedDB.open(name, version) // 打开数据库
indexedDB.deleteDatabase(name) // 删除数据库

IDBRequest: {
    success: (event) => {} // 数据库准备就绪时
    error: (event) => {} // 打开失败
    upgradeneeded: (event) => { // 已经准备就绪。现有数据库不存在或小于指定的版本则触发此cb。
        event: {
            oldVersion: number, // 现有的db版本（即数据库版本）。0表示客户端没有数据库。
        }
    }
    versionchange: (event) => {} // db版本改变时
    close: () => {
        //
    }
    onblocked: (event) => {} // 在其他地方有一个过时的db版本的连接未关闭，造成无法建立新的连接。
    result: xxxx // 数据库对象
}
db: { // 就是IDBRequest.result
    createObjectStore: (name: S, keyOptions?: { // 创建表
        keyPath,
        autoIncrement: B // true表示不断递增。
    }) => {}
    transaction: () => {}
}
```

## 概念

<!-- prettier-ignore-start -->
|        |                |       |
| ------ | --------------- | ---- |
| 对象库 | 对应其他数据库中的表或集合 | 它是储存数据的地方。一个数据库可能有多个存储区。 |
| 事务   |                            |                                                  |
| 对象库 |                            |                                                  |
| 对象库 |                            |                                                  |
| 对象库 |                            |                                                  |
<!-- prettier-ignore-end -->

## 生命周期

```
    open()
    onupgradeneeded()
    onsuccess()
    在过时的浏览器tab页面触发onversionchange()


```

## 事务 (transaction)

readonly 事务能同时访问同一存储区。  
readwrite 事务不能够同时访问同一存储区。此事务会“锁定”存储区进行写操作。下一个事务必须等待前一个事务完成，才能访问相同的存储区。

一个事务可能有多个相关的请求，这些请求必须全部成功或全部失败。那么我们如何将事务标记为已完成，并不再请求呢？
在下一个版本 3.0 规范中，可能会有一种手动方式来完成事务，但目前在 2.0 中还没有。

```
let transaction = db.transaction('books', 'readwrite')
```

## 示例

```js
/*
 {
        dbName: "test",   //数据库名称
        objName: "test1",  // 表名称
        param: { a: 1 },   // id值
        response: {        // 存储的value
          b: 2,
        },
 }
*/
export default class {
  constructor() {
    this.db = null
  }
  getType(val) {
    let type = typeof val == 'object'
    return type
  }
  // 打开数据库
  open(parm) {
    return new Promise((res, rej) => {
      let request = window.indexedDB.open(parm.dbName, parm.versions)
      request.onerror = function (event) {
        console.log(event)
        // 错误处理
        rej()
        console.log(' 打开数据库报错')
      }
      request.onsuccess = (event) => {
        this.db = request.result
        console.log('打开数据库成功')
        res()
        // 成功处理
      }
      // 数据库更新时的回调
      request.onupgradeneeded = (event) => {
        this.db = event.target.result
        this.createdDB(parm)
      }
    })
  }
  // 创建库表
  createdDB(parm) {
    console.log(parm)

    if (!this.db.objectStoreNames.contains(parm.objName)) {
      this.db.createObjectStore(parm.objName, {
        keyPath: 'id',
      })
      // objectStore.createIndex("data", "data", { unique: false });
      // unique name可能会重复
    }
  }
  // 新增（不需要使用）
  async add(parm = { dbName, objName, param, response }) {
    await this.open(parm)
    // await this.upgrade(dbName);
    return new Promise((res, rej) => {
      let type = this.getType(parm.param)
      let type1 = this.getType(parm.response)
      let transaction = this.db.transaction([parm.objName], 'readwrite')
      let objectStore = transaction.objectStore(parm.objName)

      // 用户读取数据，参数是主键
      let request = objectStore.add({
        id: type ? JSON.stringify(parm.param) : parm.param,
        data: type1 ? JSON.stringify(parm.response) : parm.response,
      })
      console.log(request)

      request.onsuccess = function (event) {
        res(event)
        console.log('数据写入成功')
      }

      request.onerror = function (event) {
        rej()
        console.log('数据写入失败')
      }
    })
  }
  // 读取库表数据
  async read(parm = { dbName, objName, param, response }) {
    await this.open(parm)

    return new Promise((res, rej) => {
      let type = this.getType(parm.param)

      var transaction = this.db.transaction([parm.objName])
      var objectStore = transaction.objectStore(parm.objName)
      // 用户读取数据，参数是主键
      var request = objectStore.get(
        type ? JSON.stringify(parm.param) : parm.param
      )

      request.onerror = function (event) {
        console.log('事务失败')
        rej()
      }

      request.onsuccess = function (event) {
        if (request.result) {
          let data = JSON.parse(request.result.data)
          res(data)
        } else {
          res(request.result)
          console.log('未获得数据记录')
        }
      }
    })
  }
  // 修改库表数据,但是因为创建数据库时直接创建了库表,所以无论是添加还是修改都掉这个就可以了.
  async update(parm = { dbName, objName, param, response }) {
    await this.open(parm)

    return new Promise((res, rej) => {
      let type = this.getType(parm.param)
      let type1 = this.getType(parm.response)

      console.log(parm)
      var request = this.db
        .transaction([parm.objName], 'readwrite')
        .objectStore(parm.objName)
        .put({
          id: type ? JSON.stringify(parm.param) : parm.param,
          data: type1 ? JSON.stringify(parm.response) : parm.response,
        })

      request.onsuccess = function (event) {
        res()
        console.log('数据更新成功')
      }

      request.onerror = function (event) {
        rej()
        console.log('数据更新失败')
      }
    })
  }
  // 删除某个表的数据
  async remove(parm = { dbName, objName, param, response }) {
    await this.open(parm)

    return new Promise((res, rej) => {
      let type = this.getType(parm.param)

      var request = this.db
        .transaction([parm.objName], 'readwrite')
        .objectStore(parm.objName)
        .delete(type ? JSON.stringify(parm.param) : parm.param)

      request.onsuccess = function (event) {
        res()
        console.log('数据删除成功')
      }
    })
  }
}
```

### title

### title
