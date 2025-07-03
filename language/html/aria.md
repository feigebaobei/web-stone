# aria

ARIA（Accessible Rich Internet Applications）角色 ‌ 是指一组属性，用于提高网页的可访问性，帮助屏幕阅读器等辅助技术理解网页内容。ARIA 角色定义了网页元素的类型，帮助辅助技术正确解释这些元素的功能和用途。
[playwright](/jsPackages/playwright.html)

<!-- prettier-ignore-start -->
| html 元素                  | aria                    | 示例             |     |     |
| ------------------- | ------- | ---------------- | --- | --- |
| a 有 href                  | link                    | role=link        |     |     |
| a 无 href                  | generic                 |                  |     |     |
| abbr                       | -                       | -表示无明确 role |     |     |
| area 有 href               | link                    |                  |     |     |
| area 无 href               | generic                 |                  |     |     |
| article                    | article                 |                  |     |     |
| aside                      | complementary           |                  |     |     |
| audio                      | -                       |                  |     |     |
| 自定义标签                 | 若作者已定义，则 ElementInternals。否则 generic   |                  |     |     |
| b                          | generic                 |                  |     |     |
| base                       | -                       |                  |     |     |
| bdi                        | generic                 |                  |     |     |
| bdo                        | generic                 |                  |     |     |
| blockquote                 | blockquote              |                  |     |     |
| body                       | generic                 |                  |     |     |
| br                         | -                       |                  |     |     |
| button                     | button                  |                  |     |     |
| canvas                     | -                       |                  |     |     |
| caption                    | caption                 |                  |     |     |
| city                       | -                       |                  |     |     |
| code                       | code                    |                  |     |     |
| col                        | -                       |                  |     |     |
| colgroup                   | -                       |                  |     |     |
| data                       | generic                 |                  |     |     |
| datalist                   | listbox                 |                  |     |     |
| dd                         | -                       |                  |     |     |
| del                        | deletion                |                  |     |     |
| details                    | group                   |                  |     |     |
| dfn                        | term                    |                  |     |     |
| dialog                     | dialog                  |                  |     |     |
| dl                         | generic                 |                  |     |     |
| dl                         | -                       |                  |     |     |
| dt                         | -                       |                  |     |     |
| em                         | emphasis                |                  |     |     |
| embed                      | -                       |                  |     |     |
| fieldset                   | groupd                  |                  |     |     |
| figcaption                 | -                       |                  |     |     |
| figure                     | figure                  |                  |     |     |
| footer                     | 当 xxx 情况时，contentinfo,否则 generic           |                  |     |     |
| form                       | form                    |                  |     |     |
| form-associated custom element                       | 当 xxx 情况下 ElementInternals,否则 generic       |                  |     |     |
| h1 to h6                   | heading                 |                  |     |     |
| head                       | -                       |                  |     |     |
| header                     | 当 xxx 时 banner,否则 generic                     |                  |     |     |
| hgroup                     | group                   |                  |     |     |
| hr                         | separator               |                  |     |     |
| html                       | document                |                  |     |     |
| i                          | generic                 |                  |     |     |
| iframe                     | -                       |                  |     |     |
| img                        | xxx img 或 image        |                  |     |     |
| img 无 name                | xxx img 或 image        |                  |     |     |
| input type=button          | button                  |                  |     |     |
| input type=checkbox        | checkbox                |                  |     |     |
| input type=color           | -c                      |                  |     |     |
| input type=date            | -c                      |                  |     |     |
| input type=datetime-local  | -c                      |                  |     |     |
| input type=email 无 list   | textbox                 |                  |     |     |
| input type=file            | -                       |                  |     |     |
| input type=hidden          | -                       |                  |     |     |
| input type=image           | button                  |                  |     |     |
| input type=month           | -                       |                  |     |     |
| input type=number          | spinbutton              |                  |     |     |
| input type=password        | -                       |                  |     |     |
| input type=radio           | radio                   |                  |     |     |
| input type=range           | slider                  |                  |     |     |
| input type=reset           | button                  |                  |     |     |
| input type=search 无 list  | search                  |                  |     |     |
| input type=submit          | button                  |                  |     |     |
| input type=tel 无 type 或无 list | textbox           |                  |     |     |
| input type=text/search/tel/url/email 无 type 有 list | combobox                |                  |     |     |
| input type=time            | -                       |                  |     |     |
| input type=url 无 list     | textbox                 |                  |     |     |
| input type=week            | -                       |                  |     |     |
| ins                        | insertion               |                  |     |     |
| kbd                        | -                       |                  |     |     |
| label                      | -                       |                  |     |     |
| legend                     | -                       |                  |     |     |
| li                         | 若是 ul、ol、menu 的子元素，listitem,否则 generic |                  |     |     |
| link                       | -                       |                  |     |     |
| main                       | main                    |                  |     |     |
| map                        | -                       |                  |     |     |
| mark                       | -                       |                  |     |     |
| math                       | math                    |                  |     |     |
| menu                       | list                    |                  |     |     |
| meta                       | -                       |                  |     |     |
| meter                      | meter                   |                  |     |     |
| nav                        | navigation              |                  |     |     |
| noscript                   | -                       |                  |     |     |
| object                     | -                       |                  |     |     |
| ol                         | list                    |                  |     |     |
| optgroup                   | group                   |                  |     |     |
| 当 xxxx 时的 option        | option                  |                  |     |     |
| output                     | status                  |                  |     |     |
| p                          | paragraph               |                  |     |     |
| param                      | -                       |                  |     |     |
| picture                    | -                       |                  |     |     |
| pre                        | generic                 |                  |     |     |
| progress                   | grogressbar             |                  |     |     |
| q                          | generic                 |                  |     |     |
| rp                         | -                       |                  |     |     |
| rt                         | -                       |                  |     |     |
| ruby                       | -                       |                  |     |     |
| s                          | deletion                |                  |     |     |
| samp                       | -                       |                  |     |     |
| search                     | search                  |                  |     |     |
| section                    | 当有可访问的 name 时 region。否则 generic.        |                  |     |     |
| select 无 multiple 无 size 有多 value                | combobox                |                  |     |     |
| select 有 multiple 无 size 有多 value                | listbox                 |                  |     |     |
| slot                       | -                       |                  |     |     |
| small                      | generic                 |                  |     |     |
| source                     | -                       |                  |     |     |
| span                       | generic                 |                  |     |     |
| strong                     | strong                  |                  |     |     |
| style                      | -                       |                  |     |     |
| sub                        | subscript               |                  |     |     |
| summary                    | -                       |                  |     |     |
| sup                        | superscript             |                  |     |     |
| SVG                        | graphics-document       |                  |     |     |
| table                      | table                   |                  |     |     |
| tbody                      | rowgroup                |                  |     |     |
| td                         | cell/gridcell/-         |                  |     |     |
| template                   | -                       |                  |     |     |
| textarea                   | textbox                 |                  |     |     |
| tfoot                      | rowgroup                |                  |     |     |
| th                         | columnheader/rowheader/cell/gridcell/-            |                  |     |     |
| thead                      | rowgroup                |                  |     |     |
| time                       | tiem                    |                  |     |     |
| title                      | -                       |                  |     |     |
| tr                         | row                     |                  |     |     |
| track                      | -                       |                  |     |     |
| u                          | generic                 |                  |     |     |
| ul                         | list                    |                  |     |     |
| var                        | -                       |                  |     |     |
| video                      | -                       |                  |     |     |
| wbr                        | -                       |                  |     |     |
<!-- prettier-ignore-end -->
