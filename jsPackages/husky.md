# husky

## overview
> 让git hooks使用简单。  
> 常用于格式化代码等。  
> 有很多包在使用它开发。  

### feature
- feature0
- feature1
- feature2

## install
`npm i husky -D`
### 推荐手动
我会手动。知道它做了什么。运行自动都不知道它做了什么。
```shell
npm set-script test "echo hi" # 用于测试。
npm set-script prepare "husky install"



npm run prepare
# 会在根目录下生成 .husky/.gitignore .husky/husky.sh
npx husky add .husky/pre-commit "npm run test"

```

## usage
```shell
npm set-script prepare "husky install" # prepare在执行npm run install / npm publish / npm pack / 打包前执行。
npm run prepare # 会在根目录下生成 .husky/_/.gitignore .husky/_/husky.sh
npm set-script test "echo hi" # 用于测试。
npx husky add .husky/pre-commit "npm run test" # 创建 .husky/pre-commit文件。在该文件中调用测试的脚本
# 然后就可以在pre-commit hook上执行命令了。
git add .husky/pre-commit # 这里是shell脚本
git commit -m 'string'
# 输出： hi
```

## uninstall
```shell
npm uninstall husky && git config --unset core.hooksPath
yarn remove husky && git config --unset core.hooksPath
```

## action
### 在momorepo（一库多包）中使用husky时需要在根目录上安装。
子目录中无.git目录。  
husky是与git hooks一起工作，当然要与.git在一起呀。  
子目录都不是一个仓库。  
### 自定义安装目录
```shell
# 脚本
"prepare": "husky install .config/husky"
```

### bypass hooks 路过hooks
```shell
git commit -m 'string' --no-verify
# or
HUSKY=0 git push
```

### with npm
```
npm ci --omit=dev --ignore-scripts

#or
npm set-secript prepare ''
npm ci --omit=dev
```

### with a custom script
```
"prepare": "node ./file.js"
```
```js
// ./file.js
const isCi = process.env.CI !== undefined
if (!isCi) {
  require('husky').install()
}
```

### 只支持客户端git hooks

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
`husky.fn(param, first: string, second: boolean = true) => void`
description

`husky.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。