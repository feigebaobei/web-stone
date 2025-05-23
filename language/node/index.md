# index.md

## 内置模块

- [fs](/language/node/fs.html)
- [crypt](/language/node/crypt.html)
- [node-gyp](/language/node/nodeGyp.html)
- [process](/language/node/process.html)
- [title](/language/node/title.html)
- [title](/language/node/title.html)
- [title](/language/node/title.html)
- [title](/language/node/title.html)
- [title](/language/node/title.html)
- [title](/language/node/title.html)

# [window & node & npm & cli](/language/node/window%26node%26npm%26cli.html)

# 服务端生成图片

```js
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var data =
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
  '<foreignObject width="100%" height="100%">' +
  '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
  '<em>I</em> like ' +
  '<span style="color:white; text-shadow:0 0 2px blue;">' +
  'cheese</span>' +
  '<table><tr><td>1</td><td>2</td></tr></table>' +
  '</div>' +
  '</foreignObject>' +
  '</svg>'

var DOMURL = window.URL || window.webkitURL || window

var img = new Image()
var svg = new Blob([data], {
  type: 'image/svg+xml;charset=utf-8',
})
var url = DOMURL.createObjectURL(svg)

img.onload = function () {
  ctx.drawImage(img, 0, 0)
  DOMURL.revokeObjectURL(url)
}

img.src = url
```

# [node 16.19.0 & node 18.20.4](/language/node/compare16_18.html)

# [配置或参数](/language/node/configParams.html)
