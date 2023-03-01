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
{
    path: '...',
    component: Comp,
    children: [
        {
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
    name: string
    name: string
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

# vue-router 4.x

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
