# 在项目中设置格式化功能

## install

|             |                             |     |     |
| ----------- | --------------------------- | --- | --- |
| prettier    | 格式化代码的工具            |     |     |
| lint-staged | 对舞台区文件执行命令的工具  |     |     |
| husky       | 与 git hooks 结合使用的工具 |     |     |

```shell
npm i -D husky lint-staged
npm i -D -E prettier
```

## 示例

```shell
git init
npm pkg set scripts.prepare="husky install"
npm pkg set scripts.p="prettier --write"
npm pkg set scripts.l="lint-staged"
npm run prepare         # 会生成 .husky 目录
npx husky add .husky/pre-commit "npm run l"
crtp initFile .prettierrc.json
crtp initFile .prettierignore
```

创建`.lintstagedrc`文件
建议在这个文件中直接使用`prettier`命令。不要使用在`package.json`中定义的脚本。
若有格式化的脚本应该是在 cli 中直接调用的。

```json
{
  "./*.js": "prettier --write"
}
```
