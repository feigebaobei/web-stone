# description
- css 预处理工具

# quick start
## 服务端使用
### cli用法
```
npm i -g less
lessc styles.less styles.css
```

### package用法
```
npm i -g less
let less = require('less')
less.render('.class {width: (1+1)}', function (e, output) {
    console.log(output.c)
})
```

## 浏览器端使用
建议只在开发环境使用。
- 先引入`xx.less`再引入`<script src="less.js"></script>`
- 可为`<script>`标签设置配置选项

# [使用方法](http://lesscss.cn/usage/index.html)

# principle
# plugin
# title
# title
# title