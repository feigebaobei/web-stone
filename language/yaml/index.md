# `yaml`

## overview
> 对所有语言的开发都友好的数据序列化语言。(与xml/json相似)  
> 可编写配置文件  
> 格式宽松  
> 扩展名是 `.yaml`/`.yml`
> 它是json的超集

### 语法
- kv对
- 注释
- 对象
- 列表
- boolean
- 多行文本
- 环境变量
### feature
- 行分隔
- 缩进

## install
`npm i yaml`

## usage
```yaml
apiVerion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
spec:
    containers:
    - name: nginx-container
      image: nginx
      ports:
      - containerPort: 80
      volumeMounts:
      - name: nginx-vol
        mountPath: /usr/nginx/html
    - name: sidecar-container
      image: curlimages/curl
      command: ["/bin/sh"]
      args: ["-c", "echo Hello from sidecar container: sleep 300"]
      multilineString: |
        this is a single line string,
        that should be all on one line.
        some other stuff

command:
  - /bin/sh
  - -ec
  - >-
    mysql -h 127.0.0.1 -u root -p$MYSQL_ROOT_PASSWORD -e 'SELECT 1'
# 使用环境变量

apiVerions: v1
kind: Service
metadata:
  name: {{ .Values.service.name }}
spec:
  selector:
    app: {{ .Values.service.app }}
# placeholders

apiVersion: v1
kind: ConfigMap

---
apiVersion: v1
kind: Secret
# 多个yaml文件
```

## compare
- 可读

```yaml
microservices:
    - app: user-authentication
      port: 9000
      version: 1.0
```
```xml
<microservices>
    <microservice>
        <app>user-authentication</app>
        <port>9000</port>
        <version>1.0</version>
    </microservice>
</microservices>
```
```json
{
    microservices: [
        {
            app: "user-authentication",
            port: 9000,
            version: "1.0",
        }
    ]
}
```
