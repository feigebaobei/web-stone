# command

## free

显示系统内存的使用情况。包括物理内存/交换内存和内核缓冲区内存。

```
		total		used		free		shared		buff/cache 		available
mem内存
swap交换空间
```

total 总的内存（物理内存+交换空间内存）
used 已经使用的物理空间和交换空间
free 还有多少物理空间和交换空间可使用
shared 被共享使用的物理内存大小
buff/cache 被 buffer/cache 使用的物理内存的大小
available 还可以被应用程序使用的物理内存大小
默认显示的单位是 KByte.
total=used+free+buffer+cache

### 选项

|     |                         |     |     |
| --- | ----------------------- | --- | --- |
| -h  | 显示时带上单位 MB 或 GB |     |     |
| -w  | buff/cache 分开显示     |     |     |
| -h  |                         |     |     |
| -h  |                         |     |     |
| -h  |                         |     |     |

## apt & apt-get

|      | apt                                    | apt-get                     |
| ---- | -------------------------------------- | --------------------------- |
| 层级 |                                        | 低级别接口                  |
| 功能 | 将 apt-get、apt-cache 的功能整合在一起 | 紧密地与核心 linux 进程通信 |
|      | 易于使用                               |                             |
|      |                                        |                             |
|      |                                        |                             |
|      |                                        |                             |
|      |                                        |                             |
