# 定义
- 可扩展标记语言  
- 类似html.xml是html的补充，不是替代。  
- 用于传输数据，非显示数据。在xhr(XMLHttpRequest)就是使用xml为传输内容的。  
- 需要自定义标签  
- 必须关闭本标签  
- 区分大小写  
- 标签名中可使用下划线，不要使用-.:  
  - 使用前缀来避免命名冲突  
- 属性必须加引号  
- 必须有根元素  
- 

```xml
<!-- demo -->
<?xml version="1.0" encoding="ISO-8859-1"?>
<note>
    <to>George</to>
    <form>John</from>
    <heading>Reminder</heading>
    <body>Don't forget the meeting!</body>
</note>
```

# 验证
## XML DTD
```
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE note [
  <!ELEMENT note (to,from,heading,body)>
  <!ELEMENT to      (#PCDATA)>
  <!ELEMENT from    (#PCDATA)>
  <!ELEMENT heading (#PCDATA)>
  <!ELEMENT body    (#PCDATA)>
]>
<note>
...
```

## DTD
## XML Schema
是xml dtd 的代替者

# 使用
```
xml = ...
xml.getElementByTagName('to')[0].childrenNodes[0].nodeValue
// nodeValue 节点的值
// innerHTML 内部文本
```
## xml dom

# XMLHttpRequest


# ActiveX （放弃）
# 传输数据
ie为了开发更新网页部分内容创建了`xml`和`XMLHttpRequest`（简称xhr对象）。后来`json`比`xhr`使用更方便，所以多使用`json`。  
