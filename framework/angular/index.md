# angular

## description

自信地完成 web 应用开发。
创建单页面应用。  
npm 8.5.0+  
基于组件的前端框架。可创建可扩展的前端应用。  
使用 ts 开发。（ng 是 google 出品，ts 是 microsoft 出品）  
内置很多功能。如：router/c&s 通信/形式管理/
内置开发工具。可用于开发、打包、测试。  
基于组件开发  
持续迭代的库

## feature

- 任意扩展
- 打包工具好。还是基于 webpack 搞的。

## install

## setup

```shell
yarn create @angular my-app
cd my-app
yarn start
# 打开 localhost:4200
```

## [usage](/framework/angular/usage/index.html)

```shell
npm i -g @angular/cli
ng v # 查看版本
ng new first-app # 创建一个应用
cd first-app
ng serve
    # --open / -o
    # --port
ng g component product-list
```

### 项目结构

```
<root>
|-- angular.json    angular应用的配置文件
|-- src             源代码
  |-- main.ts       入口文件
  |-- index.html    单页面应用的入口html文件。
  |-- assets        资源文件
  |-- app/app.component.ts    根组件的类文件
  |-- style.scss    样式入口文件
|-- tsconfig.json   ts的配置文件
|-- tsconfig.app.json   应用的ts的配置文件
|-- tsconfig.spec.json   应用的测试的ts的配置文件
```

## [组件](/framework/angular/component.html)

## [模板](/framework/angular/template.html)

## [指令](/framework/angular/directive.html)

## [管道](/framework/angular/pipe.html)

## [生命周期](/framework/angular/lifeCircle.html)

## [表单](/framework/angular/form.html)

## [字段说明](/framework/angular/decorator.md)

## [principle](/framework/angular/principle/index.html)

## angular js & angular

|     | angular js      | angular           |     |
| --- | --------------- | ----------------- | --- |
|     | mvc             | mvvm              |     |
|     | js              | ts                |     |
|     | two-way binding | flux architecture |     |
|     |                 |                   |     |
|     |                 |                   |     |

## [basic](/framework/angular/basic.html)

- component
- directive
- module
- xxx

```ts
// 全写
class A {
  private foo: T
  constructor(_foo: T) {
    this.foo = _foo
  }
}
// 简写
class A {
  constructor(private foo: T) {}
}
```

## title

## title

## 家族

- [@angular/cli](/framework/angular/family/angularCli.html)
- [@angular/router](/framework/angular/family/angularRouter.html)
- [@angular/common](/framework/angular/family/angularCommon.html)
- [@angular/core](/framework/angular/family/core.html)
- [@angular/module](/framework/angular/family/module.html)
- [@angular/cli](/framework/angular/family/angularCli.html)
- [@angular/cli](/framework/angular/family/angularCli.html)
- [@angular/cli](/framework/angular/family/angularCli.html)

## 生态

- [@angular/create](/framework/angular/)
