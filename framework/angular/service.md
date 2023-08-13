# 服务

可以从任何地方获取数据，比如：Web 服务、本地存储（LocalStorage）或一个模拟的数据源。
由 Injectabl 装饰器装饰的类。
提倡把与视图无关的逻辑抽取到服务中。

```shell
ng generate service heros/hero
ng g s services/<serviceName>
```

```ts
import { Injectable } from '@angular/core'
@Injectable({
  // 标记为可以被注入的服务器
  provided: 'root', // 表示当前服务在root注入器中提供。可在整个应用中单例使用。
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
