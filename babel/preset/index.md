# preset

常用到 4 个包：

- [@babel/preset-env]()
- [@babel/preset-react]()
- [@babel/preset-typescript]()
- [@babel/preset-flow]()

每个包都需要安装。

## @babel/preset-env

是最小转换 js 代码的插件包。

```shell
npm i -D @babel/preset-env
```

不包括小于 stage 3 的标准。

### options

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|targets|指定浏览器的版本|`string | string[] | {[string]: string}`||||||
|bugfixes||boolean|false|||||
|spec||boolean|false|||||
|loose||||||||
|modules||||||||
|debug||||||||
|include||||||||
|exclude||||||||
|useBuiltIns||||||||
|corejs||||||||
|forceAllTransforms||||||||
|configPath||||||||
|ignoreBrowserslistConfig||||||||
|browserslistEnv||||||||
|shippedProposals||||||||
<!-- prettier-ignore-end -->

## @babel/preset-react

### options

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|runtime||||||||
|development||||||||
|throwIfNamespace||||||||
|pure||||||||
|importSource||||||||
|pragma||||||||
|pragmaFrags||||||||
|useBuiltIns||||||||
|useSpread||||||||
<!-- prettier-ignore-end -->

## @babel/preset-typescript

### options

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|isTSX||boolean|false|||||
|jsxPragma||string|React|||||
|jsxPragmaFrag||string|React.Fragment|||||
|allExtensions||boolean|false|||||
|allowNamespaces||boolean||||||
|allowDeclareFields||boolean|false|||||
|disallowAmbiguousJSXLike||boolean|.mts时true. .cts时false|||||
|onlyRemoveTypeImports||boolean|false|||||
|optimizeConstEnums||boolean|false|||||
<!-- prettier-ignore-end -->

## @babel/preset-flow

### options

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|all||boolean|false|||||
|allowDeclareFields||boolean|false|||||
<!-- prettier-ignore-end -->
