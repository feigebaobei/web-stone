# @angular/common

## overview

> 内部由多个功能块组成。

### feature

- feature0
- feature1
- feature2

## install

这是 angular 内置包。一般不需要安装。
`npm i @angular/common`

## usage

```js

```

## http

- 可执行 http 请求
- 一般把请求功能封装在一个[服务](/framework/angular//service.html)中。
- 返回值是 Observable 对象

```ts
// app.module.ts
import { HttpClientModule } from '@angular/common/http'
...
imports: [
    ...
    HttpClientModule,
]

// user.service.ts
import { HttpClient, HttpInterceptor } from '@angular/common/http'
import type { User } from '...'
import type { Observable } from 'rxjs'

interface ResUser {
    code: number
    message: string
    data: User
}

@Injectable({
    providedIn: 'root'
})
export class UserService implements HttpInterceptor {
    constructor(private http: HttpClient) {
        //
    }
    getUser(): Observable<User> {
        let url = '...'
        return this.http.get<ResUser>(url, {
            responseType: 'json',
            Authorization: 'token'
        }).pipe(
            retry(3),
            catchError(this.handleError)
        )
    }
    // 可以有多个拦截器
    intercept(req: HttpRequest<any>: next: HttpHandler) {
        return next.handle(req)
            .pipe(
                // tap(),
                finalize(() => {})
            )
    }
}

// feature.component.ts
// import {httpClient, HttpHeaders} from '@angular/common/http'
import { UserService } from '/path/to/userService'
....
constructor(private service: UserService) {...}
// 使用
getUser() {
    this.service.getUser().subscribe({
        next: (response) => {
        this.user = response
    },
    error: (error) => {
        clog(error)
    }})
}
// this.http.get(url).subscribe(res => {thsi.res = res})
```

#### api

```ts

```

### form

### title

### title

### title

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

`@angular/common.fn(param, first: string, second: boolean = true) => void`
description

`@angular/common.fn(param, [options: {a: string, b?: number}])`
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
