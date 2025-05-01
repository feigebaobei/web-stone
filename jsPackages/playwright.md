# playwright

## 定位器

### 常用的有 4 种定位器:

- css 选择器
- xpath
- 文本内容
- 测试名称

```
let { chromium } = require('playwright')
let browser = await chromium.launch()
let page = browser.newPage()
// 使用css选择器
page.$('selector') // 选择一个元素
page.$$('selector') // 选择多个元素
// 使用xpath选择器
page.$x('//xpath') // 选择一个元素
page.$$x('//xpath') // 选择多个元素
//
page.$('[data-testid="some-id"]') // 使用data-testid定位元素

```

### 内置的定位器

| 定位器                    | 说明                                                                                            | 何时使用                                                           |                                                                                                                   |                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `page.getByRole()`        | 使用显式和隐式可访问性属性进行定位。                                                            | **优先推荐角色定位器。因为它最接近用户和辅助技术感知页面的方式。** |                                                                                                                   |                                         |
| `page.getByText()`        | 使用文本定位                                                                                    | 常用于非交互元素。如 div/span/p                                    |                                                                                                                   |                                         |
| `page.getByLabel()`       | 使用 label 定位                                                                                 | 常用于表单字段                                                     |                                                                                                                   |                                         |
| `page.getByPlaceholder()` | 使用 placeholder 定位元素                                                                       | 用于无标签有占位符的表单元素。                                     |                                                                                                                   |                                         |
| `page.getByAltText()`     | 使用文本替代来定位元素                                                                          | 常用于 img/area                                                    |                                                                                                                   |                                         |
| `page.getByTitle()`       | 通过标题属性来定位元素                                                                          | 常用于有 title 的元素                                              |                                                                                                                   |                                         |
| `page.getByTestId()`      | 根据 data-testid 属性定位（可以配置其他属性）                                                   | 无法使用 role、text 定位时使用此定位                               | data-testid 是标识被测试元素的业界通用标识。                                                                      |                                         |
| `page.locator()`          | 使用 css、xpath 方式绝对定位到元素。它的值可以省略` css=``xpath= `前缀。playwright 会自动检测。 |                                                                    | page.locator('css=button') <=> page.locator('button') page.locator('xpath=//button') <=> page.locator('//button') | 不推荐此定位。因 dom 元素经常发生变化。 |

#### getByRole

反映了用户和辅助技术如何感知页面。
**优先推荐角色定位器。因为它最接近用户和辅助技术感知页面的方式。**

## [ARIA 角色](/language/html/aria.html)
