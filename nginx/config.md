# 配置

## 解构

```
|--全局配置-----------------------------------------|
| 作用于全局的配置                                    |
|--------------------------------------------------|

|--events------------------------------------------|
| 网络服务与客户端网络连接的配置                        |
|--------------------------------------------------|

|--http配置-----------------------------------------|
|                                                  |
|    |--server(也叫虚拟主机) * n-----------------|   |
|    |                                         |   |
|    |   |---location------------------|       |   |
|    |   |                             |       |   |
|    |   |                             |       |   |
|    |   |                             |       |   |
|    |   |                             |       |   |
|    |   |-----------------------------|       |   |
|    |                                         |   |
|    |-----------------------------------------|   |
|                                                  |
|--------------------------------------------------|
```

## 负载均衡

```
http {
    ...
    upstream backend {                   # 给upstream命名为backend
        ip_hash;                         # 使用同一客户端向同一个服务器请求，解决了session是否统一的问题。
        server 127.0.0.1:8000 weight=3;  # 此服务器的权重是3.会多收到请求。
        server 127.0.0.1:8001;
        server 127.0.0.1:8002;
    }
    server {
        ...
        location /app {
            proxy_pass http://backend    # 把/app的请求代理到backend
        }
    }
}
```

## 虚拟主机

```
server {
    listen 5173;
    server_name heshijade.com;
    location / {
        root /dist;
        index index.html index.htm;
        try_files $uri $uri/ index.html;
    }
}
```