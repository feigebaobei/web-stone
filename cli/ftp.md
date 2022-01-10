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
|command|说明|syntax|||
|-|-|-|-|-|
|append|把本地文件添加到远端文件中。文件类型以本地文件类型为准。|`append <localfile> [remotefile]`|||
|ascii|设置传输类型是ascii。ftp支持2种传输类型：ascii(default)/binary。|`ascii`|||
|bell|切换当每个文件传输完成时是否发出声音。默认关闭。|`bell`|||
|binary|设置传输类型是binary|`binary`|||
|bye|结束ftp会话，并退出ftp命令行。|`bye`|||
|cd|改变为指定的远端工作目录|`cd <remotedir>`|||
|close|关闭ftp会话，并保持ftp命令行环境。|`close`|||
|debug|切换是否打开debuggin模式。默认关闭。若打开则处理每一个命令。使用`>`继续执行。|`debug`|||
|!|||||
|dir|列出指定的远端目录内的文件或目录的信息。若指定本地文件，则写在本地文件中，会覆盖原内容。|`dir [<remotedir>] [<localfile>]`|||
|disconnect|断开连接，并保持在ftp命令行中。|`disconnect`|||
|get|使用当前文件传输类型把远端文件复制到本地。|`get <remotefile> [<localfile>]`|||
|delete|删除远端的指定文件|`delete <remotefile>`|||
|glob|切换是否允许对本地文件执行通配符扩展。默认允许。|`glob`|||
|hash|切换是否使用`#`标明已经传输的块。|`hash`|||
|lcd|改变本地工作目录。默认执行`ftp`命令的目录。|`lcd [<directory>]`|||
|literal|把命令发送给远端服务器。让服务器逐字执行。返回服务器返回的结果。|`literal <argument> []`|||
|ls|列出远端的当前目录内容|`ls [<remotedirectory>] [<localfile>]`|||
|mget|使用当前传输类型把远端的文件复制到本地。|`mget <remotefile>[]`|||
|mkdir|在远端创建一个目录|`mkdir <directory>`|||
|mls|列出指定文件、目录的内容。|`mls <remotefile>[] <localfile>`|||
|mput|使用当前传输类型把多个本地文件传输到远端。|`mput <localfile>[]`|||
|open|连接指定的ftp服务器。computer可使用ip/computer name。port默认21|`open <computer> [<port>]`|||
|prompt|切换是否打开确认信息。常用于`mget / mput`|`prompt`|||
|put|使用当前传输类型，把指定的本地文件传输给远端。|`put <localfile> [<remotefile>]`|||
|pwd|显示远端当前的目录||||
|quit|与`bye`相同|`quit`|||
|quote|与`literal`相同|`quote <argument>[]`|||
|recv|与`get`相同|`recv <remotefile> [<localfile>]`|||
|remotehelp|列出帮助内容||||
|rename|重命名远端文件|`rename <filename> <newfilename>`|||
|rmdir|删除指定的远端目录|`rmdir <directory>`|||
|send|与`put`相同||||
|status|显示当前连接的状态|`status`|||
|trace|切换显示ftp内部调用的方法|`trace`|||
|type|设置ftp传输类型。可选`ascii / binary`。默认是`ascii`||||
|user|指定在远端的用户|`user <username> [<password>] [<account>]`|||
|verbose|切换是否啰嗦。默认打开状态。打开时每个命令执行完后就执行显示回馈。|`verbose`|||
|mdelete|删除远端的多个文件|`mdelete <remotefile>[...]`|||
|mdir|显示远端的文件列表|`mdir <remotefile>[...] <localfile>`|||
|macdef|||||
|proxy|||||
|site|||||
|$|||||
|sendport|||||
|size|||||
|account|||||
|epsv4|||||
|form|||||
|struct|||||
|system|||||
|sunique|||||
|mode|||||
|tenex|||||
|help|||||
|modtime|||||
|reget|||||
|case|||||
|idle|||||
|rstatus|||||
|image|||||
|newer|||||
|rhelp|||||
|cdup|||||
|ipany|||||
|nmap|||||
|umask|||||
|chmod|||||
|ipv4|||||
|nlist|||||
|reset|||||
|ipv6|||||
|ntrans|||||
|restart|||||
|?|||||
|cr|||||
|lpwd|||||
|passive|||||
|runique|||||

# 后记
创建ftp连接的工具有很多。有些需要收费。我不喜欢。喜欢用免费的。
