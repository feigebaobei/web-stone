## 前言

在现在的低码行业中都收以组件为单位平铺式保存。此文描述一种树型结构。借鉴了 react 源码。
本文旨在说清数据结构、渲染逻辑，有些核心代码，无全部代码。

### 介绍概念

- 同级组件：以`prev`/`next`串联起来的组件。
- 根组件：`root`属性指向的组件是。
- 一级组件：根组件的同级组件。
- 子组件：当前组件的`headerChild`/`bodyChild`/`footerChild`指向的组件。
- 父组件：当前组件的`parent`指向的组件。
- 子组件与父组件是相对的。
- 二级组件：一级组件的子组件。
- 组件级别依次类推。
-

## 数据结构

```ts
type N = number
type S = string
type B = boolean
type A = any
type NS = N | S
type UniqueId = NS
type NSNull = NS | null
type UniqueIdNull = NSNull

interface App {
  id: N
  desc: S
  members: Member[]
  type: 'App'
}
interface Member {
  id: N
  name: S
  email: S
}
interface Page {
  id: N
  uuid: S
  firstChild: ComponentInfo
  lastChild: ComponentInfo // 预留字段
  type: 'Page'
}
interface ComponentInfo {
  // 保存在数据库的数据结构
  id: N
  props: A
  uuid: S
  pageId: N
  appId: N
  type: 'Component'
  // 下列字段指明是否有相关节点
  parentUniqueId: UniqueIdNull
  nextUniqueId: UniqueIdNull
  prevUniqueId: UniqueIdNull
  headerChildUniqueId: UniqueIdNull
  bodyChildUniqueId: UniqueIdNull
  footerChildUniqueId: UniqueIdNull
}
// type ComponentInfoNull = ComponentInfo | null
interface ComponentMeta extends ComponentInfo {
  // 在前端的store中的数据结构
  // 下列字段用于形成树型结构
  parent: ComponentMeta | Page
  next: ComponentMetaNull
  prev: ComponentMetaNull
  headerChild: ComponentMetaNull
  bodyChild: ComponentMetaNull
  footerChild: ComponentMetaNull
  parentSlot: ParentSlot // 在父组件的哪个槽里面
}
type ComponentMetaNull = ComponentMeta | null
type ParentSlot = '' | 'headerChild' | 'bodyChild' | 'footerChild'
```

## 助手函数

```js
// 创建组件
let createComponentInfo = (id: N, Props: A): ComponentInfo => {
    return {
        id,
        uuid: new Uuid(),
        props,
        parentUniqueId: null,
        nextUniqueId: null,
        prevUniqueId: null,
        headerChildUniqueId: null,
        bodyChildUniqueId: null,
        footerChildUniqueId: null,
    }
}
// 根据ComponentInfo生成ComponentMeta
let createComponentMetaByInfo = (compInfo: ComponentInfo): ComponentMeta => {
    // 方法体同下
    return {...}
}
// 根据ComponentMeta生成ComponentInfo
let getComponentInfoByCompMeta = (compMeta: ComponentMeta) => {
    return {
        xxx: compMeta.xxx
    }
}
let hasUniqueId = (uniqueId: UniqueId, id: N, uuid: S): B => {
    return [id, uuid].includes(uniqueId)
}
```

## uml

说清处理逻辑

```
        c                               s
  创建组件
  生成组件信息ComponentInfo ---------》创建id,并保存在数据库

  请求指定页面的组件 -----------------》 根据pageId选择出组件并返回
                  《-----------------
  处理为树型结构
  保存在store中
  使用store提供的方法，
  取出指定数据，再渲染。
```

## 定义 store

```ts
import { reactive } from 'vue'
import { defineStore } from 'pinia'
// 引入若干类型
// 引入若干助手函数
let useStore = defineStore('component', () => {
    let tree = reactive({
        root: null
    })
    let getRoot = () => (tree.root)
    // 创建节点
    let createComponentMetaByInfo = (compInfo: ComponentInfo): ComponentMeta => {
        return {
            ...compInfo,
            parent: null,
            next: null,
            prev: null,
            headerChild: null,
            bodyChild: null,
            footerChild: null,
            parentSlot: '',
        }
    }
    // 添加节点
    let mountComponent = (componentInfo: ComponentInfo): B => {
        let flag: B
        let componentMeta = createComponentMetaByInfo(componentInfo)
        if (tree.root) {
            if (!componentInfo.prevUniqueId && componentInfo.parentUniqueId) {
                flag = mountComponentChild(componentMeta)
            } else {
                flag = mountComponentNext(componentMeta)
            }
        } else {
            tree.root = componentMeta
        }
        return flag
    }
    let mountComponentNext = (componentMeta: ComponentMeta): B => {
        let flag: B = false
        let prevUniqueId = componentMeta.prevUniqueId
        let prevComp = getComponentByUniqueId(prevUniqueId)
        if (prevComp) {
            prevComp.next = componentMeta
            componentMeta.prev = prevComp
            componentMeta.parent = prevComp.parent
            componentMeta.parentSlot = prevComp.parentSlot
            // componentMeta.next保持为null
            flag = true
        }
        return flag
    }
    let mountComponentChild = (componentMeta: ComponentMeta): B => {
        let flag: B = false
        let parentComp = getComponentByUniqueId(componentMeta.parentUniqueId)
        if (parentComp) {
            if (hasUniqueId(parentComp.headerChildUniqueId componentMeta.id, componentMeta.uuid)) {
                parentComp.headerChild = componentMeta
                componentMeta.parent = parentComp
                componentMeta.parentSlot = 'headerChild'
                flag = true
            } else if (hasUniqueId(parentComp.bodyChildUniqueId componentMeta.id, componentMeta.uuid)) {
                parentComp.bodyChild = componentMeta
                componentMeta.parent = parentComp
                componentMeta.parentSlot = 'bodyChild'
                flag = true
            } else if (hasUniqueId(parentComp.footerChildUniqueId componentMeta.id, componentMeta.uuid)) {
                parentComp.footerChild = componentMeta
                componentMeta.parent = parentComp
                componentMeta.parentSlot = 'footerChild'
                flag = true
            }
        }
        return flag
    }
    // 得到节点
    let getComponentByUniqueId = (uniqueId: UniqueIdNull): ComponentMetaNull => {
        if (!uniqueId) return null
        let root = getRoot()
        if (root) {
            let queue = new Queue<ComponentMetaNull>()
            queue.enquene(root)
            let res = null
            while (queue.size()) {
                let cur = queue.dequene()
                if (hasUniqueId(uniqueId, cur.id, cur.uuid)) {
                    res = cur
                    break
                } else {
                    queue.push(cur.next)
                    queue.push(cur.headerChild)
                    queue.push(cur.bodyChild)
                    queue.push(cur.footerChild)
                }
            }
            return res
        } else {
            return null
        }
    }
    let getComponentByUniqueId2 = (uniqueId: UniqueIdNull, cur = getRoot()): ComponentMetaNull => {
        if (!cur) return null
        // let cur = start
        let res = null
        while (cur) {
            if (hasUniqueId(uniqueId, cur.id, cur.uuid)) {
                res = cur
                break
            } else {
                let res = getComponentByUniqueId(uniqueId, cur.next) || getComponentByUniqueId(uniqueId, cur.headerChild) || getComponentByUniqueId(uniqueId, cur.bodyChild) || getComponentByUniqueId(uniqueId, cur.footerChild)
            }
            cur = cur.next
        }
        return res
    }
    // 删除节点
    let removeComponent = (uniqueId: UniqueId): ComponentMetaNull => {
        let comp = getComponentByUniqueId(uniqueId)
        if (comp) {
            // comp.parent
            // comp.prev
            // comp.next
            if (comp.parent) { // 有父组件
                if (comp.prev) {
                    comp.prev.next = comp.next
                    if (comp.next) {
                        comp.next.prev = comp.prev
                    }
                } else {
                    comp.parent[comp.parentSlot] = comp.next
                    if (comp.next) {
                        comp.next.prev = null
                    }
                }
            } else { // 无父组件
                if (comp.prev) { // 有前组件
                    comp.prev.next = comp.next
                    if (comp.next) {
                        comp.next.prev = comp.prev
                    }
                } else { // 无前组件
                    tree.root = comp.next
                    if (comp.next) {
                        comp.next.prev = null
                    }
                }
            }
            return comp
        } else {
            return null
        }
    }
    // 插入节点
    let insertComponent = (compInfo: ComponentInfo, prevUniqueId: uniqueId): B => {
        let result = false
        if (!getRoot()) {
            mountComponent(compInfo)
            result = true
        } else {
            let comp = getComponentByUniqueId(prevUniqueId)
            if (comp) {
                let componentMeta = createComponentMetaByInfo(componentInfo)
                let nextComp = comp.next
                comp.next = compenentMeta
                comp.nextUniqueId = componentMeta.
                component.prev = comp
                component.parentSlot = comp.parentSlot
                if (nextComp) {
                    nextComp.prev = componentMeta
                    componentMeta.next = nextComp
                }
                result = true
            }
        }
        return result
    }
    // 不可以修改节点
    // 得到指定节点及同级其后节点
    let getAfterComponent = (uniqueId: UniqueId): ComponentMeta[] => {
        let comp = getComponentByUniqueId(uniqueId)
        let res: ComponentMeta[] = []
        if (comp) {
            let cur = comp
            while (cur) {
                res.push(cur)
                cur = cur.next
            }
        }
        return res
    }
    // 得到指定节点及同级其前节点
    let getBeforeComponent = (uniqueId: UniqueId): ComponentMeta[] => {
        let comp = getComponentByUniqueId(uniqueId)
        let res: ComponentMeta[] = []
        if (comp) {
            let cur = comp
            while (cur) {
                res.unshift(cur)
                cur = cur.prev
            }
        }
        return res
    }
    // 得到指定节点的同级节点
    let getSameLevelComponent = (uniqueId: UniqueId): ComponentMeta[] => {
        let comp = getComponentByUniqueId(uniqueId)
        let res: ComponentMeta[] = []
        if (comp) {
            let cur = comp
            while (cur) {
                res.unshift(cur)
                cur = cur.prev
            }
            cur = comp
            while (cur) {
                res.push(cur)
                cur = cur.next
            }
        }
        return res
    }
    let editComponentByUniqueId = (uniqueId: UniqueId, obj: <T extends {props: A}>): false | ComponentMeta => {
        let flag = false
        let comp = getComponentByUniqueId(uniqueId)
        if (comp) {
            comp.props = obj.props
            return comp
        }
        return flag
    }
    // 重排组件。必须原子性。
    let reorderComponent = (uniqueId: UniqueId, toPrevUniqueId: UniqueId): B => {
        let flagMap = {
            hasRemoved: false,
            hasInserted: false,
        }
        let compMeta = removeComponent(uniqueId)
        if (compMeta) {
            flagMpa.hasRemoved = true
            // compMeta.prevUniqueId = toPrevUniqueId
            // compMeta.parentUniqueId = toParentUniqueId
            flagMap.hasInserted = insertComponent(getComponentInfoByCompMeta(compMeta), toPrevUniqueId)
        }
        if (flagMap.hasRemoved && flagMap.hasInserted) {
            return true
        } else {
            return false
        }
    }
    return {
        tree,
        getRoot,
        ...
    }
})
export {
    useStore
}
```

## 在 vue 文件中使用 store 中的数据

```js
// 渲染所有的一级组件。
<Stack v-for="(item, index) in compList" :key="item.uuid" v-bind="item.props"></Stack>
...
import {useStore} from '../store.ts'
let componentStore = useStore()
let compList = ref<ComponentMeta[]>([])
req({...}) // 根据pageId获取当前页面的组件信息
.then(res => {
    if (res.code === 0) {
        res.data // 这是组件列表
            // 这里假设第一元素是当前页面的第一个组件。实现常与假设不同，实现情况做变通。
            .forEach(compInfo => { // 处理为一棵树。
                componentStore.mountComponent(compInfo)
            })
        let root = componentStore.getRoot()
        if (root) {
            compList.value = componentStore.getAfterComponent(root.uuid) // 取出一级组件
        }
    }
})
```

```js
// Stack.vue
// 示意如何递归渲染子组件。
<div>
    ...
    <div>
        <Stack v-for="(item, index) in headerCompList" :key="index" v-bind="item.props"></Stack>
    </div>
    <div>
        <Stack v-for="(item, index) in bodyCompList" :key="index" v-bind="item.props"></Stack>
    </div>
    <div>
        <Stack v-for="(item, index) in footerCompList" :key="index" v-bind="item.props"></Stack>
    </div>
</div>
let headerCompList = ref<ComponentMeta[]>(componentStore.getAfterComponent(props.headerChildUniqueId))
let bodyCompList = ref<ComponentMeta[]>(componentStore.getAfterComponent(props.bodyChildUniqueId))
let footerCompList = ref<ComponentMeta[]>(componentStore.getAfterComponent(props.footerChildUniqueId))
```

## 与后端接口交互

在数据库表中，每一条组件信息占用一行数据。

### createComponent

生成一个 id，再组织成 ComponentInfo 类型，保存在数据库中。

### removeComponent

1. 根据 uniqueId 找到要被删除的组件 dc。
2. 再找到相关的前面的组件 pc、后面的组件 nc、父组件 pac。
3. 修改相关组件
   - 若无 pc，也无 nc，则设置 pac 的指定子属性为 null
   - 若无 nc，则设置 pc 的 next 属性为 null.
   - 若无 pc，则设置 pac 的指定子属性为 nc。

### reorder

// 同级重排
// 跨级重排
// 子元素一起移动
payload: {
uniqueId,
prevUniqueId,
nextUniqueId,
}
let comp = sqlByUniqueId(payload.uniqueId)
com.prevUniqueId = com.prevUniqueId
com.nextUniqueId = com.nextUniqueId

### editComponent

修改数据后保存。
paylaod: {
uniqueId,
props,
}
let compInfo = sqlByUniqueId(payload.uniqueId)
compInfo.props = payload.props
saveCompInfo(compInfo)

## 与 store 的交互

store 中是树型结构。

### createComponent

let compInfo = createComponentInfo(...)
componentStore.mountComponent(compInfo)
componentStore.insertComponent(compInfo, prevUniqueId)

### removeComponent

componentStore.removeComponent(comp.uuid)

### reorder

let dropIndex // 放置后的组件的下标。
let dropBox // 放置后的组件的父组件。
let prevInde
compList //

componentStore.reorderComponent(compInfo, compList[dropIndex - 1])
let compMeta = componentStore.removeComponent(comp.uuid)
componentStore.mountComponent(getComponentInfoByCompMeta(compMeta))

compMeta = componentStore.removeComponent(dragItem.id || dragItem.uuid)
compInfo = getComponentInfoByCompMeta(compMeta)
let dropIndex = compList.findIndex(item => {
return hasUniqueId(dragItem.id || dragItem.uuid, item.id, item.uuid)
})
if (dropIndex) { // 非第一个
toPrevUniqueId = compList[dropIndex - 1].id || compList[dropIndex - 1].uuid
componentStore.reorderComponentNext(compInfo, toPrevUniqueId)
} else {
toParentUniqueId = compMeta.parentUniqueId
componentStore.reorderComponentChild(compInfo, toParentUniqueId)
}
// reorderComponent
// 分为：
// reorderComponentNext
// reorderComponentChild

### editComponent

let comp = componentStore.selectedComponent()
comp.props = ...

没有使用到 editComponent
