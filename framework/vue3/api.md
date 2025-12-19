# api

## api styles

<!-- prettier-ignore-start -->
|            | options api | composition api      |
| ---------- | --- | ----- |
|            | 选项式 api    | 组成式 api   |
|            | 基于 composition api         | 也不知道怎么翻译成“沉浸式 api”的       |
|            | 各选项会绑定到`this`上       | 使用`<script setup>`，vue 框架会把编译它。            |
|            |               | 此时可以使用 setup().setup()返回的东西，会绑定到 this 对象上         |
|            | 用于低复杂度，如：功能增强。 | 若全应用中使用 vue,则使用 composition api + sfc       |
| 这个功能好 | 不支持 tree shaking          | 支持 import 方式引入，即支持 tree shaking             |
|            |               | vue2.7 中可以使用`@vue/composition-api`包支持 composition api 写法。 |
|            |               | vue3 中常用此写法，再与`<script setup>`结合使用。     |
|            | 不可以        | 可以脱离 vue 框架使用。该用例被称为“组合式函数”       |
|            |               |              |
<!-- prettier-ignore-end -->

## options api

## composition api

可分为三类：

- 响应式 api
- 生命周期方法
- 依赖注入，（需要与响应 api 结合使用）

### 为什么使用组合式 api

- 更好逻辑复用
- 方便扩展
- 更好的类型推断。主要与 ts 结合使用。
- 打包结果更小
-

## 全局 api

<!-- prettier-ignore-start -->
||||||||
||params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`function createApp(rootComponet: Component, rootProps?: Object): app`|rootComponent根组件 rootProps 传入根组件的props|||||||
|`createSSRApp(rootComp, rootProps)`||||||||
|`app.mount(rootContainer: Element \| string): ComponentPublicInstance`||||||||
|`app.unmount(): void`||||||||
|`app.provide()`||||||||
|`app.component()`||||||||
|`app.directive()`||||||||
|`app.use()`||||||||
|`app.mixin()`||||||||
|`app.version: string`||返回版本号||||||
|`app.config`||设置全局配置项||||||
|`version: string`||||||||
|`nextTick()`|cb|设置回调方法，无参数时返回promise||||||
|`defineComponent()`||||||||
|`defineAsyncComponent()`||||||||
|`defineCustomElement()`||定义自定义元素||||||
<!-- prettier-ignore-end -->

```ts
interface App<HostElement = any> {
  // 版本号
  version: string
  //   配置
  config: AppConfig // 这是全局配置项
  //   用于安装插件
  use<Options extends unknown[]>(
    plugin: Plugin<Options>,
    ...options: Options
  ): this
  use<Options>(plugin: Plugin<Options>, options: Options): this
  //   混入
  mixin(mixin: ComponentOptions): this
  //   用于注册全局组件
  component(name: string): Component | undefined
  component(name: string, component: Component): this
  //   用于注册、得到指令
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
  //   挂载
  mount(
    rootContainer: HostElement | string,
    isHydrate?: boolean,
    isSVG?: boolean
  ): ComponentPublicInstance
  //   卸载
  unmount(): void
  //   提供
  provide<T>(key: InjectionKey<T> | string, value: T): this
  //   若干私有属性
  // internal, but we need to expose these for the server-renderer and devtools
  _uid: number
  _component: ConcreteComponent
  _props: Data | null
  _container: HostElement | null
  _context: AppContext
  _instance: ComponentInternalInstance | null
  //   用于处理新旧版本的兼容性
  /**
   * v2 compat only
   */
  filter?(name: string): Function | undefined
  filter?(name: string, filter: Function): this
  /**
   * @internal v3 compat only
   */
  _createRoot?(options: ComponentOptions): ComponentPublicInstance
}

// 编译配置项
interface AppConfig {
  // @private
  readonly isNativeTag?: (tag: string) => boolean
  performance: boolean
  //   指定合并策略的对象
  optionMergeStrategies: Record<string, OptionMergeFunction>
  //   所有组件都可以使用的全局属性对象
  globalProperties: ComponentCustomProperties & Record<string, any>
  errorHandler?: (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => void
  warnHandler?: (
    msg: string,
    instance: ComponentPublicInstance | null,
    trace: string
  ) => void
  /**
   * Options to pass to `@vue/compiler-dom`.
   * Only supported in runtime compiler build.
   */
  compilerOptions: RuntimeCompilerOptions
  /**
   * @deprecated use config.compilerOptions.isCustomElement
   */
  isCustomElement?: (tag: string) => boolean
  /**
   * Temporary config for opt-in to unwrap injected refs.
   * TODO deprecate in 3.3
   */
  unwrapInjectedRef?: boolean
}
export interface RuntimeCompilerOptions {
  // 是否指定一个识别是原生自定义元素的方法
  isCustomElement?: (tag: string) => boolean
  //   如何处理模板中的空格
  whitespace?: 'preserve' | 'condense'
  // 是否移除模板中的html注释
  comments?: boolean
  //   设置模板文本插值的分隔符。
  // 我在vue2的时候就感觉vue使用了模板模式。在vue3时终于证明了我的猜想。
  delimiters?: [string, string]
}
```

## 组合式 api

<!-- prettier-ignore-start -->
||params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`setup(props, context)`||||||||
|``||返回渲染函数时，会覆盖template中内容。||||||
|`ref() => Ref<T>`||||||||
|`computed(...) => Ref<T>`||||||||
|`reactive(obj) => UnwrapNestedRefs<T>`||||||||
|`readonly(obj)`||||||||
|`watchEffect()`||||||||
|`watchPostEffect()`||||||||
|`watchSyncEffect()`||||||||
|`watch()`||||||||
|`isRef()`||||||||
|`unref()`||||||||
|`toRef()`||||||||
|`toRefs()`||||||||
|`isProxy()`|返回是否ref/reactive|||||||
|`isReactive()`|是否是reactive对象|||||||
|`isRef()`|是否是ref对象|||||||
|`isReadonly()`|是否是readonly对象|||||||
|`shallowRef()`||||||||
|`triggerRef()`||||||||
|`customRef()`||||||||
|`shallowReactive()`||||||||
|`shallowReadonly()`||||||||
|`toRaw()`|返回去掉响应式（代理）后的数据。不会改变参数。|可提长性能||||||
|`markRaw()`|标记参数改变时不触发视图更新。|||||||
|`effectScope()`||||||||
|`getCurrentScope()`||||||||
|`onScopeDispose()`||||||||
|`onMounted()`||||||||
|`onUpdated()`||||||||
|`onUnmounted()`||||||||
|`onBeforeMount()`||||||||
|`onBeforeUpdate()`||||||||
|`onBeforeUnmount()`||||||||
|`onErrorCaptured()`||||||||
|`onRenderTracked()`||||||||
|`onRenderTriggered()`||||||||
|`onActivated()`||||||||
|`onDeactivated()`||||||||
|`onServerPrefetch()`||||||||
|`provied()`||||||||
|`inject()`||||||||
<!-- prettier-ignore-end -->

```ts
interface Ref<T> {
  value: T
}
```

## 选项式 api

<!-- prettier-ignore-start -->
||||||||
||params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`data`||||||||
|`props`||||||||
|`computed`||||||||
|`methods`||||||||
|`watch`||||||||
|`emits`||||||||
|`expose`||||||||
|`template`||||||||
|`render`||||||||
|`compilerOptions`||||||||
|`beforeCreate`||||||||
|`created`||||||||
|`beforeMount`||||||||
|`mounted`||||||||
|`beforeUpdate`||||||||
|`updated`||||||||
|`beforeUnmount`||||||||
|`unmounted`||||||||
|`errorCaptured`||||||||
|`renderTracked`||||||||
|`renderTriggered`||||||||
|`activated`||||||||
|`deactivated`||||||||
|`serverPrefetch`||||||||
|`provide`||||||||
|`inject`||||||||
|`mixins`||||||||
|`extends`||||||||
|`name`||||||||
|`inheritAttrs`||||||||
|`components`||||||||
|`directives`||||||||
|`$data`||||||||
|`$props`||||||||
|`$el`||||||||
|`$options`||||||||
|`$parent`||||||||
|`$root`||||||||
|`$slots`||||||||
|`$refs`||||||||
|`$attrs`||||||||
|`$watch()`||||||||
|`$emit()`||||||||
|`$forceUpdate()`||||||||
|`$nextTick()`||||||||
<!-- prettier-ignore-end -->

## 渲染函数 api

<!-- prettier-ignore-start -->
||||||||
||params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`h()`||||||||
|`mergeProps()`||||||||
|`cloneVNode()`||||||||
|`isVNode()`||||||||
|`resolveComponent()`||||||||
|`resolveDirective()`||||||||
|`withDirectives()`||||||||
|`withModifiers()`||||||||
<!-- prettier-ignore-end -->

## 服务端渲染函数 api

<!-- prettier-ignore-start -->
||||||||
||params|description|type|default|enum|demo||
|-|-|-|-|-|-|-|-|
|`renderToString()`||||||||
|`renderToNodeStream()`||||||||
|`pipeToNodeWritable()`||||||||
|`renderToWebStream()`||||||||
|`pipeToWebWritable()`||||||||
|`renderToSimpleStream()`||||||||
|`useSSRContext()`||||||||
<!-- prettier-ignore-end -->

## ts 工具类型

```ts
import type { PropType } from 'vue'
interface Book {
  name: string
}
export default {
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
}

ComponentCustomProperties
ComponentCustomOptions
ComponentCustomProps
CSSProperties
```

## 自定义渲染器 api

createRender()
