# 浏览器扩展

## 项目结构

```
<root>
|--manifest.json // 必须在根目录。其他文件可以按自己的工程化整理。
|--background.js
|--scripts
    |--content.js
    |--react.production.min.js
|--popup
    |--popup.html
    |--popup.js
    |--popup.css
|--images
    |--xxx
```

## 清单 manifest.json

必须在根目录。
开发期间支持注释。上传到市场前必须删除注释。

```json
{
  "manifest_version": 3, // 必须
  "name": "Reading time", // 必须
  "version": "1.0", // 必须
  "description": "str ...",
  "content_scripts": [
    {
      "js": ["script/content.js"],
      "matches": ["<all_urls>"] // 由<scheme>://<host><path>组成
    }
  ],
  "background": {
    "service_worker": "bg.js" // 指定service worker
  },
  "permissions": ["activeTab", "scripting"]
}
```

### 图标

|          |                                  |     |
| -------- | -------------------------------- | --- |
| 16\*16   | 扩展程序页面和上下文菜单中的图标 |     |
| 32\*32   | windows 中使用                   |     |
| 48\*48   | 显示在“扩展程序”页面上           |     |
| 128\*128 | 安装过程和 chrome 商店中显示。   |     |

## 内容脚本 contestScript

- 在“沙箱”中运行。不与托管页面、其他扩展程序冲突。
- 可以访问 dom/bom.
-

## service worker

用于处理事件，可在不需要时终止。

## api

- [tabs](/browser/extension/tabs.html)

# 安装

## 安装位置

mac

```
~/Library/Application Support/Google/Chrome/Default/Extensions
```
