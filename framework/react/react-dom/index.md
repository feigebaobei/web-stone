# `react-dom`

## overview
> TODO: description

### feature
- feature0
- feature1
- feature2

## install
`npm i react-dom`

## usage
同`./demo.md`
```
const react-dom = require('react-dom');
// or
// import react-dom from 'react-dom';
// TODO: DEMONSTRATE API
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`react-dom.fn(param, first: string, second: boolean = true) => void`
description

`react-dom.fn(param, [options: {a: string, b?: number}])`
description

## principle
## render方法
```
function render {
    return legacyRenderSubtreeIntoContainer  // 从名字上判断，它应该是一个兼容老react代码的方法。
        legacyCreateRootFromDOMContainer
            let root = createContainer(...) // 创建一个特定的FiberRoot
                            return createFiberRoot // 返回创建好的fiber的根节点
                                        FiberRootNode // 这是最基本的创建FiberRoot的方法
                                        createHostRootFiber // 返回特定的fiber
                                            return createFiber // 
                                                        return new FiberNode // 这是最基于的、返回一个FiberNode
                                        createCache // 创建缓存
                                        initializeUpdateQueue // 初始化更新队列。
                                            fiber.updateQueue = queue; // 赋值为queue对象（大多属性为null）。
            markContainerAsRoot // 做标记
                node[internalContainerInstanceKey] = hostRoot;
            listenToAllSupportedEvents // 为元素添加所有支持的事件监听器
                没看到可以运行下去。
            return root;
}
```
`render`方法就做了：创建一个`FiberRoot`对象并返回。
### FiberRoot对象能做什么？

### FiberRootNodex对象
```
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.isDehydrated = hydrate;
  this.callbackNode = null;
  this.callbackPriority = NoLane;
  this.eventTimes = createLaneMap(NoLanes);
  this.expirationTimes = createLaneMap(NoTimestamp);

  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;

  this.entangledLanes = NoLanes;
  this.entanglements = createLaneMap(NoLanes);

  this.identifierPrefix = identifierPrefix;
  this.onRecoverableError = onRecoverableError;
    ...
```

### FiberNode对象
```

                                                // Instance
                                                this.tag = tag;
                                                this.key = key;
                                                this.elementType = null;
                                                this.type = null;
                                                this.stateNode = null;

                                                // Fiber
                                                this.return = null;
                                                this.child = null;
                                                this.sibling = null;
                                                this.index = 0;

                                                this.ref = null;

                                                this.pendingProps = pendingProps;
                                                this.memoizedProps = null;
                                                this.updateQueue = null;
                                                this.memoizedState = null;
                                                this.dependencies = null;

                                                this.mode = mode;

                                                // Effects
                                                this.flags = NoFlags;
                                                this.subtreeFlags = NoFlags;
                                                this.deletions = null;

                                                this.lanes = NoLanes;
                                                this.childLanes = NoLanes;

                                                this.alternate = null;
```

## jsx

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。