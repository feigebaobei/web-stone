## white-space 处理空白文本的样式

<!-- prettier-ignore-start -->
| |      |        |          |
| --- | -- | ----- | ----- |
| normal 默认值 |      |        |          |
| pre   | 使用等宽字体处理文本 | 不合并空白文本 | 遇到边界时不换行。       |
| nowrap        |      | 合并空白文本   | 不换行   |
| pre-wrap      |      | 不合并空白文本 | 遇到边界时换行。         |
| pre-line      |      | 不保留空白文本 | 保持文本的换行。遇到边界时换行。 |
<!-- prettier-ignore-end -->

## overflow-wrap 处理到达边界时文本折行的样式

<!-- prettier-ignore-start -->
||||||
|-|-|-|-|-|
|normal 默认|在单词边界换行||||
|anywhere|防止溢出，在字母边界换行||||
|break-word|防止溢出，在字母边界换行||||
||||||
||||||
||||||
||||||

<!-- prettier-ignore-end -->

## word-break 处理自动换行的样式

|           |                              |     |     |     |     |
| --------- | ---------------------------- | --- | --- | --- | --- |
| normal    | 使用浏览器默认的换行规则     |     |     |     |     |
| break-all | 可在单词内换行               |     |     |     |     |
| keep-all  | 只能在半角空格或连字符处换行 |     |     |     |     |

## box-shadow 阴影

```
box-shadow: h-shadow v-shadow blur spread color inset;
```

|          |                              |     |     |     |
| -------- | ---------------------------- | --- | --- | --- |
| h-shadow | 水平阴影位置。可负值。必填。 |     |     |     |
| v-shadow | 垂直阴影位置。可负值。必填。 |     |     |     |
| blur     | 模糊值                       |     |     |     |
| spread   | 阴影大小                     |     |     |     |
| color    | 阴影的颜色                   |     |     |     |
| inset    | 有则是内阴影，否则为外阴影。 |     |     |     |
