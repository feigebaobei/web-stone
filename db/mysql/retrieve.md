# 找回密码
[原文链接](https://blog.csdn.net/ityouknow/article/details/98691737）  

## 方法一
关闭mysql服务
systemctl stop mysqld
skip-grant-tables模式启动
vim /etc/my.cnf
在`[mysqld]`区域添加配置。并保存my.cnf文件。  
```
...
skip-grant-tables
...
```
登录mysql
mysql -u root -p
修改root密码
use mysql
update user set authentication_string=password('新密码') where User='root';
password方法会加密文本。  
使其生效
flush privileges;
exit;

## 方法二
## 方法三
