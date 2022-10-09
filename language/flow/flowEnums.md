# Flow Enums
在运行时存在。  
别的类型在运行时不存在。  

## benefits
- 减小重复  
- 性能比联合类型好。  
- 可以断言类型  
- 更安全。

```js
enum S {
    A,
    B,
    C
}
enum S {
    A = 's',
    B = 2,
    C = true
}
```
没有从0开始递增的功能。  
# Enabling enums in your project
若要使用enums，则需要：
- flow >= 0.159  
- prettier >= 2.2  
- babel >= 7.13.0  
- jscodeshift >= 0.11.0
- hermes-parser >= 0.4.8
- hermes-parser >= 0.4.8
- babel-eslint >= 10.1.0







# Defining enums
# Using enums
# Migrating from
# Legacy pattterns