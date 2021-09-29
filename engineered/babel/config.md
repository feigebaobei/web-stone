# config of babel

## overview
> babel的配置

### feature
- feature0
- feature1
- feature2

## install
`npm i {{packageName}}`

## usage
- cli programmatic options
- 配置文件

```
// demo
// cli
// config
```

## configuration
|key|subkey|description|type|default|enum|是否可在cli中使用|是否可在配置文件中使用|demo|
|-|-|-|-|-|-|-|-|-|
|plugins|||||||||
|presets|||||||||
|targets||定义转换后需要支持的环境|`string / string[] / {[string]: string}`|支持最老的浏览器|||||
||esmodules|是否支持支持esm的目标浏览器|boolean||||||
||node|指定node版本|string / 'current' / true|-|||||
||safari|是否兼容不支持technology preview的safari浏览器|string / 'tp'|-|||||
||browsers|指定目标浏览器|`string / [string]`||||||
|browserslistConfigFile||||||v|v||
|browserslistEnv||浏览器列表的环境|string|undefined|||||
|extends||当前配置项会与上一层配置项合并。不能内嵌`presets`。|string|-|||||
|env||不能内嵌其他`env`|||||||
|overrides|||||||||
|test||若所有的匹配都失败，则不使用此字段。|||||||
|include||test的同意词|||||||
|exclude|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|highlightCode||当转换失败时高亮显示|boolean|true|||||
|presets|||||||||
|presets|||||||||
|compact||是否压缩生成的代码。auto：当code.length>500_000是启用|boolean / 'auto'||||||
|minified||是否压缩，包括compact:true.|boolean|false|||||
|auxiliaryCommentBefore||前置注释|string||||||
|auxiliaryCommentAfter||抹黑注释|string||||||
|comments|||||||||
|shouldPrintComment||一个决定是否给注释的方法|`(value: string) => boolean`||||||
|moduleIds||生成module ID|boolean||||||
|moduleId||设置当前模块的module ID.不能使用`getModuleId`|||||||
|getModuleId||获取babel生成的module的name.|`(name: string) => string`|-|||||
|moduleRoot||包含在生成module name中的根路径|string||||||
|MatchPattern|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||
|presets|||||||||

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。