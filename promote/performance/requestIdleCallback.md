# requestIdleCallback

尽量在不影响延迟关键操作（如主事件循环）。一般会按先进先调用的顺序执行，但是至少在超时前执行（这时会打乱执行顺序）。

```
window.requestIdleCallback(cb, options)
```

## api

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
|     |     |     |     |     |
|     |     |     |     |     |

# IdleDeadline

window.requestIdleCallback 的 cb 方法的参数。

## api

|                 |                                    |     |     |     |
| --------------- | ---------------------------------- | --- | --- | --- |
| 属性            |                                    |     |     |     |
| didTimeout      | 是否因超时而执行                   |     |     |     |
| 方法            |                                    |     |     |     |
| timeRemaining() | 返回预估的当前闲置周期的剩余毫秒数 |     |     |     |
