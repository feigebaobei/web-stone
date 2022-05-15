## which
`which [options] file_name...`  
显示在哪个目录下寻找可执行文件。  

## netstat
命令用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况。netstat是在内核中访问网络及相关信息的程序，它能提供TCP连接，TCP和UDP监听，进程内存管理的相关报告。  

```shell
netstat [-acCeFghilMnNoprstuvVwx][-A<网络类型>][--ip]
netstat -lunpt
```

-a或–all 显示所有连线中的Socket。  
-A<网络类型>或–<网络类型> 列出该网络类型连线中的相关地址。  
-c或–continuous 持续列出网络状态。  
-C或–cache 显示路由器配置的快取信息。  
-e或–extend 显示网络其他相关信息。  
-F或–fib 显示FIB。  
-g或–groups 显示多重广播功能群组组员名单。  
-h或–help 在线帮助。  
-i或–interfaces 显示网络界面信息表单。  
-l或–listening 显示监控中的服务器的Socket。  
-M或–masquerade 显示伪装的网络连线。  
-n或–numeric 直接使用IP地址，而不通过域名服务器。  
-N或–netlink或–symbolic 显示网络硬件外围设备的符号连接名称。  
-o或–timers 显示计时器。  
-p或–programs 显示正在使用Socket的程序识别码和程序名称。  
-r或–route 显示Routing Table。  
-s或–statistice 显示网络工作信息统计表。  
-t或–tcp 显示TCP传输协议的连线状况。  
-u或–udp 显示UDP传输协议的连线状况。  
-v或–verbose 显示指令执行过程。  
-V或–version 显示版本信息。  
-w或–raw 显示RAW传输协议的连线状况。  
-x或–unix 此参数的效果和指定”-A unix”参数相同。  
–ip或–inet 此参数的效果和指定”-A inet”参数相同。  

## rm

（英文全拼：remove）命令用于删除一个文件或者目录。
```
rm [options] name...
rm test.txt 
rm -r * 
```

-i 删除前逐一询问确认。  
-f 即使原档案属性设为唯读，亦直接删除，无需逐一确认。  
-r 将目录及以下之档案亦逐一删除。  
