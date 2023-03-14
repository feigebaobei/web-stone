# “指定的服务已标记为删除”的解决

在管理员权限下运行 cmd:

"sc delete MongoDB" // 会删除服务。

我们需要的不是删除服务，而是启动服务。

解决方法：关闭服务管理窗口，重新删除，安装服务项。

mongod --install -f "D:\mongodb\mongod.cfg"

# 启动服务

net start mongodb

# win10 安装 mongodb，并配置服务

1. 下载，安装 mongodb.

2. 创建 data 目录（用来放数据）log 目录（用来放日志）

3. 在 mongodb 根目录下创建一个配置文件。

   ```
   dbpath=d:\mongodb\data
   logpath=d:\mongodb\log\mongolog.log
   logappend=true
   auth=false
   ```

   auth 默认为 false，不起用密码验证。

4. d:\mongodb\bin> mongod --config d:\mongodb\mongod.cfg --serviceName MongoDB --install

5. 启动服务。在服务管理里手动启动服务。或者，net start MongoDB. 使用相同的方法可以关闭服务。

6. 使用密码验证。

   ```
   use admin // 打开用户库
   db.createUser({user: "sa", pwd: "123456", roles: [{role:"root", db: "admin"}]})
   把config文件里auth=false改为true。然后重启服务。
   ```

# 通过 cmd 命令安装、卸载、启动和停止 Windows Service（InstallUtil.exe）

1. 打开 cmd
2. 进入 xx.exe 目录。
3. xx.exe path/to/xx.exe
4. net start servicename
5. net stop servicename
6. xx.exe /u path/to/xx.exe
