# java

## overview

> ts 从 java 中抄了好多东西。

### feature

- feature0
- feature1
- feature2

## install

[https://www.java.com/zh-CN/download/](https://www.java.com/zh-CN/download/)

## 数据类型

|         | 说明 | 体积 |     |     |
| ------- | ---- | ---- | --- | --- |
| int     |      |      |     |     |
| float   |      |      |     |     |
| char    |      |      |     |     |
| boolean |      |      |     |     |
| byte    |      |      |     |     |
| short   |      |      |     |     |
| long    |      |      |     |     |
| double  |      |      |     |     |

## usage

1. 文件名与类名相同
2. 执行`javac 文件名.java`，得到编译后的类文件`文件名.class`

```java

```

### 注释

```
// 行注释
/*
 * 块注释
 */
```

## 对象&类

一个 java 文件只能有一个 public 类。可以有多个非 public 类。
public 的类名与文件名一致。
java 文件结构：

1.  package 语句
2.  import 语句
3.  java 代码语句

### import

```java
import java.io.* // 此路径下的所有类
import java.io.File // 特定的File类
```

在参数中数据类型是基本类型时使用值传递。是对象类型时使用引用传递。

修饰符：
|||||
|-|-|-|-|
|default|默认，可不写|在同一包内可见。||
|private||在同一个类内可见。|不能修饰类|
|public||对所有类可见。||
|protected||对同一个包内的类和子类可见。|不能修饰类|
|||||
|static||||
|final||||
|abstract||||
|synchronized||||
|transient||||
|volatile||||

### 重写 & 重载

```java
class Dog {
    public void bark () {
        System.out.println("sss")
    }
}
class HouseDog extends Dog {
    public void bark () { // 重写
        System.out.println("woof")
    }
}

class Dog {
    public void bark () {
        System.out.println("sss")
    }
    public void bark (int n) {
        for (int i = 0; i < n; i++) {
            System.out.println("sss")
        }
    }
}
```

### 构造方法

- 与类名相同
- 没有返回类型
- 自动调用。 不能直接调用。
- 支持重载
- 可以使用 this 来引用当前对象的属性、方法。
- 当没有构造时 java 会提供一个无参的构造方法。
- 不能被继承，但可以被调用。

作用：在初始化时为属性赋值。

```java
public class Person {
    String name;
    int age;
    // 定义构造方法
    public Person() {
        this.name = 'unknown';
        this.age = 0;
    }
    // 重构构造方法
    public Person(String name) {
        this.name = name;
        this.age = 0;
    }
    // 重构构造方法
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // 引用属性、方法
    this.name = name;
    this.age;
    // 调用另一个构造方法
    this(name, 3)
}

// 调用
Person person = new Person("张三");
```

## Stream

```java

```

## File

```java
import java.io.File;
public class FileDemo {
    public static void main(String[] args) {
        String path = "D:\\test\\test.txt";
        File file = new File(path);
        d.mkdirs(); // 创建一个文件夹和它的所有父文件夹
        // d.mkdir(); // 创建一个文件夹。若成功则返回true，否则返回false。
    }
}
// File.isDirectory() // 是否为目录
// File.delete() // 删除文件
```

## IO

System.out.println("Hello World");
System.out.print("H");
System.out.write("H");

```java
import java.util.Scanner;
public class ScannerDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        system.out.println("以next方式接收");
        if(sc.hasNext()) {
            String str = sc.next();
            System.out.println("你输入的数据是：" + str);
        }
        sc.close();
    }
}
```

## 异常处理

```java
java.lang.Error
java.lang.ArithmeticException
NullPointerException
java.lang.ArrayIndexOutOfBoundsException
...
```

异常的原因的分类：（3 个）

- 用户输入非法数据
- 文件不存在
- 网络通信时连接中断，或者 jvm 内存溢出

```java
try {
    // 可能出异常的代码
} catch (IOException e) {
    // 处理异常的代码
} catch (异常类型1 异常变量名1) { // 多重捕获块
    // 处理异常的代码
} catch (异常类型2 | 异常类型3 | 异常类型4 异常变量名2) { // 多异常合并捕获
    // 处理异常的代码
}
public void readFile() throws IOException {
    // 可能返回IOException的代码
}
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`java.fn(param, first: string, second: boolean = true) => void`
description

`java.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

1. 常用框架
2. 并发包
3. jvm
4. 读源码
5. 特性

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
