# vue-cli

- 与 vue2 一起使用的脚手架
- 它已经和 vue2 一起落伍了。在 v3 中请使用 vite
- 它是[若干包的集合](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue)。
  - [@vue/cli-server]()
    - 可升级
    - 基于 webpack，带有默认配置。自动加载`vue.config.js`配置文件。
    - 可扩展
    - vue-cli-service 命令。serve / build / inspect
    - 可插件。插件以`@vue/cli-plugin-`开头。

## install

```shell
npm i -g @vue/cli
```

## usage

```shell
vue create hello-world
# 再选择配置项
```

```shell
vue ui
# 会启动图形化界面。
# 我感觉无用。我不喜欢ui，喜欢cli.
```

## 配置

可以使用：

- 全局 cli 配置
- 项目配置

### 全局 cli 配置

在`home`下创建`.vuerc`

### 项目配置

创建`vue.config.js`。会被`@vue/cli-service`自动加载（就是）。

|                              | params | description                       | type   | default | enum | demo |     |
| ---------------------------- | ------ | --------------------------------- | ------ | ------- | ---- | ---- | --- |
| `publicPath`                 |        | 用于 webpack 的 output.publicPath |        |         |      |      |     |
| `outputDir`                  |        | 输出目录                          | string | 'dist'  |      |      |     |
| `assetsDir`                  |        | 静态资源目录                      |        |         |      |      |     |
| `indexPath`                  |        | 输出 index.html 的路径            |        |         |      |      |     |
| `filenameHashing`            |        |                                   |        |         |      |      |     |
| `pages`                      |        |                                   |        |         |      |      |     |
| `lintOnSave`                 |        |                                   |        |         |      |      |     |
| `runtimeCompiler`            |        |                                   |        |         |      |      |     |
| `transpileDependencies`      |        |                                   |        |         |      |      |     |
| `productionSourceMap`        |        |                                   |        |         |      |      |     |
| `crossorigin`                |        |                                   |        |         |      |      |     |
| `integrity`                  |        |                                   |        |         |      |      |     |
| `configureWebpack`           |        |                                   |        |         |      |      |     |
| `chainWebpack`               |        |                                   |        |         |      |      |     |
| `css.modules`                |        |                                   |        |         |      |      |     |
| `css.requireModuleExtension` |        |                                   |        |         |      |      |     |
| `css.extract`                |        |                                   |        |         |      |      |     |
| `css.sourceMap`              |        |                                   |        |         |      |      |     |
| `css.loaderOptions`          |        |                                   |        |         |      |      |     |
| `devServer`                  |        |                                   |        |         |      |      |     |
| `devServer.proxy`            |        |                                   |        |         |      |      |     |
| `parallel`                   |        |                                   |        |         |      |      |     |
| `pwa`                        |        |                                   |        |         |      |      |     |
| `pluginOptions`              |        |                                   |        |         |      |      |     |

## title

## title

## title

## title

## title

## title
