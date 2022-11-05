# 介绍各方法的运行逻辑

## createPortal

## createRoot

v18 新增的方法，用于创建根节点。`FiberRootNode`类型。

```js
exports.createRoot = createRoot$1;
function createRoot$1(container, options) {
    // container dom
    return createRoot(container, options);
    function createRoot(container, options) {
        // 验证参数
        // 设置默认值
        var root = createContainer(container, ConcurrentRoot, null, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
            // 创建容器
            function createContainer(...) {
                // 设置值
                return createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
                function createFiberRoot(...) { // 返回一个经过初始化的根节点FiberRootNode
                    // return {// FiberRootNode
                    //     current: { // FiberNode
                    //         stateNode // 该FiberRootNode
                    //         memoizedState: {...} //
                    //         updateQueue: {...} //
                    //     }
                    // }
                    var root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError);
                    // root 是一个 FiberRootNode 对象
                                    function FiberRootNode (...) {...} // 这是一个很简单的构造函数
                    var uninitializedFiber = createHostRootFiber(tag, isStrictMode); // 得到一个 FiberNode 对象
                    // uninitializedFiber 在原码中是 Fiber 类型，就是FiberNode构造方法的实例
                    // 正如其名 uninitializedFiber 中好多属性的值是null
                    // 下面会调用FiberNode方法
                    function createHostRootFiber(...) {
                        // 赋值node
                        return createFiber(HostRoot, null, null, mode);
                        var createFiber = function (tag, pendingProps, key, mode) {
                            return new FiberNode(tag, pendingProps, key, mode);
                            function FiberNode(tag, pendingProps, key, mode) {} // 这是一个很简单的构造函数
                            // 很多属性都是null
                        };
                    }
                    root.current = uninitializedFiber;
                    uninitializedFiber.stateNode = root; // 把 FiberRootNode赋值给FiberNode对象的stateNode属性了。
                    initializeUpdateQueue(uninitializedFiber);
                    function initializeUpdateQueue(fiber) {
                        // 初始化fiber的updateQueue属性
                        fiber.updateQueue = {
                            baseState: fiber.memoizedState,
                            firstBaseUpdate: null,
                            lastBaseUpdate: null,
                            shared: {
                                pending: null,
                                interleaved: null,
                                lanes: NoLanes
                            },
                            effects: null
                        };
                    }
                    return root
                }
            }
        markContainerAsRoot(root.current, container);
            function markContainerAsRoot(hostRoot, node) { // 设置dom元素的`${__reactContainer$}randomKey`属性为fiber
                node[internalContainerInstanceKey] = hostRoot;
                var internalContainerInstanceKey = '__reactContainer$' + randomKey;
            }
        var rootContainerElement = container.nodeType === COMMENT_NODE ? container.parentNode : container;
        listenToAllSupportedEvents(rootContainerElement);
            // 本文件在一开始时就执行了
            // registerSimpleEvents(); // 注册简单的事件
            // registerEvents$2();     // 注册鼠标的滑动事件
            // registerEvents$1();     // 注册表单事件
            // registerEvents$3();     // 注册鼠标的按键事件
            // registerEvents();       // 注册输入事件
            // 执行完这些方法后，allNativeEvents就有好多事件名了。
            function listenToAllSupportedEvents(rootContainerElement) {
                allNativeEvents.forEach(function (domEventName) { // 为该dom元素添加所有支持的事件
                    // 区分是否可委托
                    // 基于addEventListener监听事件
                    listenToNativeEvent(domEventName, false, rootContainerElement);
                    function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
                        // ...
                        addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener);
                        function addTrappedEventListener(...) {
                            var listener = createEventListenerWrapperWithPriority(targetContainer, domEventName, eventSystemFlags)
                            function createEventListenerWrapperWithPriority(targetContainer, domEventName, eventSystemFlags) { // 返回listenerWrapper
                                var eventPriority = getEventPriority(domEventName);
                                function getEventPriority(...) {} // 得到事件的优先级
                                switch (eventPriority) {
                                    case DiscreteEventPriority:
                                        listenerWrapper = dispatchDiscreteEvent;
                                        function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
                                            var previousPriority = getCurrentUpdatePriority();
                                            function getCurrentUpdatePriority() { // 返回当前更新优先级
                                                return currentUpdatePriority;
                                                // 该文件的上文中有 var currentUpdatePriority = NoLane;
                                            }
                                            var prevTransition = ReactCurrentBatchConfig.transition;
                                            ReactCurrentBatchConfig.transition = null;
                                            try {
                                                setCurrentUpdatePriority(DiscreteEventPriority); // 设置优先级
                                                dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
                                            } finally {
                                                setCurrentUpdatePriority(previousPriority);
                                                ReactCurrentBatchConfig.transition = prevTransition;
                                            }
                                        }
                                        break;
                                    case ContinuousEventPriority:
                                        listenerWrapper = dispatchContinuousEvent;
                                        break;
                                    case DefaultEventPriority:
                                    default:
                                        listenerWrapper = dispatchEvent; // 这个方法中有很多方法
                                        break;
                                }

                            }
                        }
                    }
                }
            }
        return new ReactDOMRoot(root);
            function ReactDOMRoot(internalRoot) { // 这是一个构造函数。
                this._internalRoot = internalRoot;
            }
            // 它有原型对象上有2个属性
            ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function (children) {
                var root = this._internalRoot; // FiberRootNode
                updateContainer(children, root, null, null);
                    function updateContainer(element, container, parentComponent, callback) {
                        onScheduleRoot(container, element);
                            function onScheduleRoot(root, children) {...}
                        var current$1 = container.current; // FiberNode
                        var eventTime = requestEventTime(); // 分情况返回一个时刻。返回-1或当前时刻。currentEventTime的默认值是-1。
                            function requestEventTime() {
                                if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
                                    return now();
                                }
                                if (currentEventTime !== NoTimestamp) { // 上文中执行了 var currentEventTime = NoTimestamp;
                                    return currentEventTime;
                                }
                                currentEventTime = now();
                                return currentEventTime;
                            }
                        var lane = requestUpdateLane(current$1); // 返回一个优先级值
                        var context = getContextForSubtree(parentComponent);
                            function getContextForSubtree(parentComponent) {
                                var fiber = get(parentComponent); //
                                var parentContext = findCurrentUnmaskedContext(fiber); // 好像是返回了context
                                ...
                                return parentContext;
                            }
                        ...
                        var update = createUpdate(eventTime, lane);
                            function createUpdate(eventTime, lane) {
                            var update = {
                                eventTime: eventTime,
                                lane: lane,
                                tag: UpdateState, // 上面运行了 var UpdateState = 0;
                                payload: null,
                                callback: null,
                                next: null
                            };
                            return update;
                            }
                        update.payload = {
                            element: element
                        };
                        if (callback !== null) {
                            ...
                            update.callback = callback;
                        }
                        enqueueUpdate(current$1, update); // 加入到更新队列
                            function enqueueUpdate(fiber, update, lane) {
                                var updateQueue = fiber.updateQueue;
                                if (updateQueue === null) {
                                    return;
                                }
                                var sharedQueue = updateQueue.shared;
                                // ... 创建一个环
                                // if (isInterleavedUpdate(fiber)) {
                                //     var interleaved = sharedQueue.interleaved;
                                // } else {
                                // }
                            }
                        var root = scheduleUpdateOnFiber(current$1, lane, eventTime);
                            function scheduleUpdateOnFiber(fiber, lane, eventTime) {
                                checkForNestedUpdates(); // 检测
                                    function checkForNestedUpdates() {
                                    }
                                var root = markUpdateLaneFromFiberToRoot(fiber, lane);
                                    function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
                                    }
                            }





                    }
            }
            ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function () {
                // 检测
                flushSync(function () {
                    updateContainer(null, root, null, null);
                });
                unmarkContainerAsRoot(container);
            }
    }

}
```

## findDOMNode

返回 dom

```js
function findDOMNode(componentOrElement) {
  if (componentOrElement == null) {
    return null
  }
  if (componentOrElement.nodeType === ELEMENT_NODE) {
    return componentOrElement
  }
  return findHostInstanceWithWarning(componentOrElement, 'findDOMNode')
}
```

## flushSync

## hydrate

## hydrateRoot

## render

已经在 v18 中不支持了。

## unmountComponentAtNode

## unstable_batchedUpdates

## unstable_renderSubtreeIntoContainer

# 各对象

## ReactElement

这是 react 包中生成的对象。

```js
{
  "type": "h1", // html标签
  "key": null,  // 惟一键
  "ref": null,
  "props": {
    "children": "title"
  },
  "_owner": null,
  "_store": {}
}
```

## FiberNode

```js
{
  "tag": 5,
  "key": null,          // key 兄弟间惟一
  "elementType": null,  // 构造函数 | html标签
  "type": null,         // 与elementType相同值，不知道为什么。
  "stateNode": null,    // dom | FiberRootNode
  "return": null,       // 父 FiberNode
  "child": null,        // 第一个子元素
  "sibling": null,      // 后面的第一个兄弟元素
  "index": 0,           // 兄弟间下标
  "ref": null,          // ref
  "pendingProps": {
    "children": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": "title"
      },
      "_owner": null,
      "_store": {}
    }
  },
  "memoizedProps": null,
  "updateQueue": null,      // 更新队列
  "memoizedState": null,    // 当前状态。初始化FiberNode节点时会赋初始值。好像与双缓存有关
  "dependencies": null,
  "mode": 3,
  "flags": 0,
  "subtreeFlags": 0,
  "deletions": null,
  "lanes": 0,
  "childLanes": 0,
  "alternate": null,
  "actualDuration": 0,      //
  "actualStartTime": -1,    // 好像是开始更新的时刻，相对于根组件被创建的时间。
  "selfBaseDuration": 0,
  "treeBaseDuration": 0,
  "_debugSource": null,
  "_debugOwner": null,
  "_debugNeedsRemount": false,
  "_debugHookTypes": null
}
```

## FiberRootNode

`FiberRootNode`不是基于`FiberNode`的。  
FiberRootNode 和 FiberNode 是二个独立的构造方法。

```js
{
  "tag": 1,
  "containerInfo": {},      // 就是createRoot的第一个参数。dom类型。
  "pendingChildren": null,
  "current": null,          // FiberNode。它是在createRoot方法中被设置的。
  "pingCache": null,
  "finishedWork": null,
  "timeoutHandle": -1,
  "context": null,
  "pendingContext": null,
  "callbackNode": null,
  "callbackPriority": 0,
  "eventTimes": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  "expirationTimes": [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
  "pendingLanes": 0,
  "suspendedLanes": 0,
  "pingedLanes": 0,
  "expiredLanes": 0,
  "mutableReadLanes": 0,
  "finishedLanes": 0,
  "entangledLanes": 0,
  "entanglements": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  "identifierPrefix": "",
  "mutableSourceEagerHydrationData": null,
  "effectDuration": 0,
  "passiveEffectDuration": 0,
  "memoizedUpdaters": {},
  "pendingUpdatersLaneMap": [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
  "_debugRootType": "createRoot()"
}
```

# uml

```
{ // ReactDOMRoot
    _internalRoot: { // FiberRootNode
        current: { // FiberNode
            stateNode: 指向父节点
            memoizedState: 保存当前状态
            updateQueue
            ...
        }
        containerInfo: { // dom
            `__reactContainer$${randomKey}`: 指向父节点的current属性 // FiberNode
            `_reactListening${randomKey}`: 是否添加监听功能
        }
        ...
    },
    prototype: {
        render()
        unmount()
    }
}
```

## fiber 对象链

## title

## title

## title

## title

```js
createRoot(container, options?) {
  return createRootImpl(container, options);
            if (!isValidContainer(container)) {
              <!-- error -->
            }
            warnIfReactDOMContainerInDEV(container);
            const root = createContainer(
              container,
              ConcurrentRoot,
              null,
              isStrictMode,
              concurrentUpdatesByDefaultOverride,
              identifierPrefix,
              onRecoverableError,
              transitionCallbacks,
            );
                          return createFiberRoot(
                            containerInfo,
                            tag,
                            hydrate,
                            initialChildren,
                            hydrationCallbacks,
                            isStrictMode,
                            concurrentUpdatesByDefaultOverride,
                            identifierPrefix,
                            onRecoverableError,
                            transitionCallbacks,
                          );
                                    const root: FiberRoot = (new FiberRootNode(
                                      containerInfo,
                                      tag,
                                      hydrate,
                                      identifierPrefix,
                                      onRecoverableError,
                                    ): any); // 返回一个FiberRoot对象
                                    const uninitializedFiber = createHostRootFiber(
                                      tag,
                                      isStrictMode,
                                      concurrentUpdatesByDefaultOverride,
                                    );
                                                                  // 判断出mode
                                                                  return createFiber(HostRoot, null, null, mode);
                                                                            return new FiberNode(tag, pendingProps, key, mode); // 返回一个Fiber对象
                                    root.current = uninitializedFiber; // 搞了一个循环
                                    uninitializedFiber.stateNode = root;
                                    initializeUpdateQueue(uninitializedFiber); // init 更新队列
                                    return root;


            listenToAllSupportedEvents(rootContainerElement); // 监听事件
            return new ReactDOMRoot(root);
                          ReactDOMRoot.prototype.render(children)
                            updateContainer(children, root, null, null);
                          ReactDOMRoot.prototype.unmount()
                            flushSync(() => {
                              updateContainer(null, root, null, null);
                            });
                            unmarkContainerAsRoot(container);
}
render(element, container, callback)
    if (!isValidContainerLegacy(container)) { // 检查是否合法
        throw new Error('Target container is not a DOM element.');
    }
    return legacyRenderSubtreeIntoContainer(
        null,
        element,
        container,
        false,          // forceHydrate
        callback,
    );
                const maybeRoot = container._reactRootContainer;
                let root: FiberRoot;
                if (!maybeRoot) {
                    // Initial mount
                    root = legacyCreateRootFromDOMContainer(
                    container,
                    children,
                    parentComponent,
                    callback,
                    forceHydrate,
                    );
                                let rootSibling;
                                // 删除所有已经存在的元素
                                while ((rootSibling = container.lastChild)) {
                                container.removeChild(rootSibling);
                                }
                                const root = createContainer( // 上面提到了这个方法
                                    container,
                                    LegacyRoot,
                                    null, // hydrationCallbacks
                                    false, // isStrictMode
                                    false, // concurrentUpdatesByDefaultOverride,
                                    '', // identifierPrefix
                                    noopOnRecoverableError, // onRecoverableError
                                    null, // transitionCallbacks
                                );
                                container._reactRootContainer = root;
                                markContainerAsRoot(root.current, container); // 设置标记。在检查root时会用到。
                                listenToAllSupportedEvents(rootContainerElement);
                                flushSync(() => {
                                    updateContainer(initialChildren, root, parentComponent, callback);
                                });
                                return root;

                } else {
                    root = maybeRoot;
                    if (typeof callback === 'function') {
                    const originalCallback = callback;
                    callback = function() {
                        const instance = getPublicRootInstance(root);
                        originalCallback.call(instance);
                    };
                    }
                    // Update
                    updateContainer(children, root, parentComponent, callback);
                }
                // 上面处理了一遍root, 现在返回root
                return getPublicRootInstance(root);
                            const containerFiber = container.current; // FiberRoot
                            if (!containerFiber.child) {
                                return null;
                            }
                            switch (containerFiber.child.tag) {
                                case HostSingleton:
                                case HostComponent:
                                    return getPublicInstance(containerFiber.child.stateNode); // 这里引入的文件中无此方法。我在ReactARTHostConfig.js中找到了同名方法。此方法直接返回参数。
                                default:
                                    return containerFiber.child.stateNode;
                            }



```

```js
FiberRoot: {
  tag = tag;
  containerInfo = containerInfo;
  pendingChildren = null;
  current = null; // 未来会被赋值 Fiber 对象
  pingCache = null;
  finishedWork = null;
  timeoutHandle = noTimeout;
  context = null;
  pendingContext = null;
  callbackNode = null;
  callbackPriority = NoLane;
  eventTimes = createLaneMap(NoLanes);
  expirationTimes = createLaneMap(NoTimestamp);
  pendingLanes = NoLanes;
  suspendedLanes = NoLanes;
  pingedLanes = NoLanes;
  expiredLanes = NoLanes;
  mutableReadLanes = NoLanes;
  finishedLanes = NoLanes;
  errorRecoveryDisabledLanes = NoLanes;
  entangledLanes = NoLanes;
  entanglements = createLaneMap(NoLanes);
  hiddenUpdates = createLaneMap(null);
  identifierPrefix = identifierPrefix;
  onRecoverableError = onRecoverableError;
  ...
}
```
