# 基础知识

## component

- ng 是基于组件的框架
- 组件是 ng 应用的单元块。无组件无法创建 ng 应用。
- 编译组件、数据、逻辑
- 代表一个视图区
-

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

`ng g s services/<serviceName>`

```ts
import { Injectable } from '@angular/core'
@Injectable({
  provided: 'root',
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
