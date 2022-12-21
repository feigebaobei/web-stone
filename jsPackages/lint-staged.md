# lint-staged

## overview

> 少有的全 js 的库  
> 操作舞台区的文件的执行命令的工具  
> 通常与 husky、linter(eg: eslint/prettier)一起使用

### feature

- 操作舞台区的文件的执行命令的工具
- feature1
- feature2

## install

`npm i -D lint-staged`

## usage

```shell
crtp initFile .lintstagedrc
```

## configuration

|                                                |                                                                     |     |     |
| ---------------------------------------------- | ------------------------------------------------------------------- | --- | --- |
| package.json 中的`lint-staged`对象             |                                                                     |     |     |
| `.lintstagedrc`                                | 可以是`.lintstagedrc.json`/`.lintstagedrc.yaml`/`.lintstagedrc.yml` |     |     |
| `.lintstagedrc.mjs` / `lint-staged.config.mjs` | esm 规范                                                            |     |     |
| `.lintstagerc.cjs` / `lint-staged.config.cjs`  | cjs 规范                                                            |     |     |
| `lint-staged.config.js` / `.lintstagedrc.js`   | esm/cjs                                                             |     |     |
|                                                |                                                                     |     |     |

### 基本结构

```json
// .lintstagedrc
{
  "*": "cmd"
  // "*.js": ["eslint", "prettier --write"]
}
```

| key | description | default | enum | demo |     |     |
| --- | ----------- | ------- | ---- | ---- | --- | --- |
|     |             |         |      |      |     |     |
|     |             |         |      |      |     |     |
|     |             |         |      |      |     |     |

## api

## cli

```
❯ npx lint-staged --help
用法: lint-staged [options]

Options:
  -V, --version                      输出版本号
  --allow-empty                      当任务撤消所有分阶段的更改时允许空提交（默认值：false）
  -c, --config [path]                配置文件的路径
  -d, --debug                        打印其他调试信息（默认值：false）
  -p, --concurrent <parallel tasks>  要同时运行的任务数，或者为false则要连续运行任务（默认值：true）
  -q, --quiet                        自己的控制台输出（默认值：false）
  -r, --relative                     将相对文件路径传递给任务（默认值：false）
  -x, --shell                        跳过任务解析以更好地支持shell（默认值：false）
  -h, --help                         输出用法信息
```

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
