# HTMLElement

所有 html 元素都实现了此接口。
从其父元素 Element 继承属性，并从 DocumentAndElementEventHandlers、ElementCSSInlineStyle、GlobalEventHandlers、HTMLOrForeignElement 和 TouchEventHandlers 实现这些属性。

HTMLOrForeignElement.nonce: 返回内容安全策略用于确定是否允许进行给定提取的一次使用的密码。  
HTMLElement.offsetHeight: 只读，返回一个 double 值，其中包含元素相对于布局的高度。  
HTMLElement.offsetLeft: 只读，返回一个 double 值，即从此元素的左边界到 offsetParent 的左边界的距离。

<!-- prettier-ignore-start -->
|      |    |       |     |     |
| ---- | ----------------------------- | --- | --- | --- |
| 属性 |             |       |     |     |
|      | accessKey   | 设置、获取元素访问的快捷键                |     |     |
|      | accessKeyLabel                | 只读，返回 DOMString，包含元素访问的快捷键的字符串。        |     |     |
|      | contentEditable               | 获取/设置元素的可编辑状态。               |     |     |
|      | isContentEditable             | 只读，返回 Boolean 值表明元素的内容是否可编辑。             |     |     |
|      | HTMLOrForeignElement.dataset  | 只读，返回 DOMStringMap，用以获取元素的自定义属性 data-\*，是一个对象即 key-value 结构。        |     |     |
|      | dir         | 获取/设置元素的方向，可选的值有 ltr、rtl、auto。            |     |     |
|      | draggable   | 设置/获取元素是否可以拖拽。               |     |     |
|      | enterkeyhint                  | 返回一个 DOMString，定义为虚拟键盘上的 enter 键提供什么操作标签或图标。       |     |     |
|      | hidden      | 获取/设置元素是否隐藏。                   |     |     |
|      | inert       | 返回一个布尔值，指示用户代理是否必须在用户交互事件、页内文本搜索和文本选择方面充当给定节点的 角色。               |     |     |
|      | innerText   | 设置或取得节点及其后代的呈现的文本内容，如果作为一个 getter 近似于当用户用光标突出显示 元素的内容并将其复制到剪贴板时所获得的文本。 |     |     |
|      | lang        | 返回一个 DOMString，表示元素的属性、文本和元素内容的语言。                    |     |     |
|      | noModule    | 返回一个布尔值，指示是否可以在支持模块脚本的用户代理中执行导入脚本。          |     |     |
|      | HTMLOrForeignElement.nonce    | 返回内容安全策略用于确定是否允许进行给定提取的一次使用的密码。                |     |     |
|      | offsetHeight                  | 只读，返回一个 double 值，其中包含元素相对于布局的高度。    |     |     |
|      | offsetLeft  | 只读，返回一个 double 值，即从此元素的左边界到 offsetParent 的左边界的距离。                    |     |     |
|      | offsetParent                  | 只读，返回一个 Element，该元素是当前从中计算所有偏移量计算的元素。            |     |     |
|      | offsetTop   | 只读，返回一个 double 值，即从此元素的顶部边框到 offsetParent 的顶部边框的距离。                |     |     |
|      | offsetWidth | 只读，返回一个 double 类型，包含元素相对于布局的宽度。      |     |     |
|      | spellcheck  | 是控制拼写检查的布尔值，它存在于所有 HTML 元素中，但并不是对所有元素都有影响。                  |     |     |
|      | style       | 返回一个 CSSStyleDeclaration，它是表示元素的样式属性的声明的对象。            |     |     |
|      | HTMLOrForeignElement.tabIndex | 是一个长整数，表示按 Tab 键顺序排列的元素的位置。           |     |     |
|      | title       | 返回一个 DOMString，它包含当鼠标放在元素上时出现在弹出框中的文本。            |     |     |
|      | translate   | 是表示翻译的布尔值。                      |     |     |
| 方法 |             |       |     |     |
|      | attachInternals()             | 将 ElementInternals 实例附加到自定义元素。                  |     |     |
|      | HTMLOrForeignElement.blur()   | 从当前焦点元素中移除键盘焦点。            |     |     |
|      | click()     | 向元素发送鼠标单击事件。                  |     |     |
|      | HTMLOrForeignElement.focus()  | 使元素成为当前键盘焦点。                  |     |     |
|      | forceSpellCheck()             | 对元素的内容运行拼写检查程序。            |     |     |
<!-- prettier-ignore-end -->

## innerText & textContent

| innerText      | textContent                  |     |     |
| -------------- | ---------------------------- | --- | --- |
| 可用于文本替换 | 可用于文本替换               |     |     |
| 不会           | 会取得 script/style 中的内容 |     |     |
| 不返回         | 会返回隐藏元素的文本         |     |     |
| 会触发 reflow  | 不会                         |     |     |
| ie 搞出来的    | ie8+和其他浏览器。           |     |     |
| 非标准 api     | 标准 api                     |     |     |
