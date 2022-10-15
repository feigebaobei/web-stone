# co

在 node.js/broser 中使用 promise 处理 generator，让它更流畅。

co@4.0.0时基于 promise 开发的。它是 es7 async/await 的基石。使用`co()`调用。以前是返回'thunk'，现在是返回 promise。

若你想把 generator 方法转换为返回 promise 对象的一般的方法。可以使用`co.wrap(fn*)`

```
var fn = co.wrap(function * () {
    return yield Promise.resolve('hi')
})
fn().then(() => {...})
```

## 平台兼容性

co@4+必须使用 promise 实现。对于 node<0.11 和低版本浏览器中使用 co 时，请安装 promise 的 polyfill.
当使用 node<0.11 和低版本浏览器时必须安装`gnode`或`retenerator`.

## installation

`npm i co`

## 相关的库

`mz`库封装了很多 node 的 promise 库。

## example

```
var co = require('co');

co(function *(){
  // yield any promise
  var result = yield Promise.resolve(true);
}).catch(onerror);

co(function *(){
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(onerror);

// errors can be try/catched
co(function *(){
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error(err.message); // "boom"
 }
}).catch(onerror);

function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}
```

## yieldables

现在支持可生成的对象：

- promise
- thunks(fn)
- array(parallel execution)
- object(parallel execution)
- generators(delegation)
- generator function (delegation)

## api

```
co(fn*).then()
co.wrap(fn*) // promise
```

当`fn*`中的`yield`方法生成的任一`Promise`对象为`rejected`状态时触发`co`方法返回的`Promise`对象的`rejected`状态。

## 实现原理

1. co 方法接收一个 gen 方法，返回一个 Promise 对象。
2. 此对象中递归处理 gen.next()方法。
   1. 把 gen.next()的返回值处理为 Promise 对象。若该对象为 fulfilled 状态则触发 no.1 中 promise 对象的 resolve 方法，否则触发 no.1 中 promise 对象的 reject 方法。
      递归时使用的三个方法相互调用的方式。
