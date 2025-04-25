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
