# mcp
> model context protocol
> 让llm使用工具的协议。
> 统一所有api的调用方式

## 概念
mcp host 本质是支持mcp的软件。如：claude desktop / cursor / cline / cherry studio
mcp server: mcp服务器。只是一个程序。一般使用node/py编写。可联网，可不联网。内置若干个tool.

mcp host 与 mcp server的沟通方式：
- stdio 标准输入输出
- sse   server-sent events

## uml
```
	user		mcp server 			cline			llm
					|				  |
					|   			  |
					|   启动 mcp server|
					| <-------------- |
					|				  |
					|   你是谁？能做什么？|
					| <-------------- |
					|				  |
					|				  |
					|	我是weather	  |
					|	可以根据经度纬度 |
					|	查询天气		  |
					| --------------> |
	 |  			|				  |
	 |  	纽约明天的天气怎么样？  	  |
	 | -----------------------------> |
	 |  			|				  |  纽约明天的天气怎么样？
	 |  			|				  |  (还有这些工具可以使用)
	 |  			|				  | --------------> |
	 |  			|				  |                 |
	 |  			|				  |  请调用xx,参数是yy.
	 |  			|				  | <-------------- |
	 |  			|				  | 
	 |  			|请调用xx,参数是yy. |
	 |				| <-------------- |
	 |  			|				  |
	 |  			|	返回结果		  |
	 |  			| --------------> |
	 |  			|				  |
	 |  			|				  |  返回结果
	 |  			|				  | --------------> |
	 |  			|				  |
	 |  			|				  | 纽约明天的天气是xx
	 |  			|				  | <-------------- |
	 |  			|				  |
	 |  	纽约明天的天气是xx     	  |
	 | <----------------------------- |
	 |  			|				  |
	 |  			|				  |
	 |  			|				  |
```

## 常用的mcp
### tavily
#### 功能
- 搜索
- 提取
常用于解决信息的问题。

### sequential thinking
强制多步骤分析推理
常用于解决逻辑的问题。

### filesystem
- 读/写文件
- 创建/列出/删除目录
- 移动文件/目录
- 搜索文件
- 取得文件的元数据

### markitdown
`*.pdf =》 *.md`

### title

milvus本地向量数据库。
pinecone云端向量数据库。

## mcp 市场
- mcp.so
- mcpmarket.com
- smithery.ai




