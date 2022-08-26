self.addEventListener('install', (event) => {
    event.waitUntil(
        // 使用新版本号，不会与别的版本有冲突
        caches.open('v0').then(cache => {
            return cache.addAll([
                // '/sw-test/',
                // '/sw-test/index.html',
                '/'
            ])
        })
    )
})