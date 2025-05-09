# n8n

> 工作流自动化平台
> 支持成流水线工作。
> 本质是 nocode 自动化工具
> 低代码平台
> 强制使用 pnpm 包管理工具
> 可把 ai(llm)整合到流水线中
> 不用编程就能调用起多个服务。
> 降低了使用 ai 的门槛。前端也能使用 ai.
> 多用户。按用户区分流水线。

## demo

- [抓新闻](/ai/n8n/catchNews.html)

## 竞品

zapier
make

## 工作边界

### 适合

一切关于自动化的事情，包括在自动化中使用 AI。
解决重复又耗时的工作。
小事情。
一段时间内不变动处理过程的事情
串联起多节点或多系统工作
webhook & http request 是它的通用法宝
单一系统的自动化。
数据分析

### 不适合

做 to C 应用
图片、音频、视频 Workflow
复杂的东西

# [常用的 node 说明](/ai/n8n/node.html)

# [开发 node](/ai/n8n/node.html)

# [setup](/ai/n8n/setup.html)

# [词汇表](/ai/n8n/glossary.html)

# [prd](/ai/n8n/prd.html)

# 使用方法

- n8n cloud
- self-host
  - npm
  - docker
  - server setup guides
- embed

# confuse

- 尝试落地 ai 的方式这一。以流水线方式。
- 不要太长。不要太短。

# 经营模式

> 把前端部分开源。在市场上搞出名声。
>
> > 不担心抄袭。大家都能得到开源内容。为什么要抄呢。抄了又有多少市场。
> > 大家都看到它开源了。有便宜可占了。大家都去了。它的市场就变大了。
> > 在周边赚钱。
> > zipxxxx/make 被挤掉了。
> > 可以支持用户自己部署。部署后可以自己运行。公司公开自己部署好的，并且加上收费条件。试用 15 天后开始收费。分三种类型收费。
> > 后续不知道会不会延期开源。
> > 支持以插件的方式扩展。
> > 拉取一个模板文件。基于它写自己的节点。
> > 写完后在 n8n 项目中创建 custom 目录，在该目录下执行`npm link xxxx`。
> > 也可以发布到节点市场上。
> > 在文档中说清每个配置字段的含义。
> > 本质是一个低代码平台。
> > 它实现的配置到代码（或逻辑）的过程可以学习一下。

# usage

- n8n cloud
- 自部署
  - [被服务调用](/ai/n8n/callByService.html)
- 内嵌

# 功能

1. 快速创建与 AI/MCP SERVER 结合的流水线。解决使用 ai、mcp server 的问题。

# 定位

1. llm 和 mcp server 的使用入口。
2. 上游是：用户、服务、llm、mcp server、各种 integration(如：数据库)
3. 下游是：用户、服务、通信工具

# 用户

1.
