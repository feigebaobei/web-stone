# archiver

## overview

> TODO: description

### feature

- feature0
- feature1
- feature2

## install

`npm i archiver`

## usage

```js
const fs = require('fs')
const archiver = require('archiver')

const output = fs.createWriteStream(__dirname + '/example.zip')
const archive = archiver('zip', {
  zlib: { level: 9 }, // 设置压缩级别
})
output.on('close', () => {
  clog('close')
})
output.on('end', () => {
  clog('end')
})
archive.on('warning', () => {
  clog('warning')
})
archive.on('error', () => {
  clog('error')
})
archive.pipe(output) // 对接管道
let file1 = __dirname + '/file1.txt'
archive.append(fs.createReadStream(file1), { name: 'file1.txt' })
archive.append('string cheese', { name: 'file2.txt' })
archive.append(Buffer.from('buff it!'), { name: 'file3.txt' })
archive.file('string', { name: 'file4.txt' }) // .file & .append 都是添加文件
archive.directory('subdir/', 'new-subdir') // 把subdir目录添加到压缩文件的new-subdir目录中
archive.directory('subdir/', flase) // 把subdir目录下的文件添加到压缩文件的根目录。
archive.glob('file*.txt', { cwd: __dirname }) // 添加符合glob pattern的文件。
archive.finalize()
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`archiver.fn(param, first: string, second: boolean = true) => void`
description

`archiver.fn(param, [options: {a: string, b?: number}])`
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
