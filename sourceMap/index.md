## overview
source map可以让编译、压缩后的客户端代码可读。
source map记录了源代码的位置信息。它可以让你很快找到压缩后指定位置的代码对应源代码中的位置。
chrome/ff 23+已经支持解析source map了。
在这个网站：https://ryanseddon.com/demo/source_mapping/ 右击代码后选择`get original location`会得到指定位置对应源代码中的位置信息。

## 为什么我会关心source map
js的未来是光明的。可能使用很简单的语言转换为js:
- coffeescript
- es6
- sass/less
- pretty
ff已经支持coffeescript了。
google web toolkit (gwt)
`traceur`可以把es6+的代码转换为es3。

## 术语说明
|||||
|-|-|-|-|
|generated code|由编译器生成的代码|||
|original source|在编译器处理前的代码|||
|base 64 VLQ|用base64表示的vlq.它最多有6位。（最低位是第一位）最高位是延续位。最低位是符号位。。注意：base64 vlq可表示32bit内的数量。直到出现更大的值。|||
|source mapping url|从generated code中引用source map的地址。|||

## source map 如何工作
在压缩的文件后添加一行：`//# sourceMappingURL=/path/to/file.js.map`。就可以在浏览器中当未压缩的文件使用。
设置`X-SourceMap: /path/to/file.js.map`可以不显示注释。

## source map的格式
```
{
    version: 3                                // source map的版本.
    file: 'out.js'                            // 转换后的文件名
    sourceRoot: ''                            // 转换前的文件所在目录。若转换前的文件在同一目录，则该项为''
    sources: ['foo.js', 'bar.js']              // 转换前的文件。mappings中会用到此字段。
    names: ["src", "maps", "are", "fun"]       // 转换前的所有变量名和属性名。mappings中会用到此字段。
    mappings: ''                               // 使用base64 VLQ值映射。记录位置信息的字符串。
}
```

## 如何生成source map
需要使用“闭包编译器”。再执行如下命令：
```
java -jar compiler.jar \ 
     --js script.js \
     --create_source_map ./script-min.js.map \
     --source_map_format=V3 \
     --js_output_file script-min.js
```

### mappings属性
分为三层:
`<>,<>;<>`
每个分号表示转换后的一行。
每个逗号对应转换后的源码的一个位置．
以vlq编码表示转换前的位置．
`<转换后代码的列号><sources属性中的文件下标><源码的行号><源码的列号><names属性的哪个变量>`


## Base64 VLQ使source map变小
vlq(variable length quantity)
最初为了做详细的映射，生成代码是源代码的10倍大。v2时减少了50%，v3又减少50%。
```
        A  A  g  B  C
        |  |  |  |  |
        |  |  |  |  |
        V  V  V  V  V
        0  0  32 1  2
        // 使用base64 码值对应。
```
mappings字段会很大。该字段的解析：
- 使用;表示行。
- 使用,表示本行片段。
- 每个片段的长度分为1、4、5，或更长。
每个片段都基于前一个片段。
解析mappings字段：
- 生成列
- 在原文件在sources数组中出现的位置
- 原文件中的行号
- 原文件中的列号
- 原文件中的变量名在names中出现的位置。若没有，则不显示。
上图中g是延续位。它会在base64 vlq解码是进行进一步优化。此位可储存一个大数字。（用base64表示的一个大数字，灵感来源于midi format）。
上面的图表AAgBC一旦进一步处理将返回0,0,32,16,1 - 32是延续位，帮助构建下面的值16。在Base64中纯解码的B是1。所以重要的值是0,0,16,1。这让我们知道生成文件的第1行(用分号计数)的第0列映射到文件0(文件0的数组是foo.js)，第16行第1列。
参考source map包（mozilla开发的）去解析片段。
vlq的底层也是使用base64.

## principle
1. 使用转换工具把源码转换
2. 在轮换后的文件的最后一行添加`//@ sourceMappingURL=${sourceMap文件的位置}`
3. 浏览器根据sourceMap的信息到对应源码。
