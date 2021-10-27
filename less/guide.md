# 概述
深入学习less

# 变量
`@`表示取变量的值。多个`@`取多次值。（类似指针、指向指针的指针。）  
less里的模板字符串是`@{var}`  
`$prop`取属性的值。

```
@var: 'value';

@import '@{var}/file.less'
.@{var} {
    @bar: var;
    background: url("@{var}/file.png");
    color: @@bar;
    @{var}: xxx;
    background-color: $color; // 使用已经被设置的属性值
}

```

# 父选择器
`&`是父选择器的宏替换。  

# 扩展
同时具有指定样式。

# 合并
用于多个字段的属性值中。以`,`分隔。  
必须使用`+`/`+_`指定需要合并的属性。  
```
mixin() {
    box-shadow+: inset 0 0 10px #555;
}
.a {
    .mixin()
    box-shadow+: 0 0 20px black;
}
```

# 混入
定义时有括号，则在生成文件中无此选择器，否则有此选择器。  
`mixin() !important`会把混入的所有属性设置`!important`  
支持命名空间  
```
// define
#outer {
    .inner {...}
}
// use
#outer.inner() // 使用时一定要有括号
```
支持参数。支持默认值。`,`分隔默认值。`;`分隔参数。支持`@rest...`。支持`@_`任意值  
支持重载  
支持守卫  
```
.mixin(@a) when (@a > 50) {...}
.mixin(@a) when (@a <= 50), (@a > 25) {...}
.mixin(@a) {...}
```
支持别名
```
// define
.mixin {
    .a(@a) {...}
}

// use
.b {
    @a: mixin.a()
    color: @a;
}
```
调用混入方法后，可使用该方法内的变量。

# css守卫
与mixin守卫一样。

# 派遣规则集
把规则集分配给变量  
```
// define
@var: {
    color: red;
}
// use
.a {
    @var()
}
```

# @import At-Rules
扩展名为less，则当作less文件处理。
扩展名为css，则当作css文件处理。
无扩展名，则当作less文件处理。
扩展名为其他，则当作less文件处理。
`@import (<options>) file.less`  
|引入选项：|||
|-|-|-|
|reference|只在当前文件中使用引入体，不输出。||
|inline|不处理引入体||
|less|当作less文件处理||
|css|当作css文件处理||
|once|只引入一次。|默认选项|
|multiple|允许引入多次。||
|optional|若文件不存在，则路过。||

# @plugin At-Rules
加入插件到less的方法、功能中。
```
// define
module.exports = {
    install: function (less, pluginManager, functions) {
        functions.add('pi', function () {
            return Math.PI;
        })
    }
}
// or
registerPlugin({
    install: // 同上
})
// 安装
npm i my-less-plugin
// use *.less
@plugin my-less-plugin
.a {
    color: pi()
}
```
插件对象
```
{
    install: function(less, pluginManager, functions)
    // 第一次引入插件时调用
    use: function(context) {}
    // 每次调用插件的实例是执行
    eval: function (context) {}
    // 每个插件的实例在evaluation后执行
    setOptions: function (argumentString) {}
    // 引入时设置选项时执行
    minVersion: ['3.0']
    // less最少的兼容版本
    printUsage: function () {}
    // 在lessc中解释用法
}
```

# 写一个插件
