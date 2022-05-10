# `pm2`

## overview
> 线程管理器

### feature
- xxx

## install
`npm i -g pm2`

## usage
```shell
pm2 start api.js
pm2 start "npm run start" # script
pm2 start "ls -la" # command
pm2 start app.py # binary
pm2 start api.js --attach # 检查日志
pm2 start api.js -- arg0 arg1 # 输入参数
NODE_ENV=production pm2 restart api.js --update-env # 更新环境变量
pm2 stop api.js
pm2 stop [process_id]
pm2 stop all
pm2 stop app0 app1 app2 # 重启多个应用
pm2 delete api.js
pm2 delet all
pm2 restart api.js # 重启指定应用
pm2 restart app0 app1 app2 # 重启多个应用
pm2 restart all # 重启所有应用
pm2 list # 列出所有应用
pm2 [list|ls|l|status] # 同pm2 list
pm2 list --sort name:desc
pm2 list --sort [name|ip|pid|memory|cpu|status|uptime][:asc|desc]
pm2 monit # 显示dashboard
pm2 show api # 显示应用metadata
pm2 reset all # 重置重启次数
```

## configuration
同时管理多个应用。可以使用明确的设置参数。
如：`ecosystom.config.js`
```js
module.exports = {
  apps : [{
    name   : "limit worker",
    script : "./worker.js",
    args   : "limit"
  },{
    name   : "rotate worker",
    script : "./worker.js",
    args   : "rotate"
  }]
}
```
使用配置文件
```shell
pm2 start ecosystom.config.js
```

|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`h3.fn(param, first: string, second: boolean = true) => void`
description

`h3.fn(param, [options: {a: string, b?: number}])`
description

## principle
暴露了若干方法，其中有`createApp()`。它定义了`stack/handle/use`。stack是一个数组，用于保存任务。use调用了一个私有方法，用于把让createApp的实例具有指定的任务。 handle用于依次执行已经添加的任务。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。