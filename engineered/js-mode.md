# js 编码规范

- 模块
- CommonJS (cjs)
- Asynchronous Module Definition (AMD)
- Common Module Definition (CMD)
- Universal Module Definition (UMD)
- esm

## 模块

## CommonJS (cjs)

每一个模块都有一个`module`对象。该对象有个属性是：`exports`/`require`  
使用这种规范的代表： node。node 把每一个文件都做为一个模块。加载模块使用 require，该方法读取一个**文件并执行**，最后返回这个模块内部的 exports 对象。  
使用 `module.exports/exports` 和 `require` 抛出和引入。  
`module.exports`使用方法：`module.exports = {k: (p)e => {...}, var, var2}`  
`exports`的使用方法：`exports = {v1, v2, v3}`
`module.exports`是对象。`exports` 指向 `module.exports`。所以`module.exports`可以抛出变量、对象。`exports`只能抛出对象。  
commonjs 是同步加载的。

## esm

es6 在语言标准的层面上实现了模块功能。

|-|-|
|export\export default|import|
|输出的是对象\输出的是一个叫 default 的变量或方法|引入|
|`（import v from 'mn'` / `import {v as vv} from 'mn'）`|c

在浏览器中使用 es6 需要使用 script 标签且指定 type 属性为 module.  
`<scrip type="module">import v from './mn.js'/*other code*/</script>`

export / export default  
它们是 es6 的规范。  
与 export 对应的是 import.

| export                                                   | export default                                                  |
| -------------------------------------------------------- | --------------------------------------------------------------- |
| 只能输出对象                                             | 可以输出变量，对象等。因为输出的是一个叫 default 的变量或方法。 |
| 可以多次输出                                             | 只使用输出一次                                                  |
| 不是默认输出                                             | 默认输出                                                        |
| 可多次出现                                               | 不可多次出现                                                    |
| `export {v0, v1, v2}` 或 `export v0 export v1 export v2` | `export default {...}`                                          |
| import {} from '...'                                     | import v from '...'                                             |

`import()` 可以支持动态引入。
`import`是在静态分析时引入的。

## Asynchronous Module Definition (AMD)

## Common Module Definition (CMD)

## Universal Module Definition (UMD)

## ES module 和 commonJS 循环引用问题

因 esm、commonjs 对待文件(模式)的方式不同。

| esm                                                                                    | commonjs                                                                                   |     |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --- |
| 在内存中缓存该文件，再使用到该的地方指向文件。                                         | 执行该模块后返回一个对象。                                                                 |     |
| 进入文件后把文件在 Module Map 中标记为 fetching。解析完成为获取该文件的 Module Record. | 执行了少返回多少                                                                           |     |
| 循环引用不出问题                                                                       | 循环引用可能出问题                                                                         |     |
| 动态只读                                                                               | 复制后返回                                                                                 |     |
| 单例                                                                                   | 多例                                                                                       |     |
| 一般只使用，不改变                                                                     |                                                                                            |     |
| \*.mjs 只能用 import 引入                                                              | \*.cjs                                                                                     |     |
| 多次引入时，使用指向该模块的引用。                                                     | 多次引入时，只运行第一次，并缓存在内存中，返回多次第一次运行的结果，除非删除缓存中的结果。 |     |

### 解决 commonjs 的循环引用问题

1. 利用变量提升+commonjs 的执行顺序。在模块的最后使用`var`定义引入的模块。
2. 利用 js 的异步机制。在 setTimeout 中使用引入模块。
