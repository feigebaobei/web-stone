因系统不同可分为如下三种

# window

1. 先下载 .msi 文件 [https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)
2. 双击该文件，再按提示安装。
3. 不安装`install mongodb compass`
4. 在根目录下（如: c:\ d:\）创建`data\db`目录做为 db 目录。
5. 使用命令行`c:\mongodb\bin\mongod --dbpath c:\data\db`启动 mongodb 服务器。若启动成功，则看到正常提示。
6. 使用命令`c:\mongodb\bin\mongo.exe`连接 mongodb

## 配置 mongodb 服务

以管理员身份打开 cmd。然后执行

```shell
# 创建数据库目录
mkdir c:\data\db
# 创建日志文件
mkdir c:\data\log
# 创建配置文件
c:\mongodb\mongod.cfg
# 内容如下
systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db
# 安装mongodb服务
c:\mongodb\bin\mongod.exe --config "c:\mongodb\mongod.cfg" --install
# 启动mongodb服务
net start MongoDB
# 关闭mongodb服务
net stop MongoDB
# 移除mongodb服务
c:\mongodb\bin\mongod.exe --remove
```

## 启动方式

任选一个：

- 运行 mongodb 服务器
- 配置 mongodb 服务

## 后台管理 shell

可运行 js 脚本  
交互式环境

```
> mongo
MongoDB shell version: 3.0.7
...

> db      # 查看当前文档
test
> db.test.insert({x: 2})      # 在test文档中插入一条记录
```

# linux

# osx

## 1. 去官网进入下载说明页面。

`https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition-on-windows`
![](../../image/db/mongodb/explain.jpg)

## 2. 下载

官网的文档说了 3 个步骤去安装。  
先进入下载页面`https://www.mongodb.com/download-center/community?jmp=docs`  
选择想要有版本、配置。  
复制这个链接，在讯雷中下载。

![](../../image/db/mongodb/download.jpg)

## 3. 安装时的配置

安装类型有 2 个（complete/custom）。选择 custom 可以设置安装位置。  
安装位置建议在非 c 盘。  
![](../../image/db/mongodb/install.jpg)  
取消选择`Install MongoDB Compass`会快。因为勾选上会下载 mongodb compass（图形化管理界面）很久。  
![](../../image/db/mongodb/compass.jpg)

## 4. 验证是否安装成功

进入安装目录的 bin 目录下。打开 cmd 命令行。  
执行`mongod dbpath path\to\MongoDB\data\db`  
![](../../image/db/mongodb/start.jpg)  
在浏览器中输入`http://localhost:27017`。能看到`It looks like you are trying to access MongoDB over HTTP on the native driver port.`。说明安装成功。

## 5. 添加为服务

D:\mongodb\bin\monogd --install -f "D:\mongodb\mongod.cfg"

## 6. 启动/停止

方法一
net start MongoDB // 启动 MongoDB 服务  
net stop MongoDB // 关闭 MongoDB 服务  
C:\mongodb\bin\mongod.exe --remove // 移除 MongoDB 服务  
方法二
在全局变量中添加变量路径  
方法三
创建\*\*\*\*.bat 文件。

```
    echo "MongoDB starting...."
    mongod --dbpath path\to\mongodb\data
    pause
```

---

2019/01/04 by stone

**tip**
创建数据库：
如果没有添加到环境变量就会报错！！！根据提示输入相对路径即可

PS D:\zyhsoftware\MongoDB\Server\4.0\bin> mongod --dbpath D:\zyhsoftware\MongoDB\Server\4.0\data\db
mongod : 无法将“mongod”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径
正确，然后再试一次。
所在位置 行:1 字符: 1

- mongod --dbpath D:\zyhsoftware\MongoDB\Server\4.0\data\db
- ```
    + CategoryInfo          : ObjectNotFound: (mongod:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
  ```

Suggestion [3,General]: 找不到命令 mongod，但它确实存在于当前位置。默认情况下，Windows PowerShell 不会从当前位置加载命令。如果信任此命令，请改为键入“.\mongod”。有关详细信息，请参阅 "get-help about_Command_Precedence"。
PS D:\zyhsoftware\MongoDB\Server\4.0\bin> .\mongod --dbpath D:\zyhsoftware\MongoDB\Server\4.0\data\db
