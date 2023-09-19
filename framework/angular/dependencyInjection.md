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
