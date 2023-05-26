# serve

## overview

> 静态文件服务
> node v14+

### feature

- feature0
- feature1
- feature2

## install

`npm i -g serve`

## usage

```shell
serve
serve /filePath
serve --help


  OPTIONS

    --help                              Shows this help message

    -v, --version                       Displays the current version of serve

    -l, --listen listen_uri             Specify a URI endpoint on which to listen (see below) -
                                        more than one may be specified to listen in multiple places

    -p                                  Specify custom port

    -d, --debug                         Show debugging information

    -s, --single                        Rewrite all not-found requests to `index.html`

    -c, --config                        Specify custom path to `serve.json`

    -C, --cors                          Enable CORS, sets `Access-Control-Allow-Origin` to `*`

    -n, --no-clipboard                  Do not copy the local address to the clipboard

    -u, --no-compression                Do not compress files

    --no-etag                           Send `Last-Modified` header instead of `ETag`

    -S, --symlinks                      Resolve symlinks instead of showing 404 errors

    --ssl-cert                          Optional path to an SSL/TLS certificate to serve with HTTPS

    --ssl-key                           Optional path to the SSL/TLS certificate's private key

    --ssl-pass                          Optional path to the SSL/TLS certificate's passphrase

    --no-port-switching                 Do not open a port other than the one specified when it's taken.

  ENDPOINTS

    Listen endpoints (specified by the --listen or -l options above) instruct serve
    to listen on one or more interfaces/ports, UNIX domain sockets, or Windows named pipes.

    For TCP ports on hostname "localhost":

      $ serve -l 1234

    For TCP (traditional host/port) endpoints:

      $ serve -l tcp://hostname:1234

    For UNIX domain socket endpoints:

      $ serve -l unix:/path/to/socket.sock

    For Windows named pipe endpoints:

      $ serve -l pipe:\\.\pipe\PipeName
```

## configuration

默认配置文件：`serve.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api

核心是`serve-handler`

```js
let handler = require('serve-handler')
let http = require('http')
let clog = console.log
let server - http.createServer((req, res) => {
    return handler(req, res)
})
server.listen(3000, () => {
    clog('running at http://localhost:3000')
})
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
