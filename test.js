
let fs = require('fs');
let path = require('path');
let {log} = console;
// fs.readdir('first/second', (err, data) => {
//     log(err, data)
//     // data: [方法名, ...]
//     // [a.md, b.md, ...]
// })
// fs.stat('first/', (err, infoArr) => {
//     log(err, infoArr)
// })

let listP = (partPath) => {
    // 生成绝对路径、相对路径。
    return new Promise((s, j) => {
        fs.readdir(partPath, (err, nameArr) => {
            if (err) {
                log('uploadDir listP', partPath, err)
                j(err)
            } else {
                s(nameArr.map(item => {
                    let pp = `${partPath}/${item}`
                    return {
                        partPath: pp,
                        allPath: path.resolve(__dirname, pp)
                    }
                }))
            }
        })
    })
}

listP('first').then(res => {
    log(res)
}).catch(err => {
    log(err)
})