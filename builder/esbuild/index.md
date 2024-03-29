# `esbuild`

## overview
> 我们目前的web构建工具的速度比他们可以做到的慢10-100倍。esbuild捆绑包项目的主要目标是带来构建工具性能的新时代，并在此过程中创建一个易于使用的现代捆绑包。  
> 它处理ts -> js的速度是tsc的20-30倍  
> 当使用api方式时，esbuild的可执行文件在child process中运行。  
> plugin只支持异步api  
> 主要使用go(40%)/js+ts(40%)编写。  
> 主要使用go/js/ts编写。  
> 默认不打包（它是一个打包器，居然默认不打包）  
> 支持静态引入打包，不支持动态引入打包。  
> 浏览器优先。（打包默认iife规范）  
> cli中的选项无前后顺序  
> 面向平台打包 `--target`
> 编译时的打包器。
> 推荐使用js写法。（其他写法是cli、go）
> cli中的选项以中划线分割，js中选项使用驼峰命名法。  
> 默认在`format: 'esm'`时支持tree-shaking  

### feature
- 不使用缓存也很快
- 支持esm/cjs
- esm 可 tree shaking
- 支持 cli / js / go
- 支持ts/jsx
- source map
- minification
- 可编写简单插件，插件只支持异步api.
- 支持编写js代码
- 支持jsx默认转换为js，不需要loader
- api只有5个：
  - transform       用于stdin的打包
  - transformSync   用于stdin的打包
  - build           用于有文件系统的打包
  - buildSync       用于有文件系统的打包
  - serve           用于开发时打包
- 不支持运行时引入
- 没有配置文件
- 所以只能打包**静态引入**的资源。因它是编译时的打包器。

## install
```shell
npm i esbuild
npm i esbuild-wasm
```

[demo0](/builder/esbuild/demo0.html)  

## 打包结果的多种用途

### browser
```shell
esbuild input.js --target=chrome58,firefox57,safari11,edge16
```
```js
require('esbuild').buildSync({
  entryPoints: ['app.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'out.js',
})
```
你想要使用的一些npm包可能不是被设计成在浏览器中运行的。有时，您可以使用esbuild的配置选项来解决某些问题，并成功地捆绑包。未定义的全局变量在简单情况下可以用定义特性替换，在复杂情况下可以用注入特性替换。

### node
当设置`--platform=node`时，esbuild会把设置一些对node友好的配置项。如：把`fs`标记为排除项。还会设置一些浏览器不永别package.json的配置项。  
既然打包时排除了，那么在使用该包时。这些排除项也要在运行时存在。（有些同等依赖）

## configuration
待完善  
没有配置文件
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
- 支持cli/js/go  
- cli的写法
  - --foo       用于表示bool
  - --foo=bar   用于接收一个值
  - --foo:bar   用于接收多个值。如 `--external:*.png --external:/images/*`
- 只有2个api transform / build

### transform
- 当不使用文件系统时，可以使用transform api 去转换一行字符串。（如在浏览器中）
- 当没有指定输入文件和`--bundle`时，输入使用标准输入的字符串，输出使用标准输出。  
- 该api就是为无文件系统时提供的。（它没有入口选项）
使用方式

```ts
transformSync(sourceCode: string, options: {...}) => string
```

```
// shell
echo 'let x: number = 1' | esbuild --loader=ts
// js
require('esbuild').transformSync('sourceCode', options) => {code: 'xxx', map: '', warnings: []}
// go
import "fmt"
import "github.com/evanw/esbuild/pkg/api"
func main() {
  result := api.Transform('sourceCode', api.TransformOptions{Loader: api.LoaderTS})
  if len(result.Error) == 0 {
    fmt.Printf("%s", result.Code)
  }
}
```

### build
- `build` api可操作文件系统中的一个或多个文件。允许文件引用别的文件。
- 当项目至少一个输入文件或`--bundle`标记时，esbuild会调用此api.  
- 默认不打包，必须明确使用`--bundle`才会去打包  
- 当没有输入文件时，使用标准输入。
- （有入口选项）  

```ts
buildSync(options: {
  ...
}) => obj
```

使用方式
```
// cli
esbuild in.ts --outfile=out.js
// js
require('esbuild').buildSync({
  entryPoints: ['in.ts'],
  outfile: 'out.js'
}) => {errors: [], warnings: []}
// go
package main
import "io/ioutil"
import "github.com/evanw/esbuild/pkg/api"
import "os"
func main() {
  ioutil.WriteFile("in.ts", []byte("let x: number = 1"), 0644)
  result := api.Build(api.BuildOptions{
    EntryPoints: []string{"in.ts"},
    Outfile:     "out.js",
    Write:       true,
  })
  if len(result.Errors) > 0 {
    os.Exit(1)
  }
}
```

### 各种options
*斜体*表示没有具体的选项

|option|可用于哪个api|说明|默认值|枚举值|demo||
|-|-|-|-|-|-|-|
|`bundle`|build|把所有依赖、引入打包为内联的。可递归打包。默认输出iife规范的文件。|**默认不打包输入文件。**。若要打包必须明确使用此选项。多个输入时，会默认打包出对应的多个文件。可以把多个文件引入到一个文件中，再打包这个文件。||`esbuild in.js --bundle`|只支持打包静态资源。请确保在运行可引入排除的包。|
|`define`|trasform/build|定义全局替换的内容（类似宏替换）。若定义string，则必须使用引号。请遵守操作系统的斜线的数量。|-|json对象/单个变量|`echo 'id, str' | esbuild --define:id=text --define:str=\"text\"`|建议不要用于代码逻辑|
|*入口*|build|明确打包的文件。一般与其一起使用的选项还有：outdir/outfile/outbase/xxx/xxx/...|-|一个文件或多个文件||可以是string / string[] / {key: path}|
|`external`|build|指定不打包的文件|||||
|`format`|tranform / build|指定输出规范|当无format时输出文件使用输入文件的规范。当`platform`设置为browser时，自动使用`iife`规范。当`platform`设置为node时，自动使用`commonjs`规范。当`platform`设置为neutral时，自动使用`esm`规范。|iife/cjs/esm|`esbuild in.js --format=cjs`|只支持iife/esm/cjs|
|`inject`|build|注入文件。从别的文件引入全局变量并替换。它有4个功能：1.可以与define一起使用。 2.为jsx自动引入react. 3.您还可以将此功能用于没有导出的文件。在这种情况下，注入的文件只是排在输出的其余部分之前，就好像每个输入文件都包含import "./file.js"。 4.按条件注入一个文件|-|-|`esbuild in.js --bundle --inject:./p.js`||
|`loader`|transform/build|用于给esbuild翻译输入文件。|-|-|`esbuild in.js --bundle --loader:.png=dataurl`|可以根据扩展名、路径设置loader|
|`minfy`|transform/build|生产压缩后的代码。压缩后的代码可以让下载更快、调试更难、一般于生产环境。可用于css/js|-|-|`esbuild in.js --minify`||
|`minfyWhitespace`|transform/build||-|-|``||
|`minfyIdentifiers`|transform/build||-|-|``||
|`minfySyntax`|transform/build||-|-|``||
|`outdir`|build|设置输出的目录。若已经存在，则不会清空。会覆盖相同文件。需要程序员自己清空输出目录|-|-|`esbuild in.js --bundle --outdir=out`|不能与outfile一同使用|
|`outfile`|build|指定输出文件名。当输入文件只有一个时，有效。|-|-|``||
|`platform`|transform/build|指定打包后代码的运行平台。|browser|browser/node/neutral|||
|`servedir`|build|不会，好像是（为相对于输出目录的额外目录为也提供静态服务功能。额外目录中的文件变动时会触发rebuild.）|||||
|`serve`|build|提供静态服务。打包后才能提供服务。打包结果放在内存中。|||`esbuild in.js --bundle --outfile=out.js --serve=8080`访问http://localhost:8080/out.js|详见 开发时|
|`sourcemap`|transform/build|指定代码地图的种类|linked|linked/external/inline/both|||
|`splitting`|build|代码分块打包（也叫：代码分割），**当前只能在esm中使用**（`--format=esm`）|-|-|`esbuild in.js --bundle --splitting --outdir=out --format=esm`|用途：1. 多入口。 2. 异步引入|
|`target`|transform/build|指定js/css的运行环境。esbuild会把代码转换为该环境支持的写法。可指定js版本，如`es2020`。|-|chrome/edge/firefox/hermes/ie/ios/node及版本/opera/rhino/safari/js的版本|`esbuild in.js --bundle --target=es2020,chrome58,edge16,firefox57,node12,safari11`||
|`watch`|build|当改变时rebuild|||||
|`write`|build|build api可以输出到文件系统也可以输出到内存中。默认cli/js输出到文件系统中。go输出到内存中。|||||

|option|可用于哪个api|说明|默认值|枚举值|demo||
|-|-|-|-|-|-|-|
|`allow-overwrite`|build|是否允许打包文件覆盖|||||
||build|是否启动分析功能。若启动会列出每个包的信息|-|true/verbose|`esbuild in.js --bundle --analyze`||
|`asset-names`|build|当loader设置为file时，控制输出的额外的文件的名字。定义模板的名字。|-|-|`esbuild in.js --bundle --outdir=out --loader:.png=file --asset-names=assets/[name]-[hash]`||
|`banner`|tranform/build|输出时直接在js/css文件的开头插入字符串。|-|-|`esbuild in.js --bundle --banner:js=//comment --banner:css=/*comment*/`||
|`charset`|transform/build|指定编码集|||||
|`chunk-names`|build|当使用代码分割时会产生子代码块（chunk）有可能是共用的。该选项是控制chunk的目录+文件名的占位符。|-|-|`esbuild in.js --bundle --outdir=out --splitting --format-esm --chunk-names=chunks/[name]-[hash]`||
|`color`|transform/build|当出现错误、警告时，是否使用有色标记。|-|true/false|``||
|`conditions`|build|不会。与package.json中的exports有关|||`esbuild src/app.js --bundle --conditions=custom1,custom2`||
|`drop`|transform/build|开始打包前删除一些代码|-|-|`esbuild in.js --bundle --drop:debugger`||
|`entry-names`|build|指定入口文件的输出时的文件名|||||
|`footer`|transform/build|输出时直接在js/css文件的结尾插入字符串。|-|-|`esbuild app.js --footer:js=//comment --footer:css=/*comment*/`||
|`global-name`|transform/build|只与iife规范结合使用。设置全局变量|-|-|`esbuild in.js --bundle --format=iife --global-name=abc`||
|`ignore-annotations`|transform/build|是否删除注释|-|-|``||
|`incremental`|build|只在js、go api中使用。|||||
|`jsx`|transform/build|指定如何编译jsx|-|transform/preserve/automatic|`esbuild in.js --bundle --loader=jsx --jsx=preserve`||
|`jsx-dev`|transform/build|当jsx设置为automatic时，此字段控制是否把源文件及代码的位置信息打包|-|-|`esbuild in.js --bundle --jsx=automatic --jsx-dev`||
|`jsx-factory`|transform/build|设置使用哪个方法解析jsx|-|-|`esbuild in.js --bundle --jsx-factory=h --loader=jsx`||
|`jsx-fragment`|transform/build|指定处理jsx fragment的方法|-|-|`esbuild in.js --bundle --jsx-fragment=Fragment --loader=jsx`||
|`jsx-import-source`|transform/build|当jsx设置为automatic时，此选项控制从哪儿引入jsx helper的方法。|-|-|`esbuild in.js --jsx=automatic --jsx-import-source=preact`||
|`keep-names`|transform/build|是否保留方法、class的名字|||||
|`legal-comments`|transform/build|如何处理遗留的注释|-|none/inline/eof/linked/external|`esbuild in.js --bundle --legal-comments=eof`||
|`log-level`|transform/build|如何处理log|-|silent/error/warning/info/debug/verbose|||
|`log-limit`|transform/build|控制日志的数量。为0时不输出|-|-|||
|`log-override`|transform/build|控制哪些的log可显示|||||
|`main-field`|build|不会|-|main/module/browser|||
|`mangle-props`|transform/build|不会|||||
|`metafile`|build|定义分析时的输出格式|||||
|`NODE_PATH`|build|cjs时的环境变量|||||
|`out-extension`|build|指定输出的自定义扩展名|-|-|`esbuild in.js --bundle --outdir=dist --out-extension:.js=.mjs`||
|`outbase`|build|设置输出时文件路径的base|-|-|``||
|`preserve-symlinks`|build|指定源文件的路径|-|-|`esbuild in.js --bundle --preserve-symlinks --outfiles=out.js`||
|`public-path`|build|与file loader一起使用时设置文件的前缀。|-|-|`esbuild in.js --bundle --loader:.png=file --public-pach=https://www.str.com/v1 --outdir=out`||
|`pure`|transform/build|用于各种各样的js工具都使用这样的注释`/*@__PURE__*/`或`/*#__PURE__*/`表示若结果值未被使用，则该表达式可以删除。在tree shaking时会被删除。使用该字段标记可删除的。|-|-|`esbuild in.js --bundle --pure:document.createElement`|若要删除console等，请使用相应的选项|
|`resolve-extensions`|build|指定解析无扩展名文件的扩展名顺序|-|'','.js','.json','.node'|`esbuild in.js --bundle --resolve-extensions=.ts,.js`||
|`source-root`|transform/build|当source map可用时，该字段指明相关的source map.|-|-|`esbuild in.js --bundle --sourcemap --source-root=https://www.xx.com/path`||
|`sourcefile`|transform/build|当没有输入文件名时，该字段设置输入文件名|-|-|`cat app.js | esbuild --bundle --sourcefile=abc.js --sourcemap`||
|`sources-content`|transform/build|在生成的sourceMap文件中是否使用sourcesContent字段|-|-|`esbuild in.js --bundle --sourcemap --sources-content=false`||
|*stdin*|build|设置输入|||||
|`supported`|transform/build|设置esbuild不支持语法，打包时遇到该语法会报错。|-|-|`esbuild in.js --bundle --supoorted-bigint=false`||
|`tree-shaking`|transform/build||当使用`--bundle`或`--format==iife`时默认启用。其他情况默认不启用。也可以强制启用|-|`esbuild in.js --tree-shaking=true`||
|`tsconfig`|build|自动覆盖`tsconfig.json`。可以自定义ts的配置文件|-|-|`esbuild in.js --bundle --tsconfig-custom-tsconfig.json`||
|`tsconfig-raw`|transform|当使用transform api时不使用访问文件系统，所以可以使用该字段设置|-|-|`echo xxx | esbuild --loader=ts --tsconfig-raw='{"compilerOptions": {"useDefineForClassFields": true}}'`||
|*working directory*|build|设置工作目录。不支持cli.|默认为当前工作目录||||
|*js-specific details*|||||||

### 开发时

#### serve
为方便开发；
- 使用观察模式
- 设置编辑器在保存时打包
- 每次请求时打包

demo:
```js
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const esbuild = require('esbuild')
esbuild.serve({
    port: 4000, // default 3000
    // hsot: 0.0.0.0 // default 0.0.0.0
    servedir: __dirname, // .
    onRequest: (obj) => {
        console.log('obj', obj)
    }
}, {
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'out',
    loader: {
        '.js': 'jsx',
        '.css': 'css',
    },
    plugins: [cssModulesPlugin()]
})
```

用法
```ts
esbuild.serve(opt: ServeOptions, opt2: xxx) => ServeResult
interface ServeOptions {
  port?: number;        // default 3000
  host?: number;
  servedir?: number;    // 服务目录
  onReqeset?: (args: ServeOnRequestArgs) => void; // 每次请求时执行
}
interface ServeOnRequestArgs {
  remoteAddress: string;
  method: string;
  path: string;
  status: number;
  timeInMS: number;
}
interface ServeResult {
  port: number;
  host: string;
  wait: Promise<void>; // 为web server 提示被打断了
  stop: () => void;    // 停止web server.
}
```

#### watch
```js
const cssModulesPlugin = require('esbuild-css-modules-plugin');

require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'out',
    loader: {
        '.js': 'jsx',
        '.css': 'css',
    },
    watch: true,
    plugins: [cssModulesPlugin()]
    // outfile: 'out.js',
}).then(result => {
    console.log('result', result)
}).catch(() => process.exit(1))
```

### 基本结构
待完善
```json
// package.json
"script": {
  "bw": "node ./jsWatch.js & serve"
}
```
```js
// jsWatch.js
(async () => {
    const cssModulesPlugin = require('esbuild-css-modules-plugin');
    const esbuild = require('esbuild')
    let result = await esbuild.build({
        entryPoints: ['src/index.js'],
        assetNames: 'assets/[name]-[hash]',
        entryNames: '[name]',
        bundle: true,
        outdir: 'out',
        loader: {
            '.js': 'jsx',
            '.css': 'css',
        },
        watch: true,
        metafile: true, // 用于分析
        banner: {
          js: '// author: xxx',
          css: '/* author: xxx */',
        },
        chunkNames: '[name]-[hash]',
        color: true,
        drop: ['debugger', 'console'],
        incremental: true,
        // jsx: 'automatic',
        // jsxDev: true,
        // jsFactory: 'Fragmet',
        keepNames: true,
        legalComments: 'eof',
        logLevel: 'error',
        // logLimit: 10, // default
        supported: {
          // biging: false
        },
        plugins: [cssModulesPlugin()]
    })
    require('fs').writeFileSync('meta.json', JSON.stringify(result.metafile))
})()
```

## 选项的补充说明
### Non-analyzable imports
esbuild只会打包静态引入。（当有动态引入时不打包）
有其他打包器支持打包动态引入。如[webpack](/builder/webpack/index.html)

### 默认不打包
因其默认不打包。要打包需要明确使用`--bundle`选项。
```shell
esbuild in.js --bundle
```

### external
- 排除明确不使用的代码
- 可以从node环境中引入的包

解析路径前后都有应用。
|||||
|-|-|-|-|
|解析路径前|若路径像包路径（不以/或./或../开头）。该包内的所有路径标记为外部路径|||
|解析路径后|把不像包路径的外部路径解析为绝对路径。|||
|||||

### js编写规范
esm可以运行在browser/node环境。
`<script src="file.js" type="module"></script>`  
`node --experimental-modules file.mjs`

### 压缩
|||
|-|-|
|--minify-whitespace|压缩空格|
|--minify-identifiers|压缩变量名|
|--minify-syntax|压缩语法|

注意：
- 应当使用压缩时也使用target选项。默认esbuild会使用高级的现代js功能打包代码。若您不想使用现代js代码可以指定target选项。如`--target=es6`  
- `\n`被代替为newline  
- 不压缩顶级变量名  
- 压缩不是100%安全的。业界也做不到100%完全（包括terser）。尤其是esbuild不保护`.toString()`方法。若保存所有方法中的代码，则压缩很困难。即返回值调用`.toString()`可能会中断。
- 默认不会保护方法和class的`.name`。  
- 有几个js的功能不能在优化、压缩时使用。如`eval`/`with`会阻止最小化标识符。`let result = eval(something)` => `let result = (0, eval)(someThing)`
- 在优化和压缩时不使用的js code
  - dead-code
  - function inline
  - cross-statement constant propagtion
  - object shape modeling
  - allocation sinking
  - method devirtualization
  - symbolic execution
  - jsx expression hoisting
  - ty esum delecting ang inlining

### platform
- browser(默认值)
  - 只使用`bundle`时，默认输出iife规范。
  - xx
  - xxx
  - package.json中exports的优先级大于browser/main/module等字段。
  - 使用`build`api时，`process.env.NODE_ENV`默认为`"production"`。
- node
  - format默认为cjs
  - node环境已经存在的包，会被自动标记为`external`字段。
  - 不会tree shaking
  - xxx
- neutral
  - 默认输出esm.
  - 请设置必要的字段。如`main`  
  - xxx

### serve
有三种方法启动本地服务
- 使用`--watch`选项  
- 在编辑器设置每次保存是启动esbuild  
- 把服务器中设置为每次请求时rebuild

#### 使用方法
- 使用esbuild提供全部服务
- 只提供打包结果的服务

使用js、go时可以设置参数：
```ts
type ServeOptions struct {
  Port      uint16
  Host      string
  Servedir  string
  OnRequest func(ServeOnRequestArgs)
}

type ServeOnRequestArgs struct {
  RemoteAddress string
  Method        string
  Path          string
  Status        int
  TimeInMS      int
}
```
返回值
```ts
type ServeResult struct {
  Port uint16
  Host string
  Wait func() error
  Stop func()
}
```

#### 自定义服务器行为
xxx

### [source map](/sourceMap/index.html)
现代浏览器默认启用代码地图。手动设置如下：
- chrome: 设置 -> Enable Javascript source maps
- Safari: 设置 -> Sources -> Enable source maps
- chrome: Enable Source Maps

node v12.12+开始支持代码地图。
`node --enable-source-maps app.js`

#### linked
生成与`*.js`同级的`*.js.map`。
在`*.js`中明确使用`//# sourceMappingURL=`指定`*.js.map`文件。浏览器会把二者联系起来。

#### external
生成与`*.js`同级的`*.js.map`。
在`*.js`中不使用`//# sourceMappingURL=`

#### inline
在`*.js`内使用`//# sourceMappingURL=`指定代码地图。

#### both
inline + external

### 代码分割
目的
- 多个入口都会到的公共文件。
- 异步使用`import()`加载代码。

### asset-names
模板可用的占位符
||||
|-|-|-|
|dir|相对于outbase的目录||
|name|原生的文件，无扩展名部分。||
|hash|关于内容的hash值，防止出现命名冲突。||
|ext|文件的扩展名||

### charset
esbuild默认输出ASCII.非ASCII的被当作逃逸字符处理，因该类字符无法解释给浏览器。因此出现了`<meta charset="utf-8">`、回馈头的`Content-Type`、让浏览器解析变慢。

注意
- 不要在表达式中使用非ASCII
- 不会作用于备注
- **同时作用于js/css/json**

### chunk-names
|||||
|-|-|-|-|
|name||||
|hash||||
|ext|||`--chunk-name=chunks/[ext]/[name]-[hash]`|

### conditions
|||||
|-|-|-|-|
|default|它总是可以使用的，当无其他条件应用时使用此条件|||
|import|只在esm规范下使用|||
|require|只在cjs规范下使用|||
|browser|只在platform是browser时使用|||
|node|只在platform是node时使用|||

### drop
||||
|-|-|-|
|debugger|删除debugger||
|console|删除console||

### jsx
当设置为automatic时，由react决定是否转换。react v17+会自动轮换。

### legal-comments
如何处理遗留注释
|||||
|-|-|-|-|
|none|不保留|||
|inline|保留|||
|eof|全删除||与none有何区别|
|linked|把遗留注释放在`.LEGAL.txt`中再链接到原文件|||
|external|把遗留注释放在`.LEGAL.txt`中不链接到原文件|||

### log-level
|||||
|-|-|-|-|
|silent|不输出日志|||
|error|只输出错误日志|||
|warining|输出错误日志和警告日志|||
|info|输出错误、警告、输出文件的概要|||
|debug||||
|verbose|显示全部信息|||

### log-override
|||||||
|-|-|-|-|-|-|
|assign-to-constant||||||
|assign-to-import||||||
|call-import-namespace||||||
|commonjs-variable-in-esm||||||
|delete-super-property||||||
|duplicate-case||||||
|duplicate-object-key||||||
|empty-import-meta||||||
|equals-nan||||||
|equals-negative-zero||||||
|eqauls-new-object||||||
|html-comment-in-js||||||
|impossible-typeof||||||
|indirect-require||||||
|private-name-will-throw||||||
|semicolon-after-return||||||
|suspicious-boolean-not||||||
|this-is-undefined-in-esm||||||
|unsupported-dynamic-import||||||
|unsupported-jsx-comment||||||
|unsupported-regexp||||||
|unsupported-require-call||||||
|css-syntax-error||||||
|invalid-@charset||||||
|invalid-@import||||||
|invalid-@nest||||||
|invalid-@layer||||||
|invalid-calc||||||
|js-comment-in-css||||||
|unsupported-@charset||||||
|unsupported-@namespace||||||
|unsupported-css-property||||||
|ambiguous-reexport||||||
|differet-path-case||||||
|ignored-bare-import||||||
|ignored-dynamic-import||||||
|import-is-undefined||||||
|require-resolve-not-external||||||
|invalid-source-mapping||||||
|sections-in-source-map||||||
|missing-source-map||||||
|unsupported-source-map-comment||||||
|package.json||||||
|tsconfig.json||||||

### metafile
```ts
interface Metadata {
  inputs: {
    [path: string]: {
      bytes: number
      imports: {
        path: string
        kind: string
      }[]
    }
  }
  outputs: {
    [path: string]: {
      bytes: number
      inputs: {
        [path: string]: {
          bytesInOutput: number
        }
      }
      imports: {
        path: string
        kind: string
      }[]
      exports: string[]
      entryPoint?: string
    }
  }
}
```

### supported
何时使用：
- 使用新js语法写时快，转换为旧js语法运行时慢。
- 其他包已经支持，不用esbuild再支持。
- 使用esbuild与别的工具合作时。

- arbitrary-module-namespace-names
- array-spread
- arrow
- async-await
- async-generator
- bigint
- class
- class-field
- class-private-accessor
- class-private-brand-check
- class-private-field
- class-private-method
- class-private-static-accessor
- class-private-static-field
- class-private-static-method
- class-static-blocks
- class-static-field
- const-and-let
- default-argument
- destructuring
- dynamic-import
- exponent-operator
- export-star-as
- for-await
- for-of
- generator
- hashbang
- import-assertions
- import-meta
- logical-assignment
- nested-rest-binding
- new-target
- node-colon-prefix-import
- node-colon-prefix-require
- nullish-coalescing
- object-accessors
- object-extensions
- object-rest-spread
- optional-catch-binding
- optional-chain
- regexp-dot-all-flag
- regexp-lookbehind-assertions
- regexp-match-indices
- regexp-named-capture-groups
- regexp-sticky-and-unicode-flags
- regexp-unicode-property-escapes
- rest-argument
- template-literal
- top-level-await
- typeof-exotic-object-is-object
- unicode-escapes
- hex-rgba
- rebecca-purple
- modern-rgb-hsl
- inset-property
- nesting

## 在浏览器中运行
在浏览器中使用esbuild-wasm 在web worker中运行。  
使用`esbuild-wasm`代替`esbuild`  
```shell
npm i esbuild-wasm
```
```js
let esbuild = require('esbuild-wasm')

esbuild.initialize({
  wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
}).then(() => {
  esbuild.transform(code, options).then(result => { ... })
  esbuild.build(options).then(result => { ... })
})
```
```html
<script src="./node_modules/esbuild-wasm/lib/browser.min.js"></script>
<script>
  esbuild.initialize({
    wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
  }).then(() => { ... })
</script>
```
```html
<script type="module">
  import * as esbuild from './node_modules/esbuild-wasm/esm/browser.min.js'

  esbuild.initialize({
    wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
  }).then(() => { ... })
</script>
```

## loader
为esbuild做翻译工作。即使有些文件已经设置了默认loader，也可以覆盖默认值。

**常用loader**
|loader|可翻译的文件||||
|-|-|-|-|-|
|js|`.js / .cjs / .mjs`||||
|ts|`.ts / .tsx / .mts / .cts`||||
|jsx / tsx|`.jsx`||||
|json|`.json`||||
|css|`.css`||||
|text|`.txt`||||
|binary|当作binary buffer加载，并打包到包中。再默认导出为`uint8array`||||
|base64|当作binary buffer加载，并打包到包中。再默认导出为`base64string`||||
|dataurl|当作binary buffer加载，并以base64-encoded data url方式打包到包中。||||
|file / copy|把文件复制到输出目录||||
|js|||||
|js|||||
|js|||||
|js|||||
|js|||||
|js|||||


### js
- 加载`.js, .cjs, .mjs`时使用js loader.
- 默认输出高级写法
- 支持es5不太好。可以把es5输出为es6+。可以把es5输出为es5.  
- 使用WeakMap/WeakSet输出私有成员(`#name`)  
- import会被提升到文件的顶部。  
- 不要使用`eval`
- xxx
- 不维持方法中的this。
- 当输出default时，由esm转换cjs时有可能不兼容。
- babel转换
- node转换

### ts
- loader是 ts或tsx
- 默认作用于 .ts .tsx .mts .cts

### jsx
- loader是 jsx或tsx
- 自动引入react等

### json
- loader是 json

### css
- loader是 css
- 因在xxx.js中引入的css，是输出xxx.css  

### text
- loader是 text
- 作用于`.txt`

### binary
- loader是 binary
- 把文件当作binary buffer打包，再以base64嵌入

### base64
- loader是 base64
- 把文件当作binary buffer打包，再以base64嵌入

### dataurl
- loader是 dataurl
- 把文件当作binary buffer打包，再以base64-encode data url 形式输出 如：`data:image/png;base64,iVBORw0KGgo=`

### external file
- file loader
  - 把文件复制到输出目录。输出文件名。
- copy loader
  - 把文件复制到输出目录。并重写引入路径

## [plugin](/builder/esbuild/plugin/index.html)
正在开发阶段。  

||cli|js|go|
|-|-|-|-|
|transform|x|x|x|
|build|x|y|y|

- 插件可以做什么？
- 如何与esbuild结合工作
- 基本结构是什么
- 如何使用

## principle
![图片](https://img-blog.csdnimg.cn/2021071720503017.png)  

- 变量命名太好了。（很准确、见文知意）

### uml
```
```

## todo

### 缺陷
- 压缩`.toString()`时有问题
- api有杂糅的情况。如platform+format
- tree shaking只作用于cjs规范。
- 还有正在开发的工作。如：代码分割。
- 环境变量的例子太难懂了。
- 关于插件的文档写的不好

### [rollup](/builder/rollup/index.html)
esbuild有些不足为什么还基于它做工作。（可能是因不致命，或可以在二开中解决。）
写一builder还是挺难的。

### 使用esbuild与别的工具合作，（甚至是打包工具）

### eval
`(0, eval)(<expression>)`
这里用了逗号操作符，逗号操作符总会返回表达式中的最后一项，所以0在这里基本上没有什么用，换成其他任意数值均可
然后通过”()”来立即执行这个表达式，返回eval

### 总结
为了快有好多功能没做。不支持功能：
- 降级输出
- 本可以再做的更宽泛，但是esbuild往宽的做，而是向精细的做。专注于做自己的事。

我记得好像有过一个用go重写的webpack  
两个语言支持相同api。差不多是个产品都会要求程序员这样做。好保持产品对外输出一致。
在介绍环节就应该把产品的全部功能带一遍给读者。像《红楼梦》在前五章就映射了全书的内容。比“总-分-总”结构要高一个档次  

### 为什么快

- Go 是为并行性而设计的（多线程），而 JavaScript 不是。
- Go在线程之间共享内存，而JavaScript必须在线程之间序列化数据。
- Go 和 JavaScript都有并行的垃圾收集器，但是Go的堆在所有线程之间共享，而对于JavaScript, 每个JavaScript线程中都有一个单独的堆。


