# less内置的方法
```
// 逻辑类
if(condition, v0, v1)
    condition为真则返回v0,否则返回v1
boolean(condition)
    返回boolean

// str类
escape(str)
    不编译,/?@&+'~!$
    编译<space>#^(){}|:><;[]=
    返回逃逸字符
e(str)
    返回逃逸字符
%(format, ...arguments)
    d,D,a,A 代替一个参数
    s,S 代替任意表达式
    返回格式化后的string
replace(string, pattern, replacement, flags)
    返回替换后的文本。

list类
length(...args)
    返回参数的数量
extract(list, index)
    返回list中下标为index的值
range(start, end, step)
    返回从start到end的值，间隔是step
each(list, rules)
    把list中的值分别作用于rules.
```
@selectors: blue, green, red;
each(@selectors, {
    .sel-@{value} {
        a: b
    }
    // 还可以使用 @key @index
})    
=>
.sel-blue {
    a: b
}
.sel-green {
    a: b
}
.sel-red {
    a: b
}
```

math类
ceil(number)
floor(number)
percentage(number) => 百分比值
round(number, decimalPlaces) => number
sqrt(number) => number
abs(number) => number
sin(number) => number
asin(number) => number
cos(number) => number
acos(number) => number
tan(number) => number
atan(number) => number
pi() => pi
pow(number, number) => number
mod(number, number) => float number
min(number) => number
max(number) => number

type类
isnumber(any) => boolean
isstring(any) => boolean
iscolor(any) => boolean
iskeyword(any) => boolean 是否是变量
isurl(any) => boolean
ispixel(any) => boolean 是否是像素单位
isem(any) => boolean
ispercentage(any) => boolean
isunit(any) => boolean
isrulest(any) => boolean 是否是规则集
isdefined(any) => boolean 是否被定义

微方法类
color(string) => color
image-size(string) => 返回图片的规格
image-width(string) => 图片的宽度
image-height(any)
convert(number, identifier) 转换单位
data-uri(mimetype, url) 返回编码后的数据
defaul() 不会
unit(dimension) => 移除或设置单位
get-unit(number)
svg-gradient(any) 不会

定义颜色类
rgb(r, g, b) => color
rgba(r, g, b, a) => color
argb(a, r, g, b) => hex
hsl(h, s, l) => hsl
hsla(h, s, l, a) => hsla
hsv(h, s, v) => hsv
hsva(h, s, v, a) => hsva

转换颜色类
hue(hsl) => hue
saturation(hsl) => saturation
lightness(hsl) => lightness
hsvhue(hsv) => hsvhue
hsvsaturation(hsv) => hsvsaturation
hsvvalue(hsv) => hsvvalue
red(rgb) => red
green(rgb) => green
blue(rgb) => blue
alpha(rgba) => alpha
luma(color) => 返回明度百分比值
luminance(color) => 返回明度百分比值

操作颜色的方法
saturate(color, amount, method) => color 返回提高饱和度的颜色值
desaturate
desaturate(color, ammount, method)
lighten(color, amount, method)
darken(color, amount, method)
fadein(color, amount, method)
fadeout(color, amount, method)
fade(color, amount, method)
spin(color, amount, method)
mix(color0, color1, weight) 混合2个颜色。weight：2个颜色的比重。
tint(color, method) 使本颜色与白色混合。 => min(#ffffff, @color, @weight)
shade(color, amount, method)
greyscale(color, amount, method)
contrast(color, dark, light, threshold)

混合颜色的方法
multiply(color0, color1)
screen(color0, color1)
overlay(color0, color1)
softlight(color0, color1)
hardlight(color0, color1)
difference(color0, color1)
exclusion(color0, color1)
avaerage(color0, color1)
negation(color0, color1)
```

## 为什么不设置负去实现降低饱和度、明度等