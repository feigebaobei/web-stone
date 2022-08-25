# ast

抽象语法树

1. 不依赖于具体的文法。
2. 不依赖于语言的细节。

## 纯文本 => ast

一款编译器的编译流程是很复杂的，但我们只需要关注词法分析和语法分析，这两步是从代码生成AST的关键所在。
1. 词法分析（scanner）
它读取我们的代码，然后把它们按照预定的规则合并成一个个的标识 tokens。同时，它会移除空白符、注释等。最后，整个代码将被分割进一个 tokens 列表（或者说一维数组）。
```
const a = 5;
// 转换成
[{value: 'const', type: 'keyword'}, {value: 'a', type: 'identifier'}, ...]
```
2. 语法分析（解析器）
它会将词法分析出来的数组转换成树形的形式，同时，验证语法。语法如果有错的话，抛出语法错误。
```
[{value: 'const', type: 'keyword'}, {value: 'a', type: 'identifier'}, ...]
// 语法分析后的树形形式
{
  type: "VariableDeclarator",
  id: {
    type: "Identifier",
    name: "a"
  },
...
}
```
当生成树的时候，解析器会删除一些没必要的标识 tokens（比如：不完整的括号），因此 AST 不是 100% 与源码匹配的。

## babel

babel 是一个 JavaScript 编译器。宏观来说，它分3个阶段运行代码：
1. 解析(parsing) — 将代码字符串转换成 AST抽象语法树.
2. 转译(transforming) — 对抽象语法树进行变换操作，
3. 生成(generation) — 根据变换后的抽象语法树生成新的代码字符串。
简述为：它创建了 AST，遍历树，修改 tokens，最后从 AST中生成新的代码。

## demo

```
function add (a, b) {
  return a + b
}
```
```
                                             FunctionDeclaration
                                                   |
              ----------------------------------------------------------------------------------------
              |                                      |                                               |
              id                                  params                                            body (BlockStatement 块状域 {return a + b})
             {                                  [                                                    |
               name: 'add',                       {                                                BinaryExpress (二项式对象)
               type: 'identifier',                  name: 'a',                                         |
               ...                                  type: 'identifier',              -------------------------------------
             }                                      ...                              |                  |                |
                                                  },                                left             operator          right
                                                  {                                 identifier          +             identifier
                                                    name: 'b',
                                                    type: 'identifier',
                                                    ...
                                                  }
                                                ]

```


