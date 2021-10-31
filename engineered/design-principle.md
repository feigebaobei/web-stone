# 设计模式的六大原则

## 1、开闭原则（Open Close Principle）
开闭原则的意思是：对扩展开放，对修改关闭。在程序需要进行拓展的时候，不能去修改原有的代码，实现一个热插拔的效果。简言之，是为了使程序的扩展性好，易于维护和升级。想要达到这样的效果，我们需要使用接口和抽象类，后面的具体设计中我们会提到这点。

## 2、里氏代换原则（Liskov Substitution Principle）
里氏代换原则是面向对象设计的基本原则之一。 里氏代换原则中说，任何基类可以出现的地方，子类一定可以出现。LSP 是继承复用的基石，只有当派生类可以替换掉基类，且软件单位的功能不受到影响时，基类才能真正被复用，而派生类也能够在基类的基础上增加新的行为。里氏代换原则是对开闭原则的补充。实现开闭原则的关键步骤就是抽象化，而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范。

## 3、依赖倒转原则（Dependence Inversion Principle）
这个原则是开闭原则的基础，具体内容：针对接口编程，依赖于抽象接口而不依赖于具体实现。
```
           高层模块
             |
             |
             V
            抽象
             ^
             |
    |------------------------|
    |           |            |
    |           |            |
    |           |            |
  底层模块0    底层模块1    底层模块2
```
```
class Eat  {
  go () {}
}
class Apple extends Eat  {
  go () { return '吃了一个苹果'}
}
class Banana extends Eat  {
  go () { return '吃了一个香蕉'}
}
class Pleple {
  gotoEat (food) {
    return `${this.name} ${food.go}`
  }
}
var p0 = new Pleple()
p0.gotoEat(apple)
p0.gotoEat(banana)
```
## 4. 单一职责原则
## 5. 接口隔离原则（Interface Segregation Principle）
这个原则的意思是：使用多个隔离的接口，比使用单个接口要好。它还有另外一个意思是：降低类之间的耦合度。由此可见，其实设计模式就是从大型软件架构出发、便于升级和维护的软件设计思想，它强调降低依赖，降低耦合。
使用多个类，从基类中继承为属性、方法。
```
class Animal {
  eat () {}
}
class Fish extends Animal {
  run () {return '游'}
}
class Pig extends Animal {
  run () {return '跑'}
}
class Bird extends Animal {
  run () {return '飞'}
}
fish.run
pig.run
bird.run
```

## 6. 迪米特法则，又称最少知道原则（Demeter Principle）
最少知道原则是指：一个实体应当尽量少地与其他实体之间发生相互作用，使得系统功能模块相对独立。

## 7. 合成复用原则（Composite Reuse Principle）
合成复用原则是指：尽量使用合成/聚合的方式，而不是使用继承。
子类继承父类后子类的实例会把要父类的属性暴露出来。若使用现有的对象组合成新对象的方式，则不会显露出多余的属性、方法。
类继承是白箱复用。对象组合是黑箱复用。

