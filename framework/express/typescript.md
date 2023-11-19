# express & typescript

## pre

> node.js > 12.x
> npm / yarn / pnpm
> express

## 前方

有三种方法

- tsc 编译`*.ts`文件为`*.js`，然后运行 js 文件。
- ts-node
-

## tsc 方法

```shell
# mkdir dir
# cd dir
# npm init --yes # 创建package.json
# npm i express dotenv
# 以上4步等效于以下1步
express project-name
cd project-name
# express node的一个框架
# dotenv  管理环境变量
yarn # 安装依赖
yarn add --dev typescript @types/express @types/node concurrently nodemon
# 或者
# npm i -D typescript @types/express @types/node # 安装类型
# npm i -D concurrently nodemon
npx tsc --init # 创建tsconfig.json
npm pkg set scripts.dev="concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
```

把`<root>/app.js`复制到`<root>/src/index.ts`中，即：`<root>/app.js => <root>/src/index.ts`。代码如下：

```ts
// <root>/src/index.ts
#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('sso:server');
var http = require('http');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

```

修改`<root>/tsconfig.json`文件内容如下：

```
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

运行`npm run dev`
在浏览器中打开`localhost:3000`，若看到页面则运行正确。

### 示例片段

```ts
// <root>/src/index.ts
#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app'
var debug = require('debug')('sso:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

```

```ts
// <root>/src/app.ts
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
import * as createError from 'http-errors'
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'

import type { Request, Response, Express, NextFunction } from 'express'

var indexRouter = require('../routes/index')
var usersRouter = require('../routes/users')

var app: Express = express.default()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'jade')

app.use(logger.default('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser.default())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError.default(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// module.exports = app;
export default app
```

### 注意事项

- 先运行 tsc 命令，完成编译 ts 文件为 js 文件后再启动项目。
- tsconfig.json
  - 中指定 outDir 并与项目启动的入口文件相匹配（不是相同）。
  - include 指定需要编译的目录
  - exclude 指定不需要编译的目录
  - esModuleInterop 会处理非 esm 规范（即：cjs/amd/umd）的包的用法为 esm 规范的用法。使用非 esm 规范包的默认方法时需要使用`default`调用，即：
    - `import * as express from express;` 引入
    - `let app = express.default();` 使用
- xxxx

### 建议

我使用`express-generator`创建 express 项目后。此时项目的根目录作为 src 目录。当使用 ts 后，就需要编译、打包。这时就需求 dist 目录。然后再明确定义一个 src 目录与 dist 目录分开。所以建议:
`<root>/bin/www` => `<root>/src/index.ts`
`<root>/app.js` => `<root>/src/app.ts`
`<root>/routes/index.js` => `<root>/src/routes/index.ts`
`<root>/routes/users.js` => `<root>/src/routes/users.ts`
`<root>/dist`放打包后的结果。

## 一键生成 express&ts 项目

```shell
# crtp initFile vue3.vue --file ./first.vue
crtp initProject expressTs
```

## ts-node 方法

文件操作同 tsc 方法。
定义脚本

```shell
npm pkg set scripts.start-ts-node="ts-node src/index.ts"
```

然后运行脚本命令

```shell
npm run start-ts-node
```

## title

## 参考文献

https://blog.logrocket.com/how-to-set-up-node-typescript-express/
https://reffect.co.jp/en/node-js/express-typescript/
