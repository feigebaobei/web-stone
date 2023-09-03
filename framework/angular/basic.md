# 基础知识 这个文章日后会分别迁移到别的文章中

## 组件 component

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

## 生命周期
