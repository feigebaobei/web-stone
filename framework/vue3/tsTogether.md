# vue3 与 ts 结合使用

react 都使用 flow 做类型检测了。vue 不再搞出点类型检查都不像他风格了。  
又不想和 react 使用一样的。就选了 ts。  
与 ts 结合起来一起使用好像高大上一样。

## ts 配置文件（tsconfig.json）

## webpack 配置

```js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}
```

## [创建项目](/framework/vue3/demo/createVueApp.html)
