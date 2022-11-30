# 初始化一个 ts 项目

```shell
mkdir ts-proj
cd ts-proj
npm i -D typescript
npx tsc --init
```

编写一个示例文件

```ts
let world = 'world'
export function hello(who: string = world): string {
  return `Hello ${world}`
}
```

```shell
npx tsc
# or 观察模式
# npx tsc -w
```

会得到` <root>/build/index.js``<root>/build/index.js.map `

```shell
npm i -D gts
npx gts init
```
