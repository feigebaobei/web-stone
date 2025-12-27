# chrome 浏览器的 devtools

> [官网](https://developer.chrome.com/docs/devtools/)

## feature

- feature0
- feature1
- feature2

## usage

```js

```

## commands & shortcuts

## 模拟移动设备

## elements

## console

## sources

## network

## performance

- 记录性能分析数据。
- 更改拍摄设置。
- 分析效果报告。

默认选中时间是首屏加载时间。

|           |              |     |
| --------- | ------------ | --- |
| loading   |              |     |
| scripting |              |     |
| readering |              |     |
| painting  |              |     |
| system    |              |     |
| idle      |              |     |
| total     | 首屏加载时间 |     |
|           |              |     |

### 网页性能总监图包含：

#### fps（每秒帖数情况）

红色表示长时间帧，越多性能越差。
1/60 = 0.016666s = 16.666ms
50-60 动画流畅
30-50 因各人敏感程序
0-30 卡顿

#### cpu

蓝色 loading 网络通信和 html 解析时间
黄色 scripting js 执行时间
紫色 rendering 样式计算和布局时间
绿色 painting 重绘时间
灰色 other 其他事件花费时间
白色 idle 空间时间

#### net

#### heap

js 执行的时间分布。

## memory

## application

可以审视 manifest.json / service worker / cache

### summary

|                |                          |                                                            |     |
| -------------- | ------------------------ | ---------------------------------------------------------- | --- |
| manifest       | 触发添加应用到主屏幕     |                                                            |     |
| service worker | 与 sw 相应的任务。       | 如：注销 sw / 更新 sw / 模拟 push / 脱网 / debug / 停止 sw |     |
|                | sw 使用的 cache          |                                                            |     |
| clear storage  | 可注销 sw / 清空所有存储 |                                                            |     |

### manifest

add to homescreen  
Identity + Presentation 显示 manifest.json 文件的主要字段。  
icons

### service worker

- 列出 sw 的脚本
- 脱网
- update on reload 在每个页面加载时更新 sw
- bypass for network 强制浏览器使用网络请求的资源
- update 更新一次 sw。若发现不同，则使用新 sw/增加数字。
- push 推送一个消息
- unregister 注销指定的 sw。clear storage 可以清空已经被注销的 sw 相关的缓存。
- source 列出 sw 脚本
- status 当前状态。 `#1`的数字表示已经被更新的次数。若勾选“update on reload”则每次刷新都增加一次数字。`start`/`stop`可启动/停止 sw。
- clients sw 的作用范围

### manifest

### manifest

### manifest

## recorder

## rendering

## sensors

## remote debugging

## accessibility

## setting and customization

## todo

### title

### title

### title
