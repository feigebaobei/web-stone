# operators

| 分类                                 | 方法                                                       |                                                                                   |                                           |     |     |
| ------------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------- | --- | --- |
| creation operators                   |                                                            |                                                                                   |                                           |     |     |
|                                      | ajax                                                       | 使用 url/请求体请求                                                               |                                           |     |     |
|                                      | defer(observableFactory)                                   | 等待参数方法返回 Observable 对象                                                  |                                           |     |     |
|                                      | from(input: ObservableInput<T>, scheduler: SchecdulerLike) | 根据数组、类数组、promise/iterable/类 Observable 对象生成一个新的 observable 对象 |                                           |     |     |
|                                      | of                                                         | 转化参数为 Observable，然后依次触发。                                             |                                           |     |     |
|                                      | interval                                                   | period: N = 0, schduler: SchedulerLike = asyncScheduler                           | 每隔指定时长触发一次值。从 0 开始累加 1。 |     |     |
|                                      | range                                                      | 指定范围内的整数依次触发                                                          |                                           |     |     |
|                                      | iif(() => B, trueResult, falseResult)                      | 当 cb 返回 true 时返回 trueResult,反之返回 falseResult                            |                                           |     |     |
| join cration operators               |                                                            |                                                                                   |                                           |     |     |
|                                      | concat                                                     | 依次触发全部参数                                                                  |                                           |     |     |
|                                      | merge                                                      | 把多个 observable 合并后依次触发                                                  |                                           |     |     |
|                                      | race                                                       | 返回第一个开始触发的 observable                                                   |                                           |     |     |
|                                      | zip                                                        | 溶合多个 observable 的值。返回可观察的二维数组                                    |                                           |     |     |
| transformation operators             |                                                            |                                                                                   |                                           |     |     |
|                                      | butter(obs$)                                               | 缓存指定 observable 触发前已经触发的值                                            |                                           |     |     |
|                                      | expand                                                     |                                                                                   |                                           |     |     |
|                                      | map                                                        | 依次触发每一个值                                                                  |                                           |     |     |
|                                      | scan                                                       | 依次迭代每一个值成为一个值                                                        |                                           |     |     |
| filtering operators                  |                                                            |                                                                                   |                                           |     |     |
|                                      | audit                                                      | 触发满足条件期间的最后一个值                                                      |                                           |     |     |
|                                      | debounce                                                   | 触发指定时长内最后一次值                                                          |                                           |     |     |
|                                      | distinct                                                   | 触发去重后的值                                                                    |                                           |     |     |
|                                      | filter                                                     |                                                                                   |                                           |     |     |
|                                      | first                                                      |                                                                                   |                                           |     |     |
|                                      | last                                                       |                                                                                   |                                           |     |     |
|                                      | skip                                                       | 触发跳过前几个后的值                                                              |                                           |     |     |
|                                      | take                                                       | 取出前几个。与 skip 互为差运算。                                                  |                                           |     |     |
|                                      | throttle                                                   | 触发指定时间内的第一个值                                                          |                                           |     |     |
| join operators                       |                                                            |                                                                                   |                                           |     |     |
|                                      | concatAll                                                  | 压平高阶 observable，并依次触发                                                   |                                           |     |     |
|                                      | mergeAll                                                   | 有序压平后依次触发                                                                |                                           |     |     |
| multicasting operators               |                                                            |                                                                                   |                                           |     |     |
|                                      | share                                                      |                                                                                   |                                           |     |     |
| error handling operators             |                                                            |                                                                                   |                                           |     |     |
|                                      | retry                                                      |                                                                                   |                                           |     |     |
|                                      | catchError                                                 |                                                                                   |                                           |     |     |
| utility operators                    |                                                            |                                                                                   |                                           |     |     |
|                                      | tap                                                        |                                                                                   |                                           |     |     |
|                                      | delay                                                      |                                                                                   |                                           |     |     |
|                                      | timestamp                                                  |                                                                                   |                                           |     |     |
|                                      | timeout                                                    |                                                                                   |                                           |     |     |
|                                      | toArray                                                    |                                                                                   |                                           |     |     |
| conditional and boolean operators    |                                                            |                                                                                   |                                           |     |     |
|                                      | every                                                      |                                                                                   |                                           |     |     |
|                                      | find                                                       |                                                                                   |                                           |     |     |
|                                      | findIndex                                                  |                                                                                   |                                           |     |     |
|                                      | isEmpty                                                    |                                                                                   |                                           |     |     |
| mathematical and aggregate operators |                                                            |                                                                                   |                                           |     |     |
|                                      | count                                                      |                                                                                   |                                           |     |     |
|                                      | max                                                        |                                                                                   |                                           |     |     |
|                                      | min                                                        |                                                                                   |                                           |     |     |
|                                      | reduce                                                     |                                                                                   |                                           |     |     |

```js
import {
    ajax
} from 'rxjs/ajax'
let obs$ = ajax('url').pipe(
    map((userRes) => clog(userRes)),
    catchError(error => { // 当有错误时执行。返回Observable对象
        clog('error', error)
        return of(error)
    })
)
ajax.getJSON(url)
ajax({
    url,
    method: 'POST',
    headers: {
        ...
    },
    body: {
        k: v
    }
})
defer(() => {
    return Math.random() > 0.5 ? fromEvent(document, 'click'):
    interval(1000)
})
from([1,2,3])
of(1,2,3,4)
range(1, 10)
interval(1000)
iif(() => b, of('first'), of('second'))
b = true

let timer1 = interval(1000).pipe(take(10))
let timer2 = interval(2000).pipe(take(6))
let timer3 = interval(500).pipe(take(10))
concat(timer1, timer2, timer3)

let clicks = fromEvent(document, 'click')
let timer = interval(1000)
merge(clicks, timer)
race(obs1, obs2, obs3)
zip(age$, name$, isDev$) // [[age, name, isDev], ...]

interval(1000).pipe(buffer(fromEvent(document, 'click')))
fromEvent(document, 'click').pipe(
    scan(i => ++i, 1),
    debounce(i => interval(200 * i))
)
fromEvent(document, 'click').pipe(audit(ev => interval(1000)))
of(1,2,3,4,5,6,1,2,3,3,4,5).pipe(
    distinct()
)
source$.pipe(skip(12)) // 跳过前12个
source$.pipe(take(2)) // 触发前2个
source$.pipe(throttle(() => {interval(1000)}))






```
