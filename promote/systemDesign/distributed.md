# 分布式系统设计

由多台计算机和通信的软件组件通过计算机网络连接（本地网络、广域网）。

## 优点

- 可靠性（容错）
- 可扩展性
- 资源共享
- 灵活性
- 更快的速度
- 开放系统
- 更高的性能

## 缺点

- 故障排除
- 软件
- 网络
- 安全性

## 负载均衡

从 dns 到 web server 之间使用 load balancer  
用于保护 web server

```
client -----> dns
                |
                |
                |
                V
            load balancer
                |
                |----------------------------
                |                  |        |
                |                  |        |
                V                  V        V
            web server 0    web server 1    ...
```

## 选择数据库

设计 data model 设计数据型

|                |                |     |
| -------------- | -------------- | --- |
| 关系型数据库   | 数据结构统一   |     |
| 非关系型数据库 | 数据结构不统一 |     |

二者都有高可扩展性（high scalablity）

## caching

用于保护 database  
一般 database 是最慢的环节。  
在 web server 和 database 之间使用 caching

```
web server 0    web server 1    ...
    |               |            |
    |               |            |
    -----------------------------|
                                 |
                                cache
                                 |
                                 |
                                database

```

## cdn

在访问量大网站上会把网站的静态内容分发到全球各地的 cdn 上。
访问者可以从最近的 cdn 上得到内容。获得更快的下载速度。

## 异步处理

用途：耗时的任务  
一般使用 message queue 实现。

## title

## title

youtube 的分布式 mysql 的方案《vitess》
