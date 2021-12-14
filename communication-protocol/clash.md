# clash
记一次科学上网的过程。
- ubuntu
- clash
- efanccyun.net

## 1. 创建目录
创建`用户文件夹>clash`

## 2. 在efunccyun.net买一代理服务

## 3. 下载clash
在浏览器中打开[clash下载地址](https://github.com/Dreamacro/clash/release)
下载`clash-linux-amd64-v1.6.0.gz`。请选择linux系统的/64位的。
解压到no.1中的文件夹。

## 4. 安装clash
在`~/clash`目录下运行：
```
wget -O config.yaml ${订阅地址}?clash=1&log-level=info
```
回馈信息看着像错误。
运行结果：在当前目录中生成2个文件`config.yaml/wget-log`
```
./clash -d .
chmod +x clash
./clash -d .
```
回馈信息看着像错误。

## 5. 测试
打开[clash的代理目录](http://clash.razord.top/#/proxies)。若能正常浏览，则启动clash成功。

## 6. 使用clash
打开“设置-网络”，设置网络代理为手动。
设置`http代理`/`https代理`/`socks主机`为`127.0.0.1`，端口为`7890`。
设置`忽略主机`为`localhost,127.0.0.0/8,::1`

以后每次使用时需要：
在`~/clash`目录下运行：`./clash -d .`。
网络代理设置为手动。
