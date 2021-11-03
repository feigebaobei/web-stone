# overview
本示例展示了：
- snowpack + vue  
- 操控本地文件的路径与打包后的文件的路径。

# init project
```
// 使用snowpack创建项目。
mkdir second
cd second
npm init -y
npm i snowpack @snowpack/plugin-vue -D
npm i vue@next
npm set-secript dev "snowpack dev"
npm set-secript build "snowpack build"
snowpack init
```

## 创建文件
创建`<root>/public/index.html`
``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Snowpack App" />
    <link rel="stylesheet" type="text/css" href="/index.css" />
    <title>Starter Snowpack App</title>
  </head>
  <body>
    <h1>Welcome to Snowpack!</h1>
    <p>hi stone</p>
    <div id="root"></div>
    <script type="module" src="/dist/index.js"></script>
  </body>
</html>
```

创建`<root>/public/index.css`
``` css
/* Add CSS styles here! */
body {
  font-family: sans-serif;
}
```

创建`<root>/public/1.jpg`  

创建`<root>/src/App.vue`
``` vue
<template>
    <div>Welcome to my Vue app!</div>
    <p>Page has been open for <code>{{count}}</code> seconds.</p>
    <img src="/1.jpg" alt="" />
</template>
<script>
import { onMounted } from 'vue'
  export default {
    data () {
      return {
        count: 0
      }
    },
    mounted() {
      setInterval(() => {this.count++}, 1000)
    },
  };
</script>
<style>
  .App-header {
    background-color: #f9f6f6;
    color: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
  }
  .App-logo {
    height: 36vmin;
    pointer-events: none;
    margin-bottom: 3rem;
    animation: App-logo-pulse infinite 1.6s ease-in-out alternate;
  }
  @keyframes App-logo-pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
</style>
```

创建`<root>/src/index.js`
``` js
import {createApp} from 'vue'
import App from './App.vue'
createApp(App).mount('#root')
```
编辑`<root>/snowpack.config.mjs`
``` js
...
mount: {
    public: '/',
    src: '/dist'
},
plugins: {
    '@snowpack/plugin-vue'
},
...

```

## dir construct
```
<root>
|-- src // 说明主要文件/目录的功能
    |-- App.vue
    |-- index.js
|-- public
    |-- 1.jpg
    |-- index.css
    |-- index.html
|-- snowpack.config.mjs
|-- xxxx
```

## 本地启动
```
npm run dev
```

## 打包
```
npm run build
```

# usage
如何使用的。

# 后记
`@snowpack/plugin-vue`让`snowpack`知道如何打包`*.vue`。  

本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。