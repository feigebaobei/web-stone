# node

## api

### nodeName

返回当前节点的节点名称

下表列出了所有类型的节点的 nodeName 属性的值。
|接口| nodeName 属性值|
|-|-|
|Attr| 等同于 Attr.name 属性的值|
|CDATASection| "#cdata-section"|
|Comment| "#comment"|
|Document| "#document"|
|DocumentFragment| "#document-fragment"|
|DocumentType| 等同于 DocumentType.name 属性的值|
|Element| 等同于 Element.tagName 属性的值|
|Entity| 实体名称|
|EntityReference| 实体引用名称|
|Notation| Notation 名称|
|ProcessingInstruction| 等同于 ProcessingInstruction.target 属性的值|
|text| "#text"|

如果是元素节点，nodeName 属性和 tagName 属性返回相同的值，但如果是文本节点，nodeName 属性会返回 "#text"，而 tagName 属性会返回 undefined。
