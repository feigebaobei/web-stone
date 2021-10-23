# symbol

它的本意就是标记。而且是惟一的标记。
保证值都惟一。  
es6时添加的第7种数据类型。（undefined, null, boolean, string, number, object）  
它不是对象，不能添加属性。它类似string.  
参数应该是string.若不是string,则使用参数的toString()再传入Symbol.
如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
Symbol 值不能与其他类型的值进行运算，会报错。
Symbol 值作为对象属性名时，不能用点运算符。
    是公开属性，不是私有属性。
    不可被遍历。

```
var s0 = Symbol('hello')
s0.toString() // Symbol(hello)
var s1 = Symbol({})
s1.toString() // Symbol([object Object])
Boolean(s0) // true 当symbol对象转换为boolean时总是true
```

```
let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```


可以使用参数。即使使用相同的参数也得到的symbol对象也是不相等的。参数的作用大多是一个注释。对symbol对象使用toString()在视觉上更好区分。
symbol可以转化为Boolean/String。
        不能转化为Number.

## 使用

    var s = Symbol()
    var s = Symbol('foo')
    var s = Symbol(2)
    var s = Symbol.for('str')

## 属性
Symbol.prototype.description // 返回一个symbol对象的描述（string类型），即：参数。
Symbol.toStringTag // 若该对象上没有prototype.toString方法，就会出现toStringy方法返回的字符串，来表示该对象的类型。利用Symbol.toStringTag指向定制返回字符串的方法3
Symbol.unscopables // 指定该对象不能被`with`使用的关键字。

## 众所周知的symbols

Symbol.iterator      返回一个默认迭代器的方法。被for...of使用。
Symbol.asyncIterator 返回一个默认迭代器的异步方法。被for await of使用.
Symbol.match         定义一个被string.prototype.match()调用的方法。
Symbol.replace       定义一个被String.prototype.replace()调用的方法。
Symbol.search                 String.prototype.search()
Symbol.split                  String.prototype.split()
Symbol.hasInstance            instanceof()
Symbol.isConcatSpreadable     Array.prototype.concat()   其值是boolean.表示是否可被concat.
Symbol.unscoppables  在with环境中排除该对象上的指定的继承来的值。
Symbol.species       指定构造器。
Symbol.toPrimitive   定义一个方法，在该对象被转换为对应的原始值时调用。
Symbol.toStringTag            Object.prototype.toString()
Symbol.for(key)      
Symbol.keyFor(symbol) 

-----------------
作为属性名的symbol

    // 设置
    let ms = Symbol()
    let a = {}
    a[ms] = 'str'
    let a = {
        [ms]: 'str'
    }
    let a = {}
    Object.defineProperty(a, ms, {value: 'str'})
    // 得到
    a[ms]

    symbol作为属性名时，属性不会出现在for...in
                                    for...of
                                    Object.keys()
                                    Object.getOwnPropertyNames()
                                    JSON.stringify()
                        不是私有属性。
                        Object.getOwnPropertypeSymbols(obj) 可以得到对象的所有symbol属性名。
## Symbol.for(param) / Symbol.keyFor(symbol)
        |                               |
        V                               V
    检查是否已经存在             返回一个已经登记Symbol类型的key.（key是string）
    该参数作为名称的Symbol值
    |           |
    Y           N
    |           |
    返回该      新建
    Symbol值

## 11个内置的Symbol(都是对象的属性)
Symbol.hasInstance 指向一个判断实例是否为对象的实例的方法。在使用`ele instanceof constructor`时，在语言内部实际运行的是`Proto[Symbol.hasInstance](ele)`
Symbol.isConcatSpreadable 是否在使用`concat`时展开数组（或类数组）
                            作用于数组时，true时，展开
                                        非true时，不展开
                            作用于类数组时，false时，展开
                                            非false时，不展开
Symbol.species 指向该对象的构造函数。
Symbol.match 指向一个执行`str.match(reg)`时调用的方法。
            String.prototype.match(reg) <=> reg[Symbol.match](str)
Symbol.replace 指向一个执行`String.prototype.replace`时调用的方法。
                Symbol.replace(string, repalceString)
Symbol.search  指向一个执行`String.prototype.search`时调用的方法
                Symbol.search(string, value)
Symbol.split String.prototype.split
            Symbol.split(string, seperate)
Symbol.iterator 指向该对象的默认遍历器方法
Symbol.toPrimitive 指向一个转化为原始类型的值时调用的方法。
-----------------
