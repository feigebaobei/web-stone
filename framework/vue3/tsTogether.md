# vue3与ts结合使用
react都使用flow做类型检测了。vue不再搞出点类型检查都不像他风格了。  
又不想和react使用一样的。就选了ts。  
与ts结合起来一起使用好像高大上一样。  

## ts配置文件（tsconfig.json）

## webpack配置
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

## [创建项目](/framework/vue3/demo.html)
## title
## title
## title
## title

