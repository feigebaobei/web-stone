# `whistle`

## overview
> 基于node.js的跨平台web调试工具  
> description  
> description  
> description  

### feature
- websocket  
- 设置代理  
- 反向代理  
- 调试移动端bug  
- 可插件  
- 抓包  
- 修改请求  
- 修改回馈  
- socket  

## install
`npm i whistle -g`

## usage

### 启动

### 调试
配置rule，如  
```
https://sell-preview.guazi-apps.com/           weinre://preview
```
点击`Weinro`，点击`preview`。可在电脑上看到手机中访问的页面。  

## setting
### 设置电脑端
- windows  
- mac  
  - for chrome  
    - intall chrome plugin whistle-for-chrome or Proxy SwitchySharp  
  - for firefox  
    - Open Options page in Firefox, then switch to General -> Network Proxy, then set Manual proxy configuration to whistle.   
  - for mobile
    - 与代理连接同一个wifi。  
### 配置代理
打开`http://local.whistlejs.com/`，点击`create`，输入：  
```
www.ifeng.com 127.0.0.1
 # or
127.0.0.1 www.ifeng.com
```
### 设置移动端
#### 安卓
在电脑上的浏览器中输入`http://127.0.0.1:8899/#rules`，点击`https`，使用手机浏览器扫码后下载安装证书。  
或者  
在手机浏览器中输入`rootca.pro`去下载证书。  
然后安装证书。  
#### 平果

## api
`w2 help` 可查看用法  
```
w2 start // 启动背景服务
w2 restart // 重启背景服务
w2 stop // 停止背景服务
w2 run // 启动前景服务
```


## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。