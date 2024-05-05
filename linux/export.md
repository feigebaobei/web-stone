# export

> 用于设置或显示环境变量。
> shell 为在 shell 中执行的程序提供一组环境变量。export 可新增、不提供、修改环境变量。
> export 的作用范围只在该次登录操作。(本进程及其子进程中可以访问)

## 语法

```
export [-fnp][变量名称]=[变量设置值]
```

|     |                                   |      |
| --- | --------------------------------- | ---- |
| -f  | 代表[变量名称]中为函数名称。      | 不会 |
| -n  | 为该次登录以后不提供变量          |      |
| -p  | 列出所有 shell 赋予程序的环境变量 |      |

## 示例

```
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export -p
```