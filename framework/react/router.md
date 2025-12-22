# router

## overview

> 核心是`react-router`。项目中常用到`react-router-dom`/`react-router-native`。这 2 个包是基于`react-router`开发的。
>
> 它是一个 react 的组件库、hook 库、工具库（从用法上也能看出来）。
>
> 用于创建类多页面应用。本质是单面应用。
>
> 我们把`react-router`/`react-router-dom`/`react-router-native`放在一起聊。
>
> > react-router 它包括核心的组件、hooks、匹配路由的算法。
> >
> > react-rotuer-dom 是基于 react-router 的。添加了一些 dom 的 api.
> >
> > react-router-native 是基于 react-router 的。添加了一些 native 的 api。
>
> v6 版本是匹配最符合 url 的路由

### feature

- 为 react 项目提供路由功能。
- 同时支持 c/s.
- feature2

## install

```shell
npm i react-router # 一般不用明确安装
# or
npm i react-router-dom
# or
npm i react-router-native
```

## react-router & react-router-dom

|          | react-router                                    | react-router-dom                                               |     |
| -------- | ----------------------------------------------- | -------------------------------------------------------------- | --- |
|          | 基础包                                          | 基于 react-router 开发的包                                     |     |
|          |                                                 | 增加了 dom 特有的功能（如 BrowserRouter, Link, Route, Switch） |     |
|          |                                                 | 在 react 项目中够用                                            |     |
| 使用场景 | 跨平台应用（web/rn/...）                        | web                                                            |     |
|          |                                                 | spa                                                            |     |
|          | 只提供基础的路由匹配和管理逻辑。不包含 dom 功能 |                                                                |     |

在 v7 以后，react-router-dom 仅简单透传 react-router.
所以请使用 react-router 代替 react-router-dom。

## usage

```js
// 配置路由
<BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}>
            <Route path="about" element={<About />} />
            <Route path="teams" element={<Teams />} />
        </Route>
    </Routes>
</BrowserRouter>

// 导航
import { Link } from "react-router-dom";
<nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
</nav>
<Comp onClick={() => {navigate(`/invoices/${id}`)}}></Comp>

// 取得动态路由
function Comp () {
    let params = useParams()
    return (<p>hi {params.name}</p>)
}

// 嵌套路由
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
function Invoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <Outlet /> // 嵌套的路由会被渲染在<Outlet>的位置。
    </div>
  );
}
function Invoice() {
  let { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
}
function SentInvoices() {
  return <h1>Sent Invoices</h1>;
}

// Index Routes(默认路由)
<Routes>
    <Route path="/" element={<Layout />}>
        <Route index element={<Second />} />
        <Route path="first" element={<First />} />
    </Route>
</Routes>

// 相对路由：非/开头的路由

// 没发现路由
<Routes>
    <Route path="/" element={<Layout />}>
        <Route index element={<Second />} />
        <Route path="first" element={<First />} />
        <Route path="*" element={<NotFound />} />
    </Route>
</Routes>

// 多个路由集
// 每个路由集只处理自已内的路由。
function App() {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<MainNav />} />
          <Route
            path="dashboard"
            element={<DashboardNav />}
          />
        </Routes>
      </Sidebar>

      <MainContent>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="invoices" element={<Invoices />} />
            <Route path="team" element={<Team />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
    </div>
  );
}

// 后代路由
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}
function Dashboard() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}
```

## configuration

默认配置文件：`path/to/file.json`。

## api

```js
<BrowserRouter> / <HashRouer> 在web浏览器中使用
<StaticRouter> 在服务端渲染时使用
<NativeRouter> 在react native应用中使用
<MemoryRouter> 在测试环境中使用，可作为其他路由的参考实现
它们分别为4个环境提供了`<Router>`需要的上下文环境。
<Routes> / <Route> for jsx
useRoutes for js object-based config
    matchPath
    matchRoutes
    createRoutesFromChildren
<Link> / <NavLink> 被转换为<a>。后者会高亮。
useNavigate / <Navigage> 编程方式处理
    useResolvedPath
    useHref
    useLocation / useNavigationType
    useLinkClickHandler
    useLinkPressHandler
    resolvePath
useSearchParams
<BrowserRouter> 在web浏览器中运行react router的接口。用于保存当前   location，操作history。
<HashRouter> 把当前location保存在hash中，不向服务器发送请求。默认使用文档的defaultView，也可以使用指定的window's url(react-router-dom会使用iframe处理。)。一般不使用<HashRouter>
<NativeRouter> 在react native应用中使用它。
    <NativeRouter initialEntries>
    <NativeRouter initialIndex>
<MemoryRouter> 将location信息保存在一个数组中，常用于完全控制历史堆栈的场景。
<Link> 被转换为<a>
<Link> 在react native中会被渲染为TouchableHighlight
    children
    onPress
    replace
    state
    to
<NavLink> 一种有状态的<Link>
    caseSensitive
    children
    className
    end: boolean 是否激活后代
    style
<Navigate> 改变当前的location，不是<Link>
    to
    replace
    state
<Outlet> 在父组件中定义子组件的渲染位置。
    context 定义分享给子路由的数据
useOutletContext 用于接收父组件分享的数据。
<Router> 为一组路由提供共享的数据
    basename
    children
    location
    navigationType
    navigator
    static
<Routes>
    children
    location
<Route>
    caseSensitive
    children
    element 指定的子组件
    index
    path 用于匹配当前url
<StaticRouter> 在node.js环境中（即：服务端）用于定义指定的路由，常用到location。
    basename
    children
    location
createRoutesFromChildren createRoutesFromChildren is a helper that creates route objects from <Route> elements. It is used internally in a <Routes> element to generate a route config from its <Route> children.
    caseSensitive
    children
    element
    index
    path
generatePath 用于篡改url中的params。我认为它是不安全的。
    path
    params
Location 从history库中引用来的对象
matchRoutes 查找匹配的路由，返回一個匹配的數組
    params
    pathname
    route
renderMatches 渲染matchRoutes()的结果
matchPath
    params
    pathname
    pattern: {
        path
        caseSensitive
        end
    }
resolvePath
useHref
useLinkClickHandler
useLinkPressHandler
useInRouterContext
useLocation
useNavigationType
useMatch
useNavigate
useOutlet
useParams
useResolvePath
useRoutes
useSearchParams
useSearchParams(react native)
createSearchParams
```

## navigator 的使用

```
let navigator = useNavigator()
navigator(path)
navigator(`path/${id}`)
navigator('..') // 进入上一层路由
navigator(-1) // 返回上一个浏览记录
navigator(1) // 进入下一个浏览记录
navigator(path, {replace: true}) // 替换当前路由
navigator(path, {state: {id: 1}}) // 给下一个路由传递状态数据
navigator(path)
```

## refresh 后出现 404 的解决方案

原因是 spa 只有一个 index.html，所有路由都应该指向这个文件。实际上在刷新是请求了指定路由的 html 文件，服务器找不到就返回了 404。

vite 的 preview 模式
不需要配置

netlify
在根目录下创建一个文件 netlify.toml

```
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

vercel
在根目录下创建一个文件 vercel.json

```
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

apache
在 public 目录下创建一个文件 .htaccess

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

nginx
在 nginx.conf 文件中添加如下配置：

```
location / {
  try_files $uri $uri/ /index.html;
}
```

如何无法配置服务器，请使用 hashRouter 模式。

```jsx
// main.jsx
import { HashRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
```

## principle

此包的处理逻辑。

### uml

```

```

## 规范

- `xxx`是变量名。`getXxx`是获取数据的方法。`setXxx`是设置数据的方法。

## 项目结构

有人推荐这样的项目结构

```
<root>
|-- src
    |-- main.tsx             配置 brower router
    |-- App.tsx              路由配置
    |-- index.css            全局样式
    |-- pages
        |-- one              一个页面的目录
            |-- index.tsx
            |-- index.css
            |-- components   当前页面的私有组件的目录
    |-- components           公共组件的目录
```

這樣的結構讓每個頁面都能：
✅ 獨立開發和維護
✅ 避免命名衝突
✅ 清楚的檔案組織
✅ 容易複製或重用

## 分层设计

- 可以做成分层的 404 组件。
  - 需要在特定层中使用 Outlet 组件
  - 需要定义明确 404 组件

## todo

> 如何支持多个路由的？
> <BrowserRouter>的作用是什么？为什么使用它包裹<App/>？
> 未来迭代计划。
