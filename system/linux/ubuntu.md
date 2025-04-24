# 快捷键

|                  |                            |        |
| ---------------- | -------------------------- | ------ |
| alt + f1         | 窗口切换                   |        |
| alt + f2         | 打开运行命令的窗口         |        |
| alt + f4         | 关闭当前窗口               |        |
| alt + tab        | 切换应用                   |        |
| ctrl + alt + T   | 打开终端                   |        |
| ctrl + shift + T | 在同一个窗口新建终端标签页 |        |
| ctrl + shift + w | 关闭终端的标签页           |        |
| win + m          | 切换到通知栏               |        |
| win + d          | 显示桌面                   |        |
| win + a          | 显示应用程序菜单           |        |
| tab              | 命令或文件名自动补全       |        |
| ctrl + shift + c | 复制                       |        |
| ctrl + shift + v | 粘贴                       |        |
| ctrl + shift + n | 新建窗口                   |        |
| ctrl + shift + q | 关闭当前窗口               |        |
| ctrl + l         | 清除屏幕内容               |        |
| ctrl + c         | 终止当前任务               |        |
| ctrl + r         | 反向搜索历史命令           | 不会用 |

# 更新

```
sudo apt update
sudo apt upgrade
```

# 安装软件
## 安装.tar.xz
1. 解压
```shell
tar -xJvf filename.tar.xz
# -x 表示解压
# -J 表示使用xz解压
# -v 表示解压过程中显示详细信息
# -f 表示解压的文件
```
2. 进入解压后的目录
```
cd filename
# filename 是解压后的目录名称
```
3. 配置软件包
大多数.tar.xz软件包都包含一个名为configure或autogen.sh的脚本文件，用于配置软件包。以下是一个示例命令。
```
./configure
// 或
./autogen.sh
```

4. 编译软件包
```
make
```
5. 安装软件包
编译完成后，需要安装软件包。
```
sudo make install
```
6. 验证安装
```
which <软件名>
```

## 安装.deb
```
sudo dpkg -i packagename.deb # install
sudo dpkg -r packagename.deb # remove
sudo dpkg-reconfigure packagename # Reconfigure/Repair 
```
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
# title
