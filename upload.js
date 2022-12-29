let Client = require('ftp')
let fs = require('fs')
let path = require('path')

let { log } = console

// 创建指定目录
// 测试完成

let makeDir = (path, recursive = true) => {
  return new Promise((s, j) => {
    c.mkdir(path, recursive, (err) => {
      if (err) {
        log('makeDir', path, err)
        j(err)
      } else {
        log('makeDir', path, '创建成功')
        s(true)
      }
    })
  })
}
// 检查是否存在指定目录
// 测试完成
let checkDir = (path) => {
  // log('checkDir path', path)
  let arr = path.split('/').filter((item) => !!item)
  let ps = arr.map((item, index) => {
    return new Promise((s, j) => {
      let currentDir = arr.slice(0, index).join('/')
      c.list(currentDir, (err, list) => {
        if (err) {
          log('checkDir', currentDir, err)
          j(err)
        } else {
          let flag = list.find((ele) => {
            return ele.name === item
          })
          if (flag) {
            log(`${currentDir}/${item}`, '存在')
            s(true)
          } else {
            log(`${currentDir}/${item}`, '不存在')
            s(false)
          }
        }
      })
    })
  })
  let result = Promise.all(ps)
    .then((resultArr) => {
      return resultArr
    })
    .catch((e) => {
      return Promise.reject(e)
    })
  return result
}
// 上传一个目录
// 测试完成
let uploadDir = (partPath) => {
  let existP = checkDir(partPath).then((res) => {
    if (res.some((item) => !item)) {
      return makeDir(partPath)
    } else {
      return Promise.resolve(true)
    }
  })
  // 取出本地指定目录下的内容
  let listP = (partPath) => {
    // 生成绝对路径、相对路径。
    return new Promise((s, j) => {
      // 返回当前目录子元素的名字
      fs.readdir(partPath, (err, nameArr) => {
        if (err) {
          log('uploadDir readdir', partPath, err)
          j(err)
        } else {
          s(nameArr)
        }
      })
    })
      .then((nameArr) => {
        return Promise.all(
          nameArr.map((fileName) => {
            return new Promise((s, j) => {
              let pp = path.join(partPath, fileName)
              fs.stat(pp, (err, info) => {
                if (err) {
                  log('uploadDir stat', pp, dir)
                  j(err)
                } else {
                  s({
                    partPath: pp,
                    isFile: info.isFile(),
                    allPath: path.resolve(__dirname, pp),
                  })
                }
              })
            })
          })
        )
        // .then(arr => {
        //     log('arr', arr)
        // arr [
        //     {
        //       partPath: 'first/second/e.md',
        //       allPath: '/Users/cat/Documents/code/personal/web-stone/first/second/e.md'
        //     },
        //     {
        //       partPath: 'first/second/f.md',
        //       allPath: '/Users/cat/Documents/code/personal/web-stone/first/second/f.md'
        //     },
        //     {
        //       partPath: 'first/second/third',
        //       allPath: '/Users/cat/Documents/code/personal/web-stone/first/second/third'
        //     }
        //   ]
        // })
      })
      .then((arr) => {
        let [curFiles, curDirs] = [[], []]
        arr.forEach((item) => {
          item.isFile ? curFiles.push(item) : curDirs.push(item)
        })
        return { curFiles, curDirs }
      })
  }
  return Promise.all([existP, listP(partPath)]).then((resArr) => {
    // log('resArr', JSON.stringify(resArr))
    // resArr [
    //     true,
    //     {
    //         "curFiles":[
    //             {
    //                 "partPath":"first/second/e.md",
    //                 "isFile":true,
    //                 "allPath":"/Users/cat/Documents/code/personal/web-stone/first/second/e.md"
    //             },
    //             {
    //                 "partPath":"first/second/f.md",
    //                 "isFile":true,
    //                 "allPath":"/Users/cat/Documents/code/personal/web-stone/first/second/f.md"
    //             }
    //         ],
    //         "curDirs":[
    //             {
    //                 "partPath":"first/second/third",
    //                 "isFile":false,
    //                 "allPath":"/Users/cat/Documents/code/personal/web-stone/first/second/third"
    //             }
    //         ]
    //     }
    // ]
    let [_, { curFiles, curDirs }] = resArr
    let curFilesPs = curFiles.map((item) => {
      return uploadFile(item.partPath)
    })
    let curDirsPs = curDirs.map((item) => {
      return uploadDir(item.partPath)
    })
    return Promise.all([...curFilesPs, ...curDirsPs])
  })
}
// 上传文件
// 测试完成
let uploadFile = (filePath) => {
  let partPath = filePath
  return new Promise((s, j) => {
    c.put(partPath, partPath, (err) => {
      if (err) {
        log('uploadFile', partPath, err)
        j(err)
      } else {
        log('uploadFile', partPath, '上传成功')
        s(true)
      }
    })
  })
}

// 上传多个文件
// 待测试
// 目前只能上传目录已存在的。
let uploadFiles = (fileArr) => {
  // let dirArr = new Set()
  // 检测
  // let dirArr = fileArr.map(file => {
  //     return file.split('/').slice(0, -1).join('/') // 返回目录
  // })
  // let dirSet = new Set()
  // dirArr.forEach(dir => {
  //     dirSet.add(dir)
  // })
  // let checkDirPs = Promise.all(dirSet.map(dir => {
  //     return checkDir(dir)
  // }))
  return Promise.all(
    fileArr.map((file) => {
      return uploadFile(file)
    })
  )
}
// 删除指定目录
// 测试完成
let removeDir = (path) => {
  return new Promise((s, j) => {
    c.rmdir(path, true, (err) => {
      if (err) {
        log('removeDir', path, err)
        j(err)
      } else {
        log('removeDir', path, '删除成功')
        s(true)
      }
    })
  })
}

// 删除文件
// 测试完成
let removeFile = (filePath) => {
  return new Promise((s, j) => {
    c.delete(filePath, (err) => {
      if (err) {
        log('removeFile', filePath, err)
        j(err)
      } else {
        log('removeFile', filePath)
        s(true)
      }
    })
  })
}

let c = new Client()
// 看到也没乱动
c.connect({
  host: '123.56.120.250',
  user: 'wh-nbbwqo272qg4pzewu9w',
  password: 'Feige177105',
})

c.on('ready', () => {
  log('ready')
  // 默认上传全部
  c.cwd('htdocs', (err, currentDir) => {
    if (err) {
      log('cwd', 'htdocs', err)
      throw err
    }
    // let p = ''
    let p = [
      // 'webRTC/index.html',
      'browser/index.html',
      'browser/crossDomain.html',
      'browser/cookie.html',
      // 'browser/keyUrl.html',
      'index.html',
      // 'promote/cryptology.html',
    ]
    // 检测指定目录是否存在
    // checkDir(p)
    // 检测删除目录
    // removeDir(p).then(() => {c.end()})
    // 测试删除文件
    // removeFile(p).then(() => {
    //   // log('then')
    //   c.end()
    // }).catch(err => {
    //       log('catch', err)
    //       c.end()
    // })
    // 测试上传单个文件
    // uploadFile(p)
    // 上传多个文件
    uploadFiles(p)
      .then(() => {
        log('then', '全部完成')
        c.end()
      })
      .catch((err) => {
        log('catch', err)
        c.end()
      })
    // 创建目录
    // makeDir(p)
    //   .then(() => {
    //     c.end()
    //   })
    //   .catch((err) => {
    //     log('catch', err)
    //     c.end()
    //   })
    // 测试上传一个目录
    // uploadDir(p).then(res => {
    //     log('全部上传完成', res)
    //     c.end()
    // }).catch(err => {
    //     log('catch', err)
    //     c.end()
    // })
  })
})
c.on('greeting', (s) => {
  log('greeting', s)
})
c.on('close', (b) => {
  log('close', b)
})
c.on('end', () => {
  log('end')
})
c.on('error', (b) => {
  log('error', b)
})

// setTimeout(() => {
//     log('destroy')
//     c.destroy()
// }, 3000)
