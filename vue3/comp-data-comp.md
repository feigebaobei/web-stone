# 组件间通信
## provide/inject
``` js
import {provide, ref, reactive} from 'vue'
let value = 'str'
provide('key', value) // 非响应式
provide('key1', ref(value)) // 响应式
provide('key2', reactive({k: value})) // 响应式
provide('key4', readonly(value) // 只读

import {inject} from 'vue'
let key = inject('key')
let key1 = inject('key1')
let key2 = inject('key2')
let key4 = inject('key4')
```