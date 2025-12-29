# 虚拟滚动

> 同一时间只渲染我们看的见的这些 DOM 节点的时候，浏览器需要渲染的节点就会减少了。
> 当滚动时，滚动列表不是真正的滚动列表，而是根据滚动的位置重新渲染可见的列表元素。当滚动时间跨度足够小时，它看起来就像是在滚动一样。
> 每次用户滑动造成偏移量改变，我们都会根据这个偏移量去渲染新的列表元素。就像是在一帧一帧的播放动画一样，当两帧间隔足够小时，动画看起来就会很流畅，就像是在滚动一样。
> 需要记录用户操作的列表的滚动总距离 virtualOffset
> 监听 wheel 事件，每个元素的高度，算出渲染区域。
> 前后增加缓存区域。当滚动距离在缓存区域内时，不重新渲染。使用 transform:translateY(xx)设置。

## 代码

```js

```

## 3 种实现方式

### 元素固定高度

### 元素不固定高度

### 元素动态高度

## 我的实现方法

1. 以视窗内元素的平均高度为准。赋值给一个存放所有元素高度的盒子。
2. 视窗前后缓存几个元素。在缓存距离内滚动时不重新渲染。
3. 当滚动距离超过缓存距离时，重新渲染。并更新盒子中的数据。
4. 当元素高度改变时，更新盒子中对应的数据。

```vue
<template>
  <div
    class="contain"
    ref="containR"
    @wheel="containWheelH"
    @scroll="containScrollH"
  >
    <!-- 用一个空div撑开高度 -->
    <div
      class="scroll_placeholder"
      :style="{ height: placeholderHeightComp + 'px' }"
    ></div>
    <!-- 视窗 -->
    <div class="scroll_view" ref="viewR" :style="{ transform: getTransform }">
      <!-- 渲染列表 -->
      <div
        class="scroll_item"
        v-for="(item, index) in viewListComp"
        :key="index"
        :ref="(el) => opRef(el, (item as any).id)"
      >
        {{ (item as any).content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// utils
import { ref, reactive, onMounted, computed, watchEffect, watch } from 'vue'
// import VirtualScroll from './VirtualScroll.js'
// components
// import { MsButton } from 'ms-ui'
// check
// config
// directives
// data
// hooks
// import { useRouter } from 'vue-router'
// type/interface
// custom
let clog = console.log

// defineOptions
defineOptions({
  // name: '',
  // inheritAttrs: false,
})
// directives
let props = defineProps({
  originList: {
    type: Array,
    default: () => [],
  },
  startIndex: {
    type: Number,
    default: 0,
  },
  cacheCount: {
    type: Number,
    default: 2,
  },
  itemHeight: {
    type: Number,
    default: 100,
  },
  estimutedItemHeight: {
    // 估计每个元素的高度
    type: Number,
    default: 100,
  },
})
// let emit = defineEmits(['eventName'])
// inject
// hooks
// variable
// let virtualScroll = new VirtualScroll()
// ref
let attemptR = ref()
let containR = ref()
let viewR = ref()
let boxR = reactive<{
  heightList: {
    real: boolean
    height: number
  }[]
  startIndex: number
  offsetH: number
  endIndex: number
  estimutedItemHeight: number
}>({
  heightList: [], // props.originList.map(() => props.estimutedItemHeight), // 每个item的高度
  startIndex: props.startIndex,
  // startIndex: 0,
  offsetH: 0,
  endIndex: props.startIndex,
  estimutedItemHeight: props.estimutedItemHeight,
})
// computed
let viewListComp = computed(() => {
  return props.originList.slice(
    boxR.startIndex,
    Math.min(boxR.endIndex, props.originList.length)
  )
})
let placeholderHeightComp = computed(() => {
  return boxR.heightList.reduce((r, cur) => {
    return (r += cur.height)
  }, 0)
})
let visibleCountComp = computed(() => {
  return Math.ceil(containR.value.offsetHeight / props.itemHeight)
  // return Math.ceil(containR.value.offsetHeight / boxR.estimutedItemHeight)
})
let getTransform = computed(() => {
  return `translateY(${boxR.offsetH}px)`
})
// method
let init = () => {
  // boxR.endIndex = boxR.startIndex + visibleCountComp.value + props.cacheCount
  let count = Math.ceil(containR.value.offsetHeight / boxR.estimutedItemHeight)
  boxR.endIndex = boxR.startIndex + count + props.cacheCount
  checkEndIndex()
}
let checkEndIndex = () => {
  return new Promise((s, j) => {
    if (viewR.value.offsetHeight < containR.value.offsetHeight) {
      boxR.endIndex++
      s(true)
    } else {
      boxR.endIndex += props.cacheCount
      j()
    }
  })
    .then(() => {
      checkEndIndex()
    })
    .catch(() => {
      clog('boxR.endIndex', boxR.endIndex)
      // clog('不做事情')
    })
}
let opRef = (el: any, index: number) => {
  if (!boxR.heightList[index]?.real) {
    boxR.heightList[index] = {
      real: true,
      height: el.offsetHeight,
    }
  }
}
// provide
// eventFn
let containWheelH = () => {
  let scrollTop = containR.value.scrollTop
  boxR.startIndex = 0
  let h = 0
  let i = 0
  while (i < boxR.heightList.length) {
    h += boxR.heightList[i]!.height
    if (h >= scrollTop) {
      break
    }
    boxR.startIndex++
    i++
  }
  boxR.endIndex = boxR.startIndex
  let vh = containR.value.offsetHeight

  h = 0
  i = boxR.startIndex
  while (h < vh && i < boxR.heightList.length) {
    h += boxR.heightList[i]!.height
    i++
  }
  boxR.endIndex = i + props.cacheCount
  let topStartHeight = boxR.heightList
    .slice(0, boxR.startIndex)
    .reduce((r, c) => {
      r += c.height
      return r
    }, 0)
  boxR.offsetH = scrollTop + (topStartHeight - scrollTop)
}
let containScrollH = () => {
  clog('containScrollH')
  setTimeout(() => {
    containWheelH()
  }, 50)
  // new Promise((s, _j) => {
  //   s(true)
  // }).then(() => {
  //   containWheelH()
  // })
}
// watch
watchEffect(() => {
  if (props.originList.length) {
    boxR.heightList = props.originList.map(() => ({
      real: false,
      height: props.estimutedItemHeight,
    }))
  }
})
// lifeCircle
onMounted(() => {
  init()
})
// expose
// defineExpose({attemptR})
</script>

<style lang="less" scoped>
.contain {
  height: 100%;
  overflow: auto;
  position: relative;
}
// .view_window {
//   // overflow: auto;
//   overflow: hidden;
//   border: 1px solid #aaa;
// }
.scroll_placeholder {
  position: absolute;
  left: 0;
  right: 0;
}
.scroll_view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
```

使用

```
boxR.originList.push({
    content: 'string '.repeat(Math.random() * 10 + 5) + i,
    id: i,
})
```
