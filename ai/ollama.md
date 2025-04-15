# ollama
本地llm运行平台

## 安装
```
# win
下载安装包 https://ollama.com/download/OllamaSetup.exe
# mac
curl -O https://ollama.com/download/Ollama-darwin.zip && unzip Ollama-darwin.zip
# linux
curl -fsSL https://ollama.com/install.sh | sh

# 验证安装
ollama --version
```

## 启动模型
```shell
ollama run llama3.2 # 启动默认模型（自动下载）
ollama run deepseek-r1:1.5b # 启动指定模型
ollama ps # 查看正在运行的模型
ollama stop deepseek-r1:1.5b
ollama stop a42b25d8c10a # 使用模型id停止
ollama list # 查看已经下载的模型
# 若启动多个模型就是多模型并行。
ollama pull <name> # 下载模型，不运行。
ollama rm <name> # 删除模型
ollama cp src dest # 复制模型
ollama show <name> # 查看模型详情

```