# install

##

## 安装 jdk

1. 进入这里https://www.oracle.com/java/technologies/downloads/#jdk19-mac 下载相应版本。mac 的选择`x64 DMG Installer`
2. 双击打开下载包
3. 双击 JDK.xx.x.x.pkg
4. 默认安装目录是 `/Library/Java/JavaVirtualMachines/jdk-19.jdk/Contents/Home`
5. 设置环境变量

```shell
cd ~
vim .bash_profile
```

若不存在则追加：

```

JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-19.jdk/Contents/Home

PATH=$JAVA\_HOME/bin:$PATH:.

CLASSPATH=$JAVA\_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.

export JAVA_HOME

export PATH

export CLASSPATH

```

6. 运行`source ~/.bash_profile `
