# `pnp`

## overview
> 提供一个简单的安装策略。  
> 提供即插即用(不需要用户设置或干预也能完成功能)的api.
> 提供运行时内省依赖树。  
> 运行时一直检测。  

## 数据结构
```js
PackageLocator: { // 包的位置
    name: string,
    reference: string, // 相对于项目的根目录
}
PackageInformation: { // 包的信息
    packageLocation: string, // 相对于disk的位置信息
    packageDependencies: Map<string, null | string | [string, string]>,
    packagePeers: Set<string>,
    linkType: 'HARD' | 'SOFT',
}
```

## 运行时不变
```js
process.version.pnp
createRequire
```

## api
所有api都可以在运行时使用。  
`process.versions.pnp`
`versions => {std: number, [key: string]: number}`  
`topLevel => {name: null, reference: null}`  
得到顶级依赖

`getLocator(name: string, referencish: string | [string, string]) => PackageLocator`  
`getDependencyTreeRoots() => PackageLocator[]`  
`getAllLocators() => PackageLocator[]`  
`getPackageInformation(locator: PackageLocator) => PackageInformation`  
`findPackageLocator(location: string) => PackageLocator | null`  
`resolveToUnqualified(request: string, issuer: string | null, opts?: {considerBuiltins?: boolean}) => string | null`  
`resolveUnqualified(unqualified: string, opts?: {extensions?: string[]}) => string`  
`resolveRequest(request: string, issuer: string | null, opts?: {considerBuiltins?: boolean, extensions?: string[]}) => string | null`  
`resolveVirtual(path: string): string | null`


`pnp.fn(param, first: string, second: boolean = true) => void`
description

`pnp.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 如何使用pnp的包
> 如何开发一个pnp的包
> 未来迭代计划。
> 未来迭代计划。