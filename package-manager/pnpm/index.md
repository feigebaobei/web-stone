# `pnpm`

## overview
> 快速、有效.  
> 支持一库多包。  
> 创建非平的node_modules。不支持直接访问包。  
    > 通过指定工作空间去实现。  

### feature
- 多包一库管理工具。  
- 包管理工具。与npm/yarn同功能。  

## install
非node.js环境
```
// posix system
curl -fsSL https://get.pnpm.io/install.sh | sh -
// or
wget -qO- https://get.pnpm.io/install.sh | sh -
```
node.js环境
```
// macos
curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
// windows
(Invoke-WebRequest 'https://get.pnpm.io/v6.16.js' -UseBasicParsing).Content | node - add --global pnpm
```
`npm i pnpm -g`

## usage

## configuration
默认配置文件：`path/to/file.json`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## cli
|||||
|-|-|-|-|
|add||安装包|同`npm install <pkg>`|
|import||生成pnpm-lock.yaml||
|install|i|安装所有依赖|同`npm install`|
|install-test|it|执行完pnpm install后执行pnpm test||
|link|ln|创立本地软链接||
|prune||删除无关联的依赖包||
|rebuild|rb|重新打包||
|remove|rm|删除本项目的node_modules||
|unlink||取消本地软链接||
|update|up|更新依赖包成为允许的最新版本||
|audit||检查不安全的依赖||
|list|ls|以树状结构列出所有依赖||
|outdated||检测过时的依赖包||
|exec||执行指定command||
|run||执行指定脚本|同`npm run`|
|start||执行start脚本||
|test||执行test脚本||
|pack||||
|publish||发布包||
|root||||
|store add||||
|store add||||
|store add||||
|store add||||
|store add||||
|...还有一些未在help中显露的子命令||||

`-c / --dir` 指定工具目录  
`-w / --workspace-root` 指定工具根目录  
`pnpm exec` 运行本地、远端指定包  
`--filter xxx`  

## api

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。