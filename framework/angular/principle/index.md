# 原理

## @NgModule

## @Component

## angular elements

angular 处理类为自定义标签。然后浏览器处理自定义标签。

## @Component

## @Component

## @Component

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
