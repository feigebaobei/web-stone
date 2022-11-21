# Jest 对象

方法
Mock Modules
jest.disableAutomock()
jest.enableAutomock()
jest.createMockFromModule(moduleName)
Jest 26.0.0+ 开始使用该命名
函数
类
对象
数组
基本类型
jest.mock(moduleName, factory, options)
jest.Mocked<Source>
jest.mocked(source, options?)
jest.unmock(moduleName)
jest.doMock(moduleName, factory, options)
jest.dontMock(moduleName)
jest.setMock(moduleName, moduleExports)
jest.requireActual(moduleName)
jest.requireMock(moduleName)
jest.resetModules()
jest.isolateModules(fn)
模拟函数
jest.fn(implementation?)
jest.isMockFunction(fn)
jest.spyOn(object, methodName)
jest.spyOn(object, methodName, accessType?)
jest.clearAllMocks()
jest.resetAllMocks()
jest.restoreAllMocks()
假的定时器
jest.useFakeTimers(fakeTimersConfig?)
jest.useRealTimers()
jest.runAllTicks()
jest.runAllTimers()
jest.runAllImmediates()
jest.advanceTimersByTime(msToRun)
jest.runOnlyPendingTimers()
jest.advanceTimersToNextTimer(steps)
jest.clearAllTimers()
jest.getTimerCount()
jest.setSystemTime(now?: number | Date)
jest.getRealSystemTime()
Misc
jest.setTimeout(timeout)
jest.retryTimes(numRetries, options)
Jest 对象
