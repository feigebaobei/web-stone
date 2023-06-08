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

npm 团队创建了 npmjs.com 网站。创建了 npm 命令行。与 node 团队合作，把 npm 内置到 node 中。解决了包管理问题，不解决性能问题。yarn 看不下去了。自己搞出一个 yarn。它做了本地缓存、做了锁文件，提高了安装速度。yarn 是以平面处理所有依赖包。npm 后来也有此功能。pnpm 以树型结构处理依赖，又添加了一库多包管理功能，不过测试不全面，使用不普遍，有时会出现 bug。当前市场上主要的包管理工具就这三个。然后 yarn 又与 corepack 合作，也支持了树型结构管理依赖包、一库多包。不再依赖 npmjs.com 安装。

## lock 文件

现在每个包管理工具都有会生成各自的锁文件。原来是在 package.json 中保存该包的依赖信息。但是随着发展它不足够准确了，出现了一个更精确的依赖信息文件——锁文件。它记录了每个依赖的信息及依赖。有平面型有树型的。一般 git 会跟踪锁文件，一般不会出现大规模冲突。若出现大规模则有问题。一般不手动修改锁文件。通过修改 package.json + 执行包管理器命令去修改。锁文件应该对于程序员是只读的。对于相应包管理器是可读写的。

## npm & yarn & yarn2 & yarn3 & pnpm

每个包管理工具都有自己的配置文件。像 nvm 工具不能把修改过的源，同时作用于全部包管理工具。

|          | npm | yarn | yarn2 | yarn3 | pnpm |
| -------- | --- | ---- | ----- | ----- | ---- |
| 错误提示 | 差  | 准确 |       |       |      |
|          |     |      |       |       |      |
|          |     |      |       |       |      |

## [window & node & npm & cli](/language/node/window%26node%26npm%26cli.html)
