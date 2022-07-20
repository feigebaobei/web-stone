# cssSelector
css选择器是使用css语言做选择。用于样式编写。选择特定元素再给定样式。  

|选择方式|说明|demo|
|-|-|-|
|.class|||
|#id|||
|element|||
|element1 element2|element1内的所有element2||
|.class0.class|同时拥有class0与class1||
|element1 > element2|父元素是element1的所有element2||
|element1+element2|选中element1后面的element2||
|[attribute\]|有attribute属性的|p[attribute\]|
|[attribute=value\]|||
|![](./image/cssSelector0.png)|选中attribute的属性值以value开头的元素。有兼容问题。||
|element1~element2|选中element1后面的每个element2(可以不是紧挨着)||
|[attribute^=value\]|选中属性attribute的属性值以value开头的元素||
|[attribute$=value\]|||
|[attribute*=value\]|||
|:link|||
|:visited|||
|:hover|||
|:active|||
|:focus|||
|:first-letter|||
|:first-line|||
|:first-child|每个容器中的第一个元素||
|:last-child|||
|:before|为元素的内部的开头添加内容。一般结合content一起使用|p:before{content:"cont";}|
|:after|||
|:lang|||
|:first-of-type|||
|:last-of-type|||
|:only-of-type|||
|:only-child|||
|:nth-child(n)|选择其父元素的第n个子元素。n从1开始计数。||
|:nth-last-child(n)|||
|:nth-of-type(n)|||
|:nth-last-of-type(n)|||
|:root|文档的根元素|:root{color:red;}|
|:empty|||
|:enabled|||
|:disabled|||
|:checked|有兼容问题||
|:not(selector)|||
|::selection|被选中的样式。有兼容问题。|::selection,::-moz-selection|

## 优先级

id > class > tag
