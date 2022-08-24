# overview
该包是rollup的插件的工具包。
本列出一些`@rollup/plugin-untils`的一些方法说明。

## dataToEsm
把data转换为esm代码。
```
(data: unknown, options: DataToEsmOptions) => string
DataToEsmOptions: {
    compact?: boolean;
    indent?: string;
    namedExports?: boolean;
    objectShorthand?: boolean;
    perfectConst?: boolean;
}
```

## createFilter
根据参数创建并返回一过滤器。
```
(
    include?: FilterPattern,
    exclude?: FilterPattern,
    options?: { resolve?: string | false | null}
) => (id: string | unknown) => boolean
FilterPattern: ReadonlyArray<string | RegExp> | string | RegExp | null
```

# json
