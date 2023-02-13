# 前端微服务

微服务：几个小的、自主的服务在一起工作。

- 支持不同的团队、不同的技术栈整合为一个应用。
- （多团队独立开发前端应用）

## 实现方式

- iframe
- 在 client 使用 js 载入 module
- web components
  - custom elements
  - shadow dom
  - html templates
- webpack module federation [ModuleFederationPlugin]()
  - name
  - filename
  - expose
  - shared

## [single-spa](https://www.npmjs.com/package/single-spa)

## [qiankun](https://www.npmjs.com/package/qiankun)

## 自包含系统 scs

- 自治 web 应用。拥有所有数据、逻辑、渲染。
- 由一个团队负责。
- 尽可能使用异步与第三方 scs 沟通。
- 有可选的服务端 api
- 应该提供 ui 可用的功能
- 不分享与商业有关代码。
- 解耦底层结构，使其最小化。

## 单体巨石应用

## 核心思维

- 技术不可知主义
- 隔离团队之间的代码
- 建立团队自己的前缀
- 原生浏览器标准优先于框架封装的 api
- 构建高可用的网络应用
-

## title

## title
