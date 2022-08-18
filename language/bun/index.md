# bun
> 当前（2022.08）处于beta（测试）阶段
> 打包、转化、安装、运行js/ts 
> 新的js runtime  
> 集打包器、编译器、任务运行器、npm客户端于一体。  
> 与node/Deno是竞品。 
> start fast
> 高级别性能 
> 可在已经存在的js/ts项目中运行。
> 目标是让js脱离浏览器运行。
> 使用[zig](https://ziglang.org/)（语言）写的
> 基于javascriptcore引擎。

## feature
- Bun.Transpiler是bun的ts/jsx的编译器。  
- 支持esm / cjs （通常bun.js使用esm规范）
- 已经内置很多web api.(如：fetch / websocket / readableStream)
- 支持使用node_modules. bun内部使用esm.
- 支持js/ts/jsx
- 支持tsconfig.json中的paths/jsxImportSource/...  
- Bun.write。使用系统中最快的方法执行写操作。  
- 自动从`.env`添加环境变量。
- 内置了SQLite3  bun.sqlite
- 实现了很多node api。  Node-API
- bun：ffi调用native code
- 支持不断增长的Node.js核心模块列表，以及像Buffer和process这样的全局模块    node:fs node:path
- 把.env加载到`process.env``Bun.env`

## install
```shell
curl https://bun.sh/install | bash
# 安装成功后执行
/bin/zsh
bun --help
```

## 如何工作
- 基于JavaScriptCore引擎，它给v8快。
- 使用zig编写。它是低层语言，可手动管理内存。  
- 

## 为什么会快
zig管理内存。

## cli
```shell
bun run $xx     # 运行脚本
bun install     # 安装依赖
bun wiptest     # 内置了类jest的测试运行器
```

## todo
### title
它出现前已经存在了好多js/node.它做了好多兼容已经存在于市场的东西。

### bun & node & deno
用法上没发现有区别

||bun|node|deno||
|-|-|-|-|-|
||||||



### title
### title
### title
### title
### title