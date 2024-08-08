# import.meta

> 它是 esm 语法。
> 由宿主环境提供以下属性
>
> > url
> > resolve

## api

|         |                                           |     |     |     |
| ------- | ----------------------------------------- | --- | --- | --- |
| url     | 返回此模块的完整 url。（包括 qs、碎片等） |     |     |     |
| resolve | 将一个模块的标识符解析为当前模块的 url    |     |     |     |

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
