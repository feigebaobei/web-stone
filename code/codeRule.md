# 写一个干净的代码
## 缩进 + 空格
参数之间的空格。

## 全名
- camelCase  
- PascalCase  
- snake_case  
- 不使用缩写  
- boolean是以‘is’/'has'开头  
- function: 动作+做什么事。eg: getUserDetails / findUserId

## 注释
```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b
}
```

## 设置默认值
```
const greeting = a || b
const foo = a ?? b
```

## 可考虑使用操作链
```js
let a = o?.k0?.k1
```

## 控制错误
`try...catch`

## 使用内置的遍历方法
- forEach  
- map  
- filter   
- ...

## 减少不必要的逻辑分支
- if...else
- ...

## 按字母排序。当>10时
