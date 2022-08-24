# overview
全名
@rollup/plugin-json
json => esm

# install
`npm i @rollup/plugin-json`

# usage
```
// rollup.config.js
import json from '@rollup/plugin-json'
export default {
    input: 'src/index.js',
    output: {
        dir: '/dist',
        format: 'esm',
    },
    plugins: [json()]
}
```
```
// src/index.js
import pkg from './package.json'
console.log(`string ${pkg.version}`)
```

# options
||description|type|default|demo||
|-|-|-|-|-|-|
|compact|是否忽略indent。|boolean|false|{compact: true}||
|exclude||||||
|include||||||
|indent||||||
|namedExports|为json对象设置name||||不会用|
|perferConst||||||

# principle
其内部很简单。
```
module.export = function (options) {
    return {
        name: 'json',
        transform: (data, id) => {code, map}
        // 使用console.log看到：
            // data: 与原文件相同。
            // id:   文件的目录。
            // 每个文件都会执行该方法。
    }
}
```
