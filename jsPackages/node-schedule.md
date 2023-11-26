# node-schedule

## overview

> 在 node.js 环境完成计划任务。只定义一次，可执行多次。
> 基于时间的时间表。
> node 6+

### feature

- feature0
- feature1
- feature2

## install

`npm i node-schedule`

## usage

```js
const schedule = require('node-schedule');

const job = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
// 每到42秒时触发
// */5 * * * *  每5min执行一次
// */5 * * * *

// 使用执行时的参数
let date = new Date(2012, 11, 21, 5, 5, 30, 0) // 一月：0， 十二月：11
let x = 'Tada'
let job = schedule.scheduleJob(date, function(y) {console.log(y)}.bind(null, x))
x = 'str'
// 会输出'Tada'

// 每周四、周五、周六、周日的17点0分执行。
let rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [0, new schedule.Range(4, 6)]

// 指定时区
let rule = new schedule.RecurrenceRule()
rule.hour = 0
rule.minute = 0
rule.tz = 'Etc/UTC'

// 使用明确字段
let job = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, () => {...})

// 开始时刻和结束时刻
let startTime = new Date(Date.now() + 5000)
let endTime = new Date(startTime.getTime() + 5000)
let job = schedule.scheduleJob({
    start: startTime,
    end: endTime,
    rule: '*/1 * * * * *',
}, function () {...})

// 优雅停止
schedule.gracefulShutdown() // 返回promise对象。
// 当执行完所有工作后结束
process.on('SIGINT', function() {
    schedule.gracefulShutdown()
    .then(() => process.exit(0))
})
```

### 时间表

```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

### 时间规则的属性

|           |      |            |     |
| --------- | ---- | ---------- | --- |
| second    | 0-59 |            |     |
| minute    | 0-59 |            |     |
| hour      | 0-23 |            |     |
| date      | 1-31 |            |     |
| month     | 0-11 |            |     |
| year      |      |            |     |
| dayOfWeek | 0-6  | 从周日开始 |     |
| tz        |      |            |     |

### job

|                      |      |     |     |
| -------------------- | ---- | --- | --- |
| job.cancel()         | 取消 |     |     |
| job.cancelNext()     | 取消 |     |     |
| job.reschedule()     | 取消 |     |     |
| job.nextInvocation() | 取消 |     |     |

## configuration

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api

`node-schedule.fn(param, first: string, second: boolean = true) => void`
description

`node-schedule.fn(param, [options: {a: string, b?: number}])`
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
