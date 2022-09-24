# 模块化
|-|全称|代表|加载方式||||
|-|-||-|-|-|-|
|amd|asynchronous module definition|require.js|异步加载||||
|cmd|common module definition|sea.js|||||
|umd|universion module definition||||||
|commonjs (cjs)||nodejs|同步加载||||
|esm|es6 module|在js语言层面上实现了模块化。|||||
|iife|immediately invoked function expression|jquery||||
|system||jquery||||

## amd
异步加载，不阻塞页面的加载，能并行加载多个模块，但不能按需加载，必须提前加载所需依赖。  
define(id?, []?, callback)  
模块id\依赖其它模块\回调函数  
require([module], callback)  
需要引入的模块\回调函数  
回调函数会在前面的模块都加载成功后再执行。  
```
require(['module'], function (module) {
    module.fn(p)
})
```
## cmd
amd：定义时加载。cmd:执行时加载。  
在定义之初声明所有依赖。可以在任意时机动态引入模块。  
可以按需加载。  
由阿里的玉伯提出。  
```
define(function(require, exports, module) {...})  
```

## umd
通用模块定义规范
使同一个代码块在commonjs/cmd/amd中都可运行。可以统一浏览器端、服务端、app端。
```
((root, factory) => {
    if (typeof define === 'function' && define.amd) {
        // amd
        define(['jquery'], factory)
    } else if (typeof exports === 'objects') {
        // commonjs
        var $ = require('jquery')
        module.exports = factory($)
    } else {
        root.testModule = factory(root.jQuery)
    }
})(this, ($) => {
    // todo
})
```
它在定义模块的时候回检测当前使用环境和模块的定义方式，将各种模块化定义方式转化为同样一种写法。
它会把若干种js规范统一为一种（当前环境支持的）。

## commonjs
每一个模块都有一个`module`对象。该对象有个属性是：`exports`/`require`  
使用这种规范的代表： node。node把每一个文件都做为一个模块。加载模块使用require，该方法**读取一个文件并执行**，最后返回这个模块内部的exports对象。返回的是值，不是值的地址。  
使用 `module.exports/exports` 和 `require` 抛出和引入。  
`module.exports`使用方法：`module.exports = {k: (p) => {...}, var, var2}`  
`exports`的使用方法：`exports = {v1, v2, v3}`
`module.exports`是对象。`exports` 指向 `module.exports`。所以`module.exports`可以抛出变量、对象。`exports`只能抛出对象。  
commonjs是同步加载的。

## esm
es6及以后的module规范  
输出 export / export default  
引入 import  
|export|export default|import|||
|-|-|-|-|-|
|只能输出对象|输出任意|引入|||
|输出|输出默认对象|引入|||
|可执行多次|只能执行一次|-|||
|`export a; export b;`|`export default {...}`|`import {...} from ...` 或 `import default from ...`|||
现代浏览器已经支持`esm`
```
<script type="module">
import v from '...'
// ...
</script>
```

## iife
立即执行函数  
定义后立即执行的函数。  
```
vat global = {};
(function(global) {
    global.a = 'string'
    global.b = 0
})(global)
```
ts的`enum`类型就是使用iife.

## system
在`*.html`文件中以`<script>`的方式引入。
```
<script src="./first.js"></script>
```

## ES module和commonJS
|| ES module|commonJS|||
|-|-|-|-|-|
||`*.mjs`|`*.cjs`|||
||客户端运行|服务端运行|||
||`import / export`|`require / module.exports`|||
||若在package.json中设置type：module，则为esm规范。|否则为cjs规范。|||
|互相引用|`import all form 'name'`|`(async () => {await import('./file.mjs')})()`|||
||只能整体引入后再解构使用。||||
|同时支持2种规范|`exports: {require: "./index.js", import: "./esm/index.js"}`||||

### ES module和commonJS循环引用问题
因esm、commonjs对待文件(模式)的方式不同。
|esm|commonjs||
|-|-|-|
|在内存中缓存该文件，再使用到该的地方指向文件。|执行该模块后返回一个对象。||
|进入文件后把文件在Module Map中标记为fetching。解析完成为获取该文件的Module Record.|执行了多少返回多少||
|循环引用不出问题|循环引用可能出问题||
|动态只读|复制后返回||

### 解决commonjs的循环引用问题
1. 利用变量提升+commonjs的执行顺序。在模块的最后使用`var`定义引入的模块。
2. 利用js的异步机制。在setTimeout中使用引入模块。

## demo for import & export
```js
import { key } from './file.js'
import def from './file.js'
import { key as alias } from './file.js'
import * as module from './file.js'
import './file.js' // 整个模块仅为副作用（中性词，无贬义含义）而导入，而不导入模块中的任何内容（接口）。 这将运行模块中的全局代码，但实际上不导入任何值。
import('./file.js').then(({default: def, key}) => {...})

export {key}
export {key as alias}
export let key = 'str'
export default key

export const CONSTANT = 42;
export let variable = 42;
// only reading is exposed
// it's not possible to modify the variable from outside
export function fun() {
  console.log('fun');
}
export class C extends Super {
  method() {
    console.log('method');
  }
}
let a, b, other;
export { a, b, other as c };
export default 1 + 2 + 3 + more();
```

## 指明包规范

```json
// package.json
"type": "module"
```
