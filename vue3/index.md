# `vue`

## overview
> description

### feature
- feature0  
- feature1  
- feature2  

## install
`npm i vue`

## usage
同`./demo.md`
```
const vue = require('vue');
// or
// import vue from 'vue';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
`vue.fn(param, first: string, second: boolean = true) => void`
description

`vue.fn(param, [options: {a: string, b?: number}])`
description

## principle

该包负责把`*.vue`的代码转换为操作dom的代码。操作完dom后由浏览器根据dom显示出来，中间包括大量的重绘、回流。  
在`mvvm`框架流行之间有面向dom开发的框架——jquery。它也是操作dom。然后让浏览器做重绘、回流的工作。  
把数据做成可生成html代码的js代码，然后交给浏览器运行。vue就做了这一件事。    
真传一名话，假传万卷书。如一个道理很庞杂，那就不用学了。它是假的。若只有一句话，那剩下的就是去实践它了。
### uml
```
```

## confuse
- [v-model](/vue3/v-model.html)

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。