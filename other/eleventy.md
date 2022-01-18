# eleventy

## overview
> 静态网站生成器。  

### feature
- 支持的模板语言
  - html *.html
  - markdown *.md
  - javascript *.js
  - liquid *.liquid
  - nunjucks *.njk
  - handlebars *.hbs
  - mustache *.mustache
  - ejs *.ejs
  - haml *.haml
  - pug *.pug
  - custom *.*
- feature2

## install
```shell
npm i -D @11ty/eleventy
eleventy --version # 若返回版本号则安装成功
```

## usage
```shell
mkdir demo-eleventy-0
cd demo-eleventy-0
npm i -D @11ty/eleventy
echo '<!doctype html><html><head><title>Page title</title></head><body><p>Hi</p></body></html>' > index.html
echo '# Page header' > README.md
npx @11ty/eleventy # 生成 _site 目录
npx @11ty/eleventy --serve # 启动本地热更新服务
# 全局安装后使用 eleventy
# 局部安装后使用 npx @11ty/eleventy
```

## configuration
默认配置文件：`<root>/eleventy.json`。

## cli
```shell
Usage: eleventy
       eleventy --input=. --output=./_site
       eleventy --serve

Arguments:

     --version

     --input=.
       Input template files (default: `.`)

     --output=_site
       Write HTML output to this folder (default: `_site`)

     --serve
       Run web server on --port (default 8080) and watch them too

     --port
       Run the --serve web server on this port (default 8080)

     --watch
       Wait for files to change and automatically rewrite (no web server)

     --formats=liquid,md
       Whitelist only certain template types (default: `*`)

     --quiet
       Don’t print all written files (off by default)

     --config=filename.js
       Override the eleventy config file path (default: `.eleventy.js`)

     --pathprefix='/'
       Change all url template filters to use this subdirectory.

     --dryrun
       Don’t write any files. Useful with `DEBUG=Eleventy* npx eleventy`

     --to=json
     --to=ndjson
       Change the output to JSON or NDJSON (default: `fs`)

     --help
```

## layout
## api

## principle
此包的处理逻辑。

### uml
```
```

## 竞品
> jekyll (ruby)
> hugo (go)
> hexo (js)
> gatsby (react)
> nuxt (vue)