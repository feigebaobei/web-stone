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