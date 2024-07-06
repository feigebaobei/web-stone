# 可观测性

## 实现方式

- 监控
- apm 应用性能管理
- 可观测度

## 可观测性的三大支柱

- 日志
- 指标
- 追踪

三者结合可得到全面的系统视图。

### 结合方式

- 关联 id。整个过程中使用同一个 id。
- 上下文信息。使用相同的用户 id/请求 url/服务名等。
- 联合查询。
- 链接。
- 可视化

## 前端可观测性的挑战

- 数据采集的复杂性。需要处理跨域请求、安全策略、设备、网络环境等。
- 用户隐私和数据保护。
- 性能影响。
- 数据分析和可视化
- 分布式追踪
- 实时监控和报警。

## 前端可观测性的重要性

- 系统透明度
- 故障检测和排查
- 性能优化。针对特定点优化。
- 业务决策支持
- 持续改进

## 前端性能指标

|              |                                       |                                            |                                                |                                       |     |     |
| ------------ | ------------------------------------- | ------------------------------------------ | ---------------------------------------------- | ------------------------------------- | --- | --- |
| fcp          | first contentful paint 首次内容绘制   | 从页面开始到绘制在屏幕上。                 | performance.getEntriesByType('paint') fp / fcp | performance.timing 可获取各阶段的时间 |     |     |
| fmp          | first meaningful paint 首次有效绘制   | 从页面开始加载主要内容到绘制完主要内容     |                                                |                                       |     |     |
| fid          | first input delay 首次输入延迟        | 用户首次与页面互动与浏览器响应该互动的时间 | performance.getEntriesByType('event')          |                                       |     |     |
| lcp          | largest contentful paint 最大内容绘制 | 从页面开始到加载完最大的可见元素的时间     |                                                |                                       |     |     |
| cls          | cumulative layout shift 累积布局偏移  | 页面中可见元素的位置变化的总和。           | performance.getEntriesByType('layout-shift')   |                                       |     |     |
| js 执行时间  |                                       |                                            |                                                |                                       |     |     |
| 网络请求时间 | 从发出请求到收到回馈的时间            | navigation timing api                      |                                                |                                       |     |     |
| 内存使用     |                                       |                                            |                                                |                                       |     |     |

## 如何收集性能指标

- performance
- event timing
- layout instability api

## 划分 trace / span

- 页面加载
- 用户操作
- 单页面应用的路由切换

## 相关 api

- [IntersectionObserverEntry](/promote/observe/intersectionObserver.html)
- [MutationObserver](/promote/observe/mutationObserver.html)
