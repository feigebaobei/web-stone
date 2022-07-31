# `ngrok`

## overview
> ngrok 是一个反向代理，
> 这个可以创建一个公共url链接到你的本地计算机（服务器），使得外网中的用户可以根据这个临时的url访问你的本地服务器。
> 提供外网服务的还有好多。
安装也很简单，进入官网https://ngrok.com/，下载相应版本的ngrok，并注册一个账户，注册完之后会给你一个唯一的Tunnel，这就相当于你的Key.然后在下载好的命令行中输入图中所示：ngrok authtoken "your tunnel".

### feature
- feature0
- feature1
- feature2

## install
`npm i ngrok`
它应该放在可执行文件的目录下的。可是我还有此目录，就行放在这里吧。
1. 去[官网](https://ngrok.com)注册账号后[下载](https://dashboard.ngrok.com/get-started/setup)。
2. 下载完后，在命令行中进入刚才下载的文件的目录。执行`unzip /path/to/ngrok.zip`  
3. 连接账号：执行`./ngrok config add-authtoken $YOURACCOUNT`  
4. 验证是否安装成功：执行`ngrok help`
   4.1. 解决环境变量：`sudo cp ngrok /usr/local/bin` 把ngrok命令复制到`usr/local/bin`目录下了。
5. 尝试启动一个服务`ngrok http 80`

## usage
请在完成安装后再执行
1. 在`<root>`目录下创建一个index.html文件，并写入基本内容。  
2. 使用`serve`包在`<root>`目录启动服务。一般在本地使用`localhost:3000`可访问index.html.  
3. 再执行`ngrok http 3000`.会提示外网的url.
4. 在浏览器中输入外网url.

## configuration
配置文件：`ngrok/ngrok.yml`。
不需要修改。  

|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
`ngrok.fn(param, first: string, second: boolean = true) => void`
description

`ngrok.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。