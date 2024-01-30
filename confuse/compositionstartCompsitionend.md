# compositionstart & compsitionend

|          |     | compositionstart | compsitionend  |     |     |
| -------- | --- | ---------------- | -------------- | --- | --- |
| 触发时机 |     | 开始输入拼音时   | 输入拼音结束时 |     |     |
|          |     |                  |                |     |     |
|          |     |                  |                |     |     |

时间顺序
onCompositionStart -> onInput -> onCompositionEnd

常用于输入中文过程中时防止 input，输入完中文时触发 input

## dome

```js
let compositioning = false
let compositionStartH = () => {
  compositioning = true
}
let compositionEndH = () => {
  compositioning = false
}
let inputH = (...rest) => {
  if (!compositioning) {
    fn(...rest)
  }
}
```
