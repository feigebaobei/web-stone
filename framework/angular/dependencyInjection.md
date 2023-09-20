# 依赖注入

让 class 可以使用 angular 的修饰函数，如 Components/Directives/Pipes/...

依赖消费者、依赖提供者

angular 创建一个 Injector，里面放着所有依赖提供者类的实例（每一个类只有一个实例）。在全应用范围内有效。当有依赖消费者需要使用时，angular 会判断 Injector 中是否存在相应实例，若存在则返回该实例，否则创建一个实例放入 Injector 并返回该实例。

## 依赖提供者 Providing dependency

```ts
// 在组件访问依赖提供者
@Component({
  selector: 'hero-list',
  template: '...',
  // 可以使用providers指定作用的级别。
  // 该示例作用于
  providers: [HeroService],
})
class HerorService {}

// 注册到指定模块
// 可以使本模块内的所有组件、指令、pipes都可访问。
@NgModule({
  declarations: [HeroListComponent],
  providers: [HeroService],
})
class HeroListModule {}

// 注册到全局
@Injectable({
  providedIn: 'root',
})
class HeroService {}
```

## 依赖消费者 injecting a dependency

```ts
// no.1写法
@Component({...})
class HeroListComponent {
    constructor(private service: HeroService) {}
}

// no.2写法
@Component({...})
class HeroListComponent {
    private service = inject(HeroService)
}
```

## 服务

服务包括很多东西。它可以是方法、应用的功能。常用使用它完成 di.
它可以让组件变轻薄、高效。
处于视图层和逻辑层之间。  
可以被组件、其他服务使用。

```
let {
    log:clog,
    error:cer,
    warn:cw,
} = console
export class Logger {
    log(msg: S) {clog(msg)}
    error(msg: S) {cer(msg)}
    warn(msg: S) {cw(msg)}
}

export class HeroService {
    constructor(
        private backend: BackendService,
        private logger: Logger
    ) {...}
}
```

### 创建一个 injectable service

```shell
ng generate service heroes/hero
# ng g s heroes/hero
```

```ts
// src/app/heroes/hero.service.ts
import { Injectable} from '@angular/core'
@Injectable({ // 指明该类用于di系统
    providedIn: 'root', // 表示可以在该应用范围内使用该服务
})
export class HeroService
```

### 注入

在组件的类中使用

```
constructor(heroService: HeroService) {...}
```

在其他类中使用，同理。
