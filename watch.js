// let sentry = require('sentry')
// // watch(file, [task,] callback)
// // watchRegExp(root, regex, [task,] callback)
// // findWildcards(file)
// let {log} = console

// log(sentry)

// let reg = new RegExp('\w*\.html')
// sentry.watchRegExp('', reg, (file) => {
//     log('file', file)
// })

let chokidar = require('chokidar')
let { log } = console

// One-liner for current directory
// chokidar.watch('.').on('all', (event, path) => {
//     console.log(event, path);
// });

// let watcher = chokidar.watch('./', {
//     persistent: true,
//     ignored: ['node_modules', '.git']
// })
// watcher.on('.', (e, p) => {
//     log(e, p)
// })

chokidar
  .watch('.', {
    persistent: true,
    ignored: [
      /node_modules/,
      /\.git/,
      /\.DS_Store/,
      'framework/react/next/demo0',
      'language/rust/demo0',
      /demo\d*\/\.*\/build/, // 不包括打包结果
    ],
  })
  .on('all', (eventName, path) => {
    log(eventName, path)
    // {'all'|'add'|'addDir'|'change'|'unlink'|'unlinkDir'|'raw'|'error'|'ready'} EventName
    //     Watches files & directories for changes. Emitted events:
    //  * `add`, `addDir`, `change`, `unlink`, `unlinkDir`, `all`, `error`
    // ready   初始化扫描完成后
    // raw     原生事件
    // change  文件被修改后
    // unlink  文件被删除后
    // 如果添加一个有文件的文件夹，则先执行addDir，然后执行所有的add。
    // 如果删除一个有文件的文件夹，则先执行所有的unlink，然后执行unlinkDir。
    switch (eventName) {
      case 'add':
        break
      case 'addDir':
        break
      case 'change':
        break
      case 'unlink':
        break
      case 'unlinkDir':
        break
    }
  })
