# Clipboard

> 提供响应剪贴板命令  
> 用来取代 document.execCommand()

```
navigator.clipboard.writeText('str')
navigator.clipboard.readText().then((str) => {
    clog('then', str)
})
```

## api

|                                    |     |     |
| ---------------------------------- | --- | --- |
| `read() => Promise<ClipboardItem>` |     |     |
| `readText() => Promise<DOMString>` |     |     |
| `write() => Promise`               |     |     |
| `writeText() => Promise`           |     |     |
