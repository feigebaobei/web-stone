# class & Object.create()

```
||class|Object.create()||
|-|-|-|-|
|功能|创建一个类，可用于实例。|在原型链中增加一个节点，并返回该节点。返回值是一个对象。||
||统一了它出来前的各种伪继承、构造函数&原型链。|-||
||一个类可实例化n个实例。|可以封装为`createXxx()`返回一个对象。|在看到react说一个类只有一个实例时，怀疑该类有必要性。是否可以用一个方法代替。我想到Object.create()可以代替class此缺点.|
||js语言内基于构造函数的实现|-||
||es5时出现|es5时出现||
|私有属性、方法|ts支持，private this.k = v。js不支持。|{enumerable: false}||
||可以实现静态属性、方法。|直接在该对象上使用。||
|||等价于`let o = {__proto__: no}`||
|与ts的关系|class的出生是js创建的，与ts无关。是ts要包含class.|Object.create()处理当前属性与原型对象的关系。与ts结合时也要按2个对象的思路思考||
|||[示例](https://github.com/feigebaobei/HeShiJade/blob/master/packages/constructor/src/helper/tree.ts)||
```
