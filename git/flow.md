# git flow

用于解决开发过程中各种冲突导致问题。

|     | 主分支                 | 功能分支     |
| --- | ---------------------- | ------------ |
|     | 用于组织、开发、部署。 | 解决特定问题 |
|     | 可随时用于部署。       |              |
|     |                        |              |
|     |                        |              |

## install

```shell
brew install git-flow
# or
git flow init
# 然后可以使用默认值
```

## usage

```shell
git checkout master
git flow feature start f1
git flow feature publish f1
# or
# git push origin feature/f1
git flow feature finish f1 # 开发结束时删除分支

# 修复bug
git checkout master
git flow hotfix start bug1
```

## 总结

多年的分支创建、合并、删除已经成习惯了，没必要使用 git-flow 工具解决这些问题。
