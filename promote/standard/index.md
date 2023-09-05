# 编程能力不够高的人，不要制定规范，即使是抄别人的规范。

# 规范

## 类命名

常见的类的分类

- 网络类
- 解析类
- 设计模式类
- 结构类
- 过滤检测类
- 管理类
- 传播类
- 回调类
- 监控类
- 内存类

|            |                |                                    |                                                     |
| ---------- | -------------- | ---------------------------------- | --------------------------------------------------- |
| 网络类     |                |                                    |                                                     |
|            | XxxBootstrap   | XxxStarter                         | 启动器                                              |
|            | XxxProcessor   |                                    | 处理器                                              |
|            | XxxManager     |                                    | 管理                                                |
|            | XxxHolder      |                                    | 持有引用                                            |
|            | XxxFactory     |                                    | 工厂模式                                            |
|            | XxxProvider    |                                    | 策略模式+工厂模式                                   |
|            | XxxRegister    |                                    | 注册并管理                                          |
|            | XxxEngine      |                                    | 核心引擎                                            |
|            | XxxService     |                                    | 服务                                                |
|            | XxxTask        |                                    | 任务                                                |
| 解析类     |                |                                    |                                                     |
|            | XxxConverter   | XxxResolver                        | 转换、解析                                          |
|            | XxxParser      |                                    | 解析器                                              |
|            | XxxCustomizer  |                                    | 自定义配置                                          |
|            | XxxFormatter   |                                    | 格式化                                              |
|            | XxxPacket      |                                    | 用于网络编辑中的数据包                              |
|            | XxxProtocol    |                                    | 协议                                                |
|            | XxxEncoder     | XxxDecoder/XxxCodec                | 编码、解码                                          |
|            | XxxRequest     | XxxResponse                        | 请求、回馈                                          |
| 设计模式类 |                |                                    |                                                     |
|            | XxxStrategy    |                                    | 策略模式                                            |
|            | XxxAdapter     |                                    | 适配器                                              |
|            | XxxAction      | XxxCommand                         | 指令                                                |
|            | XxxEvent       |                                    | 事件                                                |
|            | XxxDelegate    |                                    | 委托模式                                            |
|            | XxxBuilder     |                                    | 构建                                                |
|            | XxxTemplate    |                                    | 模板                                                |
|            | XxxProxy       |                                    | 代理模式                                            |
| 结构类     |                |                                    |                                                     |
|            | XxxCache       |                                    | 缓存                                                |
|            | XxxBuffer      |                                    | 缓冲，用于写入阶段。                                |
|            | XxxComposite   |                                    | 组合                                                |
|            | XxxWrapper     |                                    | 包装                                                |
|            | XxxOption      | XxxParam/XxxAttribute              | 配置                                                |
|            | XxxTuple       |                                    | 元组                                                |
|            | XxxAggregator  |                                    | 聚合器                                              |
|            | XxxIterator    |                                    | 迭代器                                              |
|            | XxxBatch       |                                    | 批量执行                                            |
|            | XxxLimiter     |                                    | 限流器                                              |
| 过滤检测类 |                |                                    |                                                     |
|            | XxxPipeline    | XxxChain                           | 管道、责任链                                        |
|            | XxxFilter      |                                    | 过滤器                                              |
|            | XxxInterceptor |                                    | 拦截器                                              |
|            | XxxEvaluator   |                                    | 评估                                                |
|            | XxxDelector    |                                    | 探测器                                              |
| 管理类     |                |                                    |                                                     |
|            | Xxx            |                                    |                                                     |
| 传播类     |                |                                    |                                                     |
|            | XxxContext     |                                    | 环境                                                |
|            | XxxPropagator  |                                    | 以 context 的值进行复制、添加、清除、重置、检索等。 |
| 回调类     |                |                                    |                                                     |
|            | XxxHandler     | XxxCallback/XxxTrigger/XxxListener |                                                     |
|            | XxxAware       |                                    | 感知                                                |
| 监控类     |                |                                    |                                                     |
|            | XxxMetric      | 反对使用 Monitor                   | 监控                                                |
|            | XxxEstimator   |                                    | 估计、统计                                          |
|            | XxxAccumulator |                                    | 累加器                                              |
|            | XxxTracker     |                                    | 记录日志、监控值                                    |
| 内存类     |                |                                    |                                                     |
|            | XxxAllcator    |                                    | 分配空间                                            |
|            | XxxChunk       |                                    | 一块内存                                            |
|            | XxxArena       |                                    | 舞台                                                |
|            | XxxPool        |                                    | 池子                                                |
|            |                |                                    |                                                     |
|            | XxxUtil        | XxxHelper                          | 工具                                                |
|            | XxxMode        | XxxType                            | 枚举                                                |
|            | XxxInvoker     | XxxInvocation                      | 反射                                                |
|            | XxxInitializer |                                    | 初始化                                              |
|            | XxxFeture      | XxxPromise                         | 未来会得到结果的值                                  |
|            | XxxSelector    |                                    | 选择                                                |
|            | XxxReporter    |                                    | 汇报执行结果                                        |
|            | XxxConstants   |                                    | 常量列表                                            |
|            | XxxAccessor    |                                    | 通过计算完成 get/set                                |
|            | XxxGenerator   |                                    | 生成器                                              |
|            | Xxx            |                                    |                                                     |
|            | Xxx            |                                    |                                                     |
