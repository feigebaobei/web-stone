# vite 的命令行

## 开发

`vite [root]`在指定目录下执行 vite 命令

<!-- prettier-ignore-start -->
| 选项                    | 说明       | 类型           | 默认值 |
| ---- | -- | -------------- | ------ |
| `--host [host]`         | 指定 url 的域名                    |                |        |
| `--port <port>`         | 指定 url 的域名                    |                |        |
| `--https`               | 是否使用 tls+http/2                | boolean        |        |
| `--open [path]`         | 启动时打开浏览器                   | boolean/string |        |
| `--cors`                | 是否启用 cors                      | boolean        |        |
| `--strictPort`          | 是否严格使用指定 port              | B              |        |
| `--force`               | 是否忽略缓存并重新构建             |                |        |
| `-c --config <file>`    | 使用指定的配置文件                 |                |        |
| `--base [path]`         | 指定基础路径                       | S              | '/'    |
| `-l --logLevel [level]` | 好像是指定输出日志的级别（该级别以上的都输出）info/warn/error/silent | S              |        |
| `--clearScreen`         | 允许或禁用日志时清除屏幕           | B              |        |
| `-d --debug [feat]`     | 显示调试日志                       | S/B            |        |
| `-f --filter <filter>`  | 过滤高度日志                       | S              |        |
| `-m --mode <mode>`      | 设置环境模式                       | S              |        |
| `-h --help`             | 列出可用 cli 选项                  |                |        |
| `-v --version`          |            |                |        |
<!-- prettier-ignore-end -->

## 构建

就是打包
`viet build [root]`

<!-- prettier-ignore-start -->
| 选项                           | 说明         | 类型 | 默认值    |
| ----------- | -------- | ---- | --------- |
| `--target <target>`            | 编译目录，不会                                 | S    | 'modules' |
| `--outDir <dir>`               | 输出目录     | S    | 'dist'    |
| `--assetsDir <dir>`            | 指定在输出目录下放置资源的目录                 | S    | 'assets'  |
| `--assetsInlineLimit <number>` | 指定 url 的域名                                |      |           |
| `--ssr [entry]`                | 为服务端渲染指定入口文件                       |      |           |
| `--sourcemap [output]`         | 输出 sourcemap 文件。boolean/'inline'/'hidden' | S/B  | false     |
| `--minify [minifier]`          | 指定压缩器。boolean/'terser'/'esbuild'         | S/B  | 'esbuild' |
| `--manifest [name]`            | manifest.json                                  | B/S  |           |
| `--force`                      | 是否忽略缓存并重新构建                         | B    |           |
| `--emptyOutDir`                | 是否清空输出目录                               | B    |           |
| `-w --watch`                   | 当模块发生变化时，重新构建。                   |      |           |
| `-c --config <file>`           |              |      |           |
| `--base <path>`                |              |      |           |
| `-l --logLevel <level>`        |              |      |           |
| `--clearScreen`                |              |      |           |
| `-d --debug [feat]`            | 是否显示调试日志                               |      |           |
| `-f --filter <filter>`         |              |      |           |
| `-m --mode <mode>`             |              |      |           |
| `-h --help`                    |              |      |           |
<!-- prettier-ignore-end -->

## 优化项

`vite optimize [root]`

<!-- prettier-ignore-start -->
|选项|说明|类型|默认值|
|-|-|-|-|
|`--force`||||
|`-c --config <file>`||||
|`--base <path>`||||
|`-l --logLevel <level>`||||
|`--clearScreen`||||
|`-d --debug [feat]`||||
|`-f --filter <filter>`||||
|`-m --mode <mode>`||||
|`-h --help`||||
<!-- prettier-ignore-end -->

## 预览

`vite preview [root]`在本地预览构建产物。  
在本地启动一个指向`distDir`目录的静态 web 服务器。

<!-- prettier-ignore-start -->
| 选项                    | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| `--host [host]`         |      |      |        |
| `--port [port]`         |      |      |        |
| `--strictPort`          |      |      |        |
| `--https`               |      |      |        |
| `--open [path]`         |      |      |        |
| `--outDir <dir>`        |      |      |        |
| `-c --config <file>`    |      |      |        |
| `--base <path>`         |      |      |        |
| `-l --logLevel <level>` |      |      |        |
| `--clearScreen`         |      |      |        |
| `-d --debug [feat]`     |      |      |        |
| `-f --filter <filter>`  |      |      |        |
| `-m --mode <mode>`      |      |      |        |
| `-h --help`             |      |      |        |
<!-- prettier-ignore-end -->
