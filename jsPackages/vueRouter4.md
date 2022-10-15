# `vue-router`

## overview

> 它是 vue 的一个插件。所有的单面应用都得处理路由问题。vue 使用 vue-router 去解决路由问题。  
> 把路由插件挂载到 vue 应用上后。在 sfc 中使用`this.$router`访问路由者，使用`this.$route`访问当前路由。  
> 所有导航都是异步的。

### feature

- 嵌套路由映射
- 动态路由选择
- 模块化、基于组件的路由配置
- 路由参数、查询、通配符
- 展示由 Vue.js 的过渡系统提供的过渡效果
- 细致的导航控制
- 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式
- 可定制的滚动行为
- URL 的正确编码

## install

`npm i vue-router@4`

## usage

```vue
<div>
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view />
</div>

import Vue from 'vue' import VueRouter from 'vue-router' // 引入路由要对应的组件
import Home from './Home.vue' import About from './About.vue' //
定义路由与组件的对应关系 const routes = [ { path: '/', component: Home } { path:
'/about', component: About } ] // 创建路由 const router =
VueRouter.createRouter({ history: VueRouter.createWebHashHistory(), routes, })
// 创建应用并使用路由 const app = Vue.createApp({}) app.use(router) //
使用use方法挂载插件 app.mount('#root') // js 进入路由 this.$router.push({ name:
'sss', params: {k: v}, query: hash: })
```

## 动态路由

```js
const routes = [
    {path: '/users/:id', component: Comp},
    {path: '/users/fetch-:key', component: Comp},
    {path: '/:chapters+', component: Comp}, // 匹配 /one /one/two /one/two/three ...
    {path: '/:chapters*', component: Comp}, // 匹配 / /one /one/two /one/two/three ...
    {path: '/:chapters+', component: Comp},
    {path: '/:chapters+', component: Comp},
    // 支持正则
    {path: '/:chapters(\\d+)', component: Comp}, // /1 /1/2 ...
    {path: '/:chapters(\\d*)', component: Comp}, // / /1 /1/2 ...
]
$route.params: {id: xxx, key: xxx}
$route.params: {chapters: [...]}
```

### 动态路由

在程序运行时添加、删除路由。  
|||||
|-|-|-|-|
||router.addRoute(parentName?: string, opt: {path, name?, component?, key?})|||
||router.removeRoute(routeName: string)|||
||router.hasRoute()|||
||router.getRoutes()|||

```js
router.addRoute({ path, name, component }) // 添加 // 会返回删除的路由
router.addRoute(parentName, { path, name, component }) // 为指定父路由添加子路由
// 若name冲突，则先删除路由，再添加路由。
router.removeRoute(routeName) // 根据路由名称删除路由。删除时包括别名、子路由。
router.beforeEach((to) => {
  if (!hasNecessaryRoute(to)) {
    router.addRoute(generateRoute(to))
    return to.fullPath
  }
})
```

## 路由守卫

```vue
watch: { $route: (nv, ov) => {...} } watch( () => this.$route, (nv, ov) => {...}
) beforeRouteUpdate(to, from) {...}
```

## 严格与宽松

|     | 严格   | 宽松      |
| --- | ------ | --------- |
|     | strict | sensitive |

```js
const router = createRouter({
    history: ...,
    routes: [
        {path: '..', sensitive: true} // 使用宽松
    ],
    strict: true // 作用于全部路由
})
```

## 嵌套路由

```vue
// 在组件中使用视窗
<div>
    <router-view />
</div>
```

```js
// 使用children嵌套
const routes = [
  {
    path: '/xx', // 以/开头的是根路由
    name: 'xx', // 可以快速进入此路由。我认为path更好用。
    component: Comp,
    children: [
      // 嵌套路由中不使用/开头
      { path: 'first', compoent: CompC },
      { path: 'second', compoent: CompC },
    ],
  },
]
```

## 编辑式导航

```js
this.$router.push({
  path: '/xx/yy',
  name: 'xx', // 与path互斥
  params: { k: v },
  query: { k: v },
  hash: '#sss',
  replace: boolean, // 是否替换
  meta: any,
})
```

## 横跨历史

```js
// 返回promise
this.$router.go(n) // 改为n
this.$router.forward() // 前进1
this.$router.back() // 后退1
this.$router.replace() // 替换
this.$router.push(...) // 进入指定的
```

## 重定向

以`/`开头为绝对重定向，反之为相对重定向。

```js
const routes = [
  {
    path: '/a/b',
    redirect: (to) => {
      return { path: '/p', query: { q: to.query.q } }
    },
  },
  {
    path: '/a/c', // 会重定向到/a/d
    redirect: (to) => {
      return 'd'
    },
  },
]
```

## 别名

同样遵守绝对路由与相对路由。

```js
const routes = [
  {
    path: '/user/:id',
    component,
    alias: 'c',
    // or
    // alias: ['a', '/b', '/:id']
    // - /user/24
    // - /user/24/a
    // - /b
    // - /24
  },
]
```

## 从路由中为组件传递 props

```js
const routes = [
  {
    path: '/user/:id',
    component: UserComp,
    props: true, // true: 把路由中的动态参数以props传给组件
  },
]
```

## 命名视窗

在同级路由中出现多个视窗。

```js
<router-view name="one" />
<router-view />
<router-view name="two" />
const routes = [
    {
        path,
        components: {
            default: CompDf, // 默认视窗
            one: CompOne,
            two: CompTwo,
        }
    }
]
```

## 历史

### html5 模式

无`#`  
vue 支持的浏览器都支持 history.所以可以放心使用 history 模式  
真的向服务发出当前 url get 请求。
对 seo 好。

```js
const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

### hash 模式

有`#`  
不会向服务发出请求。  
对 seo 不好。

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
```

### 服务端配置

- apache
- nginx
- 原生 node.js
- express + node.js
- iis
- caddy v2
- caddy v1
- firebase hosting
- netlify
- vercel
- caveat

#### nginx

```
location / {
    try_files $uri $uri/ /index.html;
}
```

## 路由守卫

可以放置路由守卫的地方：

- 全局
- 指定的路由
- 指定组件

### 执行顺序

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 全局前置守卫

```js
const router = createRouter({...})
router.beforeEach((to, from) => {
    // to   要去的路由
    // from 从哪儿来的路由
    return false // 阻止跳转
    // 若返回undefined/true 则路由有效。
    if (!isAuthenticated && to.name !== 'login') {
        // 实现重定向
        return {
            name: 'login'
        }
    }
})
```

以前的 vue router 中还有第三个参数：`next`  
当前版本兼容的引用法。若使用请确保 next 方法只会执行一次。

### 全局解析守卫

```js
router.beforeResolve((to, from) => {...})
```

### 全局后置钩子

```js
router.afterEach((to, from) => {...})
```

### 路由独享守卫

只对本路由有效。

```js
const routes = [
    {
        path,
        component,
        beforeEnter: (to, from) => {...}
    }
]
```

### 组件内守卫

- beforeRouteEnter(to, from, next)
- beforeRouteUpdate(to, from) // 可访问 this.
- beforeRouteLeave(to, from)

## 数据获取

- 导航完成后获取
- 导航完成前获取

```js
created() {
    this.$watch(
        () => this.$route.params,
        () => {
            this.fetchData()
        }
    )
}

beforeRouteEnter(to, from, next) {
    fetchData(p, (err, data) => {
        next(vm => vm.setData(err, data))
    })
}
```

## 与组件式 api 一起使用

|     | 在 setup 中                                      | 不在 setup 中                |
| --- | ------------------------------------------------ | ---------------------------- |
|     | `import {useRouter, useRoute} from 'vue-router'` | `this.$router / this.$route` |
|     | useRoute() useRouter()                           |                              |
|     | onBeforeRouteEnter(fn)                           | beforeRouteEnter             |
|     | onBeforeRouteUpdate(fn)                          | beforeRoute                  |
|     | onBeforeRouteLeave(fn)                           |                              |
|     |                                                  |                              |
|     |                                                  |                              |
|     |                                                  |                              |

```js
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
    setup () {
        let route = useRoute()
        let r = ref()
        watch(
            () = route.params.id,
            (nid) => {...}
        )
    }
}
```

useLink

## 滚动行为

注意: 这个功能只在支持 history.pushState 的浏览器中可用。

```js
const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 当使用浏览器的前进、后退时才会有第三个参数。
      return savedPosition
    } else {
      // 指定位置 + 偏移量
      return {
        el: '#main',
        top: 20,
      }
    }
    // 模拟滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // 滚动行为为 平滑
      }
    }
    // 延迟滚动
    return new Promise((s, j) => {
      setTimeout(() => {
        s({ left: 10, top: 30 })
      }, 500)
    })
  },
})
```

## 路由懒加载（动态导入）

按需加载对应组件。
打包工作会实现代码分割。

```js
let Comp = () => import('./Comp')
const router = createRoutet({
  history,
  routes: [{ path, component: Comp }],
  // 只有在第一次进入此页面时才会获取之个函数。
})
```

异步组件可以在路由中使用。  
异步组件不可以在路由组件中使用。

### 把组件按组分块

```js
// use webpack

// use vite
```

## configuration

无配置文件

## api

### `<router-link>` props

|                    |         | default |                                     |
| ------------------ | ------- | ------- | ----------------------------------- |
| to                 | string  |         |                                     |
| replace            | boolean |         |                                     |
| active-class       | string  |         | 激活状态的 class                    |
| aria-current-value | -       |         |                                     |
| custom             | boolean | false   | 若自定义则不使用`<a>`标签包裹子元素 |
| exact-active-class | string  |         | 精准激活时的 class                  |

### `<router-link>` v-slot

在`<router-link>`上使用作用域插槽。

```vue
<router-link v-slot="slotProps">
    <CompName :k="slotProps.k" />
</router-link>
```

| slotProps 的 key |     |     |     |
| ---------------- | --- | --- | --- |
| href             |     |     |     |
| route            |     |     |     |
| navigate         |     |     |     |
| isActive         |     |     |     |
| isExactActive    |     |     |     |

### `<route-view>` props

|       |                         | default   |            |
| ----- | ----------------------- | --------- | ---------- |
| name  | string                  | 'default' | 用于多视窗 |
| route | RouteLocationNormalized |           |            |

### `<router-view>` v-slot

| slotProps 的 key |     |     |                |
| ---------------- | --- | --- | -------------- |
| Component        |     |     | 它是字母大写的 |
| route            |     |     |                |

### createRouter(opt: RouterOptions)

| RouterOptions          |        |     |                                                                     |
| ---------------------- | ------ | --- | ------------------------------------------------------------------- |
| history                |        |     | createWebHistory() / createWebHashHistory() / createMemoryHistory() |
| linkActiveClass?:      | string |     |                                                                     |
| linkExactActiveClass?: | string |     |                                                                     |
| parseQuery?:           |        |     | 指定解决查询字符串的方法。入参是查询字符串。                        |
| routes                 |        |     | 初始路由列表                                                        |
| scrollBehavior         |        |     | 控制滚动的函数。 (to, from, savedPosition) => {...}                 |
| stringifyQuery         |        |     | 对查询对象进行字符串化的自定义实现。(): string => {}                |

### createWebHistory(base?: string)

创建一个 HTML5 history 对象。  
base 默认托管的域名  
若需要做 seo，则使用此方法创建 history。  
(html 中有 base 标签，它为本页面设置 baseUrl，所有相对链接都相对于此 base 标签。)

### createWebHashHistory(base?: string)

### createMemoryHistory(base?: string)

基于内存的历史记录。在 ssr 时会用到。

### NavigationFailureType

包含所有可能导航失败类型的枚举，

### START_LOCATION

路由所在的初始路由地址。

### composition api

|                     |                                                      |     |     |     |
| ------------------- | ---------------------------------------------------- | --- | --- | --- |
| onBeforeRouteLeave  | 要离开本组件时触发                                   |     |     |     |
| onBeforeRouteUpdate | 当本组件更新时触发                                   |     |     |     |
| useLink(props)      | 返回{route, href, isActive, isExactActive, navigate} |     |     |     |
| useRoute()          | 返回当前路由地址                                     |     |     |     |
| useRouter()         | 返回当前 router                                      |     |     |     |

### Router 的属性

|                                          |                                             |                      |     |     |
| ---------------------------------------- | ------------------------------------------- | -------------------- | --- | --- | --- |
| currentRoute                             | 当前的路由地址                              | 只读                 |     |     |
| options                                  | 创建 router 时的原始配置对象                | 只读                 |     |     |
| addRouter(parentName?: string, route)    |                                             |                      |     |     |
| afterEach((to, from, failure) => {...})  | 添加钩子                                    |                      |     |     |
| back()                                   |                                             |                      |     |     |
| beforeEach((to, from, failure) => {...}) |                                             |                      |     |     |
| beforeResolve                            |                                             |                      |     |     |
| forward()                                | 回退一个历史，相当于`router.go(-1)`         |                      |     |     |
| getRoutes()                              | 获取所有路由记录                            |                      |     |     |
| go()                                     |                                             |                      |     |     |
| hasRoute(name: string                    | symbol)                                     | 否存在指定名称的路由 |     |     |     |
| isReady()                                | 当路由器完成初始化导航时，返回一个 Promise. |                      |     |     |
| onError(handler: (err, to, from) => any) | 当导航期间发生错误时执行。                  |                      |     |     |
| push(to)                                 | 推入一个历史栈。返回一个 Promise            |                      |     |     |
| removeRoute(name: string                 | symbol): void                               |                      |     |     |     |
| replace(to)                              | 替换当前历史栈。返回一个 Promise            |                      |     |     |
| resolve(to)                              | 返回路由地址的标准化版本                    |                      |     |     |

### RouteRecordRaw 对象

router.addRoute()等方法都会用到此对象为参数。  
|||||
|-|-|-|-|
|path||||
|redirect||||
|children||||
|alias||||
|name||||
|beforeEnter|进入此路由前的守卫|||
|props|允许将参数作为 props 传递给由`router-view`渲染的组件|||
|sensitive||||
|strict||||
|meta||||

## principle

此包的处理逻辑。

### uml

```

```

### [browser history]()

### title

### title

### title

### title

### title

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
