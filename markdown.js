// '<img src="file:///'
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
let clog = console.log

exec('git status -s', (err, res) => {
  // clog(err)
  // clog(res)
  if (!err) {
    // 取得 *.html 文件
    // 替换
    let arr = res.split('\n')
    arr = arr
      .map((item) => {
        return item.slice(3)
      })
      .filter((item) => {
        return item.endsWith('.html')
      })
    clog(arr)
    // arr = ['communication-protocol/ip.html']
    arr.forEach((item) => {
      let cont = fs.readFileSync(item, 'utf-8')
      cont = cont.replace(/<img src="file:\/\/\//, '<img src="')
      fs.writeFileSync(item, cont)
    })
  }
})
