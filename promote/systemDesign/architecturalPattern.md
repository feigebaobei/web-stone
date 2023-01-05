# 架构模式

为了解决软件架构的问题。

layered pattern
pipe-filter pattern
client-server pattern
model view controller pattern
event bus pattern
microservices architecture
broker pattern
peer-to-peer pattern
blackboard pattern
master-slave pattern

## layered pattern

一层一层嵌套。

- 表现层
- 应用层
- 商业逻辑层
- 数据层

## pipe-filter pattern

```
    \_________/▔▔▔▔▔▔▔▔\________/▔▔▔▔▔▔▔▔\_______/
 in     pipe    filter    pipe    filter    pipe    out
        --->              --->              --->
    /▔▔▔▔▔▔▔▔▔\________/▔▔▔▔▔▔▔▔\________/▔▔▔▔▔▔▔\
```

## client-server pattern

## model view controller pattern

mvc

```操作
        model <------ controller
          |             ^
         更新            |
          |            使用
          V     浏览     |
        view <-------- user
```

## event bus pattern

```
publisher 1 --------- event bus ----------- listener 1
publisher 2 -----------| |        |-------- listener 2
publisher 3 -------------|        |-------- listener 3
```

## microservices architecture

```
    client req ----> api -------- servicer 1
                    gateway |---- servicer 2
                            |---- servicer 3
                            |---- servicer n
```

## broker pattern

```
            client
               |
            broker
       ----------------------
       |          |         |
    server1    server1    server1
```

## peer-to-peer pattern

## blackboard pattern

```



            notifies                       enrolls
        |-------------------> controller -----------|
        |                                           |
        |                                           |
        |                                           |
        |                                           |
        |                  updates                  V
    blackboard <------------------------------- knowledge
        ^                                         source
        |
        |
        | data input stream
        |
```

## master-slave pattern

```
    master -------- slave 1
            |------ slave 2
            |------ slave 3
            |------ slave 4
```
