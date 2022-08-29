const cacheWhiteList = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14'] // 设置需要删除的cacheName
const currentVersion = 'v15'
// const cacheSourceList = []
const unCacheSourceList = ['/pwa.js']
const log = console.log

self.addEventListener('install', event => {
    event.waitUntil(
      // 使用新版本号，不会与别的版本有冲突
      caches.open(currentVersion).then(cache => {
          return cache.addAll([
              '/',
            //   '/index.html'
          ])
      })
    )
  })

// let tryFetch = (request) => {
//     console.log('request', request)
//     if (unCacheSourceList.includes(request)) {
//         return fetch(request)
//     } else {
//         return caches.match(request).then((response) => {
//             return response || fetch(request).then(res => {
//                 return caches.open(currentVersion).then(cache => {
//                     cache.put(request, res.clone())
//                     return res
//                 })
//             })
//         })
//     }

// }
self.addEventListener('fetch', event => {
    // console.log('event.request', event.request)

    // console.log('for test')
    event.respondWith(
        // 测试通过
        // // 缓存优先
        // caches.match(event.request).then((response) => {
        //     // 若缓存中存在则返回，否则请求。
        //     return response || fetch(event.request).then(res => {
        //         // 此时缓存中没有。
        //         return caches.open(currentVersion).then(cache => {
        //             // 把数据添加到缓存中
        //             cache.put(event.request, res.clone())
        //             // 把响应克隆一份后缓存起来。把原始响应返回给调用它的页面。
        //             // 请求和响应流只能被读取一次。缓存起来的是克隆出来的，返回给页面的是原始的。
        //             return res
        //         })
        //     })
        // })

        // 网络优先
        // 测试通过
        fetch(event.request).then(res => {
            return caches.open(currentVersion).then(cache => {
                cache.put(event.request, res.clone())
                return res
            })
        }).catch(err => { // 若断网，则走这
            // log('err', err)
            // return err
            // 从pwa-box中取出默认返回的数据
            return caches.match(event.request) || {code: 0, message: '', data: {}}
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
                // if (cacheWhiteList.
                // includes(key)) {
                //     console.log('true', true)
                //     return caches.delete(key)
                // }
                if (key !== currentVersion) {
                    log('被删除的缓存', key)
                    return caches.delete(key)
                }
            }))
        })
    )
})