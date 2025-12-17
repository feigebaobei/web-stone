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

我整理的

1. 编译阶段。vite 使用@vite/compiler-sfc 插件（调用该包的 parse 方法）解析\*.vue 文件成为 3 个 block(template/script/style 分别生成一个 block)
2. 渲染阶段。从 createApp 开始。会创建组件的实例，其中包括 vnode。再编译模板，再得到 render 方法，再把 render 方法封装成方法。
3. 更新阶段。就是 patch 方法。patch 方法就是 diff 运算。vue3 的 diff 比 vue2 的 diff 要简单。

### 解释阶段

从 main.js 开始。这里引入了 createApp。

```
import { createApp } from 'vue'
```

```
    vue包            runtime-dom包
    调用createApp方法
                    调用ensureRenderer方法
                    调用baseCreateRenderer方法，得到一个包含render方法的对象。
                    调用render方法，得到一个应用。
```

调用栈：

1. createApp -> 创建应用实例
2. mount -> 挂载组件
3. setupComponent -> 设置组件
4. finishComponentSetup -> 完成组件设置
5. compile(template, options) -> 编译模板
   这是一个解析器模式。

### 渲染阶段

从 createApp 开始。
mountComponent -> 挂载组件。用 createComponentInstance 方法创建组件实例。

```ts
// 这是实例的类型
const instance: ComponentInternalInstance = {
  uid: uid++,
  vnode,
  type,
  parent,
  appContext,
  root: null!, // to be immediately set
  next: null,
  subTree: null!, // will be set synchronously right after creation
  effect: null!,
  update: null!, // will be set synchronously right after creation
  job: null!,
  scope: new EffectScope(true /* detached */),
  render: null,
  proxy: null,
  exposed: null,
  exposeProxy: null,
  withProxy: null,

  provides: parent ? parent.provides : Object.create(appContext.provides),
  ids: parent ? parent.ids : ['', 0, 0],
  accessCache: null!,
  renderCache: [],

  // local resolved assets
  components: null,
  directives: null,

  // resolved props and emits options
  propsOptions: normalizePropsOptions(type, appContext),
  emitsOptions: normalizeEmitsOptions(type, appContext),

  // emit
  emit: null!, // to be set immediately
  emitted: null,

  // props default value
  propsDefaults: EMPTY_OBJ,

  // inheritAttrs
  inheritAttrs: type.inheritAttrs,

  // state
  ctx: EMPTY_OBJ,
  data: EMPTY_OBJ,
  props: EMPTY_OBJ,
  attrs: EMPTY_OBJ,
  slots: EMPTY_OBJ,
  refs: EMPTY_OBJ,
  setupState: EMPTY_OBJ,
  setupContext: null,

  // suspense related
  suspense,
  suspenseId: suspense ? suspense.pendingId : 0,
  asyncDep: null,
  asyncResolved: false,

  // lifecycle hooks
  // not using enums here because it results in computed properties
  isMounted: false,
  isUnmounted: false,
  isDeactivated: false,
  bc: null,
  c: null,
  bm: null,
  m: null,
  bu: null,
  u: null,
  um: null,
  bum: null,
  da: null,
  a: null,
  rtg: null,
  rtc: null,
  ec: null,
  sp: null,
}
```

setupComponent -> 设置组件。initProps 、 initSlots 等
setupStatefulComponent
finishComponentSetup -> 由 setup()得到 Component.render，再赋值给 Component.template
Component.render = compile(template, finalCompilerOptions)
compile -> 编译模板。
registerRuntimeCompiler(compileToFunction)
compile 方法就是 compileToFunction 方法
compileToFunction -> 调用 compile 方法.这个方法是 compiler-dom 中的。
返回了 render 方法。这是用 new Function()创建的。参数是 compile 方法的返回值。
又缓存起来了。
compile -> 直接调用 baseCompile
baseCompile -> 这个方法在 compiler-core 中。调用了 transform 方法，返回了 generate 方法的返回值。
由 baseParse 方法得到 ast 变量。（它不是 ast 对象）

transform -> 它的参数中有 ast 变量。无返回值。
创建转换上下文。
静态提升
generate -> 硬生成的 js 代码。含 vnode 树。

此阶段使用缓存的地方好多。

### 更新阶段

从 patch 方法开始。
patch 方法是在 createRenderer 方法中定义的。

1. 如果 2 个 vnode 相同，则无操作。
2. 如果 2 个 vnode 的 type 不同或 key 不同，则删除旧 vnode
3. 更新节点

runtime-dom 包中的 nodeOps 对象中定义了操作 vnode 的方法。其中包括由 vnode 生成 dom 的方法 createElement。
vue 的底层是使用 document.createElement 创建 dom 的。不可能它这个方法更快。此方法的运行速度就是 vue 的性能理论峰值。

### vnode 如何生成 dom

createRenderer 方法的参数是 nodeOps 对象，此对应中的 createElement 方法，此方法生成创建的 dom 元素。
在 renderer 方法的 mountElement 方法中创建 dom 元素，再挂载到 dom 树中。

## 响应式

### title

### title

### 静态提升

transform 中的 hoistStatic 方法会递归 ast，把不具有响应式的代码序列化为字符串。编译时不处理它们。减少编译工作量。

只有静态内容可以被静态提升。

静态内容会跳过 render/patch.

没有做静态提升之前

```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Fragment,
      null,
      [
        _createVNode('span', null, '你好'),
        _createVNode('div', null, _toDisplayString(_ctx.message), 1 /* TEXT */),
      ],
      64 /* STABLE_FRAGMENT */
    )
  )
}
```

做了静态提升之后

```js
const _hoisted_1 = /*#__PURE__*/ _createVNode(
  'span',
  null,
  '你好',
  -1 /* HOISTED */
)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Fragment,
      null,
      [
        _hoisted_1,
        _createVNode('div', null, _toDisplayString(_ctx.message), 1 /* TEXT */),
      ],
      64 /* STABLE_FRAGMENT */
    )
  )
}

// Check the console for the AST
```

原来就是做与闭包了。静态部分只计算一次，缓存起来结果，使用时直接拿过来用。

### generate

根据环境不同（node/browser/ssr）生成不同风格的代码。

## 运行时

compile 方法和 runtime-dom 包就是运行时的。

createApp 方法  
创建 vdom（也就是 vnode）

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

# 自己读的源码

@vue/shared 里放置 helper 方法。  
ts 写的包好读一点，可以根据它的类型较快得到属性、方法。若命名规范，则更容易理解。

## 打包

根据 package.json 中的 buildOptions.formats 分别打包 runtime 包和全量包
在 vite 的配置文件中引入并使用@vue/compiler-sfc 插件。这个插件是用于加载*.vue 文件的。
vite 会在解析*.vue 文件时调用该插件的 parse 方法。

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

## 数据结构

```ts
export interface VNode<
  HostNode = RendererNode,
  HostElement = RendererElement,
  ExtraProps = { [key: string]: any }
> {
  /**
   * @internal
   */
  __v_isVNode: true

  /**
   * @internal
   */
  [ReactiveFlags.SKIP]: true

  type: VNodeTypes
  props: (VNodeProps & ExtraProps) | null
  key: PropertyKey | null
  ref: VNodeNormalizedRef | null
  /**
   * SFC only. This is assigned on vnode creation using currentScopeId
   * which is set alongside currentRenderingInstance.
   */
  scopeId: string | null
  /**
   * SFC only. This is assigned to:
   * - Slot fragment vnodes with :slotted SFC styles.
   * - Component vnodes (during patch/hydration) so that its root node can
   *   inherit the component's slotScopeIds
   * @internal
   */
  slotScopeIds: string[] | null
  children: VNodeNormalizedChildren
  component: ComponentInternalInstance | null // 这里定义了组件
  dirs: DirectiveBinding[] | null
  transition: TransitionHooks<HostElement> | null

  // DOM
  el: HostNode | null
  placeholder: HostNode | null // async component el placeholder
  anchor: HostNode | null // fragment anchor
  target: HostElement | null // teleport target
  targetStart: HostNode | null // teleport target start anchor
  targetAnchor: HostNode | null // teleport target anchor
  /**
   * number of elements contained in a static vnode
   * @internal
   */
  staticCount: number

  // suspense
  suspense: SuspenseBoundary | null
  /**
   * @internal
   */
  ssContent: VNode | null
  /**
   * @internal
   */
  ssFallback: VNode | null

  // optimization only
  shapeFlag: number
  patchFlag: number
  /**
   * @internal
   */
  dynamicProps: string[] | null
  /**
   * @internal
   */
  dynamicChildren: (VNode[] & { hasOnce?: boolean }) | null

  // application root node only
  appContext: AppContext | null

  /**
   * @internal lexical scope owner instance
   */
  ctx: ComponentInternalInstance | null

  /**
   * @internal attached by v-memo
   */
  memo?: any[]
  /**
   * @internal index for cleaning v-memo cache
   */
  cacheIndex?: number
  /**
   * @internal __COMPAT__ only
   */
  isCompatRoot?: true
  /**
   * @internal custom element interception hook
   */
  ce?: (instance: ComponentInternalInstance) => void
}
export interface ComponentInternalInstance {
  uid: number
  type: ConcreteComponent
  parent: ComponentInternalInstance | null
  root: ComponentInternalInstance
  appContext: AppContext
  /**
   * Vnode representing this component in its parent's vdom tree
   */
  vnode: VNode
  /**
   * The pending new vnode from parent updates
   * @internal
   */
  next: VNode | null // next / parent / rootsubTree 这些字段定义了二叉树结构
  /**
   * Root vnode of this component's own vdom tree
   */
  subTree: VNode
  /**
   * Render effect instance
   */
  effect: ReactiveEffect
  /**
   * Force update render effect
   */
  update: () => void
  /**
   * Render effect job to be passed to scheduler (checks if dirty)
   */
  job: SchedulerJob
  /**
   * The render function that returns vdom tree.
   * @internal
   */
  render: InternalRenderFunction | null
  /**
   * SSR render function
   * @internal
   */
  ssrRender?: Function | null
  /**
   * Object containing values this component provides for its descendants
   * @internal
   */
  provides: Data
  /**
   * for tracking useId()
   * first element is the current boundary prefix
   * second number is the index of the useId call within that boundary
   * @internal
   */
  ids: [string, number, number]
  /**
   * Tracking reactive effects (e.g. watchers) associated with this component
   * so that they can be automatically stopped on component unmount
   * @internal
   */
  scope: EffectScope
  /**
   * cache for proxy access type to avoid hasOwnProperty calls
   * @internal
   */
  accessCache: Data | null
  /**
   * cache for render function values that rely on _ctx but won't need updates
   * after initialized (e.g. inline handlers)
   * @internal
   */
  renderCache: (Function | VNode | undefined)[]

  /**
   * Resolved component registry, only for components with mixins or extends
   * @internal
   */
  components: Record<string, ConcreteComponent> | null
  /**
   * Resolved directive registry, only for components with mixins or extends
   * @internal
   */
  directives: Record<string, Directive> | null
  /**
   * Resolved filters registry, v2 compat only
   * @internal
   */
  filters?: Record<string, Function>
  /**
   * resolved props options
   * @internal
   */
  propsOptions: NormalizedPropsOptions
  /**
   * resolved emits options
   * @internal
   */
  emitsOptions: ObjectEmitsOptions | null
  /**
   * resolved inheritAttrs options
   * @internal
   */
  inheritAttrs?: boolean
  /**
   * Custom Element instance (if component is created by defineCustomElement)
   * @internal
   */
  ce?: ComponentCustomElementInterface
  /**
   * is custom element? (kept only for compatibility)
   * @internal
   */
  isCE?: boolean
  /**
   * custom element specific HMR method
   * @internal
   */
  ceReload?: (newStyles?: string[]) => void

  // the rest are only for stateful components ---------------------------------

  // main proxy that serves as the public instance (`this`)
  proxy: ComponentPublicInstance | null // 这是代理

  // exposed properties via expose()
  exposed: Record<string, any> | null
  exposeProxy: Record<string, any> | null

  /**
   * alternative proxy used only for runtime-compiled render functions using
   * `with` block
   * @internal
   */
  withProxy: ComponentPublicInstance | null
  /**
   * This is the target for the public instance proxy. It also holds properties
   * injected by user options (computed, methods etc.) and user-attached
   * custom properties (via `this.x = ...`)
   * @internal
   */
  ctx: Data

  // state
  data: Data
  props: Data
  attrs: Data
  slots: InternalSlots
  refs: Data
  emit: EmitFn

  /**
   * used for keeping track of .once event handlers on components
   * @internal
   */
  emitted: Record<string, boolean> | null
  /**
   * used for caching the value returned from props default factory functions to
   * avoid unnecessary watcher trigger
   * @internal
   */
  propsDefaults: Data
  /**
   * setup related
   * @internal
   */
  setupState: Data
  /**
   * devtools access to additional info
   * @internal
   */
  devtoolsRawSetupState?: any
  /**
   * @internal
   */
  setupContext: SetupContext | null

  /**
   * suspense related
   * @internal
   */
  suspense: SuspenseBoundary | null
  /**
   * suspense pending batch id
   * @internal
   */
  suspenseId: number
  /**
   * @internal
   */
  asyncDep: Promise<any> | null
  /**
   * @internal
   */
  asyncResolved: boolean

  // lifecycle
  isMounted: boolean
  isUnmounted: boolean
  isDeactivated: boolean
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_CREATE]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.CREATED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_MOUNT]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.MOUNTED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_UPDATE]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.UPDATED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_UNMOUNT]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.UNMOUNTED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.RENDER_TRACKED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.RENDER_TRIGGERED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.ACTIVATED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.DEACTIVATED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.ERROR_CAPTURED]: LifecycleHook
  /**
   * @internal
   */
  [LifecycleHooks.SERVER_PREFETCH]: LifecycleHook<() => Promise<unknown>>

  /**
   * For caching bound $forceUpdate on public proxy access
   * @internal
   */
  f?: () => void
  /**
   * For caching bound $nextTick on public proxy access
   * @internal
   */
  n?: () => Promise<void>
  /**
   * `updateTeleportCssVars`
   * For updating css vars on contained teleports
   * @internal
   */
  ut?: (vars?: Record<string, unknown>) => void

  /**
   * dev only. For style v-bind hydration mismatch checks
   * @internal
   */
  getCssVars?: () => Record<string, unknown>

  /**
   * v2 compat only, for caching mutated $options
   * @internal
   */
  resolvedOptions?: MergedComponentOptions
}
```

二叉树结构

```
    root
      ^
      |  parent
 |----|    ^
 |    |    |
 |  |--------|  next  |--------|
 |  |  vnode | -----> |  vnode |
 |  |--------|        |--------|
 |    |   ^
 | subTree|
 |    V   |parent
 |  |--------|
 |- |  vnode |
    |--------|

```

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

## confuse

vue3 采用 proxy 重写了响应式系统，因为 proxy 可以对整个对象进行监听，所以不需要深度遍历

可以监听动态属性的添加
可以监听到数组的索引和数组 length 属性
可以监听删除属性

仍然使用`Object.defineProperty`做响应式
