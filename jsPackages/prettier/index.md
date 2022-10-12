# prettier

## overview
> 格式化代码的工具  
> 使用ast.  
> 根据设置项强制格式化代码。  
> 它只是代码格式指南

### feature
- 支持很多语言
- 支持很多ide
- 一般与钩子函数结合使用。
- 去掉原始的编写样式，使用指定的代码格式  
- 发现编写的bug  

## install
`npm i --save-dev --save-exact prettier`
为什么要用`--save-exact`  

## usage
本示例是基于`crtp-cli`做的。请先安装它
```shell
mkdir first
npm init
crtp initFile .prettierrc.json
vim src/index.js
npm i -D -E prettier
# 代码如下
npm set-script p "prettier --write ."
npm set-script pc "prettier --check ."
npm run pc # 会报错
npm run p  # 格式化
npm run pc # 不会报错
```
```js
// <root>src/index.js
function fn(a, b) {
  return a + b;}fn(1, 2);
// 显然这是编写不规范的
```

### pritter & git

## summary
- 尽量使用确定版本的prettier。  
- `.prettier.json`使编辑器知道如何使用prettier  
- `.prettierignore`使编辑器知道哪些不使用prettier  
- 在 ci 中使用`pretter --check .`  
- eslint-config-prettier可以使用prettier和eslint一起使用  
- 在pre-commit钩子中使用  

## configuration  
有好多地方可以设置。在哪儿设置效果有一样。不要同时在多个地方设置。优先级递减。  

- package.json中的prettier字段。  
- .prettierrc 使用json/yaml语言编写。  
- .prettierrc.json / .prettierrc.yml / .prettierrc.yaml .prettierrc.json5  
- .prettierrc.js / .prettierrc.cjs / prettier.config.js / prettier.config.cjs  
- .prttierrc.toml  

官网没有给出明确的key.  

|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
|max_line_length|最大宽度|80|||||
|indent_size / tab_width|缩进长度|2|||||
|indent_style|tab是否替换为space|false|||||
|分号|在行尾是否有分号|true|||||
|引号||false|||||
|引用props||"as-needed"|||||
|jsx中的引号||false|||||
|末尾的逗号||'es5'|||||
|括号的空间||true|||||
|括号占的行||false|||||
|箭头函数的括号||'always'|'avoid'||||
|格式化的范围||0 / Infinity|||||
|指定解析器||none||||prettier会根据文件的扩展名使用合适的解析器。一般不手动设置。|
|文件路径||使用stdin时使用。|||||
|必要的参数注释||false|||||
|插入注释||false|||||
|prose wrap|||||||
|HTML Whitespace Sensitivity|||||||
|Vue files script and style tags indentation|||||||
|End of Line|||||||
|Embedded Language Formatting|||||||
|Single Attribute Per Line|||||||

### .prettierignore
指定忽略的文件。  
使用gitignore语法  

## options
||||||
|-|-|-|-|-|
||||||

## [忽略](jsPackages/prettier/index.html)  

## cli
```shell
prettier [options] [file/dir/glob ...]
```
|options||||||
|-|-|-|-|-|-|
|`--check`|检查是否格式化|退出码：0，没问题，1， 可能是格式错误 2，prettier的错误||||
|`--`||||||
|`--debug-check`|不修改文件并检查错误。|不能与`--write`一起使用||||
|`--find-config-path`|不会|||||
|`--config`|指定配置文件|||||
|`--ignore-path`|指定忽略文件|默认 `./.prettierignore`||||
|`--list-different`|显示不符合格式化规范的文件名|一般用于ci||||
|`--on-config`|不使用配置文件，使用默认值|||||
|`--config-precedence`|设置优先方式|cli-override(default) cli优先。 file-override配置文件优先。 prefer-file 若配置文件存在则忽略cli,否则cli优先||||
|`--no-editorconfig`||||||
|`--with-node-modules`|是否格式化node_modules|||||
|`--write`|格式化|||||
|`--loglevel`|输出日志的级别|||||
|`--stdin-filepath`|设置stdin的文件目录|||||
|`--ignore-unknown`|不格式化不认识的文件|||||
|`--no-error-on-unmatched-pattern`|当不匹配时不显示错误|||||
|`--no-plugin-search`|不会|||||
|`--cache`|是否使用缓存|||||
|`--cache-strategy`|缓存规则。不会|metadata最快 / content||||

## browser
## pro-commit hook
需要学习husky等。  

## plugins
不会。  
prettier已经内置了js语言的插件。若需要别的语言需要安装插件。  

## tittlt

## api
```js
const prettier = require('prettier')
```

|||||||
|-|-|-|-|-|-|
|format(source, options)|返回格式化后的代码|source代码||||
|check(source, options?)|boolean|是否有错误||||
|formatWithCursor(source, options?)|格式化且格式化光标后面的代码|||||
|resolveConfig(filepath, options?)|`Promise<options>`|得到配置文件的配置项||||
|resolveConfigFile(filePath?)|`Promise<string>`|返回配置文件的path||||
|clearConfigCache()|-|清除缓存中的配置文件和插件||||
|getFileInfo(filePath, options?)|不会|||||
|getSupportInfo(source, options)||||||
|format(source, options)||||||
|format(source, options)||||||
|format(source, options)||||||
|format(source, options)||||||

## principle
此包的处理逻辑。
||||||
|-|-|-|-|-|
|correctness|当格式化失败时报错||||
|strings|单引号还是双引号||||
|empty lines|1. 把多个空行合并为一个空行。 2. 文件开头的空行会被删除||||
|multi-line objects|若一行放不下，则使用多行放置。||||
|decorators|||||
|semicolons|noSemi 没有分号||||
|print width|每行的最大宽度||||
|testing functions|||||
|jsx|||||
|comments|||||
|disclaimer about non-standard syntax|||||
|what prettier is not concerned about|||||

### uml
```
```

## todo
> 感觉没必要与eslint一起使用。二者都是做格式化的。在项目中使用一个就够。  
> 未来迭代计划。
> 未来迭代计划。

## prettier & linter
||prettier|linter|||||
|-|-|-|-|-|-|-|
|Formatting rules|减少不必要的配置规则。||||||
|Code-quality rules|||||||
