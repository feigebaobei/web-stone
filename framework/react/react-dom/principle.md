## render方法
react-consiler 正如其名，react的调解人。
这个包中使用了fiber去调解工作的。
fiber翻译是“纤维”。it世界中有进程、线程。react的团队搞出了纤维。控制粒度越来越细了。上层语言控制太细不是什么好事。
react居然的js的世界中使用同步渲染。细想一下，原来是为了控制dom元素。浏览器也是这么做的。js语言中大多是异步的。

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

## createPortal
```
function createPortal (
  children: ReactNodeList,
  container: Container,
  key: ?string = null,) {
      return createPortalImpl(children, container, null, key);
                    return {
                        $$typeof: REACT_PORTAL_TYPE,
                        key: key == null ? null : '' + key,
                        children,
                        containerInfo,
                        implementation,
                    };
  }
```
把参数整理为一个对象

## createRoot
function createRoot () {
    const root = createContainer(...);
                    return createFiberRoot(...)
                                let root = FiberRootNode(...)
                                createHostRootFiber(...)
    markContainerAsRoot(...);
    listenToAllSupportedEvents(...)
    return new ReactDOMRoot(root);
                    this._internalRoot = internalRoot;
}

## hydrateRoot
```
function hydrateRoot(
  container: Container,
  initialChildren: ReactNodeList,
  options?: HydrateRootOptions,) {
    warnIfReactDOMContainerInDEV(container) // 检测参数
    const root = createContainer(...)
    markContainerAsRoot(...)
    listenToAllSupportedEvents(...)
    return new ReactDOMRoot(root);
                    this._internalRoot = internalRoot;
}
```

## findDOMNode 返回dom节点
```
function findDOMNode (componentOrElement) {
  if ((componentOrElement: any).nodeType === ELEMENT_NODE) { // 8
    return (componentOrElement: any);
  }
  return findHostInstance(componentOrElement)
            const fiber = componentOrElement._reactInternals
            const hostFiber = findCurrentHostFiber(fiber);
                                    const currentParent = findCurrentFiberUsingSlowPath(fiber);
                                                                const alternate = fiber.alternate;
                                                                if (!alternate) {
                                                                    const nearestMounted = getNearestMountedFiber(fiber);
                                                                    if (nearestMounted !== fiber) {
                                                                        return null;
                                                                    }
                                                                    return fiber;
                                                                }
                                                                ...
                                                                return alternate;
                                    return currentParent !== null ? findCurrentHostFiberImpl(currentParent) : null;
                                                                        ...
                                                                        return currentParent
            return hostFiber.stateNode;
}
```

## flushSync
```
function flushSync(fn) {
    return flushSyncWithoutWarningIfAlreadyRendering(fn);
                if (...) {
                    flushPassiveEffects();
                        fn()
                        flushSyncCallbacks(); // 执行所有callback
                }
                setCurrentUpdatePriority(...)
                flushSyncCallbacks(...) // 执行所有callback
}
```

## hydrate
和render方法一样
```
function hydrate( element: React$Node, container: Container, callback: ?Function,) {
    return legacyRenderSubtreeIntoContainer(...)
                ...
}
```

## unmountComponentAtNode
```
function unmountComponentAtNode(container) {
    if (!isValidContainerLegacy(container)) {throw new Error(...)}
            return !!(
                node &&
                (node.nodeType === ELEMENT_NODE ||
                node.nodeType === DOCUMENT_NODE ||
                node.nodeType === DOCUMENT_FRAGMENT_NODE ||
                (node.nodeType === COMMENT_NODE &&
                    (node: any).nodeValue === ' react-mount-point-unstable '))
            );
}
```

## unstable_batchedUpdates
```
function batchedUpdates (fn, a) {
    try {
        return fn(a)
    } finally {
        resetRenderTimer();
        flushSyncCallbacksOnlyInLegacyMode();
            if (includesLegacySyncCallbacks) {
                flushSyncCallbacks();
            }
    }
}
```

## unstable_createEventHandle,
```
function createEventHandle( type, options? ) {
    if (enableCreateEventHandleAPI) {
        return (target, cb) => {
            addEventHandleToTarget(target, eventHandle); // 为target添加事件
            registerReactDOMEvent(target, domEventName, isCapturePhaseListener); // 注册事件
            const listener = createEventHandleListener(...) // 返回一个对象
            targetListeners.add(listener);
            return () => {
                targetListeners.delete(listener);
            }
        }
    }
    return null
}
```

## unstable_flushControlled,
```
function flushControlled (fn) {
    fn()
    resetRenderTimer();
    flushSyncCallbacksOnlyInLegacyMode()
        if (includesLegacySyncCallbacks) {
            flushSyncCallbacks();
                scheduleCallback()
                setCurrentUpdatePriority(...)
                isFlushingSyncQueue = false
        }
}
```
## unstable_isNewReconciler,
false

## unstable_renderSubtreeIntoContainer,
与render相同
```
function unstable_renderSubtreeIntoContainer () {
    return legacyRenderSubtreeIntoContainer(...);
}
```
## unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
```
function runWithPriority (...) {
    return fn
}
```
## version, // done



