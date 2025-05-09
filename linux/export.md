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

当在终端中无法访问外网时，
如：nvm install 22.14.0 等很长时间无反应。
请使用在终端中这样设置代理。

## 设置代理

```
// 临时设置
export http_proxy=http://127.0.0.1:8087
export https_proxy=$http_proxy
export socks5_proxy="socks5://127.0.0.1:60879"

// 永久设置
$ vim ~/.zshrc
# proxy
proxy () {
  export http_proxy="http://127.0.0.1:60879"
  export https_proxy=$http_proxy
  export socks5_proxy="socks5://127.0.0.1:60879"
  echo "HTTP Proxy on"
}

# noproxy
noproxy () {
  unset http_proxy
  unset https_proxy
  echo "HTTP Proxy off"
}

$ source ~/.zshrc
```

通过在当前的终端窗口输入**proxy 、noproxy **命令，就是打开 或 关闭代理。
需要在每个终端窗口都打开一次。
如果用 bash，可以直接上面命令的 ~/.zshrc 换成 ~/.bashrc。
