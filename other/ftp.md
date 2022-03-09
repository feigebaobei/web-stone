# `ftp`

## overview
> TODO: description

### feature
- 为node.js提供了链接ftp服务器的客户端
- feature1
- feature2

## install
`npm i ftp`

## usage
```
var Client = require('ftp');
var c = new Client();
c.on('ready', function() {
c.list(function(err, list) {
    if (err) throw err;
    console.dir(list);
    c.end();
});
});
// connect to localhost:21 as anonymous
c.connect();
```

## api
`ftp.fn(param, first: string, second: boolean = true) => void`
description

`ftp.fn(param, [options: {a: string, b?: number}])`
description

## event
都是使用`c.(事件名, () => {})`方式定义的。
|事件名|触发时刻|绑定方法的参数|||
|-|-|-|-|-|
|greeting|当连接服务器后服务器发来的信息|msg|||
|ready|当连接并验证通过时触发|-|||
|close|当连接完全断开时|boolean 是否有错误|||
|end|当连接结束时触发|-|||
|error|当出现错误时。若是通信级错误，则参数包括code属性，其值是3位数字。|err|||

## methods

|方法名|||||
|-|-|-|-|-|
|constructor()|||||
|connect(config)|host(localhost)/port(21)/secure(false mixed)/secureOptions(none obj 添加属性到tls.connect())/user(anonymous)/password(anonymous@)/connTimeout(10000 ms)/pasvTimeout(10000 ms)/keepalive(10000 ms)||||
|end()|当队列中所有命令都完成后判断连接||||
|destroy|立即关闭连接||||
|`list([< string >path, ][< boolean >useCompression, ]< function >(< Error >err, < array >list) => {})`|列出指定目录的文件|list: {type, name, size, date, rights: {user, group, other}, owner, group, target, sticky}|||
|`get(< string >path, [< boolean >useCompression, ]< function >< Error >err, < ReadableStream >fileStream )`|从服务器中得到指定的文件||||
|`put(< mixed >input, < string >destPath, [< boolean >useCompression, ]< function >(< Error >err))`|||||
|`append(< mixed >input, < string >destPath, [< boolean >useCompression, ]< function >() => {})`|||||
|`rename(< string >oldPath, < string >newPath, < function >(< Error >err) => {})`|||||
|`logout(< function >() => { < Error >err}))`|在服务端输出日志||||
|`delete(< string >path, < function >() => { < Error >err})`|||||
|`cwd(< string >path, < function >（< Error >err, < string >currentDir) => {}`|改变当前工作目录到指定的目录||||
|`abort(< function >(< Error >err) => {}) `|打断数据传输||||
|`site(< string >command, < function >（< Error >err, < _string >responseText, < integer >responseCode) => {}`|Sends command (e.g. 'CHMOD 755 foo', 'QUOTA') using SITE||||
|`status(< function >（< Error >err, < string >status) => {} `|返回服务器的状态||||
|`ascii(< function >(< Error >err) => {})`|设置传输时数据类型为ascii||||
|`binary(< function >(< Error >err) => {})`|设置传输时数据类型为binary||||
|`mkdir(< string >path, [< boolean >recursive, ]< function >(< Error >err) => {}) `|||||
|`rmdir(< string >path, [< boolean >recursive, ]< function >(< Error >err) => {}) `|||||
|`cdup(< function >(< Error >err) => {})`|改变当前工作目录为当前目录的父目录||||
|`pwd(< function >(< Error >err, < string >cwd.) => {}) `|Retrieves the current working directory, 得到当前工作目录||||
|`system(< function >(< Error >err, < string >os) => {}) `|得到服务器的操作系统||||
|`listSafe([< string >path, ][< boolean >useCompression, ]< function >(< Error >err) => {})`|Similar to list(), except the directory is temporarily changed to path to retrieve the directory listing. This is useful for servers that do not handle characters like spaces and quotes in directory names well for the LIST command. This function is "optional" because it relies on pwd() being available.||||
|`size(< string >path, < function >(< Error >err, < integer >numBytes) => {})`|得到path的大小||||
|`lastMod(< string >path, < function >callback)`|得到最后一次更新的时间||||
|`restart(< integer >byteOffset, < function >(< Error >err) => {})`|Sets the file byte offset for the next file transfer action (get/put) to byteOffset||||

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。