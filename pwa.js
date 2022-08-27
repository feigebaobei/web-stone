let tryRegister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(registration => {
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