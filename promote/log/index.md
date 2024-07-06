# 日志

## 分类

- 错误
- 性能
- 用户行为
- 业务
- 诊断

## 收集方式

- console
- window.onerror / window.onunhandledrejection
- performance api
- 用户行为跟踪工具。mixpanel 等。
- service worker

## 数据模型

```
{
    timestamp
    traceId / spanId / traceFlags
    severityText / severityLevel
    name
    body: string | object
    resource / attributes

}
```
