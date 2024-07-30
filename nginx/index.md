# 介绍

- 一台高性能 web 服务器
- 最初是为解决 c10k 问题（同时连接处理 10000 连接数的 web 服务器）。可以支持 5w 个并发连接。
- 开源
- 为静态资源提供高效 web 服务。
- 当初是为 http web 服务的，现在为 HTTP, HTTPS, SMTP, IMAP, POP3 做反向代理。
- 模块化设计的。
- 可以配置成 web 加速器、web 服务器、邮件代理。
- 默认监听 8080 端口

# 服务启停

```shell
nginx # 启动服务
ps -ef|grep nginx # 列出nginx的进程
lsof -i:80 # 查看占用80端口的进程
nginx -s signal
    # signal: quit    优雅停止
            # stop    立即停止
            # reload  重载配置文件
            # reopen  重新打开日志
```

# 部署静态站点

```shell
nginx -V # 查看nginx的信息
nginx -t # 检查nginx配置信息
# --conf-path 是配置文件的位置
# --prefix nginx的安装目录
# 修改配置文件后需要reload nginx -s reload
```

# [install](/nginx/install.html)

# 常用命令

```shell
systemctl start nginx.service # 启动
systemctl stop nginx.service # 停止
systemctl restart nginx.service # 重启
systemctl enable nginx.service # 设置开机自启动
systemctl disable nginx.service # 停止开机自启动
systemctl status nginx.service # 查看当前状态
systemctl list-units --type=service # 查看所有已启动的服务
nginx -t # 配置检查 检查语法错误
nginx -t -c <path-to-nginx.conf> # 配置检查
```

# 常用配置项

# [配置](/nginx/config.html)

directive 都是使用下划线分隔命名的。  
常被称为“节”或“部分（section）”

```
<section> {
    <directive> <parameters>;
}
```

## 全局配置参数

|                    |     |     |     |     |     |
| ------------------ | --- | --- | --- | --- | --- |
| user               |     |     |     |     |     |
| worker_processes   |     |     |     |     |     |
| error_log          |     |     |     |     |     |
| pid                |     |     |     |     |     |
| use                |     |     |     |     |     |
| worker_connections |     |     |     |     |     |

## include

```
# 引入
include /opt/local/etc/nginx/mime.types;
```

## 虚拟服务器部分

以关键字`server`开始的部分被称为“虚拟服务器”。它根据不同的`server_name`指令逻辑分割资源。

```
server {
    listen   80;
    reture  444;
}
server {
    listen  80;
    server_name www.example.com;
    location / {
        try_files   $uri $uri/ @mongrel;
    }
    location @mongrel {
        proxy_pass  http://127.0.0.1:8080;
    }
}
```

## location

```
location [modifier] uri {...}
location @name {...}
```

# 使用、禁用模块

|                               |     |     |     |     |     |     |
| ----------------------------- | --- | --- | --- | --- | --- | --- |
| --with-http_ssl_module        |     |     |     |     |     |     |
| --with-http_realip_module     |     |     |     |     |     |     |
| --without-http_charset_module |     |     |     |     |     |     |

# [学习网站](https://www.javatpoint.com/installing-nginx-on-mac)

# [网友笔记](https://juejin.cn/post/6844904131161784333)

# title

# title

# title

# title

# todo

- OpenSSL 是什么
-

# confuse

## $host & $http_host & $server_name

|     | $host                           | $http_host                                              | $server_name                               |     |
| --- | ------------------------------- | ------------------------------------------------------- | ------------------------------------------ | --- |
|     | 此变量保存了请求头中的 host     | 此变量保存了请求头中的 host                             | 此变量保存了与当前请求相匹配的 server name |     |
|     | 它可以被 client、中间系统修改。 | 在 nginx 中以`$http_`开头的变量都是请求头中的某个字段。 | 经常用于匹配 server 块，用于要匹配请求。   |     |
|     |                                 |                                                         |                                            |     |
|     |                                 |                                                         |                                            |     |

```
server {
    listen 80;
    server_name heshijade.com;
    location / {
        root /dist;
        index index.html;
        try_files index.html;
    }
}
```
