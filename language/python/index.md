# phthon

## overview
> 简称

### feature
- feature

## install

## usage
```py
# 注释
# 行注释
"""块注释"""
param = 'name'
print(type(param)) // <class 'str'>
name, age, height = 'tom', 22, 180.5
a = b = c = 3
# type casting
x = 1
str(x)
y = 2.0
int(y)
z="3"
float(z) # 3.0
# input
p = input('提示文本') # 获取输入值。输入的都是str类型。
# slice
name = 'qwertyujhgfd'
name[start:stop:step]
# if
if 表达式0: # 表达式0 and 表达式1
    xxxx
elif 表达式1: # 表达式2 or 表达式3 # not(表达式4)
    xxx
else
    xxx
# while
while 表达式:
    xxx
# for
for 表达式: # for i in range(30):
    xxx
# print
print(内容, end=string)
print("string {}, string {}".format(p0, p1))
# tuple
student = ('bro', 21, 'male')
student.count('bro')
student.index('male')
# set
utensils = {"one", "two", "three"}
# dictionary
captitals = {'USA': 'Washington DC', 'India': 'New Dehli'}
captitals['USA']
# function
def fn(a, b, c): # 定义
    xxx
fn(b = 'b', c = 'c', a = 'a') # 执行
# 作用域
# L = local
# E = enclosing
# G = global
# B = build-in
# *args 把所有后面的参数放入tuple中
# **kwargs 把所有后面的参数放入dictionary中
def fn(**kwargs):
    print(kwargs['one'] + kwargs['two'])
fn(one = 'a', two = 'b')
# try
try:
    xxx
except 错误类型 as e:
    xxx
else:
    xxxx
finally:
    xxxx
# file
open(filePath, 操作符)
# class
class ClassName:
    def __init__(self, otherParams): # __init__是python的class中内置的方法，在实例化时执行。
        pass # 放在空class中，防止出现报错。
    def fn(self): # 第一个参数是当前实例。可以是任意合法变量名。
        xxx
class SubClass(SuperClass):
    def __init__(self, a):
        super().fn(a)
        xxx
        return self
    pass
# method chaining 链式方法
class Car:
    def a(self):
        xxx
        return self
    def b(self):
        xxx
        return self
    def c(self):
        xxx
        return self
car = Car()
car.a().b()\
    .c()
# 抽象类
# 1. 阻止用户创建出一个该类的实例对象。
# 2. 强制用户在子类中重写抽象方法。
# 抽象类：包含一个或多个抽象方法的类。
# 抽象方法：已声明且未实现的方法。
class Vehicle:
    def go(self):
        pass
class Car(Vehicle):
    def go(self):
        xxxx
# lambda function
lambda arguments : expression
# 比匿名函数好。
# 短
# list操作方法
map(function, iterable)
filter(function, iterable)
reduce(function, iterable)
# dictionary操作方法
dictionary = {key: expression for (key, value) in iterable}
dict.items() # 返回iterable
zip(*iterables) # 把多个iterable成对合并为一个tuple






```

## 内置模块
||||||
|-|-|-|-|-|
|math|||||
|os|||||
|shutil|文件、目录的压缩包处理模块||||
|time|||||
|threading|||||
|tkinter|||||
|shutil|||||
|shutil|||||
|shutil|||||

```
shutil.copyfile(src, dst)



```
`help('modules')` 查看所有模块

io密集时    使用多线程
cpu密集时   使用多进程

### threading
```py
threading.active_count()    # 活着的线程数量
threading.enumerate()       # 列出线程信息
threadingName = threading.Thread(target=fn, args=())    # 定义线程
threadingName.start()                                   # 开始线程

```




## 自定义模块
```py
# messages
def hi():
    print('hi')
def bey():
    print('bey')
```
```py
import messages
# import messages as mes
messages.hi()
messages.bey()
# mes.hi()
# mes.bey()
```
```py
from messages import hi, bey
```




## 数据类型
str
int
float
bool
    False True

## 内置变量
|||||||
|-|-|-|-|-|-|
|__name__|在初始化模块时为'__main__'|||||

## configuration
默认配置文件：`path/to/file.json`。
详见[配置文件](/typescript/config.html)  

## principle
此包的处理逻辑。

### uml
```
```

## todo