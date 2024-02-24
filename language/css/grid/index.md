# grid 布局

## overview

> 二维布局
> google 在 flex 布局出现后，开发了该布局方式。
> 现在浏览器已经支持此布局方式
> 适用于大规模布局
> 由“网格容器”“网格项”共同完成。
> 网格单元是最小单位。
> 网格区域都是矩形的。非矩形不成立。

## demo

[demo0](/css/grid/demo0.html)

## 名词说明

<!-- prettier-ignore-start -->
|      |     |          |     |     |
| ----- | --- | --------- | --- | --- |
| 网格容器           |     | 被指定`display:grid`或`display: inline-grid`的元素 |     |     |
| 网格项             |     | 网格容器内的 dom 元素  |     |     |
| 网格线             |     |          |     |     |
| 网格轨道（网格行） |     | 成行或成列的网格单元格 |     |     |
| 网格单元格         |     | 被网格线分开的区域     |     |     |
| 网格区域           |     | 由单元格组成的区域     |     |     |
| 网格模板           |     | 网格单元格的模板       |     |     |
|      | fr  | **剩余空间**的单位     | 意为片段    |     |
<!-- prettier-ignore-end -->

## api

### 网格容器的样式属性

<!-- prettier-ignore-start -->
|属性|属性值|说明|值||||
|-|-|-|-|-|-|-|
|display|grid||||||
|       |inline-grid||||||
|       |subgrid||||||
|grid-template-columns|每列列宽|repeat(n, value)简单重复value n次|||||
|                     |       |auto-fill 自动填充|||||
|                     |       |minmax() 在这个范围内|||||
|                     |       |auto 自动|||||
|                     |       |none|||||
|                     |       |[linename]|||||
|                     |       |length|||||
|                     |       |percentage|||||
|                     |       |flex 按fr系数弹性|||||
|                     |       |max-content 用网格项的最大内容来占据宽度|css的计算过程：先占满再计算宽度。||||
|                     |       |min-content 用网格项的最小内容来占据宽度|||||
|                     |       |fit-content([length|percentage]) 等价于minmax(auto, max-content)|||||
|                     |       |masonry|不会||||
|                     |       |subgrid|||||
|grid-template-rows   |每列行高|同grid-template-columns|||||
|row-gap   |行间距,旧写法是grid-row-gap|normal / length / percentage|||||
|column-gap|列间距,旧写法是grid-column-gap|normal / length / percentage|||||
|grid-gap|grid-row-gap + grid-column-gap||||||
|grid-template-areas|定义区域||||||
|grid-auto-flow|子元素顺序|row|先行后列||||
|||column|先列后行||||
|||row dense|先行后列,尽量填满空格||||
|||column dense|先列后行,尽量填满空格||||
|justify-items|设置元素的水平位置|start|对齐单元格的起始边缘||||
|||end|对齐单元格的结束边缘||||
|||center|居中||||
|||stretch|拉伸（占满）||||
|align-items||start|||||
|||end|||||
|||center|||||
|||stretch|||||
|place-items|align-item + justify-items||||||
|justify-content|start||||||
||end||||||
||center||||||
||stretch||||||
||space-around||||||
||space-between||||||
||space-evently||||||
|align-content|start||||||
||end||||||
||center||||||
||stretch||||||
||space-around||||||
||space-between||||||
||space-evently||||||
|place-content|align-content + justify-content||||||
||||||||
||||||||
||||||||
||||||||
||||||||
||||||||
||||||||
<!-- prettier-ignore-end -->

定义网格容器：`display: grid`/`display: inline-grid`

#### column-gap

列间隔
normal / length / percentage

#### grid-template-columns

网格容器的列宽度
可以混合使用不同单位。
可以指定重复次数，如：`repeat(3, 1fr)`，等价于`1fr 1fr 1fr`。
none / [linename] / length / percentage / flex / max-content / min-content / minmax(min, max) / auto / fit-content([length|percentage]) / repeat(...) / masonry / subgrid

#### grid-template-rows

网格容器的行高度
none / [linename] / length / percentage / flex / max-content / min-content / minmax(min, max) (这是一个函数) / auto / fit-content([length|percentage]) / repeat(...) / masonry / subgrid

#### grid-template-areas

指定网格区域并定义它们的名字。
必须使网格区域成为矩形。
它果`grid-row-start / grid-row-end / grid`
none / string

```css
.cn {
  grid-template-area:
    'a a a'
    'b b b'
    'c c c';
}
```

#### grid-template

它是`grid-template-areas / grid-template-columns / grid-template-rows`的缩写。

#### grid-auto-columns

隐式设置网格列的宽度
length / percentage / flex / max-content / min-content / minmax(min, max) / fit-content(arg) 由最大内容的体积决定列的宽度 / auto

#### grid-auto-rows

隐式设置网格行的高度
length / percentage / flex/ max-content / min-content / minmax(min, max) / auto

#### grid-auto-flow

设置元素如何排列。
row / column / dense

#### grid

它是`grid-template-rows / grid-template-columns / grid-template-areas / grid-auto-rows / grid-auto-columns / grid-auto-flow / grid-column-gap / grid-row-gap`的缩写。

#### grid-gap(gap)

它是`row-gap / column-gap`的缩写。
length / percentage

```css
.cn {
  gap: 16% 100%;
}
```

#### row-gap(grid-row-gap)

行间隔
length / percentage
间隔不能使用使用 fr

#### column-gap(grid-column-gap)

列间隔
length / percentage

### 网格单元的样式属性

<!-- prettier-ignore-start -->
||||||||
|-|-|-|-|-|-|-|
|grid-column-start|左边框所在的垂直网格线||||||
|grid-column-end|右边框所在的垂直网格线||||||
|grid-row-start|上边框所在的水平网格线||||||
|grid-row-end|下边框所在的水平网格线||||||
|grid-culumn|grid-column-start + grid-column-end||||||
|grid-row|grid-row-start + grid-row-end||||||
|grid-area|在的区域||||||
|justify-self|start||||||
||end||||||
||center||||||
||stretch||||||
|align-self|start||||||
||end||||||
||center||||||
||stretch||||||
||||||||
||||||||
||||||||
||||||||
||||||||
<!-- prettier-ignore-end -->

#### 操作属性值

```
repeat(3, 1fr)
把1fr重复3次。
1fr 1fr 1fr

minmax(100px, auto)
设计最小值、最大值。
```

#### grid-area

它是`grid-row-strart / grid-column-start / grid-row-end / grid-column-end`的缩写。
auto / custom-ident / integer && custom-ident? / span && integer||custom-ident

```css
.cn {
  grid-area: auto / span 3;
}
```

#### grid-row

它是`grid-row-start / grid-row-end`的缩写

```css
.cn {
  grid-row: 1 / 3;
}
```

#### grid-row-start

该网格单元的开始列。
auto / custom-ident / integer && custom-ident? / span && integer||custom-ident

#### grid-row-end

该网格单元的结束行
auto / integer && custom-ident? / span && integer||custom-ident

#### grid-column

它是`grid-column-start / grid-column-end`的缩写

```css
.cn {
  grid-column: 1 / span 3;
}
```

#### grid-column-start

该网格单元的开始列
|||||
|-|-|-|-|
|auto||||
|integer && custom-ident?||||
|span && integer|跨跃多少个|||
|custom-ident||||
|||||

#### grid-column-end

该网格单元的结束列
不包括它。

|                          |            |     |     |
| ------------------------ | ---------- | --- | --- |
| auto                     |            |     |     |
| integer && custom-ident? |            |     |     |
| span && integer          | 跨跃多少个 |     |     |
| custom-ident             |            |     |     |
|                          |            |     |     |
