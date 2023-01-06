# hybrid 混合开发

原生 + h5
使用 h5 开发一次，然后在多个原生应用中使用。  
优点：

- 方便快捷、入侵性小。
- 几乎不改变原生 app 的框架。
- 开发成本低。
- 易更新。

缺点：

- 不如原生流畅。

## 基本概念

|           |                                                    |     |
| --------- | -------------------------------------------------- | --- |
| webview   | app 中的一个组件，用于加载 h5 页面，相当于浏览器。 |     |
| file 协议 |                                                    |     |
|           |                                                    |     |
|           |                                                    |     |
|           |                                                    |     |
|           |                                                    |     |

## 结构

app 在 webView 中打开 h5 页面。

## native & h5

|      | native     | h5               | hybrid             |
| ---- | ---------- | ---------------- | ------------------ |
| 体验 | 好         | 不如 native 流畅 | 好                 |
|      | 发版需审核 | 可热更新         | 可快速迭代         |
|      |            |                  | 开发成本高。       |
|      |            |                  | 联调、测试比较麻烦 |
|      |            |                  |                    |

## 二者间通信

### url scheme

1. native 注册 url scheme.一般是自定义的。
2. h5 触发一个 url
3. native 捕获该 url
4. native 分析此 url，然后触发相应功能。
5. native 调用 h5 中的方法将数据回调给 h5.

兼容性好，效率低。

### JavaScriptCore / addJavascriptInterface

1. 原生注册一个对象，供 js 调用。
2. 低版本机型兼容不好。

## 封装一个 bridge.js

```js
window.jsBridge = {
    invoke: ({bridgeName, data}) => {
        nativeBridge.postMessage({
            bridgeName,
            data: data || {},
        })
    }
    receiveMessage: ({bridgeName, data}) => {
        // op bridgeName data

    }
}
```

# react native

rn 不是用于构建原生 app 的。所以它不算 hybrid.  
它是通过 js 来直接调用原生组件的。  
||优点|缺点|
|-|-|-|
||组件化|三方 sdk 开放的 rn 比较少|
||虚拟 dom.||
||开发效率高||
||性能接近 native||
||||

# cordova

# weex
