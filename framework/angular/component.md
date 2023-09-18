# 组件

- ng 是基于组件的框架
- 组件是 ng 应用的单元块。无组件无法创建 ng 应用。
- 编译组件、数据、逻辑
- 代表一个视图区
- 必须注册与模块的 decleration 才能使用。

## 创建组件

```shell
ng g c path/to/comp
ng generate component home # 不需要使用app开头。
```

## 装饰器

```js
import { Component } from '@angular/core'
@Component({
    // 选择器
    selector: 'app-product-list',
    // 模板文件
    // template
    // template/templateUrl不能同时存在
    templateUrl: './product-list.component.html',
    // standalone // 是否需要NgModule
    // imports // 当前组件的依赖
    // 样式文件
    // styles: ['h1 {color: red;}']
    styleUrls: ['./product-list.component.scss']
    // ViewEncapsulation:
})
```

### selector

为 gn 指定要渲染的内容。标签会存在于 html 中，如：`<app-hello-word>`

### ViewEncapsulation

|           |     |     |
| --------- | --- | --- |
| ShadowDom |     |     |
| Emulated  |     |     |
| None      |     |     |

### styles

`:host`代表当前组件的根元素。  
`:host-context`代表当前组件所在文档的根元素。

## 组件之间通信

|            |                                |     |     |
| ---------- | ------------------------------ | --- | --- |
| @Input     | 输入属性                       |     |     |
| @Output    | 输出事件                       |     |     |
| @ViewChild | 从父组件访问子组件的数据、方法 |     |     |
| 模板变量   | 从父组件访问子组件的数据、方法 |     |     |
| 服务       |                                |     |     |

```js
// 子组件
import { Input, Output, EventEmmiter } from '@angular/core'
@Component({....})
export default class A {
    @Input k!: string // !表示必须传递
    @Input
    set G(p: string) {
        this._p = p // 有个缓冲，可打断。
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

{/* 父组件 */}
<child #child />
<button (click)="child.fn">bt</button>
{/* 子组件 */}
<button (click)="fn()">str</button>
fn() {...}
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

## 生命周期

每一个接口有一个生命周期方法。若要使用多个生命周期方法，则实例多个接口。

<!-- prettier-ignore-start -->
| 钩子函数 | 触发时机   |  接口   |一般用于做什么|
| --------------------- | ------------------- | --- | - |
| ngOnChanges           | 被绑定的输入属性值发生变化时触发，会调用多次；如果没有使用到父子组件传值，则不会触发 | OnChanges    ||
| ngOnInit              | 初始化组件时会调用一次，一般是用来在构造函数之后执行组件复杂的初始化逻辑| OnInit    |执行constructor外的、复杂的初始化工作。启动组件后设置输入值。|
| ngDoCheck             | 只要数据发生改变就会被调用           |  DoCheck   ||
| ngAfterContentInit    | 组件内容渲染完成后调用一次     | AfterContentInit    ||
| ngAfterContentChecked | 只要组件的内容发生改变就会被调用| AfterContentChecked    ||
| ngAfterViewInit       | 视图加载完成后触发一次，一般用来对视图的 dom 元素进行操作 | AfterViewInit    ||
| ngAfterViewChecked    | 视图发生变化时调用，在组件的生命周期中会调用多次          | AfterViewChecked    ||
| ngOnDestroy           | 只在销毁组件时调用一次，一般用来在组件销毁前执行某些操作  | OnDestroy    |自动防止内存溢出：取消订阅observable/dom event.停止interval.注销全局的、服务的所有回调。|
<!-- prettier-ignore-end -->

## form

### formBuilder

```ts
1. 创建一组form的数据
2. 为form的元素绑定name值与form的数据

export class CompName {
    checkoutForm = this.formBuilder.group({
        name: '',
        address: '',
    })
    constructor() {...}
    onSubmit() {
        clog(this.checkoutForm.vlaue)
        this.checkoutForm.reset()
    }
}

<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
    <div>
        <label for="name">name</label>
        <input id="name" type="text" formControlName="name" />
    </div>
    <div>
        <label for="address">address</label>
        <input id="address" type="text" formControlName="address" />
    </div>
    <button type="submit">sss</button>
</form>
```

## content project

与 slot、children 类似

```
@Component({
    ...
    template: `
        ...
        <ng-content></ng-content>
        <ng-content select="[sk]"></ng-content>
    `
})
<app-comp-name>
    <p>str</p>
    <p sk>sss</p>
</app-comp-name>
```

## dynamic component

```
import { Directive, ViewContainerRef } from '@angular/core'
@Directive({
    selector: '[adHost]', // 有[]
})
export class AdDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}

template: `
    <div>
        <ng-template adHost></ng-template>
    </div>
`
```

## class & style

```
[class.sale]="onSale"
[class]="classExpression"
string

[class]="classExpression"
{key: boolean}

[class]="classExpression"
['key']
```

```
[style.background-color]="exp"
[style.backgroundColor]="exp"
[style.width.px]="w"
[style]="exp"
"height: 17px;width: 16px"

[style]="exp"
{width: 6px, heigth: 8px}
```

## event

```
<!--  -->
<button (click)="onEvent()">st</button>

<!-- 绑定键盘事件 -->
<input (keydown.shift.t)="onKeydown($event)" />
<input (keydown.code.shiftleft.altleft.keyt)="onKeydown($event)" />
```

## 双向绑定 two-way binding
