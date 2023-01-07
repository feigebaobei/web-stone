# 基本使用文档

## api

## 模板语法

### 基本结构

```vue

```

## 响应式

## 绑定样式

## 指令

### 内置指令

### 自定义指令

## 条件渲染

## 列表渲染

## 控制事件

### 事件修饰符

## 表单

## 生命周期

## 组件

### 动态组件

```vue
<!-- Component changes when currentTab changes -->
<component :is="tabs[currentTab]"></component>
```

### registration

### props

### events

### fallthrough attributes

### slots

### provide/inject

### async components

### 内置组件

#### Transition

#### TransitionGroup

#### KeepAlive

#### Teleport

#### Suspense

### single-file components

使用[`@vue/compiler-sfc`]()编译`*.vue`文件。

#### title

#### title

#### title

## 可重用性

提取出共用部分。

### composables

以`use`开头。

### plugins

## state management

### 自制

### pinia

### vuex (不推荐)

## ssr

### 自制

```vue
import {createSSRApp} from 'vue'
```

### nuxt

### quasar

### vite ssr

## ssg

## test

### 单测

- vitest
- peeky
- jest

### 组件测试

- vitest
- cypress component testing

### 端到端测试

cypress

## title

## title

## title
