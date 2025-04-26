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
