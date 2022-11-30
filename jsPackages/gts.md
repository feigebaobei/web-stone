# gts

## overview

> google 的 ts 格式指南。可以配置格式、linter、自动 fix 代码。

### feature

- 没有配置文件
- 自动格式化代码 `gts fix`
- 找到样式错误、简单的编程错误
- 推荐使用默认的配置

## install

`npm i -D gts`

## usage

```shell
npx gts init
# 执行结果：
# 在tsconfig.json中添加google ts 风格
# 在package.json中添加必要依赖
# 添加脚本
    # lint                      格式化并检查代码格式问题
    # fix                       自动格式化
    # clean                     删除输出文件
    # compile                   使用tsc编译ts文件
    # pretest/posttest/prepare  常用于ci
```

### 格式化指定文件

```shell
gts lint index.js
```

### 与 eslint 一起工作

```
// .eslintrc
---
extends:
    - './node_modules/gts'
```

```shell
eslint --fix
```

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 没有配置文件会方便一些。
> 未来迭代计划。
> 未来迭代计划。
