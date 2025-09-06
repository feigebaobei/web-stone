## Unable to find image 'centos:latest' locally

docker: Error response from daemon: Head "https://registry-1.docker.io/v2/library/centos/manifests/latest": Get "https://auth.docker.io/token?scope=repository%3Alibrary%2Fcentos%3Apull&service=registry.docker.io": EOF

解决方案：
确保存在 /etc/docker 目录，再创建该目录下的 daemon.json 文件，并添加如下内容：

```json
{
  "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]
}
```

然后重启 docker 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
镜像拉取失败，是因为没有配置镜像加速器。

    配置镜像加速器
    1. 创建 /etc/docker/daemon.json 文件，并添加如下内容：
    {
        "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]
        "insecure-registries": ["https://docker.mirrors.ustc.edu.cn"]
        "insecure-registries": ["https://registry.docker-cn.com"]
        "insecure-registries": ["https://hub-mirror.c.163.com"]
        "insecure-registries": ["https://dockerhub.timeweb.cloud"]
        "insecure-registries": ["https://docker.nju.edu.cn"]
        "insecure-registries": ["https://docker.mirrors.ustc.edu.cn"]
        "insecure-registries": ["https://xx4bwyg2.mirror.aliyuncs.com"]
        "insecure-registries": ["http://f1361db2.m.daocloud.io"]
        "insecure-registries": ["https://registry.docker-cn.com"]
        "insecure-registries": ["http://hub-mirror.c.163.com"]
        "insecure-registries": ["https://docker.mirrors.ustc.edu.cn"]

    }
    2. 重启 docker 服务：
    sudo systemctl daemon-reload
    sudo systemctl restart docker
    3. 验证镜像加速器是否生效：
    docker images
    4. 镜像拉取成功，可以开始使用 Docker 镜像了。
    5. 镜像拉取失败，是因为没有配置镜像加速器。
    6. 配置镜像加速器
    1. 创建 /etc/docker/daemon.json 文件，并添加如下内容：
    {
        "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]
            "insecure-registries": ["https://docker.mirrors.ustc.edu.cn"]
            "insecure-registries": ["https://registry.docker-cn.com"]
            "insecure-registries": ["https://hub-mirror.c.163.com"]
    }



## 登录
docker的桌面版本的登录的地方。

## titledocker: Error response from daemon: manifest for centos:latest not found: manifest unknown: manifest unknown

原因是没有找到centos:latest这个镜像。
解决方案：
`docker pull centos:6.6`

## title

## title
## title
## title
## title
```
