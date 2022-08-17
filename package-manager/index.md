- [npm](/package-manager/npm/index.html)
- [yarn](/package-manager/yarn/index.html)
- [pnpm](/package-manager/pnpm/index.html)
- [bower](https://bower.io/)
- [spago]()
- [cargo](/package-manager/cargo/index.html)
- [title](/package-manager/title/index.html)
- [title](/package-manager/title/index.html)
- [title](/package-manager/title/index.html)
- [title](/package-manager/title/index.html)

npm团队创建了npmjs.com网站。创建了npm命令行。与node团队合作，把npm内置到node中。解决了包管理问题，不解决性能问题。yarn看不下去了。自己搞出一个yarn。它做了本地缓存、做了锁文件，提高了安装速度。yarn是以平面处理所有依赖包。npm后来也有此功能。pnpm以树型结构处理依赖，又添加了一库多包管理功能，不过测试不全面，使用不普遍，有时会出现bug。当前市场上主要的包管理工具就这三个。然后yarn又与corepack合作，也支持了树型结构管理依赖包、一库多包。不再依赖npmjs.com安装。  

## lock文件
现在每个包管理工具都有会生成各自的锁文件。原来是在package.json中保存该包的依赖信息。但是随着发展它不足够准确了，出现了一个更精确的依赖信息文件——锁文件。它记录了每个依赖的信息及依赖。有平面型有树型的。一般git会跟踪锁文件，一般不会出现大规模冲突。若出现大规模则有问题。一般不手动修改锁文件。通过修改package.json + 执行包管理器命令去修改。锁文件应该对于程序员是只读的。对于相应包管理器是可读写的。  

## npm & yarn & yarn2 & yarn3 & pnpm
||npm | yarn | yarn2 | yarn3 | pnpm |
|-|-|-|-|-|-|
|||||||
|||||||
|||||||