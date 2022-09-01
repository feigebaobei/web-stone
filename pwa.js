let tryRegister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(registration => {
        // navigator.serviceWorker.register('swUpdate.js').then(registration => {
            console.log('注册成功', registration)
        }).catch(error => {
            console.log('注册失败', error)
        })
        navigator.serviceWorker.getRegistrations().then(registrationList => {
            console.log('getRegistrations', registrationList)
        })
    } else {
        console.log('当前浏览器不支持serviceWorker')
    }
}
tryRegister()

let deferredPrompt // 也可以命名为别的变量
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e  // 暂存安装事件
    showInAppInstallPromotion() // 自定义的提示安装的方法
})
let showInAppInstallPromotion = () => {
  deferredPrompt.prompt() // 使用暂存的安装事件
  deferredPrompt = null   // 释放内存
}

// 添加更新按钮
// 测试通过
let addUpdateButton = () => {
    let body = document.querySelector('body')
    let board = document.createElement('div')
    let button = document.createElement('button')
    button.innerText = '强制更新 service worker'
    let clickButtonHandler = (event) => {
        console.log('clickButtonHandler', event)
        navigator.serviceWorker.ready.then((registration) => {
            console.log('更新了', registration)
            registration.update()
        })
        
    }
    button.addEventListener('click', clickButtonHandler)
    board.appendChild(button)
    board.style = {
        position: 'absolute',
        right: '15px',
        bottom: '50px',
    }
    body.appendChild(board)
}
// addUpdateButton()