# js编码规范
- 模块
- CommonJS (cjs)
- Asynchronous Module Definition (AMD)
- Common Module Definition (CMD)
- Universal Module Definition (UMD)
- esm

## 模块
## CommonJS (cjs)
每一个模块都有一个`module`对象。该对象有个属性是：`exports`/`require`  
使用这种规范的代表： node。node把每一个文件都做为一个模块。加载模块使用require，该方法读取一个**文件并执行**，最后返回这个模块内部的exports对象。  
使用 `module.exports/exports` 和 `require` 抛出和引入。  
`module.exports`使用方法：`module.exports = {k: (p) => {...}, var, var2}`  
`exports`的使用方法：`exports = {v1, v2, v3}`
`module.exports`是对象。`exports` 指向 `module.exports`。所以`module.exports`可以抛出变量、对象。`exports`只能抛出对象。  
commonjs是同步加载的。

## esm
es6在语言标准的层面上实现了模块功能。  

|-|-|
|export\export default|import|
|输出的是对象\输出的是一个叫default的变量或方法|引入|
|`（import v from 'mn'` / `import {v as vv} from 'mn'）`|c

在浏览器中使用es6需要使用script标签且指定type属性为module.  
`<scrip type="module">import v from './mn.js'/*other code*/</script>`

export / export default  
它们是es6的规范。  
与export对应的是import.  

|export|export default|
|-|-|
|只能输出对象|可以输出变量，对象等。因为输出的是一个叫default的变量或方法。|
|可以多次输出|只使用输出一次|
|不是默认输出|默认输出|
|可多次出现|不可多次出现|
|`export {v0, v1, v2}` 或 `export v0 export v1 export v2`|`export default {...}`|
|import {} from '...'|import v from '...'|  

## Asynchronous Module Definition (AMD)
## Common Module Definition (CMD)
## Universal Module Definition (UMD)

## ES module和commonJS循环引用问题

因esm、commonjs对待文件(模式)的方式不同。

|esm|commonjs||
|-|-|-|
|在内存中缓存该文件，再使用到该的地方指向文件。|执行该模块后返回一个对象。||
|进入文件后把文件在Module Map中标记为fetching。解析完成为获取该文件的Module Record.|执行了少返回多少||
|循环引用不出问题|循环引用可能出问题||
|动态只读|复制后返回||
||||

### 解决commonjs的循环引用问题

1. 利用变量提升+commonjs的执行顺序。在模块的最后使用`var`定义引入的模块。
2. 利用js的异步机制。在setTimeout中使用引入模块。
