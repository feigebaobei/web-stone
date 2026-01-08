# performance

> 没有继承对象。
> window.performance 访问主窗口中运行代码的性能信息。
> WorkerGlobalScope.performance 访问 worker 中运行代码的性能信息。
> 可用于获取当前页面中性能相关信息

## api

```js
// 属性
Performance.navigation
PerformanceNavigation 对象提供了在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等等。Not available in workers.

Performance.timing
PerformanceTiming 对象包含延迟相关的性能信息。Not available in workers.

Performance.memory
其是 Chrome 添加的一个非标准扩展，这个属性提供了一个可以获取到基本内存使用情况的对象。不应该使用这个非标准的 API。

Performance.timeOrigin
返回性能测量开始时的时间的高精度时间戳。

// 方法
Performance.mark(name: string， markOptions?: PerformanceMarkOptions)
根据给出 name 值，在浏览器的性能输入缓冲区中创建一个相关的timestamp
Performance.clearMarks(name:?: string)
将给定的 mark 从浏览器的性能输入缓冲区中移除。

Performance.getEntries() => PerformanceEntry[]

Performance.getEntriesByName(name: S, type?) => PerformanceEntry[]

Performance.clearMeasures(name?: string)
将给定的 measure 从浏览器的性能输入缓冲区中移除。

Performance.clearResourceTimings()
从浏览器的性能数据缓冲区中移除所有 entryType 是 "resource" 的 performance entries

Performance.getEntriesByType()
Performance.measure()
Performance.now()
返回一个表示从性能测量时刻开始经过的毫秒数 DOMHighResTimeStamp

Performance.setResourceTimingBufferSize()
Performance.toJSON()
其是一个 JSON 格式转化器，返回 Performance 对象的 JSON 对象

// 事件
Performance.onresourcetimingbufferfull = cb
当浏览器的资源时间性能缓冲区已满时触发。
```

## PerformanceEntry

PerformanceEntry: {
name: string,
entryType: string,
startTime: number,
duration: number,
}
