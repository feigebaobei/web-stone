# 常用子命令

## status

## branch

```shell
git branch <new_branch_name> # 创建分支
git branch # 列出分支

```

## checkout

用于切换分支/检出等操作

```shell
git checkout <branch_name> # 切换到新分支
git checkout -b <new_branch_name> # 创建并切换到新分支

```

## switch

仅用于切换分支

```shell
git switch <branch_name> # 切换到新分支
git switch -c <new_branch_name> # 创建并切换到新分支
```

## remote

操作远端仓库
可以在命令行中使用远端仓库的简写代替对应的 url

```shell
git remote # 列出远端仓库的简写
git remote -v # 列出远端仓库的简写及对应的url
git remote add <short_name> <url> # 添加远端仓库
git remote rename <origin_short_name> <target_short_name> # 重命名远端仓库的简写
git remote remove <short_name> # 删除远端仓库的简写
git remote rm <short_name> # 同上。简写
```

## status

```shell

```

## status

```shell

```
