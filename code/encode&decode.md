# encodeURI

不转义的字符`;,/?:@&=+$-_.!~*'()#`（httpurl 的预留符号）
encodeURI()通常用于转码整个 URL，

# decodeURI

# encodeURIComponent

不转义的字符`A-Za-z0-9-_.!~*'()`
encodeURIComponent()通常只用于转码 URL 组成部分，如 URL 中?后的一串；

# decodeURIComponent

```js
encodeURI(str)
decodeURI(str)
encodeURIComponent(str)
decodeURIComponent(str)
```
