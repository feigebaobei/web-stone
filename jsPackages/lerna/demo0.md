# overview
lerna是一个“一库多包”的管理工具。
一库多包：在一个仓库中包括了多个代码包。
这样做可以解决若干相关包的关联/共享功能。还可以跟踪版本。

# demo
## overview
创建一个可以输出文本的包。

## init
```
mkdir lerna-demo1
cd lerna-demo1
lerna init // 需要已经全局安装lerna
// or
// npm init -y && npm i lerna && npx lerna init
```

## create
添加一个lerna管理的包(calc)。
```
lerna create calc
lerna create pointer
```
运行结果如图
![]()

## edit
编辑`calc/lib/calc.js`为如下代码：
```
'use strict';

module.exports = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
}
```

编辑`pointer/lib/calc.js`为如下代码：
```
'use strict';

let calc = require('calc')
module.exports = {
	construct: (x, y) => {
		return {x, y}
	},
	distance: (p0, p1) => {
		let x = calc.subtract(p0.x, p1.x)
		let y = calc.subtract(p0.y, p1.y)
		return Math.sqrt(calc.multiple(x, x), calc.multiple(y, y))
	},
}
```

## add
在`clac`包中添加`lodash`依赖包。
```
leran add lodash --scope=calc   // 只在calc包中安装lodash。在calc中就可以使用lodash了。
lerna add calc                  // 在所有适合的包安装calc.i该示例中只有pointer是适合的包。因calc不能依赖自己，所以它不是适合的包。
```

## bootstrap
为了展示该命令的使用方法，再创建一个lerna管理的包（line）.
```
lerna create line
```
编辑`./packages/line/package.json`
```
...
"dependencies": {
	"pointer": "^0.0.0"
}
```
然后执行
`lerna boostrap`
结果如图
![]()

## publish
请执行`npm login`登录npm.
再执行
```
lerna publish from-package
```
然后会报错。
```
lerna ERR! E403 You do not have permission to publish "calc". Are you logged in as the correct user?
```
原因是当前开发的包名与已发布的包名重复了。（想一个好包名太难。）请读者把三个包中的名改为不重复的包名。再执行`lerna publish from-package`。
然后就发布成功了。

## 后记
请删除因运行本示例产生的包。
`npm unpublish <packagename> --force`.

## lerna add & bootstrap
|lerna add|lerna bootstrap|
|-|-|
|把依赖项（本地来源或远端来源）添加到`package.json`中。默认会执行`lerna bootstrap`|根据`package.json`安装依赖。|