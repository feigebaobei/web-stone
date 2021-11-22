# 基础知识
canvas是html5的东西。虽然是大部分是由js处理的，但是处理的变量是canvas的“绘图环境变量”`document.getElementById('canvasId').getContext('2d')`。以后的一系列操作都是对该变量的操作。  
canvas中包含的内容，只在浏览器不支持canvas时才会显示出来。  
canvasw使用“立即模式”来绘制图像。svg使用“保留模式”来绘制图像。  
现在浏览器已经使用离屏canvas技术做了优化。请不要使用非必要的离屏canvas。  

## canvas大小
canvas有两套大小  

||||
|-|-|-|
|dom大小|css控制||
|绘图表面大小（视窗大小）|js控制|`document.getElementById('id').width`|

浏览器会把“绘图表面大小（视窗大小）”缩放到dom大小。  
canvas的绘图表面大小width/height不能使用`px`  
应该先设置绘图表面大小再改变绘图环境变量。

## canvas api
||||
|-|-|-|
|width|绘图表面宽度||
|height|绘图表面高度||
|getContext(params)|返回绘图环境变量||
|toDataURL(type, quality)|返回一个数据地址|quality控制图片的质量，`[0, 1.0]`。type:图像类型。如`image/png`,`image/jpeg`。||
|toBlob(cb, type, args...)|返回canvas的blob|cb回调方法，参数是canvas的图像的blob。type图像类型，默认`image/png`，最后一个参数控制图像的质量。|

## canvas的绘图环境。
``` js
canvas.getContext('2d') // 返回2d的绘图环境。
canvas.getContext('3d') // 返回3d的绘图环境。调用webGL
```

## 绘图环境`CanvasRenderingContext2D`对象的属性
||||||
|-|-|-|-|-|
|canvas|绘图环境所属的canvas||||
|fillstyle|填充时使用的颜色/渐变色/图案||||
|font|设置字号/字体|`20px Arial`|当字号<=13时，取13。||
|globalAlpha|设置全局透明度。|`[0, 1.0]`|计算多个不透明度时，会相乘它们。||
|globalCompsiteOperation|||||
|lineCap|设置线帽|默认`butt`|`['butt', 'round', 'squar']`||
|lineWidth|线宽|要求非负/非无穷。|默认1.0||
|lineJoin|设置相交点|默认`miter`|`['bevel', 'round', 'miter']`||
|miterLimit|设置相交点的最大长度||||
|shadowBlur|阴影的模糊值||||
|shadowColor|阴影的颜色||||
|shadowOffsetX|阴影的水平偏移值||||
|shadowOffsetY|阴影的竖直偏移值||||
|strokeStyle|设置描边的样式||||
|textAlign|文本的水平对齐方式||||
|textBaseLine|文本的竖直对齐方式||||
|save()|保存canvas状态到栈顶|以上属性都会改变当前canvas的状态。|||
|restore()|在栈顶弹出canvas状态。（即：使用弹出的canvas状态）||||

## 离屏canvas
```js
let offsetCanvas = document.createElement('canvas')
```

## 基础数学
```
Math.sin()
Math.cos()
Math.tan()

180角度 = pi弧度

单位向量：大小为1的向量
向量：{
	x,
	y,
}
向量的加/减法：向量的分量分别加/减。
向量的点积：相应分量分别相乘，再相加。结果是标量。

帧：表示每秒多少个画面。
帧的倒数表示该帧经过的时间。
```

# 绘制
## 矩形
||||
|-|-|-|
|clearRect(x: number, y: number, w: number, h: number) => void|清空指定区域的像素。|使用全透明的黑色填充。|
|strokeRect(x: number, y: number, w: number, h: number) => void|描边矩形||
|fillRect(x: number, y: number, w: number, h: number) => void|填充矩形||

## 渐变
先创建渐变区域，再添加颜色。  
|||
|-|-|
|createLinearGradient(x0: number, y0: number, x1: number, y1: number)|返回线性渐变|
|createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number)||
|createPattern(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition: string)|返回图像模式。`repetition: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat']`|

``` js
let gradient = context.createLiearGradient
gradient.addColorStop(0, 'blue') // 位置的百分值 颜色
gradient.addColorStop(1, 'yellow')
// 放射渐变同理
let pattern = context.createPattern(image, 'repeat-y')
context.fillStyle = pattern
```

## 阴影
|属性||默认值|
|-|-|-|
|shadowBlur||0|
|shadowColor||0|
|shadowOffsetX||0|
|shadowOffsetY||0|  
`context.clip()`也把操作范围限制在指定区域内。  

```js
context.rect(x, y, w, h)
context.clip()
// ...
```

## 限制作图范围
可实现剪纸效果。  
```js
context.rect(x, y, w, h)
context.clip()
```

## 路径/描边/填充
|||||
|-|-|-|-|
|arc(x, y, r, startAngle, endAngle, counterClockWise)||||
|beginPath()|重置当前路径|||
|closePath()|闭合当前路径|不要手动使用2个重叠的点去实现闭合路径。||
|fill()|使用fillStyle属性填充|||
|rect(x, y, w, h)||||
|stroke()|使用strokeStyle属性描边|||
|moveTo(x, y)||||
|lineTo(x, y)||||  

**非零环绕规则**  
当一条线段与路径上的直线或曲线相交时，就改变计数器的值，若与路径的顺时针部分相交，则+1，若与路径的逆时针部分相交，则-1。若计数器的值不是0，则此区域在路径内，调用fill()，否则不调用fill()。  

<details>
  <summary>折叠文本</summary>
  此处可书写文本
  嗯，是可以书写文本的
</details>

## 一像素问题
一个像素的范围内绘制装修像素宽的线段是不可能的，所以左右2个方向上的半像素都被扩展为一个像素。  
现代浏览器已经都实现了抗锯齿技术。  

## 贝塞尔曲线
|||||
|-|-|-|-|
|arcTo(x0, y0, x1, y1, r)|2个点确定的线为切线。r为半径。|||
|quadraticCurveto(px, py, x, y)|第一个点是控制点，第二个点是锚点。|||
|bezierCurveTo(px0, py0, px1, px2, x, y)前两个点是控制点，第三个点是锚点。|||

[编辑贝塞尔曲线-demo0](/html/canvas/demo0.html)  

## 坐标变换
|||||
|-|-|-|-|
|rotate(angle)|旋转|||
|scale(x, y)|缩放|||
|translate(x, y)|平移|||
|transform(a, b, c, d, e, f)|变换|||
|setTransform(a, b, c, d, e, f)|变换到|||

## 图像合成
有兼容性问题。chrome/firefox实现效果不同。  

|||||
|-|-|-|-|
|source-atop||||
|source-in||||
|source-out||||
|source-over||||
|destination-atop||||
|destination-in||||
|destination-out||||
|destination-over||||
|lighter||||
|copy||||
|xor||||

[图像合成-demo1](/html/canvas/demo1.html)  

## 文本
|||枚举值|默认值|
|-|-|-|-|
|strokeText(text, x, y)||||
|fillText(text, x, y||||
|measureText(text)||||
|font||||
||font-style|normal itelic oblique||
||font-variant|normal small-caps|normal|
||font-weight|normal(400) bold(700) bolder lighter number|normal|
||font-size|xx-small x-small medium large x-large xx-large smaller larger length %|normal|
||line-height|浏览器强制设置为normal.||
||font-family|||
|textAlign|水平对齐方式|start center end left right||
|textBaseline|竖直对齐方式|top bottom middle alphabetic ideographic hanging||  
|measureText(text)|返回TextMetircs对象。|TextMetircs: {width: 该字体时文本的像素宽度}||
|font||||
|font||||

默认字形：'10px sans-serif'  
[在圆弧周围绘制文本-demo2](/html/canvas/demo2.html)  
光标的高度：字母M的宽度×(1+1/6)  
[文本编辑器-demo3](/html/canvas/demo3.html)  

## 图像与视频

## title
## title
## title
## title
## title
## title
## title

# 文本
# 图像与视频
# 动画
# 精灵
# 物理效果
# 碰撞检测
# 游戏开发
# 自定义控件
# 移动平台开发
# title
# title