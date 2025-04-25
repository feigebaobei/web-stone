# chrome.tabs

> chrome.tabs 可与浏览器的标签页系统交互。可创建、修改、重排标签页。
> 可检测标签页的语言、截取屏幕截图，与内容脚本通信。
> 在当前聚集的窗口检索活跃标签页，被视为用户的当前标签页。

## 权限

|           |                                                            |     |     |
| --------- | ---------------------------------------------------------- | --- | --- |
| tabs      |                                                            |     |     |
| activeTab | 会在响应用户调用时向扩展程序授予当前标签页的临时主机权限。 |     |     |

## demo

```js
// background.js
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    url: 'onboarding.html'
  }
})

// 获取当前tab页面
function getCurrentTab(cb) {
  let q = { active: true, lastFocusedWindow: true }
  chrome.tabs.query(q, ([tab]) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
      cb(tab)
    }
  })
}
// 设置指定tab页静音
async function toggleMuteState(tabId) {
  let tab = await chrome.tabs.get(tabId)
  let muted = !tab.mutedInfo.muted
  await chrome.tabs.update(tabId, { muted })
}

chrome.tabs.move(tabId, { index: 0 }) // 移到第一个位置。返回promise对象

await chrome.tabs.sendMessage(tabId, message) // 与特定标签页通信
```

## type

```ts
interface MutedInfo {
  extensionId: S // 改变了静音状态的扩展程序id
  muted: B // 是否静音状态
  reason?: MutedInfoReason // 改变静音状态的原因
}
interface MutedInfoReason {
  // enum
  // ...
}
interface Tab {
  active: B // 是否是激活状态
  audible?: B //
  autoDiscardable: B
  discarded: B
  favIconUrl?: S
  frozen: B
  groupId: N
  height?: N
  highlighted: B
  id?: N
  incognito: B
  index: N // 在当前window中的序号。从0开始。
  lastAccessed: N
  mutedInfo?: MutedInfo
  openerTabId?: N
  pendingUrl?: S
  pinned: B
  selected: B // deprecated
  sessionId?: S
  status?: TabStatus
  title?: S
  url?: S
  width?: N
  windowId: N
}
type TabStatus = 'unloaded' | 'loading' | 'complete'
type WindowType = 'normal' | 'popup' | 'panel' | 'app' | 'devtools'
ZoomSettings
```

## api

```ts
captureVisibleTab(windowId?: N, options?: ImageDetails, cb?: (dataUrl: S) => void) => P // 获取显示区域
connect(tabId: N, connectInfo?: {documentId: S, frameId: N, name: S}) => runtime.port // 与指定tab页的内容脚本通信
create(createProperties: {xxxx}, cb?: (tab: Tab) => void) // 创建新tab页面
detectLanguage(tabId?: N, cb?: (language: S) => void) // 检测tab页面的内容的主要语言
discard(tabId?: N, cb?: (tab: Tab) => void) // 舍弃标签页。舍弃的标签页仍会显示在标签栏中，并会在激活后重新加载。
duplicate(tabId: N, cb?: (tab: Tab) => void) // 复制标签页
get(tabId: N, cb?: (tab: Tab) => void) => P<Tab> // 复制标签页
getCurrent(cb?: (tab: Tab) => void) => P<Tab | undefined> // 获取发出此脚本调用的标签页。如果从非标签页上下文（例如背景页面或弹出式窗口视图）调用，则返回 undefined。
getZoom(tabId?: N, cb?: (zoomFactor: N) => void) => P<N> // 获取当前缩放比例
getZoomSettings(tabId?: N, cb?: (zoomSettings: ZoomSettings) => void) => P<ZoomSettings> // 获取当前缩放比例
goBack(tabId?: N, cb?: () => void) => P<void> // 返回上一页（如果有）
goForward(options: {createProperties: {windowId: N}, groupId: N, tabIds: N[]}, cb?: (groupId: N) => void) => P<N> // 将一个或多个标签页添加到指定的组；如果未指定组，则将给定标签页添加到新创建的组。
highlight(highlightInfo: {
    ...
    windowId: N
}, cb?: (window: Window) => void) => P<windows.Window> // 返回上一页（如果有）
move(tabIds: N | N[], moveProperties: {index: N, windowId: N}, cb?: (tabs: Tab | Tab[]) => void) => P<Tab | Tab[]> // 将一个或多个标签页移至其窗口中的新位置，或移至新窗口。请注意，标签页只能在普通窗口（window.type === "normal"）之间移动。
query(queryInfo: {
    active: B
    audible: B // 标签页是否可听。
    autoDiscardable: B // 浏览器在资源不足时是否可以自动舍弃标签页。
    currentWindow: B
    groupId: N
    index: N
    lastFocusedWindow?: B
    status?: TabStatus
    title: S
    url?: S
    window: N
    windowType?: WindowType
}, cb?: (result: Tab[]) => void) => P<Tab[]> // 获取具有指定属性的所有标签页，如果未指定任何属性，则获取所有标签页。
reload(tabId?: N, reloadProperties?: {bypassCache}, cb?: () => void) => P<void> // 重新加载标签页。
remove(tabIds?: N | N[], cb?: () => void) => P<void> // 关闭一个或多个标签页。
sendMessage(tabId: N, message: any, option?: {documentId?: S, frameId?: N}, cb?: (response: A) => void) => P<A> // 返回上一页（如果有）
setZoom(tabId?: N,
zoomFactor: N, // 值为 0 会将标签页设为其当前的默认缩放比例。大于 0 的值用于为标签页指定（可能非默认的）缩放比例。
cb?: () => void) => P<void> // 缩放指定标签页。
setZoomSettings(tabId?: N, zoomSettings: ZoomSettins, cb?: () => void) => P<void> // 为指定标签页设置缩放设置，这些设置用于定义如何处理缩放更改。在浏览标签页时，这些设置会重置为默认设置。
ungroup(tabIds: N | N[], cb?: () => void) => P<void> // 从相应分组中移除一个或多个标签页。如果任何组变为空组，系统都会将其删除。
update(tabId?: N, updateProperties: {...}, cb?: () => void) => P<void> //修改标签页的属性。系统不会修改未在 updateProperties 中指定的属性。
```

## 事件

```ts
onActivated(cb: (activeInfo: {tabId: N, windowId: N}) => void) // 当窗口中的活动标签页发生变化时触发。
onAttached(cb: (tabId: N, attachInfo: {newPosition: N, newWindowId}) => void) // 在标签页附加到窗口时触发；例如，由于标签页在窗口之间移动。
onCreated(cb: (tab: Tab) => void) // 在创建标签页时触发。
onDetached(cb: (tabId: N, detachInfo: {oldPosition: N, oldWindowId: N}) => void) // 在标签页与窗口分离时触发；例如，由于标签页在窗口之间移动。
onHighlighted(cb: (highlightInfo: {tabIds: N[], windowId: N}) => void) // 当窗口中的突出显示或选定的标签页发生变化时触发。
onMoved(cb: (tabId: N, moveInfo: {fromIndex: N, toIndex: N, windowId: N}) => void) // 当标签页在窗口中移动时触发。
onRemoved(cb: (tabId: N, removeInfo: {isWindowClosing: B, windowId: N}) => void) // 在标签页关闭时触发。
onReplaced(cb: (addedTabId: N, removedTabId: N) => void) // 当标签页因预渲染或即时呈现而被替换为其他标签页时触发。
onUpdated(cb: (tabId: N, changeInfo: O, tab: Tab) => void) // 在标签页更新时触发。
onZoomChange(cb?: (ZoomChangeInfo: O) => void) // 在放大标签页时触发。
```
