# install

## 在 linux 使用 yum 安装

```
yum install -y nginx
nginx -v
systemctl start nginx.service
systemctl status nginx.service
```

## 在 linux 使用 apt 安装

```
sudo apt update
sudo apt intall nginx
```

## 在 windows 中安装

```
scoop install nginx
choco install nginx
```

## 使用 brew 安装

```shell
brew install nginx
# 安装在 /usr/local/cellar
```

## 源代码安装

可以自定义功能。

```shell
mkdir $HOME/build
cd $HOME/build && tar xzf nginx-<version-number> .tar .gz
cd $HOME/build/nginx-<version-number> && ./configure
make && sudo make install
```

## 使用 docker 安装

```
docker pull nginx
```
