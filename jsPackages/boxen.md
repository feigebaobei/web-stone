# boxen

## overview

> 在终端中使用盒子

### feature

- feature0
- feature1
- feature2

## install

`npm i boxen`

## usage

```js
import boxen from 'boxen'
let clog = console.log
clog(boxen('unicorn', { padding: 1 }))
/*
┌─────────────┐
│             │
│   unicorn   │
│             │
└─────────────┘
*/
clog(boxen('unicorn', { padding: 1, margin: 1, borderStyle: 'double' }))
/*

   ╔═════════════╗
   ║             ║
   ║   unicorn   ║
   ║             ║
   ╚═════════════╝

*/

clog(
  boxen('unicorns love rainbows', {
    title: 'magical',
    titleAlignment: 'center',
  })
)
/*
┌────── magical ───────┐
│unicorns love rainbows│
└──────────────────────┘
*/
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

```
boxen(text, options)
```

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|boxen|text||盒子里的文本|string||||||
||options||如何处理盒子|||||||
|||borderColor|盒子的颜色|string||`'black','red','green','yellow','blue','magenta','cyan','white','gray',色值如'#ff00bb'`||||
||borderStyle|盒子边框的样式|string/object|`'single','double','round'圆角单边,'bold','singleDouble'上下单边，左右双边,'doubleSingle','classic','arrow','none',{topLeft: '+',topRight: '+',bottomLeft: '+',bottomRight: '+',top: '-',bottom: '-',left: '|',right: '|'}`||||||
||dimBorder|设置不透明度|boolean|false||||||
||title|在盒子上显示的标题|string|||||||
||titleAlignment|在盒子的显示标题的位置|'left'|`'left','center','right'`||||||
||width|盒子的宽度|number|||||||
||height|盒子的高度|number|||||||
||fullscreen|全屏|`boolean|(w: N, h: N) => [w: N, h: N]`|||||||
||padding|内边距|number / object|0|||`{top: 5, right: 4, bottom: 3, left: 2,}`|||
||margin|外边距|numer / object|0|||`{top: 5, right: 4, bottom: 3, left: 2,}`|||
||float|浮动的位置|string|'left'|`'right','center','left'`|||||
||backgroundColor||string||`'black','red','green','yellow','blue','magenta','cyan','white','gray',色值如'#ff00bb'`|||||
||textAlignment|文本在盒子的位置|string|'left'|`'left','center','right'`|||||
<!-- prettier-ignore-end -->

`boxen.fn(param, first: string, second: boolean = true) => void`
description

`boxen.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
