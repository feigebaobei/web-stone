# 过渡 & 动画

> vue 内置了`<transition>`组件。可用于处理单组件的动画。  
> `transition-group`用于多组件的动画。  
> 设置动画使用更新 class / style 方式
> appear  
> mode  
> 时长

## 基于 class 设置动画（过渡）

```js
<div :class="{shake: dp}">
.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: traslate3d(0,0,0);
    backface-visibility: hidden;
    perspective: 1000px;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

## 基于 style 设置过渡

```js
<div :style="{backgroudColor: `hsl(${x}, 80%, 50%)`}" @mousemove="mmh" class="movearea"></div>
methods: {
    mmh(e) {
        this.x = e.clientX
    }
}
.movearea {
    transition: 0.2s background-color ease;
}
```

## 单元素的过渡

为其添加进入、离开的过渡效果。

```js
<transition name="fade"><div v-if="p">...</div></transition>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
```

### 过渡 class

|                |                    |     |     |     |
| -------------- | ------------------ | --- | --- | --- |
| v-enter-from   | 进入过渡的开始状态 |     |     |     |
| v-enter-active | 进入过渡的过渡时   |     |     |     |
| v-enter-to     | 进入过渡的结束状态 |     |     |     |
| v-leave-from   | 离开过渡的开始状态 |     |     |     |
| v-leave-active | 离开过渡的过渡时   |     |     |     |
| v-leave-to     | 离开过渡的结束状态 |     |     |     |

三个进入，三个离开。  
过渡时使用 4 个 v-enter-from v-enter-to v-leave-from v-leave-to  
动画时使用 2 个 v-enter-active v-enter-active

```js
.v-enter-active {
    animation: an 0.25s;
}
.v-leave-active {
    animation: an 0.2s; reverse;
}
@keyframes an {
    0% {...}
    100% {...}
}
```

其中`v`是`<transition>`的 name 值。

### 自定义过渡 class 类名

把自定义类名设置在`transtion`标签上。

- enter-from-class
- enter-active-class
- enter-to-class
- leave-from-class
- leave-active-class
- leave-to-class

### 显性设置过渡时长

```js
<transition :duration="250">...</transition>
```

### 过渡的 js 钩子

|                  |                        |     |     |
| ---------------- | ---------------------- | --- | --- |
| before-enter     |                        |     |     |
| enter(dom, done) | 需要使用 done 调用回调 |     |     |
| after-enter      |                        |     |     |
| enter-cancelled  |                        |     |     |
| before-leave     |                        |     |     |
| leave(dom, done) | 需要使用 done 调用回调 |     |     |
| after-leave      |                        |     |     |
| leave-cancelled  |                        |     |     |

相较于类名多了 2 个取消

### 初始渲染过渡

```js
<transition appear>...</transition>
```

### 过渡模式

- in-out 先执行进入过渡，再执行离开过渡。
- out-in 先执行离开过渡，再执行进入过渡。  
  若不设置 mode，则不同元素的进入、离开是同时的。

```js
// 先出再进
<transition name="fade" mode="out-in"></transition>
```

### 多组件之间过渡

问题渲染其中一个。

```js
<transition name="fade" mode="out-in">
    <component :is="view" />
</transition>
```

### 跳过 css 检测

`:css="false"`

- 可提高性能。
- 避免过渡过程中受到 css 规则的意外影响。

## 列表过渡

`<transition-group>`

- 使用 tag 设置元素标签。
- 内部元素需要使用 key 标明唯一性。
- css 过渡类会应用于其内部的元素。
- 过渡模式不可用。

```js
<transition-groupt name="list" tag="p">
    <span v-for="item in items" :key="item">...</span>
</transition-groupt>
```

### 列表的移动过渡

改变定位时使用`v-move`类设置样式

```js
<transition-group name="list" tag="ul">
    <li v-for="item in items" :key="item">...</li>
</transition-group>
.list-move {
    transition: transform 0.8s ease;
}
```

### 过渡钩子

`<transition>`的过渡钩子函数同样适用于`<transition-group>`

### 动态过渡

```js
<transition :name="transitionName">...</transition>
<transition-group :name="transitionName">...</transition-group>
```

## 复用过渡

把`<transition>`/`<transition-group>`做成容器组件。

```js
Vue.component('comp-name', {
    template: `
        <transition
            name="tn"
            mode="out-in"
            @before-enter="beforeEnterHandler"
            @after-enter="afterEnterHandler"
        >
            <slot />
        </transition>
    `,
    methods: {
        beforeEnterHandler(dom) {...},
        afterEnterHandler(dom) {...}
    }
})
```

## 状态过渡

## 动画性能

- transform / opacity 不会触发浏览器重绘。
- perspective / backface-visibility / transform 会让浏览器知道需要使用硬件加速。

## 如何开发动画

- 时长，一般使用 0.25s。结束动画比开始动画要短。

## 常用的动画库

- gsap (greensock)
- title
- title
- title
- title
- title
- title
