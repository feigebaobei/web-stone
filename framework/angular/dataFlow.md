# 数据传递

## @Input()

- 只限于父传子。
- 在后期迭代中需要严格保持父子关系（树型关系）
- 一般应用于小范围使用

```html
<app-child [k]="v"></app-child>

@Input() k: string;
```

## @Output()

- 只限于子传父
- 在后期迭代中需要严格保持父子关系（树型关系）
- 需要与自定义事件结合使用。
- 一般应用于小范围使用
- 只能传递一个参数。（注意参数数量为 1）

```html
<button (click)="cH()">str</button>
@Output() messageEvent = new EventEmitter() ch(){ this.messageEvent.emit('str')
}
<app-child (messageEvent)="receiveMessage($event)"></app-child>
```

## Service & Rxjs

- service 提供共享的数据，管理数据。
- `Subject`类与 service 管理数据，通知所有订阅数据的组件。当数据改变时通知。

```js
// data.service.js
export class DataService {
    private data = new Subject<string>()
    setData(v: strign) {
        this.data.next(v)
    }
}
// sender.component.ts
export class SenderComponent {
    constructor(private dataService: DataService) {
    }
    sendData() {
        this.dataService.setData('str')
    }
}
// receiver.component.ts
export class ReceiverComponent implements OnDestroy {
    constructor(private dataService: DataService) {
        this.subscription = this.dataService.data.subscribe(data => {this.data = data})
    }
    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
```

## service & signal

- 中心化方式管理（更新）数据。
- 不用学习 rxjs
- 很像 react 里的 useState

```js
import { signal} from '@angular/core'
export class DataSignalService {
    private data = signal('')
    setData(v: string) {
        this.data.set(v)
    }
    // update(cb) {
    //   this.data.update(cb)
    // }
    add(n) {
      this.data.update((value) => value + n)
      // <=>
      // this.data.set(this.data() + n)
    }
    // effect(() => {
    //   this.data()
    // })
    getData() {
        return this.data()
    }
}
// sender.component.ts
this.dataService.setData(str)
// receiver.component.ts
this.data = this.dataService.getData()
```

### signal

是一个值的包装器。可以在该值变化时通知相关消费者。可以包含任何值。

```js
let count: WritableSignal<N> = signal(0)
let doubleCount: Signal<N> = computed(() => count() * 2) // 计算信号不可写
```

doubleCount 信号取决于 count。每当 count 更新时，Angular 知道任何依赖于 count 或 doubleCount 东西也需要更新。
计算信号的依赖性是动态的。只有逻辑分支中使用到了信号才会触发副作用。
副作用是一种操作，只要一个或多个信号值发生变化就会运行。你可以使用 effect 函数创建副作用

- 记录正在显示的数据及其更改时间，用于分析或作为调试工具
- 在数据与 window.localStorage 之间保持同步
- 添加无法用模板语法表达的自定义 DOM 行为
- 对 <canvas>、图表库或其他第三方 UI 库执行自定义渲染
- 需要一个注入上下文。在组件、指令、服务的 constructor 中调用 effect。或者赋给一个变量。
- 为 effect 的设置 injector 选项可以在 constructor 外创建副作用。
- 调用副作用返回的 EffectRef.destroy()可以手动销毁它。
- 当副作用的上下文被销毁时它会自动销毁。即当组件、指令、服务被销毁时副作用也会被销毁。

```js
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSignalService {
  private data = signal('');

  setData(update: string) {
    this.data.set(update);
  }

  getData(){
    return this.data;
  }
}

import { Component } from '@angular/core';
import { DataSignalService } from '../data.service';

@Component({
  selector: 'app-sender-signal',
  template: `
    <h3>Sender Component</h3>
    <button (click)="sendData()">Send Data</button>
  `,
})
export class SenderSignalComponent {
  constructor(private dataService: DataSignalService) {}

  sendData() {
    this.dataService.setData('Data from Sender Component');
  }
}

import { Component, effect } from '@angular/core';
import { DataSignalService } from '../data.service';

@Component({
  selector: 'app-receiver-signal',
  template: `
    <h3>Receiver Component</h3>
    <p>{{ data() }}</p>
  `,
})
export class ReceiverSignalComponent {
  data;

  constructor(private dataService: DataSignalService) {
    this.data = this.dataService.getData();
    // effect(() => {
    //   this.data()
    // })
  }
}
```

#### 共享信号

```ts
// utils
import { Injectable, signal, Inject } from '@angular/core'
// type
import type { WritableSignal } from '@angular/core'
type a = any

// @Injectable({
//   providedIn: 'root'
// })
export class ShareSignal<T> {
  private data: WritableSignal<T>
  constructor(
    // @Inject(Object)
    initValue: T
  ) {
    this.data = signal<T>(initValue)
  }
  set(value: T) {
    this.data.set(value)
  }
  get() {
    return this.data()
  }
}
```

## 状态管理工具

- NgRx（受 redux 影响的状态管理工具）
- Akita
- Eif

## 后端接口

## qs

- url 太长了不好看。

```
{path: 'p',
component: pComponent,
queryParams: {
    key: v
}
}
this.route.snapshot.queryParamMap.get('key')
```

## route params

```
{ path: 'p/:id', component: pC }
this.route.params.subscribe(p => {
    clog(p.id)
})
```

## Navigation

```
this.router.navigate(['/a', '/b'], {
    state: {
        k: 'v'
    }
})
let state = this.router.getCurrentNavigation().extra.state
if (state) {clog(state.k)}
```

## ls & ss

## cookie

反对
