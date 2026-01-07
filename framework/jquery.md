# jquery

```
on() bind() click() one() 等方法绑定的事件，都在冒泡阶段触发。
```

```js
// 获取该dom的所有事件
let element = $('#id')
let events = element.data('events')
for (var e in events) {
  clog('e', e)
}
```

## issue

### jQuery 对象 <=> DOM 对象

jQuery 对象: jQuery 框架生成的对象。

```
let $v = $('#id') // jQuery对象
$v[0] // DOM对象
let d = $v.get(0) // DOM对象

$(d) // jQuery对象
```

### 绑定与解绑

```
$('p').off() // 解绑所有事件
$('p').off('click', '**') // 解绑委托事件
$('p').on('click', 'p', fn) // 绑定click事件的fn回调方法
$('p').off('click', 'p', fn) // 解绑click事件的fn回调方法
// 委托事件到命名空间 ".validator"
$( "form" ).on( "click.validator", "button", validate );
$( "form" ).on( "keypress.validator", "input[type='text']", validate );
// Remove event handlers in the ".validator" namespace
$( "form" ).off( ".validator" ); // 解绑指定命名空间的所有事件
```

```js
let fn = (jqObj, eventName, cb) => {
  jqObj.off(eventName, cb).on(eventName, cb)
}
```

### 取得 dom 元素绑定的事件

原生 js 没法得到。

```
$._data(domElement, 'events') // array
```

### `$(function() {})`与`$(document).ready(function () {})`

`$(function() {})`是`$(document).ready(function () {})`的简写。
在 dom 加载完成后触发。

### title

### title
