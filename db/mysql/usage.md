# 启动mysql
``` shell
mysql -V
# 查看版本号
systemctl start mysqld
systemctl stop mysqld
# 启动mysql服务
systemctl status mysqld
# 查看mysql服务的运行状态
systemctl restart mysqld # 重启mysql服务
systemctl enable mysqld # 设置mysql服务开机自启动
systemctl disable mysqld # 停止mysql服务开机自启动
```

# 查看初始密码
```shell
grep "password" /var/log/mysqld.log
```
记住初始密码，一会儿要用。

# 命令行连接mysql
```shell
mysql -u root -p
# 输入密码
```

# 修改初始密码
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword.';
ALTER USER 'root'@'localhost' IDENTIFIED BY 'QWERasdf1234%^&*';
```

# 增删改查
``` shell
show databases;
CREATE DATABASE dbname;
show tables;
status # 查看mysql数据库的运行状态

创建数据库表
CREATE TABLE tb_emp1(id INT(11),name VARCHAR(25),deptId INT(11),salary FLOAT);
DROP TABLE table_name; # 删除数据表
desc  table_name; # 查看表结构

# 插入数据
INSERT INTO table_name (field1, field2, ...fieldN) VALUES (value1, value2, ...valueN);
# 查询数据
SELECT column_name, column_name FROM table_name [WHERE Clause] [LIMIT N][ OFFSET M]
# 使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据
# 使用 WHERE 语句来包含任何条件。
# 使用 LIMIT 属性来设定返回的记录数。
# 通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。

# 创建用户
CREATE USER <用户名> [ IDENTIFIED ] BY [ PASSWORD ] <口令> # 只要创建用户，没有权限
CREATE USER 'devRole'@'%' IDENTIFIED BY 'QWERasdf1234%^&*'

# 删除用户
DROP USER [用户名]@[IP]

# 查看所有用户
SELECT user, host FROM mysql.user;

# 查看指定用户的所有情况
SELECT * FROM mysql.user WHERE user='root'\G
# \g 相当于’;’
# \G使每个字段打印到单独的行，也有’;'的作用

# 更新权限
GRANT [权限] ON [库.表] TO [用户名]@[IP] IDENTIFIED BY [密码] WITH GRANT OPTION;
(1)ALL PRIVILEGES 表示所有权限，你也可以使用select、update等权限。
(2)ON 用来指定权限针对哪些库和表。
(3)*.* 中前面的号用来指定数据库名，后面的号用来指定表名。
(4)TO 表示将权限赋予某个用户。
(5)@ 前面表示用户，@后面接限制的主机，可以是IP、IP段、域名以及%，%表示任何地方。
(6)IDENTIFIED BY 指定用户的登录密码。
(7)WITH GRANT OPTION 这个选项表示该用户可以将自己拥有的权限授权给别人。
如：
GRANT ALL PRIVILEGES ON *.* TO 'devRole'@'%' WITH GRANT OPTION;

# 更新权限后请执行
flush privileges;
```

INSERT INTO users (passwordHash, username, role) VALUES ("8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "admin", 1000);
INSERT INTO users (passwordHash, username, role) VALUES ("8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "user", 100);

## 操作表
```shell
# 查看表字段信息
desc table_name;
# 创建表
create table 'table_name' (
    'field_name' char(32) not null comment '备注',
    # 主键索引
    primary key ('id'),
    # 唯一 索引
    unique key 'index_id',
    # 索引
    key 'index_signed_customer'
)
# 修改表名
alter table table_name to new_table_name;
# 修改表注释
alter table table_name comment '注释';
# 修改字段
alter tabel tabel_name modify column field_name 新类型 comment '注释';
# 表增加字段
alter tabel tabel_name add field_name 新类型 comment '注释';
# 表删除字段
alter table table_name drop field_name;
```

# 数据类型
int 
char
varchar

char(10)就是给予一个固定的空间，不管存储的内容有没有到达10个字节，都占用10个字节的空间，同时，varchar(10)和nvarchar(10)的最大空间只能为10字节，如果不到10字节就不占用10字节。  

身份证一般使用char  
varchar可用于地址。  

# title
# title
# title
# title
root 123456

