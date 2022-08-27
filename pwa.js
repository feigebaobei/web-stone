
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register(   // 注册
//                                         // 注册完成后，sw.js 文件会自动
//                                         // 1. 下载
//                                         // 2. 安装
//                                         // 3. 然后激活。
//         'sw.js', // 相对于origin
//         {scope: '/'} // 指定注册范围。即：能拦截网络调用的路径
//     ) // 返回一个promise.其值是ServiceWrokerRegistration
//     .then((registration) => {
//         // ...
//         console.log('then',registration )
//     })
//     .catch((err) => {
//         console.log('catch', err)
//     })
// }


let tryRegister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('注册成功', registration)
        }).catch(error => {
            console.log('注册失败', error)
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