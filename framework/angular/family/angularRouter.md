# @anuglar/router

## overview

> TODO: description

### feature

- feature0
- feature1
- feature2

## install

一般使用`ng`命令行安装，不需要手动安装。
`npm i @anuglar/router`

## usage

```html
<a [routerLink]="[/home]">home</a>
<!-- 匹配路由后，组件的出口 -->
<router-outlet></router-outlet>
```

```ts
let routes: Routes = [
  { path: 'home', component: HomeComponent },
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

### 懒加载

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
