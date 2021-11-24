# sticky

## overview
> 相当于介于relative/fixed之间的布局方式。  

### 要求
- 父元素不能是`overflow: hidden` / `overflow: auto`  
- 必须设置`top / right / bottom / left`至少一个。  
- 父元素的宽度（高度）必须大于sticky元素的宽度（高度）。为了可以滚动。  
- sticky元素只能在父元素内生效。  

## usage
### demo
``` css
.cn {
    position: sticky;
    left: 0px;
    top: 0px;
}
```