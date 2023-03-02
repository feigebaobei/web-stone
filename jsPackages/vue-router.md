# vue-router

## overview

> 这是与[vue]()相结合的路由管理工作。
> 以 vue 插件的形式开发、使用。  
> 基于 h5 的[history api](/browser/history.html)开发的。

# vue-router 3.x

## overview

|     | vue 2.x        | vue 3.x        |
| --- | -------------- | -------------- |
|     | vue-router 3.x | vue-router 4.x |
|     |                |                |
|     |                |                |

### feature

- feature0
- feature1
- feature2

## install

使用 script 标签

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
```

```shell
npm i vue-router
# 注意安装的版本号
```

与[@vue/cli]()结合使用。
会覆盖 App.vue 文件。

```shell
vue add router
```

## usage

```js
let CompA = { template: 'xxx' }
let CompB = { template: 'xxx' }
let routes = [
  { path: '/a', component: CompA },
  { path: '/b', component: CompB },
]
let router = new VueRrouter({
  routes,
})
let app = new Vue({
  router,
}).$mount('#app')
```

```js
this.$router // 访问路由器
this.$route // 访问当前路由
```

### 动态路由

```js
let router = new VueRouter({
    routes: [
        // 动态路由
        // this.$route.params 可访问
        // eg: this.$route.params.id
        { path: '/user/:id', component: User}
    ]
})
// 监听路由变化
watch: {
    $route(to, from) {
        ...
    }
}
```

## 路由守卫

按作用域可分为：

- 组件内路由守卫
- 全局路由守卫

beforeRouteUpdate() {}

## 嵌套路由

以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。

```html
<!-- 在父组件中使用 router-view -->
<template>
  ...
  <router-view />
</template>
```

```js
let router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User, // 该组件中必须包括 <router-view>
      children: [
        {
          path: 'profile', // 若以 / 开头则为绝对路由，否则为相对父路由的路由。
          componentn: UserProfile,
        },
      ],
    },
  ],
})
```

### 多视窗

命名路由

```html
<router-link :to="{name: 'user', params: {k: 12}}">link</router-link>
<router-view name="first" />
```

```js
{ // 这是一个路由记录
    path: '...',
    component: Comp,
    children: [
        { // 这是一个路由记录
            path: '..',
            component: xx
        },
        {
            path: 'xxx',
            components: {
                default: CompA,
                first: CompB
            }
        }
    ]
}
```

## 编写方式

### 声明式

```html
<router-link :to="..." /> <router-link :to="..." replace />
```

### 编程式导航

```js
// 向 history 栈中添加一个新的记录。
router.push(location, onComplete? , onAbort?)
router.replace(location, onComplete?, onAbort?)
router.replace
{
    name: string
    path: string
    params: string
    component: Comp
    components: {
        $routerViewName: Comp
    }
    redirect: string / object / () => object
    alias: string
    beforeEnter: (to, from, next) => {}
    meta: object
    name: string
    name: string
}
router.go(n)
```

|     |                |                             |     |
| --- | -------------- | --------------------------- | --- |
|     | router.push    | window.history.pushState    |     |
|     | router.replace | window.history.replaceState |     |
|     | router.to      | window.history.go           |

### 声明式 & path & name

|      | 声明式                    | path                              | name                         |
| ---- | ------------------------- | --------------------------------- | ---------------------------- |
| 写法 | `<router-link :to="...">` | `router.push({path: '/path/to'})` | `router.push({name: 'xxx'})` |
| 特点 | 明了                      | 明确路径                          | 明确组件                     |
|      |                           | 推荐                              |                              |
|      |                           |                                   |                              |

## 优先级

同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。

## 重定向 & 别名

```
redirect: '/b',
redirect: {name: 'xx'},
redirect: () => ({}),
```

## 模式

|     | history                                           | hash       |
| --- | ------------------------------------------------- | ---------- |
|     | 真的会发出 get 请求。服务端应该做好兜底解决方案。 | 不太好看。 |
|     |                                                   |            |

## 路由为组件传参

```js
let User = {
  props: ['id'],
  template: '<div>{{id}}</div>',
}
let router = new VueRouter({
  routes: [
    {
      path: '/xx/:id',
      component: User,
      props: true,
    },
    // 当包含多个视窗时，必须为每个命名视窗添加 props 选项。
    // 当 props 为 true 时，router.params会被设置为组件属性。组件使用props接收。
    // boolean
    // object
    // function () => object
    {
      path: '/xx/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false },
    },
  ],
})
```

## 模式

|      | history                 | hash                  |     |     |
| ---- | ----------------------- | --------------------- | --- | --- |
| demo | `http://asdf.com/user`  | `http://asf.com/#/id` |     |     |
|      | 好看                    | 不好看                |     |     |
|      | 真的会向服务发 get 请求 | 不会发请求            |     |     |
|      | 需要后端兼容            | 不需要                |     |     |
|      | 常用于生产              | 常用于开发            |     |     |
|      | 前端做 404 路由、页面   | 后端做                |     |     |
|      |                         |                       |     |     |

### apache

### nginx

```
location / {
    try_files $uri $uri/ /index.html;
}
```

### node.js

```
let http = require('http')
let fs = require('fs')
let httpPort = 80
http.createServer((req, res) => {
    fs.readFile('index.html', 'utf-8', (err, content) => {
        if (err) {...}
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(content)
    })
}).listen(httpPort, () => {
    console.log('strxs')
})
```

### express

使用`connect-history-api-fallback`

### iis

### caddy

### firebase

### apache

## 守卫

按作用域不同，可分为：

- 全局守卫
- 路由独享守卫
- 组件守卫

```js
let router = new VueRouter({...})
router.beforeResolve()
router.beforeEach((to, from, next) => {
  ...
  // next() 是进行管道中的下一个钩子。
  // next(false) 中断导航
  // next('/')  进入特定路由
  // next({path: '/'}) 进入特定路由
  // next(error) 导航中止并触发router.onError()
  // next 可出现多次，只能执行一次。
})
```

### 触发流程

1. 触发导航
2. 在失活的组件中调用 beforeRouteLeave
3. 调用全局 beforeEach
4. 在重用的组件中调用 beforeRouteUpdate
5. 在路由配置时调用 beforeEnter
6. 解析异步路由组件
7. 在激活的组件时调用 beforeRouteEnter
8. 调用全局的 beforeResolve
9. 确认导航
10. 调用全局 afterEach
11. 触发 dom 更新
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 动画

总是与`<transition>`结合使用
按使用范围可以分为：

- 视窗级动画
- 路由级动画

```html
<transtion>
  <router-view />
</transition>
```

```js
const Foo = {
  template: `<transition name="slide">
    <div class="foo" />
  </transition>`,
}
```

```js
watch: {
  '$route' (to, from) {
    let toDepth = to.path.split('/').length
    let fromDepth = to.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  },
  // or
  '$route': 'fn'
},
method: {
  fn () {....}
}
```

## 请求数据的时刻

|                |     |     |     |     |
| -------------- | --- | --- | --- | --- |
| 导航完成后获取 |     |     |     |     |
| 导航完成前获取 |     |     |     |     |
| created        |     |     |     |     |
| mounted        |     |     |     |     |

## 滚动行为

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // savedPosition 在 popstate 时才有效。
    return {x: N, y: N}
    return {
      selector: S,
      offset?: {
        x: N,
        y: N
      },
      behavior: S
    }
  }
})
```

## 路由懒加载

```js
let router = new VueRouter({
  routes: [
    {
      path: '..',
      component: () => import('./file.vue'),
    },
  ],
})
```

## 检测导航故障

```js
// router.beforeEach((to, from, next) => {
//   if ()
// })
let { isNavigationFailure, NavigationFailureType } = VueRouter
router.push('./admin').catch((failure) => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // failure.to.path     '/admin'
    // failure.from.path   '/'
  }
})
```

## 协商路由

由前后端共同决定前端路由是什么。
一般由前端创建一个有少量路由记录的路由器，再由后端给前端一些数据，然后前端处理此数据后使用`router.addRoute()`添加路由。  
路由对应的文件是已经开发好的。

## api

<!-- prettier-ignore-start -->
|key|subKey|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`<router-link>`||链接组件|||||||
||`to`|目标|string/Location||||||
||`replace`||boolean|false|||||
||`append`|是否追加路径|boolean|false|||||
||`tag`||string|'a'|||||
||`active-class`|激活状态时使用的类名|string|'router-link-active'|||||
||`exact`|是否使用精确匹配模式|boolean|false|||||
||`event`|触发导航的事件|`string/Array<string>`|'click'|||||
||`exact-active-class`|string|'router-link-exact-active'||||||
||`aria-current-value`||'page'/'step'/'location'/'date'/'time'/'true'/'false'|'page'|||||
|`<router-view>`||视窗组件|||||||
||`name`||string|'default'|||||
|router的构建选项|||||||||
||`routes`|路由记录组成的数组|||||||
||`mode`||string|'hash'/'abstract'|'hash'/'history'/'abstract'||||
||`base`||string|'/'|||||
||`linkActiveClass`||string|'router-link-active'|||||
||`linkExactActiveClass`||string|'router-link-exact-active'|||||
||`scrollBehavior`||function||||||
||`parseQuery/stringifyQuery`|自定义qs的解析、反解析函数|||||||
||`fallback`||boolean|true|||||
|router实例|||||||||
||`router.app`|Vue实例|||||||
||`router.mode`|模式|string||||||
||`router.currentRoute`||Route||||||
||`router.START_LOCATION`|初始路由地址|Route||||||
||`router.beforeEach((to, from, next) => {...})`|必须调用next|||||||
||`router.beforeResolve((to, from, next) => {...})`|必须调用next|||||||
||`router.afterEach((to, from) => {...})`||||||||
||`router.push()`||||||||
||`router.replace()`||||||||
||`router.go()`||||||||
||`router.back()`||||||||
||`router.forward()`||||||||
||`router.getMatchedComponents()`|返回当前路由匹配的组件（种类）数组|||||||
||`router.resolve()`||||||||
||`router.addRoute(parentname?: string, route: RouteConfig)`|添加路由。与后端交互时常用。|||||||
||`router.getRoutes()`|得到当前路由记录|||||||
||`router.onReady(cb, [errorcb])`||||||||
||`router.onError(cb)`||||||||
|$router||路由对象|||||||
||`$router.path`|返回当前路由的路径|string||||||
||`$router.params`|返回动态参数组成的对象|object||||||
||`$router.query`|返回qs组成的对象|object||||||
||`$router.hash`|返回hash值，带#|string||||||
||`$router.fullPath`|返回解析后的url|||||||
||`$router.matched`|返回匹配的路由记录|||||||
||`$router.name`|返回路由的名称|||||||
||`$router.redirectionFrom`|返回重定向来源的路由的名字|||||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。

# vue-router 4.x

已经整理出来了。

## overview

> vue-router 3.x 与 vue 2.x 配套使用

|     | vue 2.x        | vue 3.x        |
| --- | -------------- | -------------- |
|     | vue-router 3.x | vue-router 4.x |
|     |                |                |
|     |                |                |

### feature

- feature0
- feature1
- feature2

## install

使用 script 标签

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
```

```shell
npm i vue-router
```

## usage

```js
const vue-router = require('vue-router');
// or
// import vue-router from 'vue-router';
// TODO: DEMONSTRATE API
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

`vue-router.fn(param, first: string, second: boolean = true) => void`
description

`vue-router.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
