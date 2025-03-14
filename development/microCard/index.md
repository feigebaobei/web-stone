# 前端微卡片 microCard

## 能解决的事情

基于现有前端组件以微卡片形式得到若干功能模块。

### 目标

- 每个功能以微卡片形式存在，足够独立。可以多次复用。
- 微卡片粒度可以足够小。要达到可以组合、嵌套的标准。
- 通过拼装微卡片支持一条前端业务线。
- 先做试点，再发展其他业务方向。

### 做微卡片的易点&难点

|          | 易点                               | 难点                         | 解决方案                                                                                 |
| -------- | ---------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| 功能模块 | 抽象为组件。从业务逻辑得到功能模块 | 复用该功能模块               | 分治法。模块内做技术逻辑。模块外（即项目内）做业务逻辑。                                 |
| 通信     |                                    | 微卡片之间通信（即：数据流） | 中介模式。所有卡片在基座注册（及注销）。coder 在写业务逻辑时调用基座中的方法去操作卡片。 |
| 体积     |                                    | 微卡片的体积大。             | 提取微卡片的共用逻辑到基座中。                                                           |
|          |                                    | 基座支持有限功能。           | 创建一个盒子。用户可以在盒子中放入插件。盒子中有什么插件在项目就能使用什么功能。         |

## 概念介绍

|                      |                                                                          |     |
| -------------------- | ------------------------------------------------------------------------ | --- |
| 微上午（简称：卡片） | 本质是组件。内部写技术逻辑，不写业务逻辑。由基础级组件或物料级组件组成。 |     |
| 基座                 | 连接起当前项目的所有微卡片。处理微卡片之间通信。提供若干 api.            |     |
| 模块                 | 可独立完成一块功能的代码                                                 |     |
| 卖点                 | 产品对外宣传的功能。有时是主要功能。                                     |     |
| coder                | 写代码的人                                                               |     |
| 富代码               |                                                                          |     |
| 微前端               |                                                                          |     |
| 物料组件             | 基于基础组件封装的组件                                                   |     |

## 解决方法

```

                |----------| |------| |-----------| |-----------| |-----------|
        |-------|--|       | |      | |           | |           | |           |
        | 模块0  |  |       | |      | |   form    | |   table   | | pagination|
        |-------|--|       | |  业  | |-----------| |-----------| |-----------|
                |    基座   | |  务  |
        |-------|--|       | |  代  | |-----------| |-----------| |-----------|
        | 模块1  |  |       | |  码  | |           | |           | |           |
        |-------|--|       | |      | |  card3    | |  card4    | |  card5    |
                |          | |      | |-----------| |-----------| |-----------|
        |-------|--|       | |------|
        | 模块2  |  |       |----------------------------------------------------------|
        |-------|--|                                                                  |
                |---------------------------------------------------------------------|
```

### 核心设计思路

```
    |--------------------------|
    |            卡片           |
    |                          |
    |    |-----------|         |
    |    |    组件    |         |
    |    |           |         |
    |    |-----------|         |
    |                          |
    |--------------------------|
```

```
        卡片            基座            项目（业务逻辑）
         |
         |
     基于组件开发
     在挂载时执行注册
         |
         |-----------> 注册

                                    调用基座的方法
                                    为卡片传入数据
                                        |
                    找到相应卡片 <--------|
                    调用卡片的方法
                    为卡片传入数据
                        |
    执行方法 <-----------|
    更新数据（更新视图）
        |
        |
    在卸载时注销
        |
        |------------> 注销
```

1. 把组件封装成卡片
2. 由基座统领卡片
3. 在富代码项目中使用卡片，通过基座操作卡片。

### 使用方法

1. 引入卡片，引入基座。
2. 排列卡片，为其传入 props（必须设置 id）
3. 编写卡片外的业务逻辑。

### 排列方式

在三种方式

```

    |--------------------------------|
    |页面                             |
    |                                |
    | |-------| |-------| |-------|  |
    | | comp0 | | card0 | | card1 |  |
    | |-------| |-------| |-------|  |
    |                                |
    |--------------------------------|
    |--------------------------------|
    |页面                             |
    |                                |
    | |-------| |-------| |-------|  |
    | | comp0 | | card0 | | card1 |  |
    | |-------| |-------| |-------|  |
    |                                |
    |--------------------------------|

    |--------------------------------|
    |页面                             |
    |                                |
    | |-------| |-----------------|  |
    | | comp0 | | comp1           |  |
    | |-------| |                 |  |
    |           |                 |  |
    |           |                 |  |
    |           |     |-------|   |  |
    |           |     | card0 |   |  |
    |           |     |-------|   |  |
    |           |-----------------|  |
    |                                |
    |--------------------------------|

    |--------------------------------------|
    |页面                                   |
    |                                      |
    | |-------| |-----------------------|  |
    | | comp0 | | card1                 |  |
    | |-------| |                       |  |
    |           |                       |  |
    |           |  |-------| |-------|  |  |
    |           |  | card1 | | card2 |  |  |
    |           |  |-------| |-------|  |  |
    |           |-----------------------|  |
    |--------------------------------------|
```

## 竞品分析

### 微卡片 vs 微前端

|          | 微卡片                                               | 微前端                                 |
| -------- | ---------------------------------------------------- | -------------------------------------- |
| 复用性   | 以组件为粒度复用                                     | 以应用为粒度复用                       |
| 粒度     | 小。可以做很小，也可以做很大。薄，基于组件简单封装。 | 大。只能很大。厚，至少有应用级别厚度。 |
| 可组合性 | 可组合，可嵌套                                       | 可组合，可嵌套                         |
| 扩展性   | 支持接入到老项目开发                                 | 不支持                                 |
| 生态系统 | 无社区。必须要有基座。                               | 有公开社区。有插件。                   |
| 易用性   | 不需要提前注册。与使用组件基本无异。                 | 需要提交注册。                         |
| 适用场景 | 组件级粒度复用。                                     | 应用级粒度复用。                       |
| 性能     | 走组件的生命周期，快。                               | 走应用的生命周期，慢。                 |

为了复用要达到以下要求：

- 粒度小。
- 技术与业务解耦。
- 可嵌套，可组合。

### 微卡片可以与微前端结合起来

```
    |------------------------------------------------------------------------------------|
    | 前端主应用                                                                           |
    |                                                                                    |
    | |------------|   |------------|   |------------|                                   |
    | |   微前端0   |   |   微前端1   |   |   微前端2   |                                   |
    | |------------|   |------------|   |------------|                                   |
    |                                                                                    |
    | |------------|   |-------------------------------------------------------------|   |
    | |   微前端3   |   |  微前端4                                                     |   |
    | |------------|   |           |-----| |-----| |----------| |----------|         |   |
    |                  |  |--------|-|   | |  业 | |          | |          |         |   |
    |                  |  |  模块   | |   | | 务  | |  微卡片0  | |  微卡片0  |         |   |
    |                  |  |--------|-|   | | 代  | |          | |          |         |   |
    |                  |           |     | | 码  | |          | |          |         |   |
    |                  |           |  基 | |-----| |----------| |----------|         |   |
    |                  |           |  座 |---------------------------------|         |   |
    |                  |           |                                       |         |   |
    |                  |           |---------------------------------------|         |   |
    |                  |                                                             |   |
    |                  |-------------------------------------------------------------|   |
    |------------------------------------------------------------------------------------|
```

### 微卡片 vs 物料组件

二者的本质都是组件。都提供 4 种 api。都来自业务需求。
||微卡片|物料组件|||
|-|-|-|-|-|
|来源|来自业务|来自业务|||
|体积|小，把多个卡片共用部分移到基座中。|大，可以使用共用的 util 包达到相同效果。|||
|通信|使用中介模式统领所有卡片。|使用 store 处理通信。|||
|复用性|成体系，可在多个项目中使用。|不成体系，做一次才能使用一次。|||
|扩展性|支持自定义卡片。|-|||

## 卡片

沿用组件库的思路。每个卡片都有 4 种 api(props/slots/events/method).
在挂载时注册当前组件实例。在卸载时注销当前组件实例。示例如下。
卡片需要支持取数据的方法。

## 基座

- 映射 id 与组件实例。
- 支持操作组件实例的基本 api.
- 支持插件盒子。
- 对外提供单例服务。

### api

```ts
type A = any
type S = string
interface Oa {
    [k: S]: A
}

register(id: S, instance: ComponentInternalInstance) => void // 注册id与组件实例的映射关系
unRegister(id: S) => void // 注销id与组件实例的映射关系
getCard(id: S) => ComponentInternalInstance | undefined // 通过id取得组件实例
getExpose(id: S) => ComponentInternalInstance | undefined // 通过id取得组件实例暴露的对象
registerPlugin(pluginName: S, plugin: A) => void // 注册插件
unRegisterPlugin(pluginName: S) => void // 注销插件
getPlugins(pluginName: S) => A // 取得插件
setProps(id: S, p: Oa) => void // 设置该id对应的组件实例的props
call<T>(id: S, fn: S) => ReturnType<T> // 调用该id对应的组件实例的指定方法，返回该方法的返回值
```

## 示例

### 定义卡片

```ts
// AComp.vue
import { onMounted, onUnmounted, getCurrentInstance, defineExpose } from 'vue'
import pedestal from 'pedestal'
let props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    ":lm,nbvcxdzawertyuiop[';lmngfderyuil;.']"
})hcxedgbt 45t6yuiop[,.]l
let fn = () => {
    console.log('fn')
    pedestal.getPlugin('pedestalPluginName').fn()
}
defineExpose({fn})
onMounted(() => {
    let instance = getCurrentInstance()!
    pedestal.register(props.id, instance)
})
onUnmounted(() => {
    pedestal.unRegister(props.id)
})
```

### 引入并使用卡片

```ts
<a-comp :id="0" :title="'news'"></a-comp>
import AComp from AComp.vue
import pedestal from 'pedestal'
pedestal.setProps(0, {title: 'about'})
pedestal.getExpose(0).fn()
```

### 引入基座

```
import pedestal from 'pedestal'
```

### 给基座注册插件

```ts
import pedestal from 'pedestal'
import pedestalPluginName from 'pedestal-plugin-name' // 引入基座的插件
pedestal.registerPlugin('pedestalPluginName', pedestalPluginName)
pedestal.unRegisterPlugin('pedestalPluginName')
```

## 功能边界

- 一个简单卡片可实现一个基础级功能。多个简单卡片组合后实现一个模块级功能。
- 支持富代码，不支持低代码。
- 可以在 vue3 项目中使用微卡片。
- 微卡片内支持技术逻辑，不支持业务逻辑。
- 卡片市场支持公开微卡片。
- 模块市场支持公开基座插件。
- 基座支持注册、注销插件。可以在项目中使用插件的能力。

## 产品规划

```
    |-----------------------------------------|
    | 生态                                     |
    |                                         |
    | |------------| |------------|           |
    | |  卡片市场   | |   模块市场   |           |
    | |------------| |------------|           |
    |                                         |
    |-----------------------------------------|

    |-----------------------------------------|
    | 微卡片                                   |
    |                                         |
    | |--------| |--------| |--------|        |
    | |  form  | |  table | |  card2 |        |
    | |--------| |--------| |--------|        |
    |                                         |
    |-----------------------------------------|

    |-----------------------------------------|
    | 基座                                     |
    |                                         |
    | |-------| |-------| |-----------|       |
    | |  req  | |  util | |  module2  |       |
    | |-------| |-------| |-----------|       |
    |                                         |
    |-----------------------------------------|
    ||||
```

### 卡片市场

展示公用卡片。支持搜索、提交、迭代升级。
给用户提供进入社区的窗口。

```
    |-----------------------------------------------------|
    |                                                     |
    |       |---------------------------------|           |
    |       | xxx                           O.|           |
    |       |---------------------------------|           |
    |                                                     |
    |       |-----------|  |-----------|                  |
    |       |   form    |  |   cardn   |                  |
    |       |-----------|  |-----------|                  |
    |                                                     |
    |                                                     |
    |                                                     |
    |                                                     |
    |                                                     |
    |                                                     |
    |-----------------------------------------------------|
```

### 模块市场

展示公用模块。支持搜索、提交、迭代升级。效果如上图。

## 卖点

- 宣传卖卡片，实际卖基座。
- 卡片是由社区贡献的，大家共有财产。
- 基座是团队开发的。由团队维护。

## 验收标准

- 包含至少一个卡片、基座，至少一个基座插件。
- 编写一个示例，展示基础使用方法。包含：定义卡片、使用卡片、给基座注册插件、调用插件。
- 产出编写卡片的文档。coder 可以根据文档写出一个卡片。
- 不验收卡片市场。不验收模块市场，不验收基座插件。

## 后记
