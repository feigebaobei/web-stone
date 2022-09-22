# create-react-app

## overview
> 官方指定的创建react单页面应用的工具。
> 它是一个命令行工具，用于创建项目。
> `react-scripts`只是一个依赖项
> 基于webpack+babel开发的。
> 只能在`<root>/src`下添加文件（如js/css），否则cra找不到它们。

### feature
- 不需要下载、配置webpack/babel。配置项已经内置了。
- 当前不支持 decorator

## install
`npm i create-react-app -g`

## usage
```shell
npx create-react-app proj-name
npm init react-app proj-name # init是creat的别名
yarn create react-app proj-name

--template [template-name]

cd proj-name
npm run start # 启动本地服务
npm run test # 执行测试文件 
npm run build # 打包
npm run eject # 弹出内置打包配置，可以自定义打包配置。执行无法还原。
# eject会生成很多配置文件、添加很多依赖。
# 配置文件还很复杂。
# 基础不太好的程序员不要执行eject。重点是不可逆。
```

模板可在npm官网查询。  

## 文件结构
```
<root>
|-- src
    |-- index.js    // 入口文件
    |-- App.js      // 主组件
|-- public
    |-- index.html  // 模板文件
```

## 引入文件（。。。）
### 在js文件中添加css文件
```js
import './path/to/file.css'
// import './path/to/file.scss' // 同理，引入css预处理文件。 记得安装预处理包
export default function Comp () {...}

// 若在package.json中设置了browserlist则会为css文件添加各浏览器的前缀。
```

### 在js文件中添加*.module.css文件
以`[name].module.css`格式命名的文件会被当作 css module 处理。
```js
import style from './path/to/[name].module.css'
...
<div className={style.c}>...</div>
```

### 引入images/fonts/files
webpack的内置配置文件已经兼容了这些loader。所以可以直接import.
```js
// *.js
import React from 'react';
import logo from './logo.png'; // Tell webpack this JS file uses this image
import { ReactComponent as Logo } from './logo.svg';
console.log(logo); // /logo.84287d09.png
function Header() {
  // Import result is the URL of your image
  return <>
    <img src={logo} alt="Logo" />;
    <Logo />
    </>
}
export default Header;

// *.css
.Logo {
  background-image: url(./logo.png);
}
```

### 引入组件
```js
import First from './path/to/First.js'
...
<First />
```

## 代码分割
```js
// no.1
const OtherComponent = React.lazy(() => import('./OtherComponent'));

// no.2
import("./math").then(math => {
  console.log(math.add(16, 26));
});

// no.3
import React, { Component } from 'react';
class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}
export default App;
```

## 常用包
- react-router-dom
- sass

## 环境变量
- 在js文件中使用`NODE_ENV`可以定义环境变量。
- 自定义环境变量以`REACT_APP_`开头。
- 不要在react app中保存任务secret。环境变量会被打包。所以应用中任务包都可以使用环境变量。
- 环境变量被定义到`process.env`.如`process.env.REACT_APP_HI`
- 内置环境变量是`NODE_ENV`. `process.env.NODE_ENV`.
  - 当执行`npm run start`时，默认为`'development'`  
  - 当执行`npm run test`时，默认为`'test'`  
  - 当执行`npm run build`时，默认为`'production'`  
  - 也可以重写
- 定义。有2种方法
  - 在shell中设置
    - 如`REACT_APP_HI=str npm run start`
  - `.env`文件
    - 在环境变量配置文件中直接定义`REACT_APP_HI=hi`
    - 当改变环境变量配置文件时，需要重启服务。
    - 命名
      - `.env` 默认
      - `.env.local` 本地运行是使用
      - `.env.development``.env.test``.env.production` 明确指定环境变量指定的运行环境
      - `.env.development.local``.env.test.local``.env.production.local` 明确指定各环境的本地运行时的一变变量
      - 优先级
        - npm start: .env.development.local, .env.local, .env.development, .env
        - run build: .env.production.local, .env.local, .env.production, .env
        - test: .env.test.local, .env.test, .env (note .env.local is missing)
- 使用 `process.env.xxx`
- 

扩展环境变量。需要`react-scripts@1.1.0`
定义示例：  
```
// .env
// 不用以 REACT_APP_ 开头
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
# or
# REACT_APP_BAR=${DOMAIN}/bar
```

|variable|development|production|usage|默认值|
|-|-|-|-|-|
|BROWSER|y|x|默认系统的默认浏览器||
|BROWSER_ARGS|y|x|当存在BROWSER时，该参数为它服务。||
|HOST|y|x|绑定所有的hostname|localhost|
|PORT|y|x|监听的端口号。若占用会尝试下一个端口号|3000|
|HTTPS|y|x|是否在开发环境使用https协议||
|WDS_SOCKET_HOST|y|x|指定自定义的websocket hostname.通常使用`webpack-dev-server`|window.location.hostname|
|WDS_SOCKET_PATH|y|x|指定自定义的websocket的path.通常使用`webpack-dev-server`|`/ws`|
|WDS_SOCKET_PORT|y|x|指定自定义的websocket的port，用于hrm.通常`webpack-dev-server`使用`window.location.port`||
|PUBLIC_URL|y|y|cra默认应用运行在服务的根目录上。可在package.json的homepage指定别的目录。当用在cdn上时很有用。||
|BUILD_PATH|x|y|指定相对于项目根目录的目录为打包输出目录|与`/src`同级的`/build`|
|CI|y|y|当设置为true时，cra在打包时把warning对待为failures。该字段可用于test runner||
|REACT_EDITOR|y|x|指定当项目运行崩溃时点击错误能否在编辑器中打开相应文件。（需要在系统的path中设置编辑器的bin文件。）||
|CHOKIDAR_USEPOLLING|y|x|若设置为true,则watcher使用polling模式。||
|GENERATE_SOURCEMAP|x|y|当设置为false时，打生产包时不生成source map。||
|INLINE_RUNTIME_CHUNK|x|y|是否在把运行时脚本嵌入到index.html中。|true|
|IMAGE_INLINE_SIZE_LIMIT|y|y|控制是否把小于10,000bytes的资源转码为base64写入行内。当设置为0时不使用行内资源。|10,000|
|FAST_REFRESHE|y|x|当设置为false时不允许fast refresh||
|TSC_COMPILE_ON_ERROR|y|y|当设置为true是会忽略编译ts时的发现的错误，在运行时提示出来（在浏览器的console）||
|ESLINT_NO_DEV_ERRORS|y|x|当设置为true时，在开发时会把eslint错误转化为警告。||
|DISABLE_ESLINT_PLUGIN|y|y|当设置为true时，不使用eslint-webpack-plugin||
|DISABLE_NEW_JSX_TRANSFORM|y|x|当设置为true时，不转化jsx.||

## 创建pwa
- 离线、弱网优先。  

```shell
npx create-react-app my-app --template cra-template-pwa
npx create-react-app my-app --template cra-template-pwa-typescript
```
把`<root>/src/index.js`中`serviceWorkerRegistration.unregister();`改为`serviceWorkerRegistration.register();`
然后在`<root>/src/serviceWorker.js`中添回相应代码。
保持`self.__WB_MAINFEST`在任意文件。workbox编译插件检查到这个变量时会生成manifest的url的预缓存。  

### workbox-webpack-plugin
它把集成到生产配置。它把service worker编译了，再自动预缓存`webpack-`的资源。

#### webpack-资源
- html的导航请求
- xxx
- xxx

## 测试性能
在主文件中使用`reportWebVitals(console.log)`  
```js
function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = 'https://example.com/analytics';

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}
reportWebVitals(sendToAnalytics);
```

### [web-vital](https://github.com/GoogleChrome/web-vitals)
这是一个围绕底层网页 API 的小型的、生产就绪的封装器，通过准确匹配每项指标在上方列出的所有 Google 工具中的报告方式来进行指标测量。

- lcp
- fid
- cls

## 创建生产版本
执行`npm run build`。会在`<root>/build`目录中生成生产版本。
```
<root>
|-- build
    |-- static      // 这里的文件名是经过hash处理的。
        |-- main.[hash].chunk.js    // App.js里的代码
        |-- [number].[hash].chunk.js    // verder code 或者 代码分割的chunk.
        |-- runtime-main.[hash].js    // webpack runtime 逻辑代码块，用于加载、运行应用。包括在build/index.html中。当设置 INLINE_RUNTIME_CHUNK=false时，不出现此文件。
        |-- *.css
    |-- static
    |-- static
    |-- static
    |-- static
```

### 静态文件缓存
build/static目录里的文件名都有hash部分。当文件未改变时文件名不会改变。当浏览再请求是会使用缓存中的文件。反之会生成新文件，浏览器会请求新文件。
也可以在index.html的header中设置Cache-Control字段。`Cache-Control: max-age=31536000`

### 生产时分析
在ReactDOM v16.5后支持在生产模式下进行分析。
执行`npm run build --profile`。

## [test](/test/index.html)
cra使用jest（它是一个test runner）

### [jest](/test/jest/index.html)
- 运行在node环境的测试运行器
- 

### 文件命名习惯
- **__tests__目录下的*.js文件** 推荐
- *.test.js
- *.spec.js

### usage
执行`npm run test`会执行所有配置的测试文件。
```js
import sum from './sum'
it('describtion', () => {
    expect(sum(1, 2)).toEqual(3)
    expect(sum(1, 2)).toEqual(4)
})
```

### 测试组件
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
it('describe', () => {
    let div = document.createElement('div')
    ReactDOM.render(<App />, div)
})
```

### react测试库
- @testing-library/react
- @testing-library/jest-dom

```js
import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'
it('describe', () => {
    render(<App />)
    expect(screen.getByText('Learn React')).toBeInTheDocument()
})
```

### 使用三方断言库
推荐使用 **`expect()`** 断言。  
推荐使用 **`jest.fn()`** 做间谍。  
```js
import sinon from 'sinon'
import {expect} from 'chai'
```

### 初始化测试环境
运行测试脚本前的设置。  
在执行`eject`前创建`<root>/src/setupTests.js`  
```js
// <root>/src/setupTests.js
// mock一些浏览器api
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}
global.localStorage = localStorageMock
```
为jest创建一些属性。
```js
// package.json
"jest": {
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]
}
```

### Focusing and Excluding Tests
（聚集和排除测试）
```js
it()
xit()
fit()
```

### Coverage Reporting
(覆盖报告)
```shell
npm run test -- --coverage
```

> 测试时运行coverage会慢。所以建议分开执行它们。  

#### configuration
cra已经内置了jest的配置文件。可以在package.json文件中设置下列key.来明确指定配置项。

- clearMocks
- collectCoverageFrom
- coveragePathIgnorePatterns
- coverageReporters
- coverageThreshold
- displayName
- extraGlobals
- globalSetup
- globalTeardown
- moduleNameMapper
- resetMocks
- resetModules
- restoreMocks
- snapshotSerializers
- testMatch
- transform
- transformIgnorePatterns
- watchPathIgnorePatterns

```json
// demo
// package.json
{
  "name": "your-package",
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!<rootDir>/node_modules/",
      "!<rootDir>/path/to/dir/"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 90,
        "functions": 90,
        "lines": 90,
        "statements": 90
      }
    },
    "coverageReporters": ["text"],
    "snapshotSerializers": ["my-serializer-module"]
  }
}
```

### CI
Continuous Integration

#### Travis CI
```yml
# .travis.yml
language: node_js
node_js:
    - 8
cache:
    direcgtoreis:
        - node_modules
script:
    - npm run build
    - npm test
```

### 开始debug测试
根据测试环境不同，可分为：
- debugging tests in chrome
- debugging tests in vscode

#### debugging tests in chrome
```json
// package.json
"scripts": {
    "test:debug": "react-scripts --inspect-brk test --runInBand --no-cache"
}
```
运行`npm run test:debug`。在浏览器中打开`about:inspect`  

#### debugging tests in vscode
```json
// launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug CRA Tests",
            "type": "node",
            "request": "launch",
            "runtimeExcutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
            "args": ["test", "--urnInBand", "--no-cache", "--watchAll=false"],
            "cwd": "${workspaceRoot}",
            "protocal": "inspector",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "env": {"CI": "true"},
            "disableOptimisticBPs": true
        }
    ]
}
```

## 代理
### 在开发时请求代理api
```json
// package.json
"proxy": "http://localhost:4000"
```
|开发时|代理全部api|
|生产时|Accept头中无text/html的请求|

支持：http / https / websocket  

cra会把请求的url代理到指定的url上。以当前例子为例。项目在运行时会请求`http://localhost:3000/xxx`,cra会把该请求代理到`http://localhost:4000/xxx`.  
当改变代理时需要重启本地服务。  

更灵活的配置
```json
"proxy": {
    "/path0": { // 匹配以 /path0 开头的请求
        "target": "$url",
        "ws": true
    },
    "/path1": {
        "target": "$url",
        "ssl": true,
        "pathRewrite": {
            "^/foo": "/foo/beta"
        }
    },
    "/path2/[^/]*[.]html": {
        "target": "$url",
    },
    "/path3/.*[.]html": {
        "target": "$url",
    }
}
```

### 配置手动代理
当proxy字段配置不够灵活时使用[http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)  
```shell
$ npm install http-proxy-middleware --save
$ # or
$ yarn add http-proxy-middleware
```
创建`<root>/src/setupProxy.js`
```js
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        '/path0',
        createProxyMiddleware({
            target: 'http://localhost:4000',changeOrigin: true
        })
    )
}
```

## seo
cra做seo时偏弱。
### 修改`<meta>`标签
先在模板html中添加meta标签，并使用占位符设置其属性和属性值。再在服务端渲染时替换占位符。  

### 服务端插入数据
```html
<script>
    window.xxx = __PLACEHOLDER__
</script>
```
先定占位符再替换。  

## 部署
常用的部署平台
- static server。 使用`serve`包（可从npm安装），提供静态文件的本地服务。  
- node(express/koa/egg/...)  
- [aws applify]()
- [azure]()
- [firebase]()
- [github pages]()
- [heroku]()
- [netlify]()
- [vercel]()
- [render]()
- [s3 & cloudfront]()
- [surge]()

在客户端使用路径包。如`react-router`.  
package.json`"homepage": "http://xxx.com/path"`  

## 自定义模板
```
cra-template-[template-name]
|-- README.md               // 在npm的该包的首页内容
|-- template.json               // 这是模板的配置文件，这是新功能。当前只支持 package 字段。该字段会与cra的默认字段合并，形成最终的 package.json 。
|-- package.json
|-- template               // 该目录会被提到到用户的就用目录下
    |-- README.md               // 在npm的该包的首页内容
    |-- gitignore               // 会被改名为 .gitignore
    |-- public
        |-- index.html
    |-- src
        |-- index.js
        |-- (or index.tsx)
```
执行`npx create-react-app my-app --template file:../path/to/your/template/cra-template-[template-name]`可测试开发的模板项目。

## 预渲染为静态文件
- [react-snapshot](/framework/react/reactSnapshot.html)  
- [react-snap](/framework/react/reactSnap.html)  

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
`create-react-app.fn(param, first: string, second: boolean = true) => void`
description

`create-react-app.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。