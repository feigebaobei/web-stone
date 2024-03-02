# flex 布局

## overview

> 一维布局  
> 现在浏览器已经支持

## usage

需要在容器、项目上分别设置才能实现该布局。

```
.box {
    display: flex;
}
.item {
    ...
}
```

## api

### 容器的属性

| 属性名称        | 说明                                             | 默认值                  | 值                                                                  |
| --------------- | ------------------------------------------------ | ----------------------- | ------------------------------------------------------------------- |
| flex-direction  | 主轴的方向                                       | row                     | row-reverse, column, column-reverse                                 |
| flex-wrap       | 如何换行                                         | nowrap                  | wrap: 可以折行, wrap-reverse: 可以折行并在主轴的交叉方法上倒序排列  |
| flex-flow       | flex-direction 和 flex-wrap 属性的简写           | row nowrap              |                                                                     |
| justify-content | 项目在主轴的对齐方式                             | flex-start              | flex-end, center, space-between: 两端对齐, space-around: 相等间距   |
| align-content   | 在多根轴线时的对齐方式。只有一根轴线时不起作用。 | stretch: 轴线占满交叉轴 | flex-start, flex-end, center, space-between                         |
| align-items     | 项目在主轴的交叉轴上的对齐方式                   | stretch: 占满容器       | flex-start, flex-end, center, baseline                              |
| row-gap         | 行间距                                           | normal                  | normal, `<length>`, `<percentage>`, calc(), inherit, initial, unset |
| column-gap      | 列间距                                           |                         |                                                                     |
| gap             | row-gap + column-gap。flex/grid 都支持 gap 属性  |                         |                                                                     |

### 项目的属性

| 属性名称    | 说明                                                     | 默认值                        | 值                                              |
| ----------- | -------------------------------------------------------- | ----------------------------- | ----------------------------------------------- |
| order       | 项目的排列顺序,越小越靠前                                | 0                             | num                                             |
| flex-grow   | 项目的放大比例                                           | 0。                           | num                                             |
| flex-shrink | 项目的缩小比例                                           | 1。如果空间不足该项目公缩小。 | num                                             |
| flex-basis  | 项目本来的大小                                           | auto                          | xpx                                             |
| flex        | flex-grow,flex-shrink,flex-basis 的简写                  | 0 1 auto                      |                                                 |
| align-self  | 当前项目的对齐方式(我测试在单根轴线时有用。多轴时无用。) | auto                          | flex-start, flex-end, center, baseline, stretch |
