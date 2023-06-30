# @angular/common

## overview

> TODO: description

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

### http

```ts
// app.module.ts
import { HttpClientModule } from '@angular/common/http'
...
imports: [
    ...
    HttpClientModule,
]

// feature.component.ts
import {httpClient, HttpHeaders} from '@angular/common/http'
....
constructor(private http:HttpClient) {}
// 使用
// this.http.get(url).subscribe(res => {thsi.res = res})
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
