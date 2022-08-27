const cacheWhiteList = ['v6', 'v7', 'v8', 'v9', 'v10', 'v11'] // 设置需要删除的cacheName
const currentVersion = 'v12'
// const cacheSourceList = []
const unCacheSourceList = ['/pwa.js']
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
    console.log('event.request', event.request)
    event.respondWith(
        caches.match(event.request).then((response) => {
            // 若缓存中存在则返回，否则请求。
            return response || fetch(event.request).then(res => {
                // 此时缓存中没有。
                return caches.open(currentVersion).then(cache => {
                    // 把数据添加到缓存中
                    cache.put(event.request, res.clone())
                    // 把响应克隆一份后缓存起来。把原始响应返回给调用它的页面。
                    // 请求和响应流只能被读取一次。缓存起来的是克隆出来的，返回给页面的是原始的。
                    return res
                })
            })
        })
    )
})

self.addEventListener('activate', event => {
    console.log('activate', cacheWhiteList)
    event.waitUntil(
        caches.keys().then(keyList => {
        console.log('keyList', keyList)
        return Promise.all(keyList.map(key => {
                console.log('key', key)
                if (cacheWhiteList.
                includes(key)) {
                    console.log('true', true)
                    return caches.delete(key)
                }
            }))
        })
    )
})