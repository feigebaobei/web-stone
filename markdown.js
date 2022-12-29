const fs = require('fs')
const exec = require('child_process').exec
// let clog = console.log

exec('git status -s', (err, res) => {
  if (!err) {
    // 取得 *.html 文件
    // 替换
    let arr = res.split('\n')
    arr = arr
      .map((item) => {
        return item.slice(3)
      })
      .filter((item) => {
        return item.endsWith('.html') && !item.includes('->')
      })
    // clog(arr)
    arr.forEach((item) => {
      let cont = fs.readFileSync(item, 'utf-8')
      cont = cont.replace(/<img src="file:\/\/\//, '<img src="')
      fs.writeFileSync(item, cont)
      exec(`git add ${item}`)
    })
  }
})
