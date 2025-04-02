# node + mongodb

```shell
pnpm add mongodb
```

src/app.js

```js
var usersRouter = require('./routes/users')
app.use('/users', usersRouter)
```

src/mongodb.js

```js
let { MongoClient } = require('mongodb')
let clog = console.log

let uri =
  'mongodb+srv://feigebaobei:1qaz2wsx@feigebaobei.ojo8z3u.mongodb.net/?retryWrites=true&w=majority'
let client = new MongoClient(uri)
let usersDb = client.db('users')
let appsDb = client.db('apps')
let pagesDb = client.db('pages')
let componentsDb = client.db('components')
// let usersCollection = database.collection('users')
module.exports = {
  usersDb,
  appsDb,
  pagesDb,
  componentsDb,
}
```

src/routes/users.js

```js
...
let {usersDb} = require('../mongodb')

router.route('/login')
.post(cors.corsWithOptions, async (req, res) => {
  // clog('req', req.body)
  if (required(req.body.account) && required(req.body.password)) {
    let result = await usersDb.collection('users').insertOne({
      account: req.body.account,
      password: req.body.password,
    })
    res.status(200).json({
      code: 0,
      message: "ok",
      data: result,
    })
  } else {
    res.status(200).json({
      code: 1,
      message: "参数出错",
      data: result,
    })
  }
})
module.exports = router;
```

## command

```js
await collection.findOne({ key: 'value' }) // result
await collection.find({ key: 'value' }) // result[]
await collection.find({ key: 'value' }).countDocuments() // 返回查询到的数量
await collection.find({ key: 'value' }).estimatedDocumentCount() // 忽略查询条件，返回所有数据的数量
await collection.insertOne({ key: 'value' })
await collection.insertMany([{ key: 'value' }])
await collection.updateOne({ key: 'value' }, { $set: { newKey: 1 } })
await collection.updateMany({ key: 'value' }, { $inc: { newKey: 1 } })
await collection.updateOne({ key: 'value' }, { $push: { key: 1 } })
await collection.replaceOne({ key: 'value' }, { nk: nv })
await collection.deleteOne({ key: 'value' })
await collection.deleteMany({ key: {$in: valueArr} }) // 删除多条
await collection.bulkWrite([
  { insertOne: {
     document: // 固定的字段
  { k0: v0, k1: v1 } } },
  {updateOne: {filter: <document>, update: <document>, upsert: <boolean>}},
  {updateMany: ...}, // 同updateOne
  {replaceOne: {filter: <document>, replacement: <document>, upsert: <boolean>}},
  {delteOne: {filter:<document>}},
  { deleteMany: { filter: { k0: { $lt: v } } } },
], writeConcern, ordered: false,)
collection.watch([{ $match: { year: { $gtd: v } } }]) // 监听变化
await collection.countDocuments({ key: 'value' })
await collection.distinct({ key: 'value' }) // 列出这个字段的所有值组成的数组
await collection.find().limit(2) // 最多2个值组成的数组。
await collection.find({ key: { $regex: /^Rocky/ } }, { skip: 10 })
await collection.find().sort({ year: 1 })
await collection.find().project()
await collection.createIndex({ title: 1 }) // 不会
await collection.find({ $text: { $search: 'value' } }) // 返回搜索key是字母的值中包括'value'的doc组成的数组。
```

<!-- prettier-ignore-start -->
|||||||
|-|-|-|-|-|-|
|`bulkWrite([<operation1>, <operation2>, ...], {writeConcern: <document>, ordered: <boolean>})`|批量写操作|operation是已经支持的操作符,insertOne/updateOne/updateMany/deleteOne/deleteMany/replaceOne.writeConcern是否启用write concern,默认为false,ordered是否有序，默认false.|||||
|`find({key: value})`||||||
|`find({key: {$gt: value}})`||||||
|`find({key: {$lt: value}})`||||||
|`find({key: {$gte: value}})`||||||
|`find({key: {$lte: value}})`||||||
|`update({key: value}, {$inc: {key1: step}})`|找到key为value的文档，然后把该文档的key1增加step|||||
|`update({key: value}, {$set: {key1: value1}})`|设置为value1|||||
|`update({key: value}, {$unset: {key1: anyValue}})`|设置key1为null.anyValue为什么值都不重要。|||||
|`update({key: value}, {$push: {key1: value1}})`|向数组追加value1|||||
|`update({key: value}, {$push: {key1: {$each:[value1, value2, value3]}}})`|向数组追加value1, value2, value3|||||
|`update({key: value}, {$pull: {key1: value1}})`|删除key1数组中的value1|||||
|`update({key: value}, {$pull: {key1: {$gt: value1}}})`|删除key1数组中的大于value1的值|||||
|`update({key: value}, {$pull: {key1:  {key2: value1}}})`|删除key1数组中的key2为value1的对象|||||
|`update({key: value}, {$pop: {key1: <-1, 1>}})`|删除key1数组中的第一个值、最后一个值。|-1表示负方向。1表示正方向。||||
|`$ne`|不等于|||||
|`$addToSet`|添加到数组并去重|||||
|`$each`||||||
|`find({key: {$in: [/^str/, /^http/]}})`|查询满足任一值的key的文档|不能在`$in`内使用`$regex`||||
|`$nin`||||||
|`find({$of: [{key: v}, {k2: v2}]})`|满足任一|||||
|`$not`|非|||||
|`find({key: {$all: [v1, v2, v3]}})`|指定字段同时包含指定的多个值|||||
|`$size`|可以用于查询指定长度的数组的文档|||||
|`$slice`|返回数组的一个子集合|||||
|`find(key: {$elemMatch: {$gt: 8, $lt:10}})`|查询数组中是否有至少一个元素满足|||||
|`$project`|不会|||||
|`$match`||||||
|`$limit`||||||
|`$skip`||||||
|`$unwind`||||||
|`$group`||||||
|`$sort`||||||
|`$geoNear`||||||
|`$sum`||||||
|`$avg`||||||
|`$min`||||||
|`$max`||||||
|`$push`||||||
|`$first`||||||
|`$last`||||||
|`$setOnInsert`|若不存在则创建，否则无操作。|||||
<!-- prettier-ignore-end -->

使用$set、upsert 存在则更新，不存在则新增
使用$setOnInsert、upsert 存在则不操作，不存在则新增

## 聚合操作

## title

## title

## title

## title
