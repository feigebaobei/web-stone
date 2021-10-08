# js & ts

## overview
> 比对js / ts的对应关系

## usage
同`./demo.md`
```
const {{packageName}} = require('{{packageName}}');
// or
// import {{packageName}} from '{{packageName}}';
// TODO: DEMONSTRATE API
```

## 变量类型
ts的变量类型都是小写的。

### boolean & number & string & symbol & array
同js
### tuple
### enum
#### keyof
### any
当不知道变量是什么变型时使用`any`，则不执行变量检验。
### void(undefind)
### null & undefind
当变量不存在时为`null`
当变量未被初始化时为`undefined`

### object
### never
### unknown
### union
### type aliases
### boolean
### boolean
### boolean
### boolean
### boolean
## 方法重载
## 变量别名
```
type Alias = Type
```
## 命名空间
## interface
## class
## decrator
## 泛型
## 类型断言
`as / <type>var`
```
if (p in obj) {
	...
}
```

## decrator
## decrator
## decrator
## decrator
## decrator
## decrator

## todo
### interface & type
相同点
|interface|type|
|-|-|
|可扩展`interface A extends B {...}`|可扩展`type A = B & C`|
|||
|||
|||

不同点
|interface|type|
|-|-|
|可添加字段|不可改变字段|

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。