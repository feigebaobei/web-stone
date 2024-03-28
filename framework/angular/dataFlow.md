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

```
import { signal} from '@angular/core'
export class DataSignalService {
    private data = signal('')
    setData(v: string) {
        this.data.set(v)
    }
    getData() {
        return this.data
    }
}
// sender.component.ts
this.dataService.setData(str)
// receiver.component.ts
this.data = this.dataService.getData()
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
