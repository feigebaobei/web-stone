# css3动画 #

## animation  

使用css3动画需要2步  

1. 为指定元素添加`animation`属性及属性值。各浏览器私有属性在前，通用属性在最后。  
2. 使用`@keyframes`定义动画过程名称。各浏览器私有属性在前，通用属性在最后。  

animation定义动画的属性值。  
@keyframes规则内指定一个CSS样式和动画将逐步从目前的样式更改为新的样式。  

	div
	{
	    -webkit-animation: myfirst 5s; /* Safari Chrome opera */
	    -ms-animation: myfirst 5s; /* ie */
	    -moz-animation: myfirst 5s; /* ff */
	    animation: myfirst 5s;
	}
	 
	@-webkit-keyframes myfirst /* Safari Chrome opera */
	{
	    0%   {background: red;}
	    25%  {background: yellow;}
	    50%  {background: blue;}
	    100% {background: green;}
	}
	@-ms-keyframes myfirst /* ie */
	{
	    0%   {background: red;}
	    25%  {background: yellow;}
	    50%  {background: blue;}
	    100% {background: green;}
	}
	@-moz-keyframes myfirst /* ff */
	{
	    0%   {background: red;}
	    25%  {background: yellow;}
	    50%  {background: blue;}
	    100% {background: green;}
	}
	@keyframes myfirst
	{
	    0%   {background: red;}
	    25%  {background: yellow;}
	    50%  {background: blue;}
	    100% {background: green;}
	}

**功能**  

- 可以改变任意多的样式，任意多的次数。  
- 使用`from`,`to`等同于0%，100%  
- 最好使用0% 100%（对浏览器好）  

**属性**  

- @keyframes 规定动画  
- animation 简写属性 name duration timing-function delay iteration-count direction fill-mode play-state   
- animation-name 规定@keyframes的名称  
- animation-duration  
- animation-timing-function linear|ease|ease-in|ease-out|cubic-bezier  
- animation-delay  
- animation-iteration-count 动画重复播放的次数  
- animation-direction 定义动画在下一周期是否逆向播放 normal|reverse|alternate|alternate-reverse|initial|inherit  
- animation-fill-mode 动画不播放时的样式（动画结束时的状态） none|forwards|backwards|both
- animation-play-state 定义动画是否运行或停止 paused|runing  
- 今天发现一个新属性`steps()`。还不知道它的明确属性是什么。知道animation的缩写中如何使用它：`animation: <animationName> <duration> steps(time | fn)`

![](./image/animation.png)

## transition  

1. ie9及以下不支持。  
2. 各浏览器私有属性在前，通用属性在最后。  

	// css
	div {
		-webkit-transition: width 2s; /* safari chrome */
		-moz-transition: width 2s; /* ff */
		-o-transition: width 2s; /* opera */
		transition: width 2s;
		width: 200px;
		height: 200px;
	}
	.w {
		width: 300px;
	}
	// html
	<div></div>
	// js
	$('div').on('click', function () {
		$('div').addClass('w')
	})

**功能**  

- 若触发动画事件后在动画未结束前停止事件会放弃当前动画从此时的状态开始执行停止事件的动画。  

**属性**  

- transition-property 设置过渡动画的css属性名称。 none | all | property,property1,property2
- transition-duration 完成过渡动画的时长。 time
- transition-time-function 过渡动画的速度曲线。linear | ease | ease-in | ease-out | ease-in-out | cublic-bezier(n,n,n,n)
- transition-delay 过渡动画的延迟时间。 time

*`transition`与`animation`的区别在于前者只做过渡效果，后者着重做动画效果。若实在分不清就把`transition`记为过渡。过渡是直线型的，不可以拆线。`animation`记为动画。动画是可以做很多拆线型的。*

## transform  

	div {
		-ms-transform: rotate(30deg); /* ie */
		-webkit-s-transform: rotate(30deg); /* safari chrome opera */
		-moz-s-transform: rotate(30deg); /* ff */
		transform: rotate(30deg);
	}

**功能**  

- 给指定元素变换。  

**属性**  

- none 
- matrix(n, n, n, n, n, n) 
- translate(x, y) 2d移动  
- translate3d(x, y, z) 3d移动  
- translateX(x)  
- translateY(y)  
- translateZ(z)  
- scale(x, y) 2d缩放  
- scale3d(x, y, z) 3d缩放  
- scaleX(x)  
- scaleY(y)  
- scaleZ(z)  
- rotate(a)  2d旋转
- rotate3d(x, y, z, a) 3d 旋转  
- rotateX(a)  
- rotateY(a)  
- rotateZ(a)  
- skew(xa, ya) 2d倾斜  
- skewX(a)  
- skewY(a)  
- perspective(n) 3d透视视图

|transform-origin|变形时的原点位置|center center|x-axis y-axis z-axis; // top left right bottom x% xpx|
|transform-box|定义排版盒子|border-box|fill-box, view-box, inherit, initial, unset|
|transform-type|嵌套元素是怎样在三维空间中呈现的|flat 二维| preserve-3d 三维|

*`transform`是变换（若不理解变换就理解为变形）。`translate`是移动。是transform的一种属性值。没有动画。`transition`是过渡。有动画。*

## flip

first last invert play
动画将用户界面带入生活。
任何触发布局变化的属性（比如height），浏览器都会递归检查布局中的其他元素是否也因此改变，这样的一个过程花销是很贵的。如果这个计算所费的时间比一个动画帧（大约16.7ms）更长，那么动画就会丢帧，从而导致动画迟滞。

flipping.js @Davidkpiano

@Nick Babich
@harrisfreddy
@Paul Irish
@Paul Lewis
@davidkpiano
@David Khourshid

## 动画库

animate.css
