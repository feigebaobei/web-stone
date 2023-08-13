# 基础知识 这个文章日后会分别迁移到别的文章中

## 组件 component

- ng 是基于组件的框架
- 组件是 ng 应用的单元块。无组件无法创建 ng 应用。
- 编译组件、数据、逻辑
- 代表一个视图区
- 必须注册与模块的 decleration 才能使用。

### 组件之间共享数据

|                                       |     |     |
| ------------------------------------- | --- | --- |
| 父组件中使用`@Input`声明数据。        |     |     |
| 子组件中使用`@Output`声明数据         |     |     |
| 使用`Emitter`处理子组件到父组件的数据 |     |     |
| 使用`@ViewChild`修饰子组件。          |     |     |
|                                       |     |     |

### module & component

|     | module                                          | component        |     |     |
| --- | ----------------------------------------------- | ---------------- | --- | --- |
|     | 包括一个或多个组件。不控制视图。                | 控制视图（html） |     |     |
|     | 可以声明很多组件。module 内的组件可以互相引用。 | 与其它组件通信   |     |     |
|     | 可以管理当前 module 内组件。                    | 为应用提供服务   |     |     |
|     |                                                 |                  |     |     |

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

## message

## 模块 【日后迁移走】

NgModule.它是 Angular 模块。Angular 应用由一个一个模块组成。
不是 esm/cjs 中的模块。
是一系统相关功能的集合。
它是由 NgModule 装饰的类。
每一个模块就是一个打包块。

- 一个应用至少一个模块。
- 模块之间可引用。
- 指令、组件、管道必须属于一个模块。（有且只有一个）

### [字段说明](/framework/angular/decorator.md)

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

angular 会创建一个注入器`Injector`来促进“依赖消费者”和“依赖提供者”之间的互动。当有请求依赖项时，注入器会检查其注册表中是否有可用的实例。若无，则创建一个新实例，存储在注册表中，再返回实例。若有，则返回实例。
注入器应用于全应用。称为根注入器。
一般不用手动创建注入器，但是要知道它是连接提供者与消费者的。

### 提供依赖项

使用`@Injectable`装饰器。

```ts
@Injectable()
class HeroService {}
```

提供者分为三个级别。

- 组件级别 作用于当前组件内的组件、指令。
- NgModule 组件 作用于当前模块内的组件、指令、管道。
- 根级别 作用于全应用。

```ts
@Component({
  selector: xx
  template: xx
  providers: [HeroService]
})
class HeroComponent {}

@NgModule({
  declarations: [xxx],
  providers: [HeroService],
})
class HeroModule {}

@Injectable({
  providedIn: 'root' // 与在根模块中使providers功能相同。
})
class HeroService {}
```

### 注入依赖项

```ts
@Component({...})
class HeroComponent {
  constructor(private service: HeroService) {}
}
```

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
