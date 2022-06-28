# 在阿里云上部署服务
## 设置环境
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
正确关闭终端后，再进入阿里云服务器中。若执行
```
nvm -v
```
得到输出相应版本号，则安装nvm成功。
再使用nvm安装node，安装几个tls版本的node。依次执行如下命令：
```
nvm install 8.17.0
nvm install 10.24.1
nvm install 12.22.8
nvm install 14.18.2
nvm install 16.13.2
```
再设置一个默认版本
```
nvm alias default v16.13.2
```
执行
```
node -v
```
若看到
```
v16.13.2
```
则设置默认版本成功。

### 安装 git
执行
```
yum -y install git
```
报错，其一为
```
Invalid configuration value: failovermethod=priority in /etc/yum.repos.d/CentOS-Linux-epel.repo; 配置：ID 为 "failovermethod" 的 OptionBinding 不存在
```
解决方案是：打开`/etc/yum.repos.d/CentOS-Linux-epel.repo`
```
vim /etc/yum.repos.d/CentOS-Linux-epel.repo
```
注释
```
# failovermethod=priority
```
报错，其二为
```
Errors during downloading metadata for repository 'appstream':
  - Status code: 404 for http://mirrors.cloud.aliyuncs.com/centos/8/AppStream/x86_64/os/repodata/repomd.xml (IP: 100.100.2.148)

```
不会解决。
然后把系统换为`cent os7`了。

### 安装mysql
```
wget http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql-community-server
```
启动mysql
```
systemctl start mysql
```
报错：
```
Failed to start mysql.service: Unit not found.
```
解决方案：
```
yum -y install mysql-community-server  --nogpgcheck
systemctl start mysqld
systemctl status mysqld
```
mysql 是个命令行程序；
mysqld 是服务。linux 系统里一般的服务都是以 d 结尾的，比如 httpd，vsftpd 等等。
d 的全拼应该是 daemon，也就是守护程序的意思，常驻于后台。
查看mysql的初始密码
```
grep "password" /var/log/mysqld.log
```
<!-- localhost: r4twAjaK<Qba -->
登录数据库
```
mysql -u root -p
```
修改mysql密码
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassWord1.';
```
查看数据库
```
show databases
```
创建数据库
```
create database pbootcms; 
```
退出数据库
```
exit
```
### [安装nginx](/nginx/index.md)
## 报错
### ssh IP
是出报指纹不同。
解决方案：
删除`/Users/cat/.ssh/known_hosts`中指定ip对应的指纹。
### cent os8
无法安装git.
把系统换为cent os7后可以安装git了。

## 感受
用服务运行代码可真快。