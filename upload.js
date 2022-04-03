let Client = require('ftp')
let fs = require('fs')
let path = require('path')

let {log } =console

let wrapCbToPromise = (fn, ...args) => {
    return new Promise((s, j) => {
        fn(...args, (err, ...r) => {
            if (err) {j(err)} else {s(...r)}
        })
    })
}
let fn2 = (dirOrFile) => {
    wrapCbToPromise(fs.stat, dirOrFile).then(stat => {
        if (stat.isDirectory()) { // dir
            wrapCbToPromise(fs.readdir, dirOrFile).then((list) => {
                list.forEach((item) => {
                    let pathItem = path.join(dirOrFile, item)
                    fn2(pathItem)
                })
            }).catch(err => {
                log('readdir catch', err)
            })
        } else { // file
            // uploadAll(dirOrFile)
            upload(dirOrFile)
        }
    }).catch(err => {
        log('fn2 catch', err)
    })
}
let uploadAll = (file) => {
    return 
}
let upload = (path, destPath) => {
    destPath = destPath || `htdocs/${path}`
    log('path', path, 'destPath', destPath)
    wrapCbToPromise(c.put, path, destPath).then(res => {
        log('then', res)
    }).catch(err => {
        log('put catch', err)
    })
}

let upload2 = (path, destPath) => {
    destPath = destPath || `htdocs/${path}`
    log('path', path, 'destPath', destPath)
    new Promise((s, j) => {
        c.put(path, destPath, (err) => {
            if (err) {j(err)} else (s())
        })
    })
}

let c = new Client()
c.connect({
    // host: '',
    // user: '',
    // password: ''
})

c.on('ready', () => {
    log('ready')
    // c.list((err, list) => {
    //     if (err) throw err
    //     console.dir(list)
    //     // c.end()
    // })
    // c.get('htdocs/index.html', (err, stream) => {
    //     if (err) throw err;
    //     stream.once('close', () => {c.end()})
    //     stream.pipe(fs.createWriteStream('../hi.html'))
    // })
    // 测试删除目录 可以删除
    // c.rmdir('htdocs/firstEmpty', (err) => {
    //     if (err) {throw err}
    // })
    // c.rmdir('htdocs/second', true, (err) => {
    //     if (err) {throw err}
    // })
    // 测试上传目录
    // fn2('second') // no
    // 远端无指定目录时无法上传文件
    // c.put('second/1.md', 'htdocs/second/1.md', (err) => {
    //     if (err) {throw err}
    // })
    // 测试上传指定文件
    // upload2('second/1.md') // ok
    // 测试得到指定目录的子元素
    c.list('second', (err, list) => {
        log(err, list)
    })
})
c.on('greeting', (s) => {
    log('greeting', s)
})
c.on('close', (b) => {
    log('close', b)
})
c.on('end', (b) => {
    log('end', b)
})
c.on('error', (b) => {
    log('error', b)
})

// setTimeout(() => {
//     log('destroy')
//     c.destroy()
// }, 3000)