# 问 ai 得到的答案

Integrating agents, particularly AI agents, with VS Code extensions involves leveraging the Language Model API and potentially the Multi-tool Chat Protocol (MCP) for more advanced interactions.

1. Using Agent Mode with Existing AI Agents (e.g., GitHub Copilot Agent):
   Open Chat View: Access the Chat view in VS Code (Ctrl+Alt+I).
   Select Agent Mode: Choose "Agent" from the chat mode selector.
   Interact with the Agent: Enter prompts in the chat input field. The AI agent, like GitHub Copilot, will autonomously determine relevant context and files for edits.
2. Integrating Custom AI Agents (Creating a Custom Extension):
   Utilize the Language Model API:
   The VS Code Language Model API allows extensions to interact with language models for AI-powered features.
   Build the Prompt:
   Construct the input for the language model based on the user's request and relevant context.
   Send the Request:
   Send the prompt to the language model using the API.
   Interpret the Response:
   Process the model's output and integrate it into your extension's functionality.
3. Advanced Integration with MCP Servers:
   Install MCP Servers:
   Add MCP servers to VS Code, which provide tools for your agent to use.
   Access Tools in Agent Mode:
   Open the Chat view, select Agent mode, and use the "Tools" button to view and select available tools from your MCP servers.
   Reference Tools in Prompts:
   You can directly reference a tool in your prompt by typing # followed by the tool name (e.g., #search_files).
   Confirm Actions:
   Tools invoked by the agent may require confirmation before execution, especially if they modify files or data.
4. Developing Tools for Agents (Extension Authors):
   Create an MCP Server: Develop a custom MCP server to contribute tools for your agent.
   Contribute Tools via Extensions: If you are a VS Code extension author, you can contribute tools directly through your extension.
   Key Concepts:
   Agent Mode: A dedicated chat mode in VS Code for interacting with AI agents.
   Language Model API: Enables extensions to interact with language models.
   Multi-tool Chat Protocol (MCP): A protocol for agents to interact with and use various tools.
   Tools: Functions or capabilities provided by MCP servers that agents can utilize.

# 参考文献

https://techsimplifiedbypri.hashnode.dev/creating-a-custom-vs-code-extension-as-a-personal-ai-agent-assistant
[node.js + LangChain.js 整合 DeepSeek LLM、自建 REST 服务，设计一个自定义 Agent，最后通过 MCP 对外发布并调用](https://blog.csdn.net/m0_55049655/article/details/147688390)
[前端学 AI：基于 Node.js 的 Langchain 开发-简单实战应用](https://juejin.cn/post/7478585166497595407)

# title

# title

# title

# title

# title
