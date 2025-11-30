# ubuntu 科学上网

>

## 具体过程

### 安装 shadowsocks-electron

第一种方法：使用“应用中心”安装。（成功了）
在“应用中心”中搜索 shadowsocks-electron 并安装。

第二种方法：使用 pkg+命令安装。（失败了）
在[github](https://github.com/nojsja/shadowsocks-electron/releases)上选择 amd64.deb 版本的文件。
`sudo dpkg ./xxx文件`

### 在网站上复制 ssr 的地址。

ssr 全称是 ShadowsocksR

### 在 shadowsocks-electron 中添加服务器

在“主页”点击左下角的“+”。选择一种方式去创建服务。

### 配置 ubuntu 的网络代理

在 shadowsocks-electron 的主页在一个节点或服务上右键，选择“连接”。

打开 ubuntu 的“设置”。选择“网络”。代理设置为“手动”。打开“网络代理”。配置设置为“手动”。设置“SOCKS 主机”的 url 为“127.0.0.1”，端口为“1080”（url 与端口根据实际情况设置。）然后保存。

### 配置 firefox 的网络代理

这里不能与"配置 ubuntu 的网络代理"一起使用。
在 firefox 中打开“设置”页面，搜索“proxy”，并进入。
设置“手动配置代理”的“SOCKS 主机”为“127.0.0.1”，端口为“1080”。勾选“SOCKS_v5”
勾选“使用 SOCKS v5 时代理 DNS 查询”。
点击“确定”。

## 验证是否可以科学上网

在浏览器中打开 [youtube.com](http://youtube.com)

## 在 ubuntu 终端中设置环境变量。

如果做了上面的，则可以在浏览器中科学上网。
若在要命令行还中能科学上网，可以这样做：

```
export http_proxy="socks5://127.0.0.1:1080"
export https_proxy="socks5://127.0.0.1:1080"
```

这样当前终端会话中的请求就会通过 SOCKS5 代理进行传输。

### 永久设置

对于 bash，编辑`~/.bashrc`
对于 zsh，编辑`~/.zshrc`
在文件中追加上面的代码。保存后退出编辑。执行`source ~/.bashrc`
