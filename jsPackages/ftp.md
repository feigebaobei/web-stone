# `ftp`

## overview
> 为node.js提供异步对接ftp服务器的接口。

## install
`npm i ftp`

## usage
```
const Client = require('ftp');
let c = new Client();
c.on('ready', () => {
    c.list((err, list) => {
        if (err) throw err
        console.dir(list)
        c.end()
    })
    c.get('foo.txt', (err, stream) => {
        if (err) throw err
        stream.once('close', () => {c.end()})
        stream.pipe(fs.createWriteStream('foo.local-copy.txt'))
    })
    c.put('foo.txt', 'foo.remote-copy.txt', function(err) {
      if (err) throw err;
      c.end();
    });
})
c.connect() // 默认连接 localhost:21
```

## configuration
默认配置文件：`path/to/file.json`。

## api
### 事件
|||||
|-|-|-|-|
|greeting(msg: string)|当链接成功后向服务器发送指定消息|||
|ready()|当连接时通过验证后触发|||
|close(hadErr: boolean)|当关闭连接时触发|||
|end()|当连接结束时触发|||
|error(err: Error)|当出现错误时触发。当错误是协议级错误时，`err`包括`code`属性（3位数字）。|||

### 方法
||||||
|-|-|-|-|-|
|`constructor()`|创建并反思一个ftp客户端实例||||
|connect(config: object)|||||
|end()|完成所有排队的命令时关闭连接||||
|destroy()|立即关闭连接||||
|list(path?: string, useCompression?: boolean, callback: (err: error, list: object[]) => {})|列出指定目录（默认是当前工作目录）的内容|object: {type, name, size, date, rights: {user, group, other}, owner, group, target, sticky}|||
|get(path: string, cusCompression?: boolean, callback: (err: error, stream: ReadableStream) => {})|从服务器得到指定文件||||
|put(input: mixed, destPath: string, useCompress?: boolean, callback: (err) => {})|上传指定文件到服务器的指定位置||||
|append(input: mixed, destPath: string, useCompression?: boolean, cb: () => {})|若指定文件已经存在，则在追回，否则与put功能相同。||||
|rename(oldPath: string, newPath: string, cb)|重命名或移到||||
|logout(cb: (err) => {})|登出||||
|delete(path: string, cb: (err) => {})|删除指定文件||||
|cwd(path: string, cb: (err, currentDir) => {})|改变当前工作目录为指定目录||||
|abort(cb: (err) => {})|打断当前传输||||
|site(command: string, cb: (err, responseText: string, responseCode: number))||xxx|||
|status(cb: (err, status: string) => {})|服务器的状态||||
|ascii(cb: (err) => {})|设置传输数据类型为ascii||||
|binary(cb: (err) => {})|设置传输数据类型为binary(二进制，默认使用)||||
|mkdir(path: string, recursive?: boolean, cb: (err) => {})|在服务器上创建指定的目录。||||
|rmdir(path: string, recursive?: boolean, cb: (err) => {})|在服务器上删除指定的目录。||||
|cdup(cb: (err) => {})|改变工作目录为当前工作目录的父目录||||
|pwd(cb: (err, cwd: string) => {})|显示当前工作目录||||
|system(cb: () => {})|显示服务器的系统||||
|listSafe(path: string, useCompression?: boolean, cb)|列出指定目录的内容，与list类似。||||
|size(path: string, cb: (err, numBytes: number) => {})|显示指定文件的大小||||
|lastMod(path: string, cb: (err, lastModified: date) => {})|显示最后一次修改时间||||
|restart(byteOffset: number, cb: (err) => {})|xxx||||

config: {
    host string // localhost
    port number // 21
    secure mixed // false
    secureOptions object // none 添加到tls.connect()
    user string // 'anonymous'
    password string // 'anonymouse@'
    connTimout number // 10000
    pasvTimeout number // 10000
    keepalive number // 多少ms发送'dummy' 10000
}

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。