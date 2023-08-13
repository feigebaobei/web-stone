# 组件

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

|            |                          |     |     |
| ---------- | ------------------------ | --- | --- |
| @Input     | 输入属性                 |     |     |
| @Output    | 输出属性                 |     |     |
| @ViewChild | 从父组件访问子组件的数据 |     |     |
| 服务       |                          |     |     |
| @Input     |                          |     |     |
| @Input     |                          |     |     |

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
<app-a (childEmmitter)="fn"></app-a>
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
