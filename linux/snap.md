# snap

包管理工具

> https://www.baeldung.com/linux/snaps-intro

## install

```
# debian / ubuntu
sudo apt update
sudo apt install snapd
snap version

# fedora
dnf install snapd

# centos / other
yum install epel-release
yum install snapd

# manjaro
pacman -S snapd

```

## usage

```
snap install xxx
snap list # 列出已安装的包
snap refresh xxx # 更新指定包
snap refresh # 更新所有snap安装的包
snap revert xxx # 使用更新前的旧包
snap disable xxx # 禁用指定包
snap enable xxx # 启用指定包
snap remove xxx # 删除指定包
snap remove --revision-2344 xxx # 删除指定版本的包
```

## 组成部分

There are five main components in the Snap ecosystem:

Snapd: The snap daemon; it’s the background service that manages and maintains the snaps on a Linux system
Snap: The command-line interface tool used to install and manage snaps on a Linux system
Channels: A channel determines which release of a snap is installed and checked for updates
Snap Store: It’s where developers publish their snap packages and Linux users install them
Snapcraft: The framework tool for building snaps
