# 组件

- ng 是基于组件的框架
- 组件是 ng 应用的单元块。无组件无法创建 ng 应用。
- 编译组件、数据、逻辑
- 代表一个视图区
- 必须注册与模块的 decleration 才能使用。

## 创建组件

`ng g c path/to/comp`

## 装饰器

```js
import { Component } from '@angular/core'
@Component({
    // 选择器
    selector: 'app-product-list',
    // 模板文件
    templateUrl: './product-list.component.html',
    // 样式文件
    styleUrls: ['./product-list.component.scss']
})
```

## 组件之间通信

|            |                                |     |     |
| ---------- | ------------------------------ | --- | --- |
| @Input     | 输入属性                       |     |     |
| @Output    | 输出事件                       |     |     |
| @ViewChild | 从父组件访问子组件的数据、方法 |     |     |
| 服务       |                                |     |     |

```js
// 子组件
import { Input, Output, EventEmmiter } from '@angular/core'
@Component({....})
export default class A {
    @Input k: string
    @Input
    set G(p: string) {
        this._p = p
    }
    get G() {
        return this._p
    }
    constructor() {}

    @Output() childEmmitter = new EventEmmiter<string>()
    fn() {
        this.childEmmitter.emit('str')
    }
}
// 在父组件中使用子组件
<app-a (childEmmitter)="fn" [k]="kVar" [G]="GVar"></app-a>
```

```js
// - 在根模块中提供
// - 服务挂在根模块中

// import 服务
constructor(private s: S) {}
fn() {
    this.s.setValue(..)
}
fn2() {
    let v = this.s.getValue()
    // ...
}
```
