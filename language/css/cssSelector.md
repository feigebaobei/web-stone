# cssSelector

css 选择器是使用 css 语言做选择。用于样式编写。选择特定元素再给定样式。

| 选择方式                      | 说明                                                     | demo                         |
| ----------------------------- | -------------------------------------------------------- | ---------------------------- |
| .class                        |                                                          |                              |
| #id                           |                                                          |                              |
| element                       |                                                          |                              |
| element1 element2             | element1 内的所有 element2                               |                              |
| .class0.class                 | 同时拥有 class0 与 class1                                |                              |
| element1 > element2           | 父元素是 element1 的所有 element2                        |                              |
| element1+element2             | 选中 element1 后面的 element2。没有找前面的选择器。      |                              |
| [attribute\]                  | 有 attribute 属性的                                      | p[attribute\]                |
| [attribute=value\]            |                                                          |                              |
| ![](./image/cssSelector0.png) | 选中 attribute 的属性值以 value 开头的元素。有兼容问题。 |                              |
| element1~element2             | 选中 element1 后面的每个 element2(可以不是紧挨着)        |                              |
| [attribute^=value\]           | 选中属性 attribute 的属性值以 value 开头的元素           |                              |
| [attribute$=value\]           |                                                          |                              |
| [attribute\*=value\]          |                                                          |                              |
| :link                         |                                                          |                              |
| :visited                      |                                                          |                              |
| :hover                        |                                                          |                              |
| :active                       |                                                          |                              |
| :focus                        |                                                          |                              |
| :first-letter                 |                                                          |                              |
| :first-line                   |                                                          |                              |
| :first-child                  | 每个容器中的第一个元素                                   |                              |
| :last-child                   |                                                          |                              |
| :before                       | 为元素的内部的开头添加内容。一般结合 content 一起使用    | p:before{content:"cont";}    |
| :after                        |                                                          |                              |
| :lang                         |                                                          |                              |
| :first-of-type                |                                                          |                              |
| :last-of-type                 |                                                          |                              |
| :only-of-type                 |                                                          |                              |
| :only-child                   |                                                          |                              |
| :nth-child(n)                 | 选择其父元素的第 n 个子元素。n 从 1 开始计数。           |                              |
| :nth-last-child(n)            |                                                          |                              |
| :nth-of-type(n)               |                                                          |                              |
| :nth-last-of-type(n)          |                                                          |                              |
| :root                         | 文档的根元素                                             | :root{color:red;}            |
| :empty                        |                                                          |                              |
| :enabled                      |                                                          |                              |
| :disabled                     |                                                          |                              |
| :checked                      | 有兼容问题                                               |                              |
| :not(selector)                |                                                          |                              |
| ::selection                   | 被选中的样式。有兼容问题。                               | ::selection,::-moz-selection |

## 优先级

id > class > tag
