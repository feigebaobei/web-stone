# 使用插件
```
npm i <snowpack-plugin-name>
```
`snowpack.config.mjs`
``` js
export default {
    // plugins: ['snowpack-plugin-name']
    plugins: [
        'snowpack-plugin-name', {
            optionA: 'valueA',
            optionB: 'valueB'
        }
    ]
}
```

# 开发插件
``` js
module.exports = function (snowpackConfig, pluginOptions) {
    // ...
    return {
        name: 'my-snowpack-plugin',
        load({filepath, isSSR}) {},// 引用源文件
        resolve: {
            input: [extendName], // eg: ['.js']
            output: [extendName2], // eg: ['.js']
        }, //
        transform(id, contents, isDev, fileExt) {}, // 转换源文件
        run() {}, // 内部可调用cli
        optimize({buildDirectory}) { }, // 负责打包时优化的工作
    }
}
```

## 各方法的参数是什么？输出是什么？