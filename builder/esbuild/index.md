# `esbuild`

## overview
> 我们目前的web构建工具的速度比他们可以做到的慢10-100倍。esbuild捆绑包项目的主要目标是带来构建工具性能的新时代，并在此过程中创建一个易于使用的现代捆绑包。  
> 
> 它处理ts -> js的速度是tsc的20-30倍
> 当使用api方式时，esbuild的可执行文件在child process中运行。
> plugin只支持异步api
> 主要使用go/js/ts编写。

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
|option|可用于哪个api|说明|默认值|枚举值|||
|-|-|-|-|-|-|-|
||||||||



## plugin
## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。