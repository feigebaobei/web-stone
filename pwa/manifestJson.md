# manifest.json
> 描述符文件名为 manifest.json 并位于 网络应用 夹。
> 使用可翻译的字符串作为应用程序的标题和描述。
> 使浏览器知道如何对待该web应用。  
> 一般在根目录。
> 正式的扩展名是`.webmanifest`。即您可以设置为`app.webmanifest`.但是只要使用json格式编写，任意扩展名都能被解析。  

## usage
```html
<!-- 定义并编辑 <root>/manifest.json -->
<!-- index.html -->
<link rel="manifest" href="/manifest.json" />
```

```json
{
    "name": "lixiaodan.org",
    "short_name": "lxd",
    "icons": [
        {
            "src": "web/icon-29.png",
            "type": "image/png",
            "sizes": "29x29"
        },
        {
            "src": "web/icon-40.png",
            "type": "image/png",
            "sizes": "40x40"
        },
        {
            "src": "web/icon-76.png",
            "type": "image/png",
            "sizes": "76x76"
        }
    ],
    "start_url": ".",
    "display": "standalone"
}
```

## 调试
在浏览器的开发者工具-application-manifest  

## 字段说明
|||||||
|-|-|-|-|-|-|
|基本字段||||||
||name|web应用的全名|用于显示在主屏幕、启动栏、程序坞、菜单|||
||short_name|name的简称|当显示空间不足时使用short_name.|请保持在12个字母以内||
||icons|由`{src, type, sizes, [purpose]}`组成的数组对象。||||
||start_url|从安装后的应用打开时请求的url.||若不设置，则打开安装应用时的url||
||display|定义操作系统如何显示pwa应用。|'fullscreen' / 'standalone' / 'minimal-ui' / 'browser'|一般使用'standalone'||
||id||用于表示惟一pwa|非必填项|若无id,有start_url也行。chrome 96+当无id里会自动生成一个id.|
|推荐字段||||||
||theme_color|主题色||||
||background_color|背景色||||
||scope|控制pwa窗口内的url.|不会控制service worker的工作范围。|||
||splashscreens|pwa应用加载时的占位图。类似骨架图|||
|扩展字段||||||
||lang|指定主要语言||||
||dir|指定方向性（direction）|'auto' / 'ltr' / 'rtl'|||
||orientation|||||
|promotional 字段||||||
||description|说明本pwa||||
||screenshots|由`{src, type, sizes}`组成的数组。|用于展示pwa|||
||categories|||||
||iarc_cating_id|||||
|capabilites字段||||||

## 创建icon
- 留出系统裁剪的空间。
- 图片内容在半径为宽度的40%以内。
- [https://icon.wuruihong.com/](https://icon.wuruihong.com/)

## title
## title
## title
## todo
### title
### title
### title
### title


