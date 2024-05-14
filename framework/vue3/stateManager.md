# 状态管理

- vue 中常用 vuex、pinia 做状态管理工作。
- 从项目级的角度看，状态管理就是单例模式。

## [vuex](/jsPackages/vuex.html)已经落伍了

# [pinia](/jsPackages/pinia.md)

# 自制状态管理

利用 vue3 中 reactive 做状态管理。
好像单例模式。

```js
import { createApp, reactive } from 'vue'
const obj = reactive({
  msg: 'string',
})
const appA = createApp({
  data() {
    return obj
  },
}).mount('#a')
const appB = createApp({
  data() {
    return obj
  },
}).mount('#b')
```

```js
import {reactive} from 'vue'
export let store = {
    debug: true,
    state: reactive({
        msg: 'str'
    }),
    setMsgAction(nv) {
        if (this.debug) {
            clog('...')
        }
        this.state.msg = nv
    }
    clearMsgAction() {
        if (this.debug) {
            clog('...')
        }
        this.state.msg = ''
    }
}
// 然后在组件中引入并使用。
```
