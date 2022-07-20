# 为生产打包
与vue打包的常用工具： 
- webpack
- browserify
- rollup

## 如何打包
- 明确使用生产模式

### webpack
```js
// 看这写法就知道是为cjs写的。也就是为node使用。
module.exports = {
    mode: 'production'
}
```

### browserify

### rollup
```js
const replace = require('@rollup/plugin-replace')
rollup({
    // ...
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}).then(...)
```

### title
### title
### title
### title
### title
