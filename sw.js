// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         // 使用新版本号，不会与别的版本有冲突
//         caches.open('v0').then(cache => {
//             return cache.addAll([
//                 // '/sw-test/',
//                 // '/sw-test/index.html',
//                 '/'
//             ])
//         })
//     )
// })



self.addEventListener('install', event => {
    event.waitUntil(
      // 使用新版本号，不会与别的版本有冲突
      caches.open('v2').then(cache => {
          return cache.addAll([
              '/',
            //   '/index.html'
          ])
      })
    )
  })
  self.addEventListener('fetch', event => {
    event.respondWith(
          caches.match(event.request).then((response) => {
              // 若缓存中存在则返回，否则请求。
              return response || fetch(event.request).then(res => {
                  // 此时缓存中没有。
                  return caches.open('v2').then(cache => {
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
      let cacheWhiteList = ['v0', 'v1'] // 设置需要删除的cacheName
      event.waitUntil(
          caches.keys().then(keyList => {
              return Promise.all(keyList.map(key => {
                  if (cacheWhiteList.
                  includes(key)) {
                      return caches.delete(key)
                  }
              }))
          })
      )
  })