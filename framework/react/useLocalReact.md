# 使用本地 react/react-dom

这是官网说明 https://react.docschina.org/docs/how-to-contribute.html

## 必要条件

- node lts
- yarn v1.2.0+
- 已经安装 jdk
- gcc 我没报过这个问题。可能已经安装了。
-

## 下载并安装依赖

```shell
git clone git@github.com:facebook/react.git
cd react
yarn # 需要若干时间
```

## 打包

```js
// umd
yarn build react/index,react-dom/index --type=UMD

// node
yarn build react/index,react/jsx,react-dom/index,scheduler --type=NODE
```

## link 使用

## [安装 jdk](/language/java/install.html)
