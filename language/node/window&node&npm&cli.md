# window 系统中安装 node，再加上 npm 不能使用安装的 cli.

一般整个安装过程会很顺序。但是有极端情况。整个问题不好复现。若遇到则按照如下配置设置，则可以解决。

1. 安装 nvm
2. 使用 nvm 安装各版本 node
3. npm 会随着 node 一起安装
4. 使用 npm 安装若干 cli.以`crtp-cli`为例。
5. 若在命令行中可以执行`crtp -v`，则一切正常运行。

环境变量中应该设置 nvm。安装 nvm 到哪儿，环境变量就设置到哪儿目录。
一般 nvm 会设置 node 的环境变量和链接。若二者对应不上，应该改为对应上。
此时可以执行` node -v``npm -v `
然后执行`npm config ls`，查看 prefix 的值是什么。
再执行`npm i -g crtp-cli`.若在 prefix 对应的目录能看到 crpt 则安装成功。
在环境变量中设置 prefix 的值。
到此就一起设置正常了。
