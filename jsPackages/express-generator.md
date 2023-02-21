# express-generator

## overview

> express 应用的生成器。  
> 一般这样的功能由 xxx-cli 包实现。但是此包名没遵守此规范。（忍了）

### feature

- feature0
- feature1
- feature2

## install

`npm i express-generator -g`

## usage

```shell
express path/dir # 在指定目录创建应用
cd path/dir
npm i
npm run start
```

## command line options

<!-- prettier-ignore-start -->
|options|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|--verions|版本号|||||||
|--ejs, -e|使用ejs引擎|||||||
|--pug|使用pug引擎|||||||
|--hbs|使用handlebars引擎|||||||
|--hogan, -H|使用hogan.js引擎|||||||
|`--view <engine>`, -v|添回view引擎。||jade/dust/ejs/hbs/hjs/jade/pug/twig/vash)||||
|--no-view|使用静态html文件代替view引擎|||||||
|`--css <engine>`, -c|添加样式预处理工具。|css||less/stylus/compass/sass||||
|--git|添加 .gitignore|||||||
|--force, -f|强制在非空目录创建express应用|||||||
|--help, -h||||||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
