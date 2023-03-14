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
