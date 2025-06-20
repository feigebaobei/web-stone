# import.meta

> 它是 esm 语法。访问特定上下文的元数据给 js 模块。  
> `import.meta`的原型是`null`  
> 只能在 JavaScript 模块中可用  
> es 模块除了 import.meta 之外没有上下文变量。因此，要解析相对路径的文件，可以使用 import.meta.url。注意这个属性使用的是 URL 而非文件系统的路径。  
> 由宿主环境提供以下属性
>
> > url
> > resolve

## api

|         |                                                                                               |     |     |     |
| ------- | --------------------------------------------------------------------------------------------- | --- | --- | --- |
| url     | 返回此模块的完整 url。注意是运行时的完整 url,不是在源代码中目录结构的 url.（包括 qs、碎片等） |     |     |     |
| resolve | 将一个模块的标识符解析为相对当前模块的 url                                                    |     |     |     |

## demo

```
<script type="module">
  import "./index.mjs?someURLInfo=5";
</script>

// index.mjs
new URL(import.meta.url).searchParams.get("someURLInfo"); // 5
```

## esm&cjs

| esm         | cjs         |     |     |
| ----------- | ----------- | --- | --- |
| import.meta | \_\_dirname |     |     |
|             |             |     |     |
