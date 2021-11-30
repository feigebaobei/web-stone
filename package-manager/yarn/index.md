# `yarn`

## overview
> 它是一个包管理工具。类似产品有：npm/pnpm  
> cli  

### feature
- offline mdoe  
- meterministic  
- network performance  
- network resilicense  
- flat mode // pnpm是树型结构  
- 很多表情  

## install
`npm i yarn -g`  
`yarn --version` 若返回版本号，则安装成功。  

## usage
同`./demo.md`
```
const yarn = require('yarn');
// or
// import yarn from 'yarn';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## cli
`yarn init` init project
`yarn add [package]` add package
`yarn add [package]@[version]` add package
`yarn add [package]@[tag]` add package
`--dev` 安装到devDependencies
`--peer` 安装到peerDependencies
`--optional` 安装到optionalDependencies
`yarn upgrade [package]` upgrade package
`yarn upgrade [package]@[version]` upgrade package
`yarn upgrade [package]@[tag]` upgrade package
`yarn remove [package]` remove package
`yarn` 安装项目中的依赖
`yarn init` init project
`yarn init` init project
`yarn init` init project
`yarn init` init project
`yarn init` init project

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。