# commitlint

## overview

> commit message 的 lint 工具  
> 会用到`@commmitlint/cli` / `@commmitlint/config-conventional`  
> 与 husky 一起使用

### feature

- feature0
- feature1
- feature2

## install

```shell
npm install -D @commitlint/config-conventional @commitlint/cli
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

## usage

```shell
# 默认格式
git commit -m 'type(scope?): subject body? footer?'
```

## configuration

|                                   |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- |
| commitlint.config.js              |     |     |     |     |
| .commitlintrc.js                  |     |     |     |     |
| .commitlintrc                     |     |     |     |     |
| .commitlintrc.json                |     |     |     |     |
| .commitlintrc.yml                 |     |     |     |     |
| package.json 中的 commitlint 对象 |     |     |     |     |

| key | description | default | enum | demo |     |     |
| --- | ----------- | ------- | ---- | ---- | --- | --- |
|     |             |         |      |      |     |     |
|     |             |         |      |      |     |     |
|     |             |         |      |      |     |     |

### 基本结构

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'to',
        'fix',
        'docs',
        'style',
        'refactore',
        'perf',
        'test',
        'chore',
        'revert',
        'demo',
      ],
    ],
  },
}
```

### rule 配置说明

rule 由 name 和配置数组组成，如'name: [0, 'always', 72]'.
第一位是 level。可选 0:disable，1:warning，2:error  
第二位是如何使用。可选 always,never  
第三位是值

### 格式说明

|         |                                     |     |     |
| ------- | ----------------------------------- | --- | --- |
| type    | commit 的类型                       |     |     |
| scope   | commit 的范围，本次变动影响的范围。 |     |     |
| subject | 简短描述                            |     |     |
| body    | 长描述                              |     |     |
| footer  | 描述的 footer 信息                  |     |     |

### commit 的类型

|          |                    |     |     |
| -------- | ------------------ | --- | --- |
| build    | 修改项目的打包系统 |     |     |
| ci       | 修改 ci            |     |     |
| docs     | 修改文档           |     |     |
| feat     | 新增功能           |     |     |
| merge    | 分支合并           |     |     |
| fix      | 解决 bug           |     |     |
| perf     | 性能               |     |     |
| refactor | 重构代码           |     |     |
| style    | 代码样式变动       |     |     |
| test     | 测试工作           |     |     |
| revert   | 回滚               |     |     |
| chore    | 非以上             |     |     |

### rule

这些规则都见文知意吧。

|                          | 说明            | rule   | value | 可选值 |     |
| ------------------------ | --------------- | ------ | ----- | ------ | --- |
| body-full-stop           | body 停止的地方 | never  | .     |        |     |
| body-leading-blank       | body 开始的地方 | always |       |        |     |
| body-empty               |                 |        |       |        |     |
| body-max-length          |                 |        |       |        |     |
| body-max-line-length     |                 |        |       |        |     |
| body-min-length          |                 |        |       |        |     |
| body-case                |                 |        |       |        |     |
| footer-leading-blank     |                 |        |       |        |     |
| footer-empty             |                 |        |       |        |     |
| footer-max-length        |                 |        |       |        |     |
| footer-max-line-length   |                 |        |       |        |     |
| footer-min-length        |                 |        |       |        |     |
| header-case              |                 |        |       |        |     |
| header-full-stop         |                 |        |       |        |     |
| header-max-length        |                 |        |       |        |     |
| header-min-length        |                 |        |       |        |     |
| references-empty         |                 |        |       |        |     |
| scope-enum               |                 |        |       |        |     |
| scope-case               |                 |        |       |        |     |
| scope-empty              |                 |        |       |        |     |
| scope-max-length         |                 |        |       |        |     |
| scope-min-length         |                 |        |       |        |     |
| subject-case             |                 |        |       |        |     |
| subject-empty            |                 |        |       |        |     |
| subject-full-stop        |                 |        |       |        |     |
| subject-max-length       |                 |        |       |        |     |
| subject-exclamation-mark |                 |        |       |        |     |
| type-enum                |                 |        |       |        |     |
| type-case                |                 |        |       |        |     |
| type-empty               |                 |        |       |        |     |
| type-max-length          |                 |        |       |        |     |
| type-min-length          |                 |        |       |        |     |
| signed-off-by            |                 |        |       |        |     |
| trailer-exists           |                 |        |       |        |     |

## api

`@commitlint/cli.fn(param, first: string, second: boolean = true) => void`
description

`@commitlint/cli.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 还有详细的规则需要学习。  
> 未来迭代计划。
> 未来迭代计划。
