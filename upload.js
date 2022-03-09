let Client = require('ftp')
let fs = require('fs')

let {log } =console

let c = new Client()
c.connect({
    host: '',
    user: '',
    password: ''
})

c.on('ready', (v) => {
    log('ready', v)
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