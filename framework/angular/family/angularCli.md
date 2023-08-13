# @angular/cli

## overview

> node v10.9.0+
> npm 8.5.0+
> develop  
> scaffold  
> maintain  
> compile
> update / maintain / scaffold / develop

### feature

- feature0
- feature1
- feature2

## install

`npm i @angular/cli`

## usage

```shell
ng v # 查看angular cli版本
ng help
ng new project-name # 创建新应用
cd project-name
ng g c path/compName # 创建的组件会自动注册
ng g s path/service # 创建服务
ng g module moduleName # 创建module
ng serve # 运行项目

```

### title

```shell
ng g component dir/comp-name
ng g pipe Pipes/<pipeName>
ng g guard dir/name
ng g module crisis --module app -routing # 创建危机中心模块（自动在 app.moudule.ts 中引入新创建的 CrisisModule、添加当前模块的路由配置）
ng new component xxx # 创建名为 xxx 的特性模块
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`@angular/cli.fn(param, first: string, second: boolean = true) => void`
description

`@angular/cli.fn(param, [options: {a: string, b?: number}])`
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
