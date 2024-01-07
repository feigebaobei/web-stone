三者只是编码方式。三者之间无明显差距。

# template

vue2 时就已经支持了。这种写法是 vue 擅长的写法。
官网推荐此写法。原因：

- 方便利用 html。方便理解。闭包的 html/css。
- 方便做静态分析。可以让 vue 做一些编辑时分析，以达到编译时优化。方便提高性能。

# render function

```js
import { h } from 'vue'
let vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [] // children
)

// all arguments except the type are optional
h('div')
h('div', { id: 'foo' })
// both attributes and properties can be used in props
// Vue automatically picks the right way to assign it
h('div', { class: 'bar', innerHTML: 'hello' })
// props modifiers such as `.prop` and `.attr` can be added
// with `.` and `^` prefixes respectively
h('div', { '.name': 'some-name', '^width': '100' })
// class and style have the same object / array
// value support that they have in templates
h('div', { class: [foo, { bar }], style: { color: 'red' } })
// event listeners should be passed as onXxx
h('div', { onClick: () => {} })
// children can be a string
h('div', { id: 'foo' }, 'hello')
// props can be omitted when there are no props
h('div', 'hello')
h('div', [h('span', 'hello')])
// children array can contain mixed vnodes and strings
h('div', ['hello', h('span', 'hello')])
```

```js
// Comp.vue
<script lang="ts">
import { ref, h } from 'vue'
export default {
    props: {...},
    // setup只会执行一次。它返回的方法可以被使用很多次。
    setup() {
        // template写法是返回data，为了让template可以使用data.
        // render方法可以返回一个render方法，
        // return () => {
        //     return h('div', {class: 'hi'}, ['str'])
        // }
        // 也可以返回一个为render使用的对象。需要与render方法结合使用。
        // todo 调研哪种方法更合适
        return () => {
            k: 'str'
        }
    },
    render() {
        h('div', {class: 'hi'}, [this.k])
    }
}
</script>
```

## render function 的语法

```js
// v-if
h('div', [ok.value ? h ('div', 'yes') : h('div', 'no')])
// v-for
h('ul', item.value.map(({id, text}) => (h('li', {key: id}, text)))
<ul>
    {items.value.map(({id, text}) => (<li key={id}>{text}</li>))}
</ul>
// v-on
h('button', {
    onClick(event) {...}
}, 'str')
<button onClick={(event) => {...}}>str</button>
// event modifiers
h('input', {
    onClickCapture() {...},
    onKeyupOnce() {...},
    onMouseoverOnceCapture() {...},
})
<input
onClickCapture={() => {...}}
onKeyupOnce={() =>{}}
onMouseoverOnceCapture={() =>{}}
/>
// 或者使用withModifiers
import { withModifiers } from 'vue'
h('div', {
    onClick: withModifier(() => {...}, ['self'])
}, 'str')
<div onClick={withModifiers(() => {}, ['self'])}>str</div>
// slots
export default {
    props: ['msg'],
    setup(props, {slots}) {
        // 返回一个render方法
        return () => [
            h('div', slots.default()),
            // 具名插槽+作用域插槽
            h('div', slots.footer({text: props.msg}))
        ]
    }
}
<div>{slots.default()}</div>
<div>{slots.footer({text: props.msg})}</div>
// 透传
// passing slots
h(MyComp, () => 'str')
h(MyComp, null, {
    default: () => 'str',
    foo: () => h('div', 'foo'),
    bar: () => [h('sapn', 'one'), h('sapn', 'two')],
})
<MyComp>{() => 'str'}</MyComp>
<MyComp>{{
    default: () => 'str',
    foo: () => <div>str</div>,
    bar: () => [<span>one</span>, <span>two</span>],
}}</MyComp>
// 内置组件
import { h, keepAlive, Teleport, Transition, TransitionGroup } from 'vue'
// v-model
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, {emit}) {
        return () => {
            h(MyComp, {
                modelValue: props.modelValue,
                'onUpdate:modelValue': (value) => emit('update:modelValue', value)
            })
        }
    }
}
// custom directives
import { h, withDirectives } from 'vue'
let pin = {
    mounted() {...},
    updated() {...},
}
let vnode = withDirectives(h('div'), [
    [pin, 200, 'top', {animate: true}]
])
// => <div v-pin:top.animate="200"></div>
// template refs
improt { h, ref } from 'vue'
export default {
    setup() {
        let divEl = ref()
        return () => h('div', {ref: divEl})
        // => <div ref="divEl">
    }
}
```

## 新旧写法比较

```js
// 2.x
export default {
    render(h) {
        return h('div')
    }
}
// 3.x
import { h } from 'vue'
export default {
    render() {
        return h('div')
    }
}
```

# functional component

已经不再支持`functional: true`
`listeners`合并到`$attrs`中了。

```js
import { h } from vue
let Fc = (props, context) => {
    return h(`h${props.level}`, context.attrs, context.slots)
}
Fc.props = ['level']
```

# jsx (tsx)

一种类 xml 写法的 js

```js
let vnode = <div>str{var}</div>
```

# issue

The type of a component (stateful vs. functional) must be known before hand because the side-effect of calling

```js
function Counter(props) {
  // the render function itself
  return h('div', props.foo)
}
vs.

function Counter(props) {
  // stateful setup logic

  return () => h('div', props.foo)
}
```

is completely different. The former is expected to be inside a reactive effect that tracks its dependencies. The latter does not. So it would be too late to determine how this function should be treated based on its return value.

So you either force all functional components to return the render function (even for state-less ones, which becomes confusing), or require explicit defineComponent wrapper to indicate this is a stateful component. I'd rather go the explicit route.

I think this sort of confusion largely comes from React hooks users, but in Vue 3 the rule of thumb is: functional components are always state-less. Use an object or defineComponent if you want a stateful component.

# 比较三种写法

<!-- prettier-ignore-start -->
|     | template     | render / h      | jsx                |
| --- | ------------------ | ---------------- | --------------- |
|     | 首选。vue-loader 会优化此写法的组件 |           | 需要安装`@vitejs/plugin-vue-jsx`插件。然后在`vite.config.ts`中使用 |
|     |             | 需要使用 defineComponent          | 需要使用 defineComponent                   |
|     |             | render()中写模板。返回的是 vnode. | render()中使用 jsx 代码。                  |
<!-- prettier-ignore-end -->
