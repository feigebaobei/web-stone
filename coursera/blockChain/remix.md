# welcome to remix documentation
remix是一个强大的、开源的、帮助你在浏览器中写合约的工具。可以使用js写。remix既可以在本地运行，也可以在浏览器中运行。
remix可以对智能合约测试、debug、开发等操作。
[remix.ethereum.org](http://remix.ethereum.org/)里有各种各样版本的remix，及其信息。
下面是一些教程的入口连接。

# new layout intro

## remix-IDE layout

```
|--------|----------------|-------------------------------|
|        |                |                               |
|        |                |                               |
|        |                |                               |
|  icon  |                |         main                  |
| panel  |      side      |        panel                  |
|        |     panel      |                               |
|        |                |                               |
|        |                |                               |
|        |                |                               |
|        |                |-------------------------------|
|        |                |                               |
|        |                |           terminal            |
|        |                |                               |
|        |                |                               |
|--------|----------------|-------------------------------|
```

icon panel: 控制显示哪个插件。
side panel: 大多数据插件在这里显示。
main panel: 新版本的排版有tab.它可以编译文件的插件。旧版本的排版只可以编辑文件。
terminal:   可以看到运行的结果。也可以运行脚本。

## icon panel at page load

页面初始化时只显示3个最基本的icon.每个icon都是一个插件。

## homepage

点击remix的logo可以得到homepage.

## environments

当前有2个环境。分别是solidity、vyper。点击相应的按钮后加载相应的插件的集合。
可以管理插件。

## plugin manager

为了方便多次设置插件，只需要设置一次插件后，就可以在其它项目上使用。

## themes

左下角的icon可以设置主题色。

# tour of default modules
## file exploerer

- create new file
- add local file
- publish ot Gist
- copy to another remix instance
- connect your filesystem to remix

## plugin manager

在icon panel里有一个icon是打开plugin manager的。里面可以连接本地的插件。
在remix里所有的工作都是插件做的。

## create your own plugin

remix plugin可以帮助你扩展remix ide.目的是为以太访开发者得到remix的功能、变量来开发.
remix插件有且不限于如下功能：
- 出于教育的目的。
- 管理smart contract库
- 语言服务。
- 编译smart contract语言。
- 静态分析。
- 其它。

### remix的[alpha版本](http://remix-alpha.ethereum.org)

### install

```
npm i @remixproject/plugin
<script src="https://unpkg.com/@remixproject/plugin"></script>
```

### plugin client

插件客户端是连接remix的plugin.

```
import {createIframeClient} from '@remixproject/plugin'
const client = createIframeClient()
// or
const {createIframeClient} = remixPlugin
const client = createIframeClient()
```

#### example

你可以发现如下插件：

- [hello world]()
- lie element
- etherscan verification
- 3box storage

### 在remix IDE里测试

1. 进入[remix网站](http://remix-alpha.ethereum.org)
2. 点击plugin manager
3. 点击“connect to a local plugin”
4. 弹出一个显示文件信息的面板。选择相应文件。
5. 点击"ok"
6. 在左边会出现一个新icon，点击它可以看到你的插件。

### client api

#### loaded

`pluginClient`监听于来自IDE的第一次成功握手后。你需要使用promise/callback处理回馈。

```
client.onload(() => {...})
client.onload().then(_ => {...})
await client.onload()
```

#### events

去监听一个事件，你需要提供需要监听插件的名字和事件的名字。
`client.on(<pluginName>, <evnetName>, ...arguments)`
```
// example
client.on('solidity', 'compilation', (target, source, version, data) => {
    ...
})
```
确保监听事件前插件加载完毕。

#### call

你可以使用`call`调用IDE暴露出的方法。
调用时需要提供插件的名字，方法的名字，方法的参数。
```
await client.call(<pluginname>, <methodsname>, ...arguments)
// 更新插入当前文件
async function upsertCurrentFile(content: string) {
    const path = await client.call('fileManager', 'getCurrentFile')
    await client.call('fileManager', 'setFile', path, content)
}
```

#### emit

```
// 触发已经监听的别的插件
client.emit(<eventName>, ...arguments)
// 
async function deployReadme(content) {
    const [result] = await ipfs.files.add(content)
    client.emit('readmeDeployed', result.hash)
}
```

#### expose methods

```
// 在你的插件中暴露出方法，它可以被别的插件调用。
// 需要扩展`PluginClient`类并重写相应的`methods`属性。
class MyPlugin extends PluginClient {
    methods: ['sayHello']
    sayHello(name: string) {
        return `Hello ${name}!`
    }
}
const client = buildIframeClient(new MyPlugin())
```

#### test your plugin

点击“connect to a local plugin”。然后：
- name: 别的插件去监听的事件的名字。
- displayName: 在IDE中使用。
- url: 可以在localhost测试。

#### publish your plugin on remix IDE

使用如下的字段来描述你想要发布的插件。

```
interface Profile {
    name: string, // the name of plugin in camelCase
    displayName: string, // the name display by the IDE
    description: string, // 
    events: [], // names of the events
    methods: ['sayHello'], //
    url: string,
    icon: string,
    location: 'mainPanel' | 'sidePanel' | 'none', // 在IDE的哪个面板显示。
}
```

### api

你的插件可以使用api与别的插件交互。在Remix IDE里的`@remixproject/plugin`提供了一个默认的插件集合。使用一些api时一定要小心。所以这些方法可能会询问用户是否允许。

#### remix IDE API

在remix IDE里暴露的原生插件

|api|name|permission|description|
|-|-|-|-|
|file system|fileManager|v|manager the file system|
|compile|solidyty|v|the solidity compiler|
|editor|editor|-|可以高亮显示代码|
|network|network|-|定义网络（mainnet, ropsten, ...），定义提供者（web3, vm, injected）|
|Udapp|udapp|v|transaction listener|
|unit testing|solidityUnitTesting|-|unit testing library in solidity|
|settings|settings|-|设置IDE的全局配置|
|Content Import|contentImport|-|从github,swarm,ipfs,http,https里引入文件。|

#### external api

#### status

每个插件都有一个status对象，用来在IDE里显示通知。你可以在任何插件中使用`statusChanged`监听status的改变
```
client.on('fileManager', 'statusChanged', (status: Status) => {
    ...
})
// status
interface Status {
    key: number | 'edited' | 'succeed' | 'loading' | 'failed' | 'none'
    kype?: 'success' | 'info' | 'warning' | 'error'
    title?: string
}
```
- 若要删除status,则设置status.key为'none'.
- 若不定义type，则使用默认值'info'

```
// 你可以触发相同的事件改变你拥有的插件的status.
client.emit('statusChanged', {key: 'succeed', type: 'success', title: 'Documentation ready !'})
```

#### client options

##### loaded

remix使用bootstrap.推荐在你的插件中使用该主题。这样就可使用相应的bootstrap的类。
remix会自动在你的插件的头部添加当前主题的`<link/>`标签。当改变主题时link也会改变。
```
// 使用自定义的主题
const client = createIframeClient({customTheme: true})
```

##### custom api

remix IDE会默认使用`@remixproject/plugin`，你可以使用`customApi`扩展api.

```
import { remixProfiles, IRemixApi } from '@remixproject/plugin'
interface ICustomApi extends IRemixApi {
  box: IBox;
}
export type CustomApi = Readonly<ICustomApi>;
export type RemixClient = PluginClient<any, CustomApi> & PluginApi<CustomApi>;
const customApi: ProfileMap<RemixIDE> = Object.freeze({
  ...remixProfiles,
  box: boxProfile
});
const client = createIframeClient({ customApi })
```

##### DevMode

插件使用`postMessage`api交流。即：`PluginClient`需要知道你的IDE的源。
若你使用'localhost'开发插件。你将需要在你的IDE里指定接口。默认使用8080端口。若需要修改，可使用如下方法。
```
const devMode = {port: 3000}
const client = createIframeClient({devMode})
```

## settings

## solidity editor

可以提供solidity的语法高亮。
当当前文件被修改时或切换别的文件时编译。

一些重要的功能。
- 使用tab显示打开的文件。
- 在gutter里显示编译时的warning/error.
- 当改变5s后保存一个数据。
- +/-控制字号大小。

## terminal

终端功能和变量。
- 集成一个js编译器和一个web3对象，它可以执行js于当前上下文。（若选择web provider/injected provider模式，则web3只是一个变量）
- 显示与remix IDE交互的重要的行为。
- 显示当前环境被开采的交易。你可以选择显示全部交易或该remix IDE创建的交易。
- 可以搜索数据、删除日志。
- 你可以输入脚本后点击底部的‘>’去执行脚本。

# tour of typical solidity modules

## compiler(solidity)

点击solidity icon 可以打开solidity compiler.
若交易中有多个依赖项，则应该谨慎使用自动编译。

![](https://remix-ide.readthedocs.io/en/latest/_images/a-sol-compiler.png)

|index|description||
|-|-|-|
|D|start compile||
|E|勾选后可以在切换选择、保存修改后编译。||
|B|选择语言（>=0.5.7）||
|C|指定反对以太访硬叉。默认使用硬叉。||
|G|设置metadata在当前编译中出现...||

## deploy & run

可以发送一个交易到当前环境。
点击“run” icon可以打开run & deploy模块。
在使用该模块前需要有一个交易被编译。所以，若交易选择框里有一交易的名字，则可以与该交易交互。若没有，则必须选择一个交易。你需要点击file icon去编辑面板创建一个交易后再编译后可以deploy & run.

### run setup

下面的设置会直接影响事务执行。

#### environment

- javascript vm:
- injected provider
- web3 provider

#### account
#### gas limit
#### value

## run & deploy

## debugger

## analysis

# using remix
## build artfact



## file
## file
## file
## file
## file
## file
## file
## file




# tour of default modules
# tour of default modules
# tour of default modules
# tour of default modules
# tour of default modules
# tour of default modules
# tour of default modules
