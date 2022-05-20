# install
## 介绍
- 一台高性能web服务器  
- 最初是为解决c10k问题（同时连接处理10000连接数的web服务器）。
- 模块化设计的。  
- 可以配置成web加速器、web服务器、邮件代理。  
- 

## 在linux使用yum安装
```
yum install -y nginx
nginx -v
systemctl start nginx.service
systemctl status nginx.service
```

## 在windows中安装

## 源代码安装
可以自定义功能。  
```shell
mkdir $HOME/build
cd $HOME/build && tar xzf nginx-<version-number> .tar .gz
cd $HOME/build/nginx-<version-number> && ./configure
make && sudo make install
```

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

# 配置
directive 都是使用下划线分隔命名的。  
常被称为“节”或“部分（section）”  
```
<section> {
    <directive> <parameters>;
}
```
## 全局配置参数
|||||||
|-|-|-|-|-|-|
|user||||||
|worker_processes||||||
|error_log||||||
|pid||||||
|use||||||
|worker_connections||||||

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
||||||||
|-|-|-|-|-|-|-|
|--with-http_ssl_module|||||||
|--with-http_realip_module|||||||
|--without-http_charset_module|||||||

# title
# title
# title
# title
# title
# title
# todo
- OpenSSL是什么  
- 
