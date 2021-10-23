Streams是一个对象。用于读数据、写数据。有以下功能：
- readable
- writable
- duplex
- transform
流对象是`EventEmitter`的实例。它有以下事件：
- data 开始读取时
- end
- error
- finish

# overview
- 常用管道操作（又名：流式操作）
- 不限制管道操作
- 链式操作：从一个地方读取数据，再输出给另一个地方。

# usage

```
// demo
let fs = require('fs')
let data = ''
let readerStream = fs.createReadStream('input.txt')
readerStream.on('data', () => {...})
readerStream.on('end', () => {...})
readerStream.on('error', () => {...})
readerStream.on('finish', () => {...})
let writerStream = fs.createWriteStream('output.txt')
writerStream.on('data', () => {...})
writerStream.on('end', () => {...})
writerStream.on('error', () => {...})
writerStream.on('finish', () => {...})
readerStream
    .pipe(...)
    .pipe(...)
    .pipe(...)
    .pipe(writerStream)
```