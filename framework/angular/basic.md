# 基础知识

## 组件 component

- ng 是基于组件的框架
- 组件是 ng 应用的单元块。无组件无法创建 ng 应用。
- 编译组件、数据、逻辑
- 代表一个视图区
- 必须注册与模块的 decleration 才能使用。

### 组件之间共享数据

1. 父组件中使用`@Input`声明数据。
2. 子组件中使用`@Output`声明数据
3. 使用`Emitter`处理子组件到父组件的数据
4. 使用`@ViewChild`修饰子组件。

### module & component

|     | module                                          | component        |     |     |
| --- | ----------------------------------------------- | ---------------- | --- | --- |
|     | 包括一个或多个组件。不控制视图。                | 控制视图（html） |     |     |
|     | 可以声明很多组件。module 内的组件可以互相引用。 | 与其它组件通信   |     |     |
|     | 可以管理当前 module 内组件。                    | 为应用提供服务   |     |     |
|     |                                                 |                  |     |     |

## directive 指令

- 操作 dom

分类

- 组件指令
- 结构指令 `*ngFor/*ngIf/*ngSwitchCase`
- 属性指令 `*ngStyle/*ngClass`
- 自定义指令

## pipe

内置 pipe

- uppercase pipe
- lowercase pipe
- decimal / number pipe
- currency pipe
- date pipe
- json pipe
- precent pipe
- slice pipe

### 自定义 pipe

`ng g pipe Pipes/<pipeName>`
会在指定目录下生成 pipe 的模板文件。
会在`app.module.ts`中注册 pipe.

```html
<p>{{city | append}}</p>
```

## service

可以从任何地方获取数据，比如：Web 服务、本地存储（LocalStorage）或一个模拟的数据源。
由 Injectabl 装饰器装饰的类。
提倡把与视图无关的逻辑抽取到服务中。

```shell
ng generate service heros/hero
ng g s services/<serviceName>
```

```ts
import { Injectable } from '@angular/core'
@Injectable({
  // 标记为可以被注入的服务器
  provided: 'root', // 表示当前服务在root注入器中提供。可在整个应用中单例使用。
})
export class Asdf {
  constructor() {}
  fn() {}
}
```

在`app.module.ts`中引入

```ts
...
providers: [Asdf]
```

## interface

`ng g i models/interfaceName`
就是 ts 的`interface`

## form

ngFormGroup
...

## route

```ts
import { RouterModule } from '@angular/router';
...
imports: [
    ...
    RouterModule.forRoot([
        { path: '/path', component: CompName },
        { path: '/path2', component: CompNameTwo },
        ...
    ])
]
```

```ts
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
let clog = console.log

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => {
      let id = value.get('id')
      let title = value.get('title')
      clog('id', id, title)
    })
    this.route.queryParamMap.subscribe((value) => {
      let id = value.get('one')
      let title = value.get('two')
      clog('one', id, title)
    })
  }
}
```

```html
<!-- app.module.ts -->
<router-outlet></router-outlet>
```

### 单文件

## module

我在它中设置了路由映射。

## message

## 模块

NgModule.它是 Angular 模块。Angular 应用由一个一个模块组成。
不是 esm/cjs 中的模块。
是一系统相关功能的集合。
它是由 NgModule 装饰的类。
每一个模块就是一个打包块。

- 一个应用至少一个模块。
- 模块之间可引用。
- 指令、组件、管道必须属于一个模块。（有且只有一个）

### [字段说明](/framework/angular/decorator.md)

### 模块 & esm & cjs

|     | NgModule               | 模块                   | module                           |
| --- | ---------------------- | ---------------------- | -------------------------------- |
|     | angular                | esm                    | cjs                              |
|     | 使用@NgModule 修饰的类 | 每个文件都是一个模块。 | 每个文件都是一个模块             |
|     | -                      | import / export        | require / module.exports/exports |
|     |                        |                        |                                  |
|     |                        |                        |                                  |

### 根模块

一个 angular 应用至少有一个。用于启动应用。

## 项目结构

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

## 生命周期

## dependency injection di 依赖注入

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
