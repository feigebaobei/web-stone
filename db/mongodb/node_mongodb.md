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
