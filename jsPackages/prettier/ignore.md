# 忽略

常使用`.prettierignore`指定忽略的内容  
该文件使用 gitignore 语法。

## 基本结构

```
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
*.html
```

## 在各文件中使用忽略备注

```
js
// prettier-ignore

jsx
{/* prettier-ignore */}

html
<!-- prettier-ignore -->
<!-- prettier-ignore-attribute -->
<!-- prettier-ignore-attribute (mouseup) -->

css
/* prettier-ignore */

md
<!-- prettier-ignore -->
<!-- prettier-ignore-start -->
<!-- SOMETHING AUTO-GENERATED BY TOOLS - START -->
<!-- SOMETHING AUTO-GENERATED BY TOOLS - END -->
<!-- prettier-ignore-end -->

yaml
# prettier-ignore

graphql
# prettier-ignore

handlebars
{{! prettier-ignore }}
```
