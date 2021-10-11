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

## cmd

## umd

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

## ES module和commonJS循环引用问题
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
