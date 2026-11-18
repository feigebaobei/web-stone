coder 不再逐条编写规则，而是让计算机从示例中学习。
这种让计算机从数据中学习的方法叫做机器学习。
训练时，系统学习大量已标记为垃圾邮件或正常邮件的示例，找出有助于区分它们的模式，例如可疑措辞或发件人信息。
使用时，系统根据学到的模式判断新收到的邮件是否可能是垃圾邮件，并进行过滤。
人工智能使计算机系统能够执行通常与人类智能相关的任务，例如学习、推理和决策。
机器学习不是编写逐步流程，而是让计算机能够从示例中学习。
AI 根本上是通过模式识别来工作的。
训练阶段：系统从示例中识别并学习模式。
运行阶段：训练好的系统接收新案例，并将其与训练期间学到的模式进行比较，从而做出决策。
写一个好的 prompt

- 定义场景
- 明确任务
- 明确特定规则、要求。
- 可以使用上下文环境。
  The 4D Framework for AI Fluency, developed through research collaboration between Professor Rick Dakan (Ringling College of Art and Design) and Professor Joseph Feller (University College Cork), identifies four core competencies that, when combined, can help you make the most of your AI interactions:
- Delegation: Deciding on what work should be done by humans, what work should be done by AI, and how to distribute tasks between them. Includes understanding your goals, AI capabilities, and making strategic choices about collaboration.
- Description: Effectively communicating with AI systems. Includes clearly defining outputs, guiding AI processes, and specifying desired AI behaviors and interactions.
- Discernment: Thoughtfully and critically evaluating AI outputs, processes, behaviors and interactions. Includes assessing quality, accuracy, appropriateness, and determining areas for improvement.
- Diligence: Using AI responsibly and ethically. Includes making thoughtful choices about AI systems and interactions, maintaining transparency, and taking accountability for AI-assisted work.
  Creating your first project
  Setting up a project takes just a few minutes. Here's how to get started:
  Step 1: Set up your project
  Step 2: Add project instructions
  Project instructions tell Claude how to behave across all conversations in this project. Click on "Instructions" to open the instructions panel.
  Good project instructions typically include:
  Context about what you're working on: "This project is for creating marketing content for our B2B software product."
  Process instructions: "First consider a blog structure that will entice this audience, then write the draft."
  Tone and style preferences: "Use a professional but conversational tone. Avoid jargon when possible."
  Specific requirements: "Always include a call-to-action at the end of marketing copy."
  Once you've written your instructions, click "Save instructions." These will apply to every chat in this project and work alongside any user preferences and styles you've set.
  You can also use project instructions to automate workflows — for example, "When I upload a meeting transcript, create a structured summary using this template." Think of instructions as programming Claude's behavior for this project.
  Step 3: Build your knowledge base
  在 claud 中使用 project 的步骤：

1. 创建 project
2. 设置“私有”或“公开”
3. 设置 instruction
4. 上传标的文档
   artivact 可分享、可发布。
   skill

- anthropic skills
- custom skills
  tools
  Enterprise Search
  管理员创建完成后全团队成员才能使用
  research 是 claud 的高级功能。若打开此功能，则 claud 会从多角度回答问题，并从 web 上搜索相关功能结合相关信息。
  claude code 在“结合上下文-执行动作-验证结果”之间循环。支持命令行、vscode、jed 等。
  claude 有几种模式：
- plan mode。读取相关文件，并搜索解决方案。
- xx
- xx
  shift + tab 可切换模式。
  在 claude 上学到的事情：

1. 搜索。使用计划模式（plan mode）。此时 claude 无法编辑文件。当 claude 列出计划后，再经过人工纠正后执行。
2. 计划。使用计划模式（plan mode）。此时 claude 无法编辑文件。
3. 编码
4. 提交。
   CLAUDE.md 中写入的内容，会作用于每次对话。
   命令：
   claude 进入与 claude 对话的界面。
   /exit 退出对话
   /compact 减少压缩对话内容。可以减少对话内容占用的窗口空间。当窗口空间所剩不多时，claude 会自动压缩。
   /clear 清空对话内容。不会关闭对话。常用于切换不同主题的对话。（不能切换回来）
   /init 读取并分享项目，在项目的根目录生成 CLAUDE.md 文件。
   /skills 列出 skills
   /mcp 列出并管理 mcp 服务器
   CLAUDE.md 文件

- 分目录层级
- 可以在 prompt 中让 claude 把特定内容写入 CLAUDE.md 文件。
- 以@开头的文件可被 claude 引用。
- 初始项目时不要创建 CLAUDE.md 文件。这样可以看到需要不断修正模型的地方。保持此文件简洁，并且只包含 claude 可以使用的必要信息。
- 有此文件时可提供高效的会话。因为此文件提供了上下文。
  claude 已经内置了一些子代理。coder 也可以创建特定的子代理。
- 带有 yaml frontmatter 的 md 文件。
- 此 md 文件包含有助于 claude 理解的配置信息。何时使用此子代理，
  - name
  - description 必须写在一行内。使 claude 知道何时使用此子代理
    - 添加更多具体例子
  - tools
  - model 指定要使用的 claude 模型。
    - Haiku 用于快速任务
    - Sonnet 介于二者之间
    - Opus 用于复杂分析
    - Inherit 使用于主对话相同的模型
  - color
  - location
  - xxx
- /agents 创建子代理的方法。再根据提示创建即可。
- 在此计算机上共享此子代理
- 在 prompt 中以“@agent”方式让 claude 调用子代理。
  保持对话窗口干净，可使 claude 高产。
  skill 包括：
- 指令
- 脚本
- 资源的文件夹
  skill 有 SKILL.md 文件
- name
- description 何时使用此 skill。
  个人 skill 文件在 .claude/skills 目录中
  项目 skill 文件在根目录的 .claude/skills 目录中
  skill 是用于特定任务的特性。用于特定任务的专业知识，以及代码标准。
  每次打开 claude 时都会加载 CLAUDE.md 文件。只会加载 skill 的 name/description，在需要使用 skill 时才加载全部 skill.
  claude 会在识别出需要使用 skill 时调用，不能手动调用 skill.
  model context protocol MCP 模型上下文协议，允许模型连接外部工具和数据源。
  claude mcp add 添加 mcp 服务器。（不确定：作用域是 project 级别。）
- 用 http 远程调用
- 本地的标准输入输出服务器
  mcp 的三种作用域：
- local
- user
- project 在项目的根目录中使用 .mcp.json 文件
  即使不使用 mcp，mcp 也会添加到会话中，包括 mcp 的工具。所以请禁用不需要用到的 mcp.可以改用 mcp 的 cli 版本。
  hooks 钩子。可以在 claude code 的生命周期的不同阶段运行命令。
- 到特定生命周期时总是运行
- 常用于自动格式化、记录运行的命令等。
- 配置在.claude/settings.json 中。
- 生命周期：
  - UserPromptSubmit 在 coder 提交 prompt 后，claude 处理 prompt 后执行
  - PreToolUse 在工具调用前执行 当返回 0 时正常执行，当返回 2 时阻止执行。
  - PostToolUse 在工具调用后执行
  - Notification 在 claude 发送通知后
  - Stop 在 claude 完成响应后
