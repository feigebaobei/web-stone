# create-react-app

## overview
> 官方指定的创建react单页面应用的工具。
> 它是一个命令行工具，用于创建项目。

### feature
- feature0
- feature1
- feature2

## install
`npm i create-react-app -g`

## usage
```shell
npx create-react-app proj-name
npm init react-app proj-name # init是creat的别名
yarn create react-app proj-name

--template [template-name]

cd proj-name
npm run start # 启动本地服务
npm run test # 执行测试文件 
npm run build # 打包
npm run eject # 弹出内置打包配置，可以自定义打包配置。执行无法还原。

```

模板可在npm官网查询。  

## 文件结构
```
<root>
|-- src
    |-- index.js    // 入口文件
    |-- App.js      // 主组件
|-- public
    |-- index.html  // 模板文件

```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`create-react-app.fn(param, first: string, second: boolean = true) => void`
description

`create-react-app.fn(param, [options: {a: string, b?: number}])`
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