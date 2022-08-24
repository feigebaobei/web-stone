# 函数式编程

把电话运行视为数学上的`函数计算`，并且避免使用程序状态以及易变对象。  
现在有好多框架、库应用了函数式编程。  

## 纯函数

当输入相同值时输出相同。  
此函数运行过程不影响运行环境。  

## 函数柯里化

将一个低阶函数轮换为高阶函数的过程。  
从表象上判断，是把一个参数传入方法，并返回一个只需要一个参数的方法。  
这表明函数柯里化是一种“预加载”函数的能力。  

    // example
    var add = x => (y => x + y)
    var increment = add(2)
    increment(4) // 6

## 函数组合

把一系列纯函数放在一起的方法。  

    // example
    var compose = (...args) => x => args.reduceRight((value, curfn) => curfn(value), x)
    var upper = x => x.toUpperCase()
    var ext = x => `${x}.txt`
    var shout = compose(ext, upper)
    shout('abc') // ABC.txt
    // 从右到左依次执行。

## 声明式、命令式

|声明式编程|命令式编程|||
|-|-|-|-|
|说出想要什么，让机器想出如何去做。|告诉机器如何去做，不管你想要什么。|||
|感觉都是使用`map`,`reduce`||||
|reduce 函数归纳抽离了如何遍历数组和状态管理部分的实现。||||
|不会受到环境的影响，在任何地方都会正常运行。|受到它所在的环境影响（状态，依赖都会影响到它）|||
|它的存在就是为了减少程序员在逻辑上的精力，把更多的精力放在业务实现上。||||

## point free

永远不必说出你的数据。  

    // 
    var snakeCase = compose(replace(/\s+/ig, '_'), upper)

## oop & fp
|oop|fp||
|-|-|-|
|面向对象编程|||
|Object/Class是数据(variable)和逻辑(methods)的封装。|||
|封装、继承、多态|||
||数据与函数解耦||