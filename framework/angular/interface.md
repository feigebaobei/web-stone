# interface

```shell
ng generate interface housinglocation
```

接口：自定义数据类型。

```ts
// src/app/housinglocation.ts
export interface HousingLocation {
  id: number
  name: string
  city: string
}
```
