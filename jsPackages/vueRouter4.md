# `vue-router`

## overview
> 它是vue的一个插件。所有的单面应用都得处理路由问题。vue使用vue-router去解决路由问题。  
> 把路由插件挂载到vue应用上后。在sfc中使用`this.$router`访问路由者，使用`this.$route`访问当前路由。  

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

import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由要对应的组件
import Home from './Home.vue'
import About from './About.vue'
// 定义路由与组件的对应关系
const routes = [
    { path: '/', component: Home }
    { path: '/about', component: About }
]
// 创建路由
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
// 创建应用并使用路由
const app = Vue.createApp({})
app.use(router) // 使用use方法挂载插件
app.mount('#root')

// js 进入路由
this.$router.push({
    name: 'sss',
    params: {k: v},
    query: 
    hash:  
})
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

## 路由守卫
```vue
watch: {
    $route: (nv, ov) => {...}
}
watch(
    () => this.$route,
    (nv, ov) => {...}
)
beforeRouteUpdate(to, from) {...}
```

## 严格与宽松
||严格|宽松|
|-|-|-|
||strict|sensitive|

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
            {path: 'first', compoent: CompC},
            {path: 'second', compoent: CompC}
        ]
    }
]
```

## 编辑式导航
```js
this.$router.push({
    path: '/xx/yy',
    name: 'xx', // 与path互斥
    params: {k: v},
    query: {k: v},
    hash: '#sss',
    replace: boolean, // 是否替换
})
```

## 横跨历史
```js
this.$router.go(n) // 改为n
this.$router.forward() // 前进1
this.$router.back() // 后退1
```

## 重定向
以`/`开头为绝对重定向，反之为相对重定向。  
```js
const routes = [
    {
        path: '/a/b',
        redirect: to => {
            return {path: '/p', query: {q: to.query.q}}
        }
    },
    {
        path: '/a/c', // 会重定向到/a/d
        redirect: to => {
            return 'd'
        }
    }
]
```

## 别名
同样遵守绝对路由与相对路由。  
```js
const routes = [
    {
        path: '/user/:id',
        component,
        alias: 'c'
        // or 
        // alias: ['a', '/b', '/:id']
        // - /user/24
        // - /user/24/a
        // - /b
        // - /24
    }
]
```

## 从路由中为组件传递props
```js
const routes = [
    {
        path: '/user/:id',
        component: UserComp,
        props: true // true: 把路由中的动态参数以props传给组件
    }
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
### html5模式
无`#`  
真的向服务发出当前url get请求。
```js
const router = createRouter({
    history: createWebHistory(),
    routes
})
```

### hash模式
有`#`  
不会向服务发出请求。  
```js
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
```

### 服务端配置
- apache
- nginx
- 原生node.js
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






## title
## title
## title
## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
`vue-router.fn(param, first: string, second: boolean = true) => void`
description

`vue-router.fn(param, [options: {a: string, b?: number}])`
description

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