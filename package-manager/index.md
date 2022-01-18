- [npm](/package-manager/npm/index.html)
- [yarn](/package-manager/yarn/index.html)
- [pnpm](/package-manager/pnpm/index.html)
- [bower](https://bower.io/)
- [spago]()

|||
|-|-|
|dependencies|业务依赖，不包含测试时、本地打包时依赖。|
|devDependencies|开发时依赖，不用于生产环境，通常用于单元测试、打包工具。|
|peerDependencies|同等依赖，当前包兼容的宿主包。|
|optionalDependencies|dependencies的替补包，不要在dependencies、optionalDependencies中都指定相同的包|
|bundledDependencies / bundleDependencies|发布时（打包时）依赖，指定的包会被打包|

npm团队创建了npmjs.com网站。创建了npm命令行。与node团队合作，把npm内置到node中。解决了包管理问题，不解决性能问题。yarn看不下去了。自己搞出一个yarn。它做了本地缓存、做了锁文件，提高了安装速度。yarn是以平面处理所有依赖包。npm后来也有此功能。pnpm以树型结构处理依赖，又添加了一库多包管理功能，不过测试不全面，使用不普遍，有时会出现bug。当前市场上主要的包管理工具就这三个。然后yarn又与corepack合作，也支持了树型结构管理依赖包、一库多包。不再依赖npmjs.com安装。  