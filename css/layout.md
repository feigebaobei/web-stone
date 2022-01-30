# 布局
常见的布局类型：
- 正常布局流 使用默认样式
- display  使用指定的默认样式
- flex 弹性布局 线性布局 一维布局
- grid         网格布局 二维布局
- 浮动布局
- 定位布局
- 粘性布局
- 静态布局
- 自适应布局
- 表格布局 使用table定位元素

## [flex](/css/flex/index.html)
flex布局也被称为弹性布局。它在一维空间上设置元素位置/大小。当前浏览器已经普遍支持。需要父/子元素共同设置指定样式属性才能实现效果。

## [grid](/css/grid/index.html)
也被称为网格布局，它是在二维空间上设置元素位置/大小。比flex较难。需要父/子元素共同设置指定样式属性才能实现效果。

## 浮云布局
```
float: none | left | right | inherit
```

## 定位布局
```
position: static | relative | absolute | fixed | sticky
```

|||||
|-|-|-|-|
|static|默认定位值|||
|relative|允许我们相对于元素在正常的文档流中的位置移动它。|||
|absolute|相对于最近的非静态定位的父元素定位。会脱离文档流。|||
|fixed|相对于浏览器视口定位。|||

### [sticky](/css/sticky/index.html)
粘性布局  

## 静态布局
就是为指定元素设置指定的值（大小/位置）。如：
```
.class {
    width: 20px;
    height: 38px;
}
```

## 浮动布局
把元素设置为浮动元素。浮动元素会脱离文档流，其父元素无法得到其高度。如：
```
.class {
    float: left;
}
```

## 自适应布局
因用户端设备较多。需要为每种设备设置相应的样式。自适应布局可使用一套样式代码同时支持多种设备。
常使用百分比/媒体查询。如：
```
.class {
    width: 50%;
}
@media screen and (max-width: 600px) {
    .class {
        width: 100%
    }
}
@media screen and (min-width: 600px) {
    .class {
        width: 50%
    }
}
```

## 居中
水平居中
text-align: center;

width: npx;
margin: 0 auto;

display: flex;
justify-content: center;

竖直居中
line-height: 100%;
height: 100%;
vertical-align: middle;

display: flex;
flex-direction: column;
height: npx;
justify-content: center

二列布局
```
.parent {
    display: flex;
}
.child0 {
    flex-basis: 200px;
    flex-shrink: 0;
    background: #274;
}
.child1 {
    flex-basis: 80%;
    flex-grow: 1;
    background: #624;
}
```

三列布局
```
.parent {
    display: flex;
}
.child0 {
    flex-basis: 200px;
    flex-shrink: 0;
    background: #274;
}
.child1 {
    flex-basis: 80%;
    flex-grow: 1;
    background: #624;
}
.child2 {
    flex-basis: 20%;
    flex-shrink: 0;
    background: #725;
}
```
