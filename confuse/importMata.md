# `import.mata`
访问特定上下文的元数据给js模块。

`import.meta`的原型是`null`  

## api
||||
|-|-|-|
|url|此模块的完整url.|注意是运行时的完整url,不是在源代码中目录结构的url.|
|resolve|将一个模块的标识符解析为相对当前模块的url||


## demo
```
new URL(
	import.meta.url // 当前模块的url。这时是字符串
) // 转换为URL对象。
.searchParams // 取出qs。这时是对象。
.get('key') // 取出指定key的值。
```

