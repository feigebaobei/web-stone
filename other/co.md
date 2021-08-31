# co

在node.js/broser中使用promise处理generator，让它更流畅。

co@4.0.0时基于promise开发的。它是es7 async/await的基石。使用`co()`调用。以前是返回'thunk'，现在是返回promise。

若你想把generator方法转换为返回promise对象的一般的方法。可以使用`co.wrap(fn*)`

```
var fn = co.wrap(function * () {
    return yield Promise.resolve('hi')
})
fn().then(() => {...})
```
## 平台兼容性

co@4+必须使用promise实现。对于node<0.11和低版本浏览器中使用co时，请安装promise的polyfill.
当使用node<0.11和低版本浏览器时必须安装`gnode`或`retenerator`.

## installation

`npm i co`

## 相关的库

`mz`库封装了很多node的promise库。

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
当`fn*`中的`yield`方法生成的任一`Promise`对象为`rejected`状态时触发`co`方法返回的`Promise`对象的`rejected`状态。

## 实现原理
1. co方法接收一个gen方法，返回一个Promise对象。
2. 此对象中处理递归处理gen.next()方法。
   1. 把gen.next()的返回值处理为Promise对象。若该对象为fulfilled状态则触发no.1中promise对象的resolve方法，否则触发no.1中promise对象的reject方法。
递归时使用的三个方法相互调用的方式。