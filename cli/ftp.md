# overview
使用ftp协议连接本地与远端的命令行工具。

# install
它没有单独的包，它被包含在`inetutils`中。  `inetutils`中还包括`rcp` / `rexec` / `rlogin` / `rsh` / `telnet`  
```shell
brew intall inetutils
```

# usage
```shell
ftp <server-ip>
# or
ftp> open <server-ip>
# 输入账号、密码

# 上传文件
ftp> put /local/filename [/remote/filename]
# 下载文件
ftp> get /remote/filename [/local/filename]
# 删除文件
ftp> delete /remote/filename
```

# 注意
进入ftp命令行环境，后命令将发生一些变化。
|服务器操作|本地目录操作|||
|-|-|-|-|
|cd [path]|lcd [path]|进入指定目录||
|cd|lcd|退回到根目录||
|cd ..|lcd ..|退回到上一级目录||
|pwd|!pwd|列出当前目录||
|ls|!ls|列出当前目录文件||

# api
||||||
|-|-|-|-|-|
|!|||||
|dir|||||
|macdef|||||
|proxy|||||
|site|||||
|$|||||
|disconnect|||||
|mdelete|||||
|sendport|||||
|size|||||
|account|||||
|epsv4|||||
|mdir|||||
|put|||||
|status|||||
|append|||||
|form|||||
|mget|||||
|pwd|||||
|struct|||||
|ascii|||||
|get|||||
|mkdir|||||
|quit|||||
|system|||||
|bell|||||
|glob|||||
|mls|||||
|quote|||||
|sunique|||||
|binary|||||
|hash|||||
|mode|||||
|recv|||||
|tenex|||||
|bye|||||
|help|||||
|modtime|||||
|reget|||||
|trace|||||
|case|||||
|idle|||||
|mput|||||
|rstatus|||||
|type|||||
|cd|||||
|image|||||
|newer|||||
|rhelp|||||
|user|||||
|cdup|||||
|ipany|||||
|nmap|||||
|rename|||||
|umask|||||
|chmod|||||
|ipv4|||||
|nlist|||||
|reset|||||
|verbose|||||
|close|||||
|ipv6|||||
|ntrans|||||
|restart|||||
|?|||||
|cr|||||
|lcd|||||
|open|||||
|rmdir|||||
|delete|||||
|lpwd|||||
|passive|||||
|runique|||||
|debug|||||
|ls|||||
|prompt|||||
|send|||||

# 后记
创建ftp连接的工具有很多。有些需要收费。我不喜欢。喜欢用免费的。
