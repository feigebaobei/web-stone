# `esbuild`

## overview
> 我们目前的web构建工具的速度比他们可以做到的慢10-100倍。esbuild捆绑包项目的主要目标是带来构建工具性能的新时代，并在此过程中创建一个易于使用的现代捆绑包。  
> 
> 它处理ts -> js的速度是tsc的20-30倍
> 当使用api方式时，esbuild的可执行文件在child process中运行。
> plugin只支持异步api
> 主要使用go(40%)/js+ts(40%)编写。
> 主要使用go/js/ts编写。
> 默认不打包（它是一个打包器，居然默认不打包）
> 支持静态引入打包，不支持动态引入打包。
> 浏览器优先。（打包默认iife规范）

### feature
- 使用缓存也很快
- 支持esm/cjs
- esm 可 tree shaking
- 支持js / go 使用 api
- 支持ts/jsx
- source map
- minification
- 可插件
- 支持cli
- 支持编写js代码
- 

## install
```shell
npm i esbuild
npm i esbuild-wasm
```

## usage
同`./demo.html`

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
`build`api可操作文件系统中的一个或多个文件。允许文件引用别的文件。
- 当项目至少一个输入文件或`--bundle`标记时，esbuild会调用此api.  
- 默认不打包，必须明确使用`--bundle`才会去打包  
- 当没有输入文件时，使用标准输入。
- （有入口选项）  
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
|`bundle`|build|把所有依赖、引入打包为内联的。可递归打包。默认输出iife规范的文件。|**默认不打包输入文件。**。若要打包必须明确使用此选项。多个输入时，会默认打包出对应的多个文件。可以把多个文件引入到一个文件中，再打包这个文件。||`esbuild in.js --bundle`||
|`define`|trasform/build|定义全局替换的内容（类似宏替换）。若定义string，则必须使用引号。请遵守操作系统的斜线的数量。|-|json对象/单个变量|`echo 'id, str' | esbuild --define:id=text --define:str=\"text\"`||
|*入口*|build|明确打包的文件。一般与其一起使用的选项还有：outdir/outfile/outbase/xxx/xxx/...|-|一个文件或多个文件|||
|`external`|build|指定不打包的文件|||||
|`format`|tranform / build|指定输出规范|当无format时输出文件使用输入文件的规范。当`platform`设置为browser时，自动使用`iife`规范。当`platform`设置为node时，自动使用`commonjs`规范。当`platform`设置为neutral时，自动使用`esm`规范。|iife/cjs/esm|`esbuild in.js --format=cjs`||
|`inject`|build|注入文件。从别的文件引入全局变量并替换。它有4个功能：1.可以与define一起使用。 2.为jsx自动引入react. 3.您还可以将此功能用于没有导出的文件。在这种情况下，注入的文件只是排在输出的其余部分之前，就好像每个输入文件都包含import "./file.js"。 4.按条件注入一个文件|-|-|`esbuild in.js --bundle --inject:./p.js`||
|`loader`|transform/build|用于给esbuild翻译输入文件。|-|-|`esbuild in.js --bundle --loader:.png=dataurl`||
|`minfy`|transform/build|生产压缩后的代码。压缩后的代码可以让下载更快、调试更难、一般于生产环境。可用于css/js|-|-|`esbuild in.js --minify`||
|`outdir`|build|设置输出的目录。若已经存在，则不会清空。会覆盖相同文件。需要程序员自己清空输出目录|-|-|`esbuild in.js --bundle --outdir=out`||
|`outfile`|build|指定输出文件名。当输入文件只有一个时，有效。|-|-|``||
|`platform`|transform/build|指定打包后代码的运行平台。|browser|browser/node/neutral|||
|`servedir`|build|不会，好像是（为相对于输出目录的额外目录为也提供静态服务功能。额外目录中的文件变动时会触发rebuild.）|||||
|`serve`|build|为outdir提供静态服务。|||`esbuild in.js --bundle --outfile=out.js --serve=8080`访问http://localhost:8080/out.js||
|`sourcemap`|transform/build|指定代码地图的种类|linked|linked/external/inline/both|||
|`splitting`|build|代码分块打包（也叫：代码分割），只能在esm中使用（`--format=esm`）|-|-|`esbuild in.js --bundle --splitting --outdir=out --format=esm`||
|`target`|transform/build|指定js/css的运行环境。esbuild会把代码转换为该环境支持的写法。|-|chrome/edge/firefox/hermes/ie/ios/node及版本/opera/rhino/safari/js的版本|||
|`watch`|build|当改变时rebuild|||||
|`write`|build|输出到文件系统或内存中。js/go才能使用该选项。cli直接输出到文件系统。|||||

|option|可用于哪个api|说明|默认值|枚举值|demo||
|-|-|-|-|-|-|-|
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||
|`bundle`|||||||



## plugin
## principle
此包的处理逻辑。

### uml
```
```

## todo
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






### title
### title
### title
### title
### title
### title
### titlev
### title
### title
### 缺陷
- 压缩`.toString()`时有问题
- api有杂糅的情况。如platform+format
- tree shaking只作用于cjs规范。
- 还有正在开发的工作。如：代码分割。


### [rollup](/builder/rollup/index.html)
esbuild有些不足为什么还基于它做工作。（可能是因不致命，或可以在二开中解决。）
写一builder还是挺难的。

### title