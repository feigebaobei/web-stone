# mkcert
> 它是使用go写的。不能使用npm安装。
> [官网](https://github.com/FiloSottile/mkcert)

## feature
- 生成自签名的CA证书并保存在本地系统中。
- 不需要配置。  
- 可以指定域名。  
- 需要解决自签名CA证书引起的错误。  

## install
### macos
```shell
brew install mkcert
brew install mss # 若使用ff
# or 
sudo port selfupdate
sudo port install mkcert
sudo port install nss # if you use Firefox
```

### linux
```shell
# 1. install certutil
sudo apt install libnss3-tools
    -or-
sudo yum install nss-tools
    -or-
sudo pacman -S nss
    -or-
sudo zypper install mozilla-nss-tools
# 2.1 install mkcert
brew install mkcert
# 2.2 使用源码打包
git clone https://github.com/FiloSottile/mkcert && cd mkcert
go build -ldflags "-X main.Version=$(git describe --tags)"
# 2.3 使用已经打包的二进制文件
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
# 2.4 For Arch Linux users, mkcert is available on the official Arch Linux repository.
sudo pacman -Syu mkcert
```
### window

## usage
```shell
mkcert -install
# 创建一个本地CA，并安装在本地系统中。重新找开ff浏览器可生效。
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
# 为这些域名生成自签名证书。
# 证书在 ./example.com+5.pem ./example.com+5-key.pem
```

## 支持的root stores
- macOS system store
- Windows system store
- Linux variants that provide either
  - update-ca-trust (Fedora, RHEL, CentOS) or
  - update-ca-certificates (Ubuntu, Debian, OpenSUSE, SLES) or
  - trust (Arch)
- Firefox (macOS and Linux only)
- Chrome and Chromium
- Java (when JAVA_HOME is set)

若要只安装在其中几个，您可以设置`TRUST_STORES`环境变量，可选值是"system"/"java"/"nss"

## 高级选项
```shell
-cert-file FILE, -key-file FILE, -p12-file FILE
    Customize the output paths.

-client
    Generate a certificate for client authentication.

-ecdsa
    Generate a certificate with an ECDSA key.

-pkcs12
    Generate a ".p12" PKCS #12 file, also know as a ".pfx" file,
    containing certificate and key for legacy applications.

-csr CSR
    Generate a certificate based on the supplied CSR. Conflicts with
    all other flags and arguments except -install and -cert-file.
```
必须先写这些选项，再写域名。如：  
`mkcert -key-file key.pem -cert-file cert.pem example.com *.example.com`

## S/MIME
如果域名是email地址时，自动生成S/MIME证书。  
`mkcert filippo@example.com`

## 移动设备
## 与node.js结合使用
## 改变CA方法的位置
## 安装CA到别的系统
## title
## title
## title
## title





## todo
### 证书说明
example.org-key.pem文件是SSL证书的Key，可在Nginx的ssl_certificate_key指令使用。  
example.org.pem文件是SSL证书，在Nginx的ssl_certificate指令使用。  

### title
### title
### title
