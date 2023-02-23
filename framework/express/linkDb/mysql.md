# 连接 mysql

```shell
npm i mysql
```

```js
let MongoClient = requrie('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017/animals', (err, db) => {
  if (err) throw err
  console.log('连接成功')
  db.collection('mammals')
    .find()
    .toArray((err, result) => {
      if (err) throw err
      console.log('result', result)
    })
})
```

```js
MongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
  if (err) throw err
  let db = client.db('animals')
  db.collection('mammals')
    .find()
    .toArray((err, result) => {
      if (err) throw err
      console.log(result)
    })
})
```
