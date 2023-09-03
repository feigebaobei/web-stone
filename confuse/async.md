# setTimeout / clearTimeout

```js
var timeoutID = scope.setTimeout(function[, delay, arg1, arg2, ...]); // argn是传入function的参数。delay后传入。
var timeoutID = scope.setTimeout(function[, delay]);
var timeoutID = scope.setTimeout(code[, delay]);
// function中的this在非严格模式下指向window，在严格模式下指向undefined。
// 可以用abc处理function的this.
clearTimeout(timeoutID)
```

# setInterval / clearInterval

# promise

# fetch

# [xhr](/language/javascript/xhr.html)

# axios

# setImmediate / clearImmediate

该特性是非标准的，请尽量不要在生产环境中使用它！  
该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数。

```js
var immediateID = setImmediate(func, [param1, param2, ...]); // 惟一id.
var immediateID = setImmediate(func);
clearImmediate(immediateID)
// 浏览器大多不支持setImmediate / clearImmediate
```

# postMessage / MessageChannel

# title
