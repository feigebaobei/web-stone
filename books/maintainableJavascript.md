# 编写可维护的 javascript

> 原著：Maintainable Javascritp
> 这是在一次与同事合作时，从代码可规范聊到了这本书。他的前老大是译者。
> 中文版本只有 200+页。一会儿就看完了。
> 作者: Nicbolas C.Zakas
> 译者：李晶 郭凯 张散集
> 你的团队编程可以从狭义的个人偏好的阴霾中走出来，走向真正的高效能和高水准。

# 第一部分 编程风格

> 程序是写给人读的，只是偶尔让计算机执行一下。————Donald Knuth

风格一致的重要性：

- 减少理解代码逻辑的成本。
- 减少重新排版。

格式化工具：

- JSLint 可发现代码的潜在错误。
- JSHint

## 基本的格式化

- 缩进层级。在 2 个空格、4 个空格、8 个空格中选择了了 4 个空格。
- 语句结尾是否有;。ASI（Automatic Semicolon Insertion）可以使 js 省略分号也能正常工作。作者推荐有分号。
- 行的长度。最长不过 80 个字符。（源于很久前的文本编辑器）。有几个选项。<=70/<=100/<=80/<=79
- 空行。用空行分隔不相关的代码。方法之间、局部变量与第一条语句之间、多行或单行注释之间、方法与注释之间
- 命名。驼峰式。匈牙利命名法。
  - 动词
    - can 返回一个 boolean
    - has 返回一个 boolean
    - is 返回一个 boolean
    - get 取一个值
    - set 存一个值
- 常量。全大写。
- 构造函数。大驼峰命名。

### 直接量

字符串
数字
null 使用场景如下：

- 初始化一个变量。
- 与已经初始化的变量比较。
- 当函数的参数期望是对象时，用作参数传入。
- 当函数的返回值期望是对象时，用作返回值返回。
  不使用场景如下：
- 不使用 null 检测是否传入指定参数。
- 不使用 null 检测是否初始化变量。
  undefined
  对象直接量（直接写出对象的所有属性）

```
let book = {
    title: 'str',
    author: 'str',
}
// 反对使用下面的写法
let book = new Object()
book.title = 'str'
book.author = 'str'
```

数组直接量

```
let arr = [1, 2, 3]
// 反对使用下面的写法
let arr = new Array(1, 2, 3, 4)
```

## 注释

单行注释
多行注释

```
// 单行注释
/*
多行注释
*/
```

单行注释不应当以连续多行注释的形式出现，注释多行时应该使用多行注释。
注释前要有空行
使用注释的场景：

- 难于理解的代码
- 可能被误认为错误的代码
- 浏览器特性 hack
  文档注释

```
/** 该方法的功能
@method fn         方法的说明
@param  one string 参数一的说明
@param  two number 参数二的说明
@return     object 返回值的说明
**/
```

## 语句和表达式

编程分格:

- Dojo 编程风格
- Crockford 编程风格
-
-

```
// Dojo编程风格
if(condition){
    ....
}
// Crockford编程风格
if (condition) {
    ....
}
// jQuery采用此风格编程
if ( condition ) {
    ....
}
```

with 语句
可以改变包含上下文解析变量的方式。通过 with 可以直接使用局部变量和函数的形式来访问特定对象内的属性和方法。如下：

```
let book = {
    title: 'str',
    author: 'str',
}
let msg = 'str'
with (book) {
    msg += title
    msg += author
}
```

```
// for-in
for (let k in obj) { // k包含了从原型对象上的属性。
    if (obj.hasOwnProperty(k)) { // 只取当前对象的属性
        ...
    }
}
```

## 变量、函数和运算符

js 编程的本质是编写一个个的函数来完成任务，在函数内部，变量和运算符可以通过移动操作字节来使某件事发生。因此在讨论过基本的 js 书写格式后，接下来关注如何使用函数、变量和运算符来减少复杂度各增强可读性就显得十分重要了。
变量声明：
var 可使变量提升
总是将局部变量定义放在函数内第一条语句。

三种规范：

- Crockford 编程规范
- SproutCore 编程规范
- Dojo 编程规范

推荐函数声明先于函数使用。

```js
fn(param) // 推荐写法
var value = (function() {
    ...
}())
```

严格模式，就是在开头写上"use strict"字符串。
若在文件的开头写，则此文件是严格模式。
若在方法的开头写，则此方法是严格模式。

```
"use strict"
...
```

推荐在局部使用严格模式，在全局不使用严格模式。
boolean 值与数字比较时，先办的为数字，再比较。
两个对象比较时，先调用对象的 valueOf()方法（若无 valueOf(),则调用 toString()）。再比较。
eval()把参数当作代码。

可以执行字符串的函数：

```
eval('alert("hi")')
var f = new Function('alert("hi")')
setTimeout('document.body.style.background="red"', 50)
setInterval('document.title="hi"', 1000)
```

# 第二部分 编程实践

“构建软件设计的方法有两种：一种是把软件做得很简单以至于明显找不一缺陷，另一种是把它做得很复杂以至于找不到明显的缺陷。”————C.A.R. Hoare

代码风格规范的目的是在多人协作时使用代码具有一致性。

## UI 层的松耦合

作者说了 js/css/html 的关系。
无耦合 (no coupling)

```
将js从css中抽离
反例
.box {
    width: express(document.body.offsetWidth + 'px')
}
将css从js中抽离
反例
element.style.color = 'red'
将js从html中抽离
反例
<script>fn()</script>
将html从js中抽离
反例
var div = document.getElementById('id')
div.innerHTML = '<h1>title</h1>'

正例
element.className += 'reveal'
element.classList.add('reveal')
Y.one(element).addClass('reveal')
$(element).addClass('reveal')
dojo.addClass(element, 'reveal')
```

低耦合的方法：

- 从服务器加载到 dom 树中。
- 在客户端使用模板，再使用适时的数据替换模板。

## 避免使用全局变量

- 应遵守最小权限原则。
- 命名冲突(api 冲突)
- 代码的脆弱性
- 难以单元测试
- 意外的全局变量
- 单全局变量方式，即只创建一个全局变量。
  - YUI YUI
  - jQuery 有 2 个全局变量 $ jQuery
  - Dojo dojo
  - Closure goog
- 使用命名空间
- 模块。它是基于单全局变量理论产生的。
  - amd
- 零全局变量。一定不要修改 win 属性。

```js
;(function (win) {
  'use strict'
  var doc = win.docuemnt
  // 定义变量
  // 执行逻辑
  // 一定不要修改win属性。
})(window)
```

## 事件处理

- 规则一：隔离应用逻辑
- 规则二：不要分发事件对象。只传递需要的属性，而不是一整个对象。

## 避免“空比较”

- 检测原始值。typeof variable 或 typeof(variable)
- 检测引用值 value instanceof constructor
- 检测函数。typeof fn === 'function'
- 检测数组。鸭式辨型(关注对象能做什么，不关注对象是什么。)。Array.isArray(p)
- 检测属性 'key' in object hasOwnProperty()

## 将配置数据从代码中分离出来

配置数据是应用中写死的值。
抽离配置数据

## 抛出自定义错误

错误可以（原话中无“可以”）是开发者的朋友，而不是敌人。

```js
throw new Error('string') // 正例
throw 'string' // 反例
```

自定义错误可以包含自定义内容。

- 一旦修复一个很难调试的错误，尝试增加一两个自定义错误。当再次发生错误时，这将有助于更容易地解决问题。
- 在关键点出错时抛出自定义错误。
- 修改别人的代码。
  try-catch-finally coder 一定知道这里可能出错。那么应该处理错误，而不是忽略它。
  错误类型
- Error 这是所有错误的基本类型，实际上引擎从来不会抛出该类错误
- EvalError eval()方法执行时发生错误。
- RangeError 超出边界
- ReferenceError 引用超出边界。
- SyntaxError 语法错误
- TypeError 变量不是期望的类型
- URIError encodeURI()/encodeURIComponent()/decodeURI()/decodeURIComponent()等方法的参数中有非法的 URI 字符时抛出。

```js
function MyError(msg) {
  this.message = msg
}
MyError.prototype = new Error()
// or
Object.create(Error, {
  message: {
    value: msg,
    writable: true,
    enumerable: true,
    configurable: true,
  },
})
try {
  // ...
} catch (ex) {
  if (ex instanceof MyError) {
    // 处理自己的错误
  } else {
    // 处理其他错误
  }
}
```

## 不是你的对象不要动

- 原生对象。Object/Array 等。
- DOM 对象 document 等
- BOM 对象 window 等
- 类库的对象

  修改原则

- 不覆盖方法
- 不新增方法
- 不删除方法

  修改的方法（推荐）

- 基于此对象做继承
- 基于类型的继承
- 门面模式
  阻止修改
- 防止扩展。禁止为对象添加属性，可以修改、删除已有属性。（属性包含方法。方法是一种属性值。）
  - 为禁止扩展的对象添加属性时不报错且失败。
- 密封。禁止为对象删除、添加属性。可以修改属性值。
  - 为已密封的对象删除属性时不报错且失败。
- 冻结。禁止为对象修改已有属性。不可以删除、修改、增加属性。
  - 为已密封的对象修改属性时不报错且失败。

|          | 增加 | 删除 | 修改 | 访问 | 判断                   | 设置                        |     |
| -------- | ---- | ---- | ---- | ---- | ---------------------- | --------------------------- | --- |
| 防止扩展 | x    | y    | y    | y    | Object.isExtensible(o) | Object.preventExtensions(o) |     |
| 密封     | x    | x    | y    | y    | Object.isSealed(o)     | Object.seal(o)              |     |
| 冻结     | x    | x    | x    | y    | Object.isFrozen(o)     | Object.freeze(o)            |     |

## 浏览器嗅探

user-agent
特性检测 `if (document.getElementById) {...}`
避免浏览器推断

### 特性检测

```js
// 正例
if (document.getElementById) {
  ...
}
// 反例
if (navigator.userAgent.indexOf('MSIE 7') > -1) {
  ...
}
```

```js
function setAnimation(cb) {
  if (window.requestAnimationFrame) {
    // 标准
    return window.requestAnimationFrame(cb)
  } else if (window.mozRequestAnimationFrame) {
    // firefox
    return window.mozRequestAnimationFrame(cb)
  } else if (window.webkitRequestAnimationFrame) {
    // webkit
    return window.webkitRequestAnimationFrame(cb)
  } else if (window.oRequestAnimationFrame) {
    // opera
    return window.oRequestAnimationFrame(cb)
  } else if (window.msRequestAnimationFrame) {
    // ie
    return window.msRequestAnimationFrame(cb)
  } else {
    return setTimeout(cb, 0)
  }
}
```

### 避免特性推断

特性推断：判断若有 a 属性时，则有 b 属性。然后使用 b 属性。

### 避免浏览器推断

### 取舍

1. 尽可能地使用特性检测
2. 用户代理检测
3. 特性推断、浏览器推断

# 第三部分 自动化

> 我相当乐意花一整天的时间通过编程把一个任务实现自动化，除非这个任务手动只需要 10s 就能完成。
> ——Douglas Adams, Last Chance to See

## 文件和目录结构

- 一个文件只包含一个对象
- 相关的文件用目录分组
- 保持第三方代码的独立
- 确定创建位置
- 保持测试代码的完整性

### 基本结构

```
|- build           构建后的代码
|- src             源代码
|- test 或 tests   测试文件
|- docs            文档目录
|- js              js源代码
|- meta            模块元信息
```

## Ant

它是一种构建工具。现在已经不常用它了。常用的有 webpack/esbuild/rollup/vite 等。
需要 java 环境。
配置文件是 build.xml

## 校验

书中推荐了 JSLint 和 JSHint

## 文件合并和加工

把多个文件合并到一个文件中。

## 文件精简和压缩

为了使文件变小。
压缩工具：

- YUI Compressor
- Closure Compiler
- UglifyJS
  运行时压缩：在 http 头中设置` Accept-Encoding: gzip, deflate``Content-Encoding: gzip `

## 文档化

基于 js 代码（含注释）生成文档。的工具：

- JSDoc Toolkit
- YUI Doc

## 自动化测试

- YUI Test
- seleniumi
- Ant
- Yeti
- PhantomJS (Jasmine / QUnit)
- JsTestDriver

## 组装在一起

与 ci 系统结合工作

- Jenkins
- Continuum
- BuildBot
- Cruise Control
- Gradle

# 附录 A Javascript 编程风格指南

缩进，使用 4 个空格。
每行最多 80 个字符。
字符串使用双引号且保持一行。
数字使用十进制整数，科学计数法表示整数，小数点前后至少保留一位数字。避免使用八进制直接量。
二元运算符前后使用一个空格来保持表达式的整洁。
紧接左括号之后，紧接右括号之前不使用空格。
右花括号独占一行。
单行注释独占一行。
多行注释，应该是一个代码块。
注释声明：TODO / HACK / XXX / FIXME / REVIEW
严格模式在函数内部使用，不在全局使用。
语句示例

```js
cont++;
a = b;
return;
return a;
if (condition) { // 不在if语句中省略花括号
  ...
} else {
  ...
}
for (initialization; condition; update) {
  ...
}
for (v in obj) {
  ...
}
var i,
    len;
while (condition) {
  ...
}
do {
  ...
} while (condition)
switch (expression) {
  case expression:
    ...
    break;
  default:
    ...
    break;
}
try {
  ...
} catch (variable) {
  ...
} finally {
  ...
}
```

不使用像 String 一类的原始包装类型创建新的对象。
避免使用 eval()
避免使用 with 语句。

# 附录 B Javascript 工具集

构建工具：Ant / Buildy / Gmake / Grant / Jammit / Jasy / Rake / Sprockets  
文档生成器：Docco / Dojo Ducumentation Tools / JoDoc / JS Doc ToolKit / Natural Docs / NDoc / PDoc / YUI Doc  
代码检查工具: JSLint / JSHint  
压缩工具：Closure Compiler / UglifyJS / YUI Compressor  
测试工具：Jasmine / JsTestDriver / PhantomJS / Qunit / Selenium / Yeti / YUI Test
