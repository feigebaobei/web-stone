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

# 文本
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

# 图像与视频
||用法|||
|-|-|-|-|
|`drawImage(image, dx, dy)`|把指定图像绘制在canvas的指定区域上。|可控制图像的缩放||
|`drawImage(image, dx, dy, dw, dh)`|把指定图像绘制在canvas的指定区域上。|||
|`drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`|把图像的指定区域绘制在canvas的指定区域上。|||
|getImageData(sx, sy, sw, sh)|返回指定区域的图像的ImageData对象|该ImageData.data是一个数组，包含4*sw*sh个整数。每4个整数表示一个像素，它们分别表示：红/绿/蓝/不透明度alpha。imageData.width !== sw imageData.width:设备像素，sw:css像素的单位。||
|putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)|把脏数据复制到canvas的指定区域。|||
|createImageData(w, h)|创建并返回ImageData对象|可以操作每一个像素||
|createImageData(imageData)||||

|ImageData对象||||
|-|-|-|-|
|width|以设备像素（px）为单位的图像数据宽度|||
|height||||
|data|像素数值组成的数组-TypedArray|||

## 离屏canvas: 不在屏幕上的canvas
<details>
	<summary>
		由js操作dom生成的canvas。	
	</summary>
	<pre>
		let canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			offsetCanvas = document.createElement('canvas'),
			offsetContext = offsetCanvas.getContext('2d')
		offsetContext.drawImage(image, 0, 0)
		context.drawImage(offsetCanvas, 0, 0)
	</pre>
</details>
现代浏览器已经做了离屏canvas，若程序员再用代码实现离屏canvas，则会效率变低。  
当图像复杂时使用offsetCanvas可方便绘制。  

### 效率
drawImage > 操作图像（getImageData等）> 递归canvas > 离屏canvas  
绘制canvas = 绘制image  
绘制递归canvas用时较多。因为需要浏览器使用离屏canvas处理。  
不要频繁使用getImageData()获取少量数据。  

<details>
	<summary>剪辑区+绘制图像</summary>
	<pre>
		context.beginPath()
		// ...
		context.close()
		context.clip() // 定义剪辑区
		context.drawImage(image, 0, 0)
	</pre>
</details>

## 绘制视频
```
// html

// js
let canvas = ...,
	video = ...;
function animate () {
	if (!video.ended) {
		context.drawImage(video, 0, 0)
		window.requestNextAnimationFrame(animate) // 这是一个自定义方法
	}
}
video.onload = () => {
	window.requestNextAnimationFrame(animate) // 这是一个自定义方法
}
```

# 动画
## 动画循环
- 不使用`setTimeoute / setInterval`处理动画。  
- 基于`requestAnimationFrame()`处理动画。  

requestAnimationFrame(cb)  
cb(time)  
	time执行回调函数的时刻。  
	对于此参数，作者没找到权威的说明。  
	不是从1970年到现在的毫秒值。  
返回id  
cancelAnimationFrame(id) 取消回调  

### requestAnimationFrame(cb)
该方法在浏览器方便时执行下一次循环   
[demo-requestAnimationFrame](/html/canvas/requestAnimationFrame.html)  

### 封装`requestNextAnimationFrame()`
``` js
window.requestNextAnimateionFrame = (
	function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequeatAnimationFrame || window.msRequestAnimationFrame || function (cb, element) {
			var self = this, start, finish;
			window.setTimeout(function () {
				start = +new Date()
				cb(start)
				finish = +new Date()
				self.timeout = 100 / 60 - (finish - start)
			}, self.timeout)
		}
	}
)
```
## 帧
表示动画快慢的单位。（f/s）每秒多少个画面。fps。  
表示每个画面用时 = 1/fps。  
<details>
	<summary>计算帧速率</summary>
	<pre>
		let lastTime = 0
		function calcFps () {
			let now = +new Date()
			let fps = 1000 / (now - lastTime)
			lastTime = now
			return fps
		}
		function animate(time) {
			// ...
			calcFps()
		}
		requestNextAnimationFrame(animate)
	</pre>
</details>

## 良好的绘图方式
- 绘制完背景后，若要修改画面，则定义剪辑区后再绘制。  
- 利用双缓存：将所有东西绘制在offsetCanvas后再绘制到canvas上。现代浏览器已经实现了双缓存技术，若程序员再实现它，是影响运行效率。  

## 基于时间的运动
```
s = v * t
  = v / fps

let v = 50
let fps
function calcFps () {...}
function animate () {
	fps = calcFps()
	context.clearRect()
	let dx = v / fps
	let dy = v2 / fps
	context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
	// ...
}
```

# 精灵
||||
|-|-|-|
|top|||
|left|||
|width|||
|height|||
|velociityX|||
|velociityY|||
|behaviors||function[]|
|painter|||
|visible|||
|animating|是否正在动画|boolean|
先执行行为，再执行绘制。  

```js
class Sprite {
	constructor(name, painter = undefined, behaviors = []) {
		this.name = name
		this.top = 0
		this.left = 0
		this.width = 0
		this.height = 0
		this.velocityX = 0
		this.velocityY = 0
		this.visible = true
		this.animating = false
		this.painter = painter
		this.behaviors = behaviors
	}
	paint(context) {
		if (this.painter && this.visible) {
			this.painter.paint(this, context)
		}
	}
	update(context, time) {
		this.behaviors.forEach(item => {
			item.execute(this, context, time)
		})
	}
}
```

## 精灵的绘制
- 描边/填充绘制器  
- 图像绘制器  
- 精灵表绘制器  

```js
let ballPainter = {
	paint: (sprite, context) => {
		// 暂存当前绘图环境
		context.save()
		// 得到用于绘制的变量
		// 设置新的绘图环境
		// 绘图
		// 弹出当前绘图环境
		context.restore()
	}
}
let ball = new Sprite('ball', ballPainter)

class ImagePainter {
	constructor(src) {
		this.image = new Image()
		this.image.src = src
	}
	paint(sprite, context) {
		if (this.image.complete) {
			context.drawImage(this.image, sprite.left, sprite.top, sprite.width, sprite.height)
		}
	}
}
let bomb = new Sprite('bomb', new ImagePainter('./file.png'))

class SpriteSheetPainter {
	constructor(imageUrl = '', cells = []) {
		this.image = new Image()
		this.image.src = imageUrl
		this.cells = cells
		this.cellIndex = 0
	}
	advance() {
		if (this.cellIndex >= this.cells.length - 1) {
			this.cellIndex = 0
		} else {
			this.cellIndex++
		}
	}
	paint(sprite, context) {
		if (this.image.complete) {
			let cell =this.cells[this.cellIndex]
			context.drawImage(this.image, cell.x, cell.y, cell.w, cell.h, sprite.left, sprite.top, cell.w, cell.h)

		}
	}
}
```

## 精灵的行为
```
let behaviors = [
	{
		execute: (sprte, context, time) => {...}
	}
]
new Sprite('name', painter, behaviors)
```

- [demo-plainSprite](/html/canvas/demo-plainSprite.html)  
- [demo-imageSprite](/html/canvas/demo-imageSprite.html)  
- [demo-spriteSheetSprite](/html/canvas/demo-spriteSheetSprite.html)  

## title
## title
## title
## title
## title

# 物理效果
# 碰撞检测
# 游戏开发
# 自定义控件
# 移动平台开发
# title
# title