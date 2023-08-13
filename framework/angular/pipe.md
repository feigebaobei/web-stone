# 管道

```js

```

|     | 纯管道                   | 非纯管道                 |     |
| --- | ------------------------ | ------------------------ | --- |
|     | 当输入值发生纯变更时执行 | 组件的每个变更周期都执行 |     |
|     |                          | JsonPipe                 |     |
|     |                          | DatePipe                 |     |
|     |                          | UpperCasePipe            |     |
|     |                          | LowerCasePipe            |     |
|     |                          |                          |     |
|     | decimal / number pipe    |

currency pipe
precent pipe
slice pipe|||
|||||

## 纯管道

## 非纯管道

## 自定义 pipe

`ng g pipe Pipes/<pipeName>`
会在指定目录下生成 pipe 的模板文件。
会在`app.module.ts`中注册 pipe.

```html
<p>{{city | append}}</p>
```
