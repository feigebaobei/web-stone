# 复制

前端脚本复制。

## 推荐解决方案

```js
navigator.clipboard
  .writeText('str')
  .then(() => {
    clog('then')
  })
  .catch(() => {
    clog('catch')
  })
  .finally(() => {
    clog('finally')
  })
```

[Clipboard](/language/javascript/clipboard.html)
[ClipboardData]()
[DataTransfer]()

```
navigator.clipboard.writeText()
navigator.clipboard.readText()
navigator.clipboard.write()
navigator.clipboard.read()
event.clipboardData.setData(format, data)
event.clipboardData.getData(format)
event.clipboardData.clearData()
```

## 可选解决方案

- clipboard
  - [npm](https://www.npmjs.com/package/clipboard)
  - [官网](https://clipboardjs.com/)
- [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2)
- [useClipboard](https://vueuse.org/core/useClipboard/)
- [v-clipboard](https://www.npmjs.com/package/v-clipboard)

## 反对解决方案

- document.execCommand('copy') // 'cut' / 'paste'
  - 存在安全问题：可以修改浏览器设置、运行脚本，容易被恶意攻击。
  - 浏览器兼容问题：很多特性在不同浏览器操作不一致。
-
