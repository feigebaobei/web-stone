#mysql

##install

###down

###1. 在官网下载压缩包。

###2. 解压到本地相应的目录。

如： D:\mysql

###3. 配置。

在 D:\mysql 里创建 my.ini  
输入：

    [mysql]
    # 设置mysql客户端默认字符集
    default-character-set=utf8
    [mysqld]
    # 设置3306端口
    port = 3306
    # 设置mysql的安装目录
    # basedir=C:\web\mysql-8.0.11
    basedir=D:\mysql

###4. 安装

    cd D:\mysql\bin
    mysqld --initialize --console
    // 会生成初始密码
    mysqld install
    //install

###5. 使用

    net start mysql
    // 连接mysql，也就是启动。
    mysql -h localhost -u root -p // login
    ... //password

###6. 修改初始密码

    alter user user() identified by "123456";
    // 好像这个也可以
    mysqladmin -u root password "123456"

###7. 关闭

    exit; // 退出
    mysqladmin -uroot -p shutdown // 关闭

##设置 mysql 用户账户

    INSERT INTO user
    (host, user, password,
    select_priv, insert_priv, update_priv)
    VALUES ('localhost', 'yiibai',
    PASSWORD('123456'), 'Y', 'Y', 'Y');
