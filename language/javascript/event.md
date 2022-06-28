drag事件

keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。

keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。 按下Esc 键也会触发这个事件。Safari 3.1 之前的版本也会在用户按下非字符键时触发keypress 事件。

keyup：当用户释放键盘上的键时触发。



|dom的事件属性名（因html不区分大小写，所以全是小写）|说明|||
|-|-|-|-|
|onclick||||
|ondbclick||||
|onkeyup||||
|onchange||||
|onfocus||||
|onblur||||
|onmouseover||||
|onmouseout||||
|onload||||
|onunload||||
|onsubmit||||
|onreset||||

### 绑定事件
```html
<div onclick="fn()"></div>
<!-- 这里是字符串 有() -->
```
```js
dom.onclick = fn
// 这里是方法     无()
```


