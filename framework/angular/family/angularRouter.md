# @anuglar/router

## overview

> 基于 index.html 中的 base url`<base href="/">`

### feature

- 定义路由

## install

一般使用`ng`命令行安装，不需要手动安装。
`npm i @anuglar/router`

## usage

- 可以为模块设置路由
- app-routing.module.ts
- 在模块的类文件引入，并使用`@NgModule({imports: [RouterModule.forRoot(routes)]})`或者`@NgModule({imports: [...AppRoutingModule]})`
-

```html
<a [routerLink]="[/home]">home</a>
<!-- 匹配路由后，组件的出口 -->
<router-outlet></router-outlet>
```

```ts
let routes: Routes = [
  { path: 'home', component: HomeComponent },
  // 重定向
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // 嵌套路由
  { path: 'first', component: FirstComp, children: [{
    path: 'second', component: SecondComp
  }]}
  // 动态路由
  { path: 'third/:id', component: ThirdComp }
  // 使用路由守卫
  { path: 'third/:id', component: ThirdComp, canActivate: [AuthGuard] }
  { path: 'third/:id', component: ThirdComp, children: [{
    path: '',
    canActivateChild: [AuthGuard],
    children: [{
      path: 'detail',
      component: DetailComp,
    }]
  }] canActivate: [AuthGuard] }

  // 通配路由放在最后。
  { path: '**', component: NotFountComponent },
  // ...
]
```

```ts
this.router.navigate(['path', 'path2']) // 以根路由为起点跳转
this.router.navigate(['path', 'path2'], { relativeTo: route }) // 相对于route跳转。route是ActivatedRoute.
this.router.navigate(['path', 'path2'], { queryParams: { id: 2 } }) // /path/path2?id=2
this.router.navigate(['path', 'path2'], { preserveQueryParams: true }) // 保留现有的qs
this.router.navigate(['path', 'path2'], { skipLocationChange: true }) // 保持浏览器的url不变。且传入的参数有效。
this.router.navigate(['path', 'path2'], { replaceUrl: true }) // 是否跳转
```

### 在组件中使用

```ts
<a [routerLink]="[/home]" routerLinkActive="active">home</a>
this.router.navigate(['/news'], {
  queryParams: {
    key: 'value'
  }
})
```

### 路由守卫

```

```

<!-- prettier-ignore-start -->
|||
|-|-|
|CanActivate|用来处理系统跳转到到某个路由地址的操作（判断是否可以进行访问）|
|CanActivateChild|功能同 CanActivate，只不过针对的是子路由|
|CanDeactivate|用来处理从当前路由离开的情况（判断是否存在未提交的信息）|
|CanLoad|是否允许通过延迟加载的方式加载某个模块|
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|路由守卫的返回值||
|-|-|
|true|导航将会继续|
|false|导航将会中断，用户停留在当前的页面或者是跳转到指定的页面|
|UrlTree|取消当前的导航，并导航到路由守卫返回的这个 UrlTree 上（一个新的路由信息）|
<!-- prettier-ignore-end -->

```ts
import { Injectable } from '@angular/core'
import { CanActivate, UrlTree,
 } from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {
      if (condition) {
        this.router.navigate(['/login'])
      } else {
        return false
      }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> {
      ...
    }
  canDeactivate(
    component: unknow,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ) boolean | UrlTree | Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> {
      ...
    }
  canLoad() {}
}
```

### 懒加载

1. 创建特性模块
2. 在根模块中引入并在 imports 中的要路由模块前使用特征模块。
3. 在特性模块中创建组件，创建路由。
4. 在根模块的路由中指定懒加载的模块。

```ts
const routes: Routes = [
  {
    path: 'str',
    loadChildren: () => import('path').then(m => m.CrisisModule)
  }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    })
  ]
})
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`@anuglar/router.fn(param, first: string, second: boolean = true) => void`
description

`@anuglar/router.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
