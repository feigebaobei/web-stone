# setup

方法一

```
npm i n8n -g
# or
yarn global add n8n
n8n
```

方法二

```
docker run -it --rm \
    --name n8n \
    -p 5678:5678 \
    -v ~/.n8n:/home/node/.n8n \
    n8nio/n8n
```

方法三

```
git clone https://github.com/n8n-io/n8n.git
cd n8n
npm i
npm run build
npm run start
```

> 在 npm root -g 中 n8n 的目录下创建.env 文件
> list 命令默认不列出.env 文件

配置.env 文件

```
N8N_PORT=5678
N8N_HOST=localhost
N8N_PROTOCOL=http
N8N_EDITOR_BASE_URL=http://localhost:5678

# 安全
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=XXXX
N8N_BASIC_AUTH_PASSWORD=XXX

N8N_JWT_AUTH_ACTIVE=true
N8N_JWT_AUTH_HEADER=Authorization
N8N_JWT_AUTH_HEADER_VALUE_PREFIX=Bearer
N8N_JWKS_URI=https://your-domain.com/.well-known/jwks.json

N8N_SECURE_COOKIE=false
```

在浏览器中打开 http://localhost:5678。

## issue

### 在阿里云启动

```
n8n start --tunnel
```

### 在阿里云与 pm2 结合启动

找到 pm2 的安装目录。执行这三个命令，分别查看是否有 pm2。

```
npm root -g
pnpm root -g
yarn global bin
```

若有，则说明 pm2 是使用该包管理工具安装的。
然后在 pm2 包的目录下执行 pm2 init simple。

> 比如：我是使用 yarn 全局安装的 pm2。找到的目录是 /usr/local/bin
> 则在 /usr/local/bin/ 目录下执行 pm2 init simple

默认会生成`ecosystem.config.js`。
编辑该文件为

```js
module.exports = {
  app: [
    {
      // 这个可以运行
      name: 'n8n',
      script: 'n8n',
      cwd: '/root/.nvm/versions/node/v20.14.0/lib/node_modules/n8n', // 这是全局安装 n8n 的目录。必须是这个目录下。因为此目录下有 .env 文件。
      args: 'start --tunnel', // github trigger节点必须要使用此选项
    },
  ],
}
```

执行 pm2 start ecosystem.config.js

### 无法触发 webhook

配置环境变量

WEBHOOK_URL=http://heshijade.com/
或
N8N_PROTOCOL=https
N8N_HOST=n8n.example.com
