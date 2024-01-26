# dom

## 分类

|     |                                               |     |
| --- | --------------------------------------------- | --- |
| 1   | 一个文档就是一个文档节点，按层次组成 dom 树。 |     |
| 2   | 每个 html 都是一个元素节点                    |     |
| 3   | 每个文本都是一个文本节点                      |     |
| 4   | 每个 html 属性都是一个属性节点                |     |
| 5   | 每个注释都是一个注释节点                      |     |

|          |                         | nodeType | nodeName   | nodeValue |     |
| -------- | ----------------------- | -------- | ---------- | --------- | --- |
| 元素节点 | `getElementById('xxx')` | 1        | 大写标签名 | null      |     |
| 属性节点 | `getAttribute(xxx)`     | 2        | 属性名     | 属性值    |     |
| 文本节点 | `dom.innerText`         | 3        | #text      | 文本内容  |     |

### 文本节点

parentNode 是元素节点
不包含子节点
`document.createTextNode(str)`

```
innerHTML
outerHTML
innerText
outerText
textContent

beforebegin 当前元素前，同辈元素
afterend    当前元素后，同辈元素
afterbegin  插入一个第一子元素
beforeend   插入一个最后子元素

操作文本类
appendData(str)
deleteDatal(star, length)
insertData(start, string)
replaceData(start, length, str)
splitText(offset)     在下标为offset处分割为2个节点
substring(start, length)
```

|          |      |     |
| -------- | ---- | --- |
| 根节点   | html |     |
| 父节点   |      |     |
| 子节点   |      |     |
| 兄弟节点 |      |     |

## 取元素节点

getElementById('xxx')
getElementsByClass('xxx')
querySelector('xxx')

## 层次

|                 |              |     |     |
| --------------- | ------------ | --- | --- |
| parentNode      |              |     |     |
| childNodes      | 子节点的集合 |     |     |
| firstChild      |              |     |     |
| lastSibling     |              |     |     |
| previousSibling |              |     |     |
| children        | 子级元素节点 |     |     |

## 操作

```
let dom1 = document.createElement('div')
let idAttr = document.createAttribute('id')
idAttr.value = 'a'
dom1.setAttributeNode(idAttr)
let dom2 ....
dom2.id = 'a'
dom2.type = 'xx'
dom2.value = 'xxx'
let text = document.createTextNode('str')
dom3.appendChild(text)
dom4.insertBefore(ele, op) // ele插入到dom4内的op前
dom5.removeChild(op) // 删除dom5的子元素op
dom6.remove() // 删除dom6节点
dom7.replaceChild(newDom, oldDom) // 使用newDom替换dom7中的oldDom
dom8.clodeNode(b) // 复制dom8节点。b为true时复制其所有子节点，反之复制当前节点。
```

##
