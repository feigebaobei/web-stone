# 配置文件

配置 Jest
选项
参考
automock [boolean]
bail [number | boolean]
cacheDirectory [string]
clearMocks [boolean]
collectCoverage [boolean]
collectCoverageFrom [array]
coverageDirectory [string]
coveragePathIgnorePatterns [array<string>]
coverageProvider [string]
coverageReporters [array<string | [string, options]>]
coverageThreshold [object]
dependencyExtractor [string]
displayName [string, object]
errorOnDeprecated [boolean]
extensionsToTreatAsEsm [array<string>]
fakeTimers [object]
forceCoverageMatch [array<string>]
globals [object]
globalSetup [string]
globalTeardown [string]
haste [object]
injectGlobals [boolean]
maxConcurrency [number]
maxWorkers [number | string]
moduleDirectories [array<string>]
moduleFileExtensions [array<string>]
moduleNameMapper [object<string, string | array<string>>]
modulePathIgnorePatterns [array<string>]
modulePaths [array<string>]
notify [boolean]
notifyMode [string]
Modes
preset [string]
prettierPath [string]
projects [array<string | ProjectConfig>]
reporters [array<moduleName | [moduleName, options]>]
Default Reporter
GitHub Actions Reporter
Summary Reporter
Custom Reporters
resetMocks [boolean]
resetModules [boolean]
resolver [string]
restoreMocks [boolean]
rootDir [string]
roots [array<string>]
runner [string]
sandboxInjectedGlobals [array<string>]
setupFiles [array]
setupFilesAfterEnv [array]
slowTestThreshold [number]
snapshotFormat [object]
snapshotResolver [string]
snapshotSerializers [array<string>]
testEnvironment [string]
testEnvironmentOptions [Object]
testFailureExitCode [number]
testMatch [array<string>]
testPathIgnorePatterns [array<string>]
testRegex [string | array<string>]
testResultsProcessor [string]
testRunner [string]
testSequencer [string]
testTimeout [number]
transform [object<string, pathToTransformer | [pathToTransformer, object]>]
transformIgnorePatterns [array<string>]
unmockedModulePathPatterns [array<string>]
verbose [boolean]
watchPathIgnorePatterns [array<string>]
watchPlugins [array<string | [string, Object]>]
watchman [boolean]
workerIdleMemoryLimit [number|string]
// [string]

Jest 的理念在默认配置就能运行得很好，但有些时候我们还是需要发挥配置的功效。
建议编写一个专用的 Javascript、Typescript 或 JSON 格式的配置文件，这样方便对配置进行维护。 Jest 会自动查找目录下文件名为 jest.config.js|ts|mjs|cjs|json 的配置文件， 你也可以使用 --config 参数传入配置文件的绝对路径。

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
