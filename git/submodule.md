# submodule

## 创建

```shell
git submodule add <仓库地址>
```

## 使用

与其他 git 仓库无异。
在子仓库目录下执行：

```shell
git pull
git push
```

## 删除

1. 删除子仓库目录 `git rm --cached <submoduleDir>`
2. 删除`<root>/.gitmodules`文件里相应的子仓库内容。
3. 删除`<root>/.git/config`文件里相应的子仓库内容。
4. 删除`<root>/.git/modules/`目录下的相应子仓库文件。
