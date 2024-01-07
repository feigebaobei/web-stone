# 页面的位置

# event

event.offsetX // 相对事件对象的水平偏移量  
event.clientX // 相对视窗的水平偏移量。从浏览器可视区的左上角开始。  
event.pageX // 相对网页的水平偏移量（=event.clientX + 水平滚动距离）  
event.screenX // 相对显示器在水平偏移量

event.x/event.layerX 有兼容性问题，不建议使用。

# pageXOffset

# dom.getBoundingClientRect =>

返回`{x, y, left, right, top, bottom, width, height}`。这些属性都是相对于视窗的。

# title

# title
