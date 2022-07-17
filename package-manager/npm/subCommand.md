# npx
运行本地、远端的包

```
npm exec -- <pkg>[@<version>] [args...]
npm exec --package=<pkg>[@<version>] -- <cmd> [args...]
npm exec -c '<cmd> [args...]'
npm exec --package=foo -c '<cmd> [args...]'

npx <pkg>[@<specifier>] [args...]
npx -p <pkg>[@<specifier>] <cmd> [args...]
npx -c '<cmd> [args...]'
npx -p <pkg>[@<specifier>] -c '<cmd> [args...]'

alias: npm x, npx

--package=<pkg> (may be specified multiple times)
-p is a shorthand for --package only when using npx executable
-c <cmd> --call=<cmd> (may not be mixed with positional arguments)
```

`<pkg>`是必填项。可以使用`path`代替包名。  
`--call / -c`用于生成命令字符串。  
- 若package.json中有bin只有一个，则调用该字段。  
- 若package.json中bin字段有多个，其中有一个被匹配，则执行该字段的匹配值。  
- 若无匹配（无bin、无匹配项），则报错。  

# init
## 别名 create / innit

# unlink
取消软链接

# rm
删除（`package.json`中）指定的包。

# title
# title