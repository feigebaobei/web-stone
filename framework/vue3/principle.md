# principle

## 渲染机制

程序员使用 vue 框架，编写 sfc 文件。vue 框架会把它们搞成 vdom。vue 框架根据 vdom 生成 dom，当 vdom 改变时 vue 框架更新 dom。

## vue2 不能做到的事

- 在 data 中不声明的对象、属性，不能响应式。
- 使用 this.$set(this.data.k, 'p', v) 可实现响应式。
- 对数组根据下标改变数据时，不能响应式。
- 使用 vm.items.splice(arr, 1, nv) 可实现响应式。（vue2 对 splice 做了修改）
- 当改变数组长度时，不能响应式。
- 使用 vm.items.splice(newLength) 可实现响应式
- 内部使用 Promise.then() MutationObserver setImmediate setTimeout 处理异步功能。
- Vue.nextTick(cb) 在数据变化后立即执行回调。

## 项目结构

vue3 是一个一库多包项目。

```
|-- packages
    |-- reactivity          // 响应式api。如：toRef/reactive/Effect/computed/watch.与框架无关，可以独立构建。
    |-- runtime-core        // 平台无关的运行时核心代码。包括虚拟dom渲染、组件实现和JavaScript API。可以使用这个包针对特定平台构建高价运行时（即定制渲染器）。
    |-- runtime-dom         // 针对浏览器的运行时。包括对原生DOM API、属性（attributes）、特性（properties）、事件回调的处理。
    |-- runtime-test        // 用于测试的轻量级运行时。可以在任何JavaScript环境使用，因为它最终只会呈现JavaScript对象形式的渲染树，其可以用来断言正确的渲染输出。另外还提供用于序列化树、触发事件和记录更新期间执行的实际节点操作的实用工具。
    |-- server-renderer     // 服务端渲染相关。
    |-- compiler-core       // 平台无关的编译器核心代码。包括编译器可扩展基础以及与所有平台无关的插件。
    |-- compiler-dom        // 添加了针对浏览器的附加插件的编译器。
    |-- compiler-sfc        // 用于编译Vue单文件组件的低阶工具。
    |-- compiler-ssr        // 为服务端提供优化后的渲染函数的编译器。
    |-- template-explorer   // 用于调试编译器输出的开发者工具。运行nr dev template-explorer命令后打开它的index.html文件，获取基于当前源代码的模板的编译结果。也可以使用在线版本
    |-- shared              // 多个包共享的内部工具（特别是运行时包和编译器包所使用的与环境无关的工具）。
    |-- vue                 // 用于面向公众的完整构建，其中包含编译器和运行时。
```

## 编译

几个重要的方法  
||||
|-|-|-|
|compileCache|编译缓存||
|compileToFunction|编译器函数||

## 处理逻辑

1. 编译。使用 compile 方法，把\*.vue 编译为 ast
   1. compile 直接调用并返回了 baseCompile
2. 转化。使用 transform 方法。对 no.1 中 ast 进行转换。为特定节点赋值。
   1. 此阶段处理指令。
3. 生成 render 方法。使用 generator 方法。对 no.2 的 ast 编译，生成 render 方法。
4. patch

### 静态提升

transform 中的 hoistStatic 方法会递归 ast，把不具有响应式的代码序列化为字符串。编译时不处理它们。减少编译工作量。

只有静态内容可以被静态提升。

静态内容会跳过 render/patch.

### generate

根据环境不同（node/browser/ssr）生成不同风格的代码。

## 运行时

compile 方法和 runtime-dom 包就是运行时的。

createApp 方法  
创建 vdom

### render 函数

patch 就在这里执行。

#### patch

比较新旧 vdom 的不同，再更新 dom.

- 创建需要新增的节点
- 移除不需要的节点
- 移动、修改需要更新的节点

1. 若新旧节点是同一节点，则退出 patch
2. 2 节点不同类型（node.type/node.key 都相等）时移除旧节点，使用新节点。
3. 若新节点有`BAIL`标记，则不优化。
4. 根据新节点的类型，分别处理。
   - processComponent

##### processComponent

```
    旧节点是否存在
        |   |
        N   Y
        |   |
        |   V
        |   比较后更新
        |
        V
    是否使用keep-alive
        |           |
        N           Y
        |           |
        V           V
    挂载新节点      唤醒节点
```

## 自己读的源码

@vue/shared 里放置 helper 方法。  
ts 写的包好读一点，可以根据它的类型较快得到属性、方法。若命名规范，则更容易理解。

### 打包

根据 package.json 中的 buildOptions.formats 分别打包 runtime 包和全量包

### 内部方法

各包中嵌套输出方法。

#### createApp

为应用初始化若干属性，再返回应用。
mount()中使用了`isMounted`做为 flag.

ShapeFlags 中使用位移的方式处理二进制。react 中使用直接赋值的方式处理二进制。

创建应用的过程比较简单。嵌套调用各个方法。最后返回一个可链式调用的对象。

#### createVNode

创建 vnode，并返回。

#### getExposeProxy

就是在里使用 Proxy 对象的。

#### publicPropertiesMap

定义了很多这样的方法：从指定实例中取出该实例的值。
把这些方法封装在一个该对象中。

#### markRow()

底层使用`Objecj.defineProperty`设置属性。

#### ReactiveFlags

宏字段

#### isReactive()

是否是响应式。
与 isReadonly 有关。
还与 ReactiveFlags.IS_REACTIVE 属性值有关

#### isReadonly()

判断参数的 ReactiveFlags.IS_READONLY 属性值

#### proxyRefs()

这里也用到了 proxy

#### shallowUnwrapHandlers

#### compileToFunction()

利用了缓存机制。  
从此方法开始执行 vue 的基本原理（编译、转换、生成）
什么时候调用？

#### compile

调用 baseCompile
参数 template 好像是\*.vue 文件中的 temlate 部分。

#### baseParse()

是编译阶段的主要方法。

#### baseCompile()

#### transform()

的参数 ast 是 RootNode 对象，并不是抽象语法树。  
按深度优先遍历转换当前元素及其子元素+静态提升。

#### generate()

#### createRoot()

返回一个 RootNode 对象。
就是编译阶段结果——ast 对象。

#### createParserContext()

返回一个对象

#### getCursor

返回一个对象

#### isEnd()

是否结束

#### parseChildren()

解析子元素

#### createTransformContext

把 RootNode 放在 context 对象里，再添加好多属性后返回 context 对象。

#### traverseNode

转换当前元素及其子元素。  
深度优先转换。  
这就是转换阶段的函数。

#### hoistStatic

遍历所有子元素。提升静态元素。

#### isSingleElementRoot

参数 root 下是否只有一个子元素

#### createCodegenContext

这是一个工厂函数，返回一个 CodegenContext 对象。

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

#### title

### title

### title

### title

## title

## title

## title

## title

## title

## title
