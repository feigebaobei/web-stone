|interface|type||
|-|-|-|
|书写|书写||
|扩展|交叉||
|可添加已经有字段|创建后不能改变（像const）||
|-|用于定义别名||

# interface
```ts
interface A {
    name: string
}
interface B extends A {
    age: number
}

interface A {
    color: string
}
```



# type
```ts
type A = {
    name: string,
}

```
