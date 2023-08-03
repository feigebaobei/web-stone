# readme.md

说了它有哪些功能。
使用什么实现
与 axios 有什么不同。
推荐使用 alova。（不要信它的。）
生态内的主要包。
居然没有说怎么使用。没有示例。

# package.json

定义各种脚本。  
定义输出。（就是`exports`）  
使用 rollup 打包。配置文件在`<root>/config/`
创建了`<root>/config/rollup.config.js`，却没有使用。打包时使用了` <root>/config/rollup.config.esm.js``<root>/config/rollup.config.umd.js `

# package-lock.json

证明 alova 使用 npm 包管理工具。

# tsconfig.json

这是`tsc`的配置文件。

# jest.config.ts

使用 jest+ts 执行测试。

# config/

它是 rollup 配置文件的目录。`<root>/config/rollup.config.esm.js`和`<root>/config/rollup.config.umd.js`差不多。我们就以`<root>/config/rollup.config.esm.js`为例入手。

### config/rollup.config.esm.js

配置值几乎全是从`config/rollup.js`引入的。

### config/rollup.js

为 5 个包(` core``vue``react``svelte``globalFetch `)定义了入口文件、出口文件。
官网说`core`是核心包，其他 4 个是适配相应环境的包。我不喜欢这种设计方式。我认为应该对用户黑盒。用户只管用，包内处理多种环境的逻辑。
先看 core,再看 vue,再看 globalFetch。其他的与 vue 差不多。

### config/rollup.config.js

它是为 cjs 规范打包的。未使用它打包，造成了 alova 不支持 server 环境。
有可能日后会使用它打包。

# src/index.js

# src/predefine/VueHook.ts

# src/predefine/GlobalFetch.ts

# 目录结构

很好。

```
<root>
|-- config      打包的配置文件
|-- src         源代码
|-- test        测试文件
|-- typings     ts的类型目录。
|-- package.json
|-- xxx
|-- xxx
|-- xxx
|-- xxx
|-- xxx
|-- xxx
|-- xxx
```

# title

# title

# title

# title

# title
