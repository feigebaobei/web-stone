# `whistle`

## overview

> 基于 node.js 的跨平台 web 调试工具  
> description  
> description  
> description

### feature

- websocket
- 设置代理
- 反向代理
- 调试移动端 bug
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

配置 rule，如

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
    - 与代理连接同一个 wifi。

### 配置代理

打开`http://local.whistlejs.com/`，点击`create`，输入：

```
www.ifeng.com       http://127.0.0.1
 # or
http://127.0.0.1    www.ifeng.com
```

点击 online 可看到本机 ip/port。然后在移到端上设置代理。

### 设置移动端

设置手机代理为用脑的 ip.

#### 安卓

在电脑上的浏览器中输入`http://127.0.0.1:8899/#rules`，点击`https`，使用手机浏览器扫码后下载安装证书。  
或者  
在手机浏览器中输入`rootca.pro`去下载证书。  
然后安装证书。

#### 苹果

安装证书时若需要密码，则输入手机的锁屏密码。若无锁屏密码则设置锁屏密码，然后安装。

## api

`w2 help` 可查看用法

```
w2 start // 启动背景服务
w2 restart // 重启背景服务
w2 stop // 停止背景服务
w2 run // 启动前景服务


  Usage: w2 <command> [options]


  Commands:

    status          Show the running status
    add [filepath]  Add rules from local js file (.whistle.js by default)
    install         Install a whistle plugin
    uninstall       Uninstall a whistle plugin
    exec            Exec whistle plugin command
    run             Start a front service
    start           Start a background service
    stop            Stop current background service
    restart         Restart current background service
    help            Display help information

  Options:

    -h, --help                                      output usage information
    -D, --baseDir [baseDir]                         set the configured storage root path
    -z, --certDir [directory]                       set custom certificate store directory
    -l, --localUIHost [hostname]                    set the domain for the web ui (local.whistlejs.com by default)
    -L, --pluginHost [hostname]                     set the domain for the web ui of plugin  (as: "script=a.b.com&vase=x.y.com")
    -n, --username [username]                       set the username to access the web ui
    -w, --password [password]                       set the password to access the web ui
    -N, --guestName [username]                      set the the guest name to access the web ui (can only view the data)
    -W, --guestPassword [password]                  set the guest password to access the web ui (can only view the data)
    -s, --sockets [number]                          set the max number of cached connections on each domain (256 by default)
    -S, --storage [newStorageDir]                   set the configured storage directory
    -C, --copy [storageDir]                         copy the configuration of the specified directory to a new directory
    -c, --dnsCache [time]                           set the cache time of DNS (60000ms by default)
    -H, --host [boundHost]                          set the bound host (INADDR_ANY by default)
    -p, --port [proxyPort]                          set the proxy port (8899 by default)
    -P, --uiport [uiport]                           set the webui port
    -m, --middlewares [script path or module name]  set the express middlewares loaded at startup (as: xx,yy/zz.js)
    -M, --mode [mode]                               set the starting mode (as: pureProxy|debug|multiEnv|capture|disableH2|network|rules|plugins|prod)
    -t, --timeout [ms]                              set the request timeout (360000ms by default)
    -e, --extra [extraData]                         set the extra parameters for plugin
    -f, --secureFilter [secureFilter]               set the path of secure filter
    -r, --shadowRules [shadowRules]                 set the shadow (default) rules
    -R, --reqCacheSize [reqCacheSize]               set the cache size of request data (600 by default)
    -F, --frameCacheSize [frameCacheSize]           set the cache size of webSocket and socket's frames (512 by default)
    -A, --addon [pluginPaths]                       add custom plugin paths
    --config [workers]                              start the cluster server and set worker number (os.cpus().length by default)
    --cluster [config]                              load the startup config from a local file
    --dnsServer [dnsServer]                         set custom dns servers
    --socksPort [socksPort]                         set the socksv5 server port
    --httpPort [httpPort]                           set the http server port
    --httpsPort [httpsPort]                         set the https server port
    --no-global-plugins                             do not load any globally installed plugins
    --no-prev-options                               do not reuse the previous options when restarting
    --inspect [[host:]port]                         activate inspector on host:port (127.0.0.1:9229 by default)
    --inspectBrk [[host:]port]                      activate inspector on host:port and break at start of user script (127.0.0.1:9229 by default)
    -V, --version                                   output the version number
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
