# 本地无法访问远端mysql
报错：
```
Your password does not satisfy the current policy requirements
```
尝试使用：
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
flush privileges;
```
未解决。
新建了一个用户并授权后，解决了。
```
CREATE USER 'devRole'@'%' IDENTIFIED BY 'QWERasdf1234%^&*';
```
在执行
```
SELECT user, host FROM mysql.user;
```
后输出
```
+---------------+-----------+
| user          | host      |
+---------------+-----------+
| devRole       | %         |
| mysql.session | localhost |
| mysql.sys     | localhost |
| root          | localhost |
+---------------+-----------+
```
