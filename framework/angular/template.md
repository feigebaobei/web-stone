# 模板

即`@Component()`的 template 的内容/templateUrl 对应的文件内容。

```js
{{ var }}
[attr]="var"
bind-attr="var"
(eventName)="eventHandler"
on-eventName="eventHandler"
bindon-ngModel="var"
```

## empower

不能使用的标签` <html>``<body>``<base> `

## 篡写

`<p>{{$var}}</p>`
