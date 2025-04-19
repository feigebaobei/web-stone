# 插件

特指 vscode 的插件。

# 初始化项目

```shell
npm i -g yo generator-code # 为什么都使用它们init项目呢
# 因它是ms官方的脚手架。
yo code

```

# 项目结构

```
<root>
|-- package.json
|-- src
    |-- extensions.ts # vscode插件的入口文件
|-- tsconfig.json
```

## package.json

```js
// 常用，非全部。
{
    "keywords": ["one", "two"], // 关键字，用于插件市场搜索。
    "version": "1.1.1", // 版本号
    "engines": {
        "vscode": "^1.27.0",
    },
    "publisher": "value", // 若要发布到插件市场，则必须与发布者一致。
    "categoris": ["value"], // 在插件市场的分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
    "icon": "images/icon.png", // 至少128*128px
    // 扩展的激活事件
    "activationEvents": [
        "onCommand:extension.sayHello"
    ],
    // 入口
    "main": "./src/extension",
    // 贡献点，vscode的插件大部分功能配置都在这里。
    "contributes": {
        "configuration": {
            "type": "object",
            "title": "string",
            "title": {
				//
				"vscodePluginDemo.yourName": {
					"type": "string",
					"default": "string",
					"description": "string",
				},
				// 启动时的提示
				"vscodePluginDemo.showTip": {
					"type": "string",
					"default": true,
					"description": "string",
				},
            },
        },
        // 命令
        "commands": [
            {
				"command": "extension.sayHello",
				"title": "hello world"
            }
        ],
        // 绑定快捷键
        "commands": [
            {
				"command": "extension.sayHello",
				"key": "ctrl+f10",
				"mac": "cmd+f10",
				"when": "editorTextFocus",
            }
        ],
        // 菜单
        "menus": {
			// 编辑器右键菜单
			"editor/context": [
				{
					// 表示只有编辑器具有焦点时才会在菜单中出现
					"when": "editorFocus",
					"command": "extension.sayHello",
					// navigation是一个永远置顶的分组，后面的@6是人工进行组内排序
					"group": "navigation@6"
				},
				{
					"when": "editorFocus",
					"command": "extension.demo.getCurrentFilePath",
					"group": "navigation@5"
				},
				{
					// 只有编辑器具有焦点，并且打开的是JS文件才会出现
					"when": "editorFocus && resourceLangId == javascript",
					"command": "extension.demo.testMenuShow",
					"group": "z_commands"
				},
				{
					"command": "extension.demo.openWebview",
					"group": "navigation"
				}
			],
			// 编辑器右上角图标，不配置图片就显示文字
			"editor/title": [
				{
					"when": "editorFocus && resourceLangId == javascript",
					"command": "extension.demo.testMenuShow",
					"group": "navigation"
				}
			],
			// 编辑器标题右键菜单
			"editor/title/context": [
				{
					"when": "resourceLangId == javascript",
					"command": "extension.demo.testMenuShow",
					"group": "navigation"
				}
			],
        }
		// 代码片段
		"snippets": [
			{
				"language": "javascript",
				"path": "./snippets/javascript.json"
			},
			{
				"language": "html",
				"path": "./snippets/html.json"
			}
		],
		// 自定义新的activitybar图标，也就是左侧侧边栏大的图标
		"viewsContainers": {
			"activitybar": [
				{
					"id": "beautifulGirl",
					"title": "美女",
					"icon": "images/beautifulGirl.svg"
				}
			]
		},
		// 自定义侧边栏内view的实现
		"views": {
			// 和 viewsContainers 的id对应
			"beautifulGirl": [
				{
					"id": "beautifulGirl1",
					"name": "国内美女"
				},
				{
					"id": "beautifulGirl2",
					"name": "国外美女"
				},
				{
					"id": "beautifulGirl3",
					"name": "人妖"
				}
			]
		},
		// 图标主题
		"iconThemes": [
			{
				"id": "testIconTheme",
				"label": "测试图标主题",
				"path": "./theme/icon-theme.json"
			}
		]
    },
    // 主页
    "homepage": "http://www.sss.com"
}
```

## 入口文件

```js
// src/extension.ts
const vscode = require('vscode')
// 插件被激活时触发，所有代码总入口。
exports.activate = function (context) {
  // 注册命令 与package.json中的contributs.commands中的相呼应
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.sayHello', function () {
      vscode.window.showInformationMessage('hello world')
    })
  )
}
// 插件被释放时触发
exports.deactivate = function () {}
```

# 字段说明

<!-- prettier-ignore-start -->
| |       |        | demo            |     |
| ---------------- | ------------- | ------ | ------------------------ | --- |
| activationEvents | 所有插件都是默认不激活的。只有在这里配置才能激活。 | `[]`    |   |     |
|    | onLanguage:${language}               |         | onLanguage:javascript，只要打开 js 类型的文件就激活该插件 |     |
|    | onCommand:${command}   | 使用 onCommand 注册激活事件             | `[]`            |     |
|    | onDebug  |         |   |     |
|    | workspaceContains:${toplevelfilename}              |         |   |     |
|    | onFileSystem:${scheme}               |         |   |     |
|    | onView:${viewId}   |         |   |     |
|    | onUri    |         |   |     |
|    | \*       | 一启动 vscode 就激活      |   |     |
| contributes      | 可以配置扩展 vscode 各种能力         |         |   |     |
|    | configuration      | 设置    |   |     |
|    | command  | 中的 command 需要在 extension.ts 中注册 |   |     |
|    | menus    | 设置菜单    |   |     |
|    | keybindings        | 绑定快捷键  |   |     |
|    | languages          | 新语言支持  |   |     |
|    | debuggers          | 调试    |   |     |
|    | breakpoints        | 断点    |   |     |
|    | grammars |         |   |     |
|    | themes   | 主题    |   |     |
|    | snippets | 代码片段    |   |     |
|    | jsonValidation     | 自定义 json 校验          |   |     |
|    | views    | 侧边栏视图  |   |     |
|    | viewsContainers    | 自定义 activitybar        |   |     |
|    | problemMatchers    |         |   |     |
|    | problemPatterns    |         |   |     |
|    | taskDefinitions    |         |   |     |
|    | colors   |         |   |     |
| contributes      |          |         |   |     |
| contributes      |          |         |   |     |
| contributes      |          |         |   |     |
| contributes      |          |         |   |     |
<!-- prettier-ignore-end -->

# 调试

`F5`

```js
// .vscode/launch.json
```

## 重新加载

- 先停止，再按 F5,
- ctrl+R

# 开发语言

推荐 ts，可以使用 js.

# title

# title

# title

# title

# title
