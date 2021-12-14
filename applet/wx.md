# overview
虽然因微信多次变动api，惹得程序员对wx骂声一片。但是wx-applet仍是众多小程序中做了最好的一个。  

# 申请
在[小程序注册页面](https://mp.weixin.qq.com/wxopen/waregister?action=step1)去注册小程序。然后登录[小程序后台](https://mp.weixin.qq.com/)再进入“开发-开发设置”会看到`AppID`。  

# 安装开发工具
[下载开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
## 快速使用
启动“开发工具”后点击“+”就要创建一个默认的小程序。  

# 代码构成
项目结构
- app.js   小程序逻辑
- app.json 小程序公共配置
- app.wxss 小程序公共样式表
- app.js 小程序逻辑
每个页面都有好下构成。
- *.json 后缀的 JSON 配置文件  
- *.wxml 后缀的 WXML 模板文件  
- *.wxss 后缀的 WXSS 样式文件  
- *.js 后缀的 JS 脚本逻辑文件  

# 宿主环境
![小程序框架](https://res.wx.qq.com/wxdoc/dist/assets/img/4-1.ad156d1c.png)  
wx-applet是运行在wx app上的。  
小程序已经内置了很多组件。用法类似`html`。  
所有api都是调用wxApp的功能。  

# 权限
wx按角色划分了功能。当前人员拥有的权限需要在小程序后台设置权限。  

# 配置
全局配置
```json
{
  "pages": [ // 各个页面
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": { // 页面的配置
    "navigationBarTitleText": "Demo"
  },
  "tabBar": { // tabbar
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/index",
      "text": "日志"
    }]
  },
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}
```
页面配置
```json
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```
sitemap配置
是否可以被wx爬。
```json
{
  "rules":[{
    "action": "allow",
    "page": "path/to/page",
    "params": ["a", "b"],
    "matching": "inclusive"
  }, {
    "action": "allow",
    "page": "*"
  }]
}
```

# 框架
- 逻辑层  
- 视图层  

## 场景值
用户进入小程序的路径。  
数值比文本更方便在代码中做判断（分支）。有类似功能的还有：http状态码值。后端接口中的错误码值。  
|场景值|	场景|	appId含义|
|-|-|-|
|1020|	公众号 profile 页相关小程序列表|	来源公众号|
|1035|	公众号自定义菜单|	来源公众号|
|1036|	App 分享消息卡片|	来源App|
|1037|	小程序打开小程序|	来源小程序|
|1038|	从另一个小程序返回|	来源小程序|
|1043|	公众号模板消息|	来源公众号|

## 逻辑层
wx中使用js引擎处理逻辑层中的代码。把数据处理好后给到视图层。然后由视图层渲染出来。  
因js代码的运行环境与pc、node不同。所以不能用它们的习惯处理wx的js引擎的处理方式。就理解为wx用自己的js引擎处理js代码。  
这个过程像不像mvc。其实就是mvc.  
mvc是很优秀的设计方式。在很多地方都用到它了。  
ios环境下promise是使用setTimeout模拟的。  
### 注册小程序
```js
// demo
// app.js
App({
  onLaunch (options) {
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  onError (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
// xxx.js
const appInstance = getApp()
console.log(appInstance.globalData) // I am global data
```
整个小程序就是一个app实例。（面向对象编程思想的体现）。下面还有页面的实例。
```js
//index.js
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // 页面创建时执行
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
})
```
#### behaviors
它是把多个页面的公共代码提取出来，写在一个文件中。然后在多个page的`*.js`中使用它。  
需要使用`Behavior()`构造函数。  
behaviors/component都是提取公共代码的方式。  
内置behaviors  
    wx://form-field
    wx://form-field-group
    wx://form-field-button
    wx://form-field-export
```js
// my-behavior.js
module.exports = Behavior({
  data: {
    sharedText: 'This is a piece of data shared between pages.'
  },
  methods: {
    sharedMethod: function() {
      this.data.sharedText === 'This is a piece of data shared between pages.'
    }
  }
})
// page-a.js
var myBehavior = require('./my-behavior.js')
Page({
  behaviors: [myBehavior],
  onLoad: function() {
    this.data.sharedText === 'This is a piece of data shared between pages.'
  }
})
```

#### component
需要使用`Component()`构造函数。  
```js
Component({
  data: {
    text: "This is page data."
  },
  methods: {
    onLoad: function(options) {
      // 页面创建时执行
    },
    onPullDownRefresh: function() {
      // 下拉刷新时执行
    },
    // 事件响应函数
    viewTap: function() {
      // ...
    }
  }
})
```
类似自定义组件。  

### 生命周期
![页面的生命周期](https://res.wx.qq.com/wxdoc/dist/assets/img/page-lifecycle.2e646c86.png)  
![小程序的生命同期](https://res.wx.qq.com/wxdoc/dist/assets/img/life-cycle.5558d9eb.svg)
### 页面路由
|路由方式|	页面栈表现|
|-|-|
|初始化|	新页面入栈|
|打开新页面|	新页面入栈|
|页面重定向|	当前页面出栈，新页面入栈|
|页面返回|	页面不断出栈，直到目标返回页|
|Tab 切换|	页面全部出栈，只留下新的 Tab 页面|
|重加载|	页面全部出栈，只留下新的页面|

|||||
|-|-|-|-|
|路由方式|	触发时机|	路由前页面|	路由后页面|
|初始化|	小程序打开的第一个页面|		|onLoad, onShow|
|打开新页面|	调用 API wx.navigateTo 使用组件 <navigator open-type="navigateTo"/>|	onHide|	onLoad, onShow|
|页面重定向|	调用 API wx.redirectTo 使用组件 <navigator open-type="redirectTo"/>|	onUnload|	onLoad, onShow|
|页面返回|	调用 API wx.navigateBack 使用组件<navigator open-type="navigateBack"> 用户按左上角返回按钮|	onUnload|	onShow|
|Tab| 切换|	调用 APIwx.switchTab 使用组件 <navigator open-type="switchTab"/> 用户切换 Tab|		各种情况请参考下表|
|重启动|	调用 API wx.reLaunch 使用组件 <navigator open-type="reLaunch"/>|	onUnload|	onLoad, onShow|

### 运行时
wx.getUpdateManager 
// 需要使用冷启动。  

## 视图层
构成：  
- wxml  
- wxs 小程序的脚本语言  
- wxss 样式  
- component  

### wxml
#### 数据绑定 `<view>{{message}}</view>`  
#### 列表渲染
```xml
<view wx:for="{{array}}"> {{item}} </view>
```
#### 条件渲染
```xml
<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view wx:elif="{{view == 'APP'}}"> APP </view>
<view wx:else="{{view == 'MINA'}}"> MINA </view>
```
#### 模板
```xml
<!--wxml-->
<template name="staffName">
  <view>
    FirstName: {{firstName}}, LastName: {{lastName}}
  </view>
</template>

<template is="staffName" data="{{...staffA}}"></template>
<template is="staffName" data="{{...staffB}}"></template>
<template is="staffName" data="{{...staffC}}"></template>
```
### wxss
`rpx`是wx优化过的单位。相当于`vw`  
`@import "file.wxss"` // 样式导入。  
选择器：`.class #id element element,element ::after ::before`
无法确定内部样式与外部样式的优先级  
请使用`.classp`定义样式。  



### wxs
类似内联脚本。  
```xml
<wxs module="m1">
var msg = 'string';
module.exports.msg = msg
</wxs>
<view>{{m1.msg}}</view>
```

### 事件
把视图层的信息给到逻辑层。  
处理用户行为。  
绑定在组件上。  
保留了html中事件的全小写习惯。  
||||
|-|-|-|
|touchstart|||
|touchmove|||
|touchend|||
|tap|||
|longpress|||
|transitionend|||
|animationstart|||
|animationiteration|||
|animationend|||
|touchforcechange|||
`bind:tap` / `bindtap`  
bind  允许冒泡  
catch 不允许冒泡  

#### 事件对象
```js
BaseEvent {
    type 
    timeStamp
    target: {
        id,
        dateset // data-开头的自定义属性组成的集合
    }
    currentTarget: {
        id,
        dataset // 
        // data-element-type ，最终会呈现为 event.currentTarget.dataset.elementType ；
        // data-elementType ，最终会呈现为 event.currentTarget.dataset.elementtype 。
    }
    mark // 从事件目标对象与根节点的全部mark属性的集合。
}
CustomEvent extends BaseEvent {
    detail // 自定义事件携带的数据
}
TouchEvent extends BaseEvent {
    touches // array
        // touch: {
            // identifier
            // pageX,
            // pageY,
            // clientX,
            // clientY
        // }
        // CanvasTouch: {
            // identifier
            // x,
            // y
        // }
    changedTouches // 有变化的触摸点组成的数组。
}
```

### 双向绑定
```xml
<input model:value="{{value}}" />
```

### title
### title
### title
### title
### title
### title

# title
# title
# title
# title
# title
# title
# title
# title
# 组件
wx applet已经内置了很多组件。  
view

## 自定义组件
```
// *.json
{
    "component": true // 声明是自定义组件
}
// *.wxml
<view class="inner">
    {{innerText}}
</view>
<slot></slot>
// *.wxss
.inner {
    color: red;
}
// *.js
var myBehavior = require('my-behavior')
Component({
    behaviors: [myBehavior],
    properties: {
        // 写法与vue很类似
        innerText: {
            type: String,
            value: 'string'
        }
    }
    data: {
        someData: {},
        a: 
    }
    lifetimes: {
        // 行按生命周期执行，其中先执行行为的生命同期方法，再执行组件的生命周期方法。
        // 组件的生命周期
        created: function () {}
        attached: function () {}
        ready: function () {}
        moved: function () {}
        detaced: function () {}
        error: function (err) {}
        // 组件在页面的生命周期
        show: function () {}
        hide: function () {}
        resize: function (size) {}
    },
    methods: {
        customMethod: function () {...}
        _myPrivateMethod: function() {...} // 私有方法使用下划线开头。
    }
})

// usage
// pageA.json
{
    "usingComponents": {
        "component-tag-name": "path/to/the/custom/component"
    }
}
// pageA.wxml
<view>
    <component-tag-name inner-text="SomeString"></component-tag-name>
</view>
```

### 组件间通信
```js
// 监听事件
Page({
    onMyEvent: function (event) {
        // event.detail
    }
})
// 触发事件
Component({
    methods: {
        onTag: function () { // 记得有wxml中使用该事件
            this.triggerEvent('myevent', myEventDetail, myEventOption) // 事件名保持全小写习惯
        }
    }
})
```

### 组件间关系
```js
relation: {
    type: 关联的目标组件 parent / child / ancestor descendant
    linked 建立关系后触发
    linkChanged 关系改变时触发
    unlinked 关系脱离页面节点树时触发
    target 拥有指定behavior的组件都会被关联
}
```

### 数据监听器
```js
Component({
    attached: function () {
        this.setData({
            numberA: 1,
            numberB: 2,
        }),
    },
    observers: {
        'numberA, numberB': function(na, nb) {
            this.setData({
                sum: na + nb
            })
        }
    }


})
```

# Api
- `on`开头的是监听某个事件是否触发。  
- `Sync`结尾的是同步api.  
- 大多数api是异步的。  
  - 参数：success, fail, complete, 其他
    - 回调方法的参数：errMsg, errCode, 其他
- 云函数由服务器提供。在`wx.cloud`命名空间下。  

wx.getUpdateManager => UpdateManager
UpdateManager: {
    applyUpdate() // 强制小程序重启并使用新版本。在小程序下载完成后调用。  
    onCheckForUpdate(cb)
    onUpdateReady(cb)
    onUpdateFailed(cb)
}

# 事件
触发事件的选项
bubbles
composed
capturePhase

# 分包
```
├── app.js
├── app.json
├── app.wxss
├── packageA
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── pages
│   ├── index
│   └── logs
└── utils

// app.json
{
  "pages":[
    "pages/index",
    "pages/logs"
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    }, {
      "root": "packageB",
      "name": "pack2",
      "pages": [
        "pages/apple",
        "pages/banana"
      ]
    }
  ]
}
```
- 非subpackages里的被打包到主包中。  
- tabbar页面必须在主包中。  
- subpackage 的根目录不能是另外一个 subpackage 内的子目录  
- 跨子包不可使用。  

## 独立分包
不依赖于主包的分包。上例中的子包是依赖主包的。  
```
{
  "pages": [
    "pages/index",
    "pages/logs"
  ],
  "subpackages": [
    {
      "root": "moduleA",
      "pages": [
        "pages/rabbit",
        "pages/squirrel"
      ]
    }, {
      "root": "moduleB",
      "pages": [
        "pages/pear",
        "pages/pineapple"
      ],
      "independent": true // 必须设置它
    }
  ]
}
```
- 在加载了主包后`getApp()`才得到app.  
- 

用途是什么？

## worker
在app.json中设置worker代码的目录。  

## 服务端能力


# title
# title
# title
# title