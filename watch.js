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
let {log} = console

// One-liner for current directory
chokidar.watch('.').on('all', (event, path) => {
    console.log(event, path);
});