# 编码方式

- [template]()
  - [setup 语法糖]()
  - [非 setup 语法糖（defineComponent……）]()
- [jsx/tsx]()
- [h]()
- [option]()
- [composition]()

## template

### setup

`<script setup>`
setup 属性使 vue 在编译时做若干优化。优化点：**import、顶级方法、顶级属性可以在 template 中直接使用。**

<!-- prettier-ignore-start -->
|                |  |                 |      |
| --------------- | ------- | --- | ---- |
| `defineProps<propType>()`                  |   | 可在 setup 语法中直接使用             | 3.3+ |
| `defineEmits()`      |   | 可在 setup 语法中直接使用             | 3.3+ |
| `defineModel()`      |   |                 | 3.4+ |
| `defineOptions({inheritAttrs: false})` <=> `inheritAttrs: false` |   | 声明组件的选项  | 3.3+ |
| `defineExpose()`     |   | 指定该组件外可访问的数据              |      |
| `defineSlots()`      |   | 等价于 setup 方法中 context 中的 slots、useSlots 的返回值。 | 3.3+ |
| `useSlots()`         | `import { useSlots, useAttrs } from 'vue' const slots = useSlots()` |                 | 3.4+ |
| `useAttrs()`         |   |                 | 3.4+ |
|                      |   |                 |      |
|                      |   |                 |      |
|                      |   |                 |      |
<!-- prettier-ignore-end -->

```html
<template>
  <component :is="condi ? Foo : Bar" />
</template>
<script setup lang="ts">
  import Ca from './Ca.vue' // 组件
  // props
  const props = defineProps({
    foo: {
      type: String,
      requried: true,
    },
    bar: Number,
  })
  props.foo
  props.bar
  const prosp = withDefaults(defineProps<PropType>(), {
    foo: 'str',
    bar: 2,
  })

  // emit
  const emit = defineEmits(['change', 'update'])
</script>
```

#### defineModel

```
<=>
:modelValue
@update:modelValue

let m = defineModel()
let m = defineModel({type: String})
m.value = 'str'
let m = defineModel('count') // v-model:count
let m = defineModel('count', {type: String, default: 'hi'})
m.value = 'str' // 会触发update:count事件

const [modelValue, modelModifiers] = defineModel()
if (modelModifiers.trim) {...}
```

#### defineOptions

```
defineOptions({
    inheritAttrs: false,
    customOptions: {...}
})
```

#### defineSlots

```

```

#### title

#### title

#### title

### !setup

```html
<script>
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import Ca from './Ca.vue' // 组件
  export default defineComponent({
      props: {
          message: String
      },
      // 与ts结合使用的
      props: {
          book: Object as PropType<Book>
      },
      components: {
          Ca,
      },
      // emits
      emits: ['change'],
      setup(props) {
          // props.message
      }
  })
</script>
```

## jsx / tsx

## h

## option

## composition
