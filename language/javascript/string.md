# string

处理文本（字符串）

## 创建

    var a = new String();
    var b = String();

## 属性

**constructor** 对创建该对象的方法的引用

**length** 返回当前字符串的长度

    a = “Try the demo below to see what we mean.”
    var num0 = a.length // 39

**prototype** 允许向对象添加属性和方法

## 方法

<!-- prettier-ignore-start -->
| api       | 参数       | 说明                |            |||
| ------- | ------------------- | ---------- | ----------------- | --- | -------- |
| String#@@iterator() |        | 返回新的 iterator 对象    |            |
| String#charAt(index)   | index: 0 ~ string.length - 1   | 返回指定索引的字符         |            |
| String#charCodeAt(index)       | index  | 返回指定索引的字符的编码单元表示                |            |
| String#codePointAt(pos)        | pos 编码元素的位置          | 返回一个 Unicode 编码点值的非负整数             |            |
| String#concat(...str)  |        | 返回把若干 str 合并后的新字符串                 | 性能不如`+`/`+=`   |
| String#endsWith(searchString[, length])               | searchString 是搜索的字符串。length 指定 String 的尾部下标 | 返回 String 的指定尾部是否以 searchString 结束  |            |
| String.fromCharCode(...num)    | num 0~65535(0xffff)之间的代表示 utf-16 代码单元的数字      | 返回该数字对应的字母。     |            |
| String.fromCodePoint(...num)   |        | 返回使用指定的代码点序列创建的字符串            |            |
| String#includes(searchString[, position])             |        | 返回 boolean。表示 String 中是否包含 searchString。从 position 开始搜索。      |
|   |
| String#indexOf(searchString[, index])                 |        | 从指定的下标开始搜索 searchString。若存在则返回第一次出现的下标，否则返回-1.   |            |
| String#lastIndexOf(searchString[, index])             |        | 从指定的下标开始搜索 searchString。若存在则返回最后一次出现的下标，否则返回-1. |            |
| String#localeCompare() |        |     |            |
| String#match(regexp)   |        | 返回符合 regexp 的匹配结果。                    | 若 regexp 中有`g`，则返回所有匹配结果组成的数组或 null。若 regexp 中无`g`，则返回第一个匹配项及相关捕获组或 null。`[searchString, index: number, group: 一个捕获数组, index: 当前匹配结果的开始位置]` |
| 详见[正则表达式](/regexp/index.html)                  |
| String#matchAll(regexpg)       | regexpg 全局匹配的正则表达式        | 返回一个包含所有匹配正则表达式和分组捕获结果的遍历器。  |            |
| String#normalize([form])       | form 正规形式 'NFC' / 'NFD' / 'NFKC' / 'NFKD'              | 返回按指定形式正规化的字符串                    |            |
| String#padEnd(targetLength, [padString])              |        | 返回一个新字符串，基于 String，添加 padString 到 targetLength                  |            |
| String#padStart(targetLength, [padString])            |        |     |            |
| String.raw             |        |     |            |
| String#repeat(count)   | count 重复次数 0 ~ +infinity        | 返回重复指定次数的新字符串 |            |
| `String#replace(regexp\|substr, newSubStr\|function)` | regexp 正则表达式 substr 字符串 newSubStr 字符串。         | 替换                       | 详见下文   |
| String#replaceAll(regexp       | substr, newSubStr           | function)                  |            |     | 详见下文 |
| String#search(regexp)  |        | 返回匹配的下标。若无匹配则返回-1.               |            |
| `String#slice(beginIndex, [endIndex])`                |        | 返回指定下标范围内的字符串 |            |
| `String#split([separator[,limit]])`                   | separator 分割符 limit 数组的长度   | 按指定分割符、数组长度分割 String 为数组。      |            |
| String#startsWith(searchString[, position])           |        | 是否以 searchString 开头   | 参数不能是正则表达式           |
| `String#substring(startIndex, [endIndex])`            |        | 返回指定下标范围的字符串   |            |
| `String#toLocalLowerCase([locale])`                   |        | 返回指定语言环境的小写格式的字符串              |            |
| `String#toLocaleUpperCase([locale])`                  |        | 返回指定语言环境的大写格式的字符串              |            |
| `String#toLowerCase([locale])` |        | 返回指定语言环境的小写格式的字符串              |            |
| `String#toUpperCase([locale])` |        | 返回指定语言环境的小写格式的字符串              |            |
| `String#toString()`    |        | 返回一个表示调用对象的字符串。                  | String 对象覆盖了 Object 对象的 toString 方法；并没有继承 Object.toString()。                 |
| String#trim()          |        | 返回去掉两端空字符串后的新字符串。不改变原字符串。              |            |
| String#trimEnd()       |        | 返回去掉右端空字符串后的新字符串。              |            |
| String#trimStart()     |        | 返回去掉左端空字符串后的新字符串。              |            |
| String#valueOf()       |        | 返回字符串的原始值         |            |
<!-- prettier-ignore-end -->

```js

String#replace(regexp|substr, newSubStr|function)
regexp 正则表达式
substr 字符串
newSubStr 字符串
    `$$` $
    `$&` 匹配的子串
    $`   当前匹配子串的左边内容
    `$'` 当前匹配子串的右边内容
    `$n` 第n个匹配子串
    `$<name>` 分组的名称。需要浏览器支持
function (match, p1, p2, p3, ..., offset, string, NamedCaptureGroup) {...}
    match   匹配的子串
    pn      第n个括号匹配的字符串
    offset  匹配到的子串在原字符串的偏移量
    string  原字符串
    NamedCaptureGroup  命名捕获组匹配的对象
返回被替换后的字符串。

String#replaceAll(regexp|substr, newSubStr|function)
regexp 正则表达式
substr 字符串
newSubStr 字符串
    `$$` $
    `$&` 匹配的子串
    $`   当前匹配子串的左边内容
    `$'` 当前匹配子串的右边内容
    `$n` 第n个匹配子串
    `$<name>` 分组的名称。需要浏览器支持
function (match, p1, p2, p3, ..., offset, string, NamedCaptureGroup) {...}
    match   匹配的子串
    pn      第n个括号匹配的字符串
    offset  匹配到的子串在原字符串的偏移量
    string  原字符串
    NamedCaptureGroup  命名捕获组匹配的对象
返回被替换后的字符串。

```
