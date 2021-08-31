## 传值调用
把参数计算出结果后再运行函数体
c/js都是传值调用。

## 传名调用
在函数体中使用参数时再计算参数。

## thunk
c/js都是传值调用。
利用柯里化原理。把参数封装为方法。形参使用方法名。方法体中使用方法求值。如
```
let x = 0
function thunk () {
    return x + 1
}
function f (pf) {
    return pf()
}
f(x+1)   // 不使用thunk
f(thunk) // 使用thunk
```

## thunkify