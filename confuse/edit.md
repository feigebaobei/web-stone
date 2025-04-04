# 编辑

## 富文本编辑器

## contentediable

`<div contentediable="true"></div>`

### 事件

- 有 input 事件
- 无 change 事件
- keyup
- keydown 不推荐，因为按下键时可能文本无变化。

## [demo](/confuse/editDemo.html)

## 竞品

https://liveblocks.io/blog/which-rich-text-editor-framework-should-you-choose-in-2025#remirror

- [lexical](https://lexical.dev/)
  - reacti
- [ckeditor](https://ckeditor.com/docs/)
- [typist 8.0](https://typist.doist.dev/?path=/docs/readme--docs)
- [codemirror](https://codemirror.net/)
  - > Language Support
    > A full parser package, often with language-specific integration and extension code, exists for the following languages:

Angular
CSS
C++
Go
HTML
Java
JavaScript
JSON
Liquid
Markdown
PHP
Python
Rust
Sass
SQL
Vue
WAST
XML
YAML

- [monaco-editor](https://github.com/microsoft/monaco-editor)
- draft.js facebook react
- slate.js
- quill.js
- tinymce vue/react/angular
- wangEditor
- proseMirror
- tiptap vue
- ckeEditor 5
- contentTools
- jsdit 纯 ts 编写的

推荐的编辑器
[codemirror](https://codemirror.net/)
[monaco-editor](https://github.com/microsoft/monaco-editor)
tiptap（很底层，方便基于它开发。）

不推荐的编辑器
lexical（react 技术栈）

[ckeditor](https://ckeditor.com/ckeditor-5/)（很强大，不止于 js 语言）
[tinymce](https://www.tiny.cloud/)
