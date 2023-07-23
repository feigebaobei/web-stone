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
import { ref, h } from 'vue'
export default {
    props: {...},
    // setup只会执行一次。它返回的方法可以被使用很多次。
    setup() {
        // template写法是返回data，为了让template可以使用data.
        // render方法返回的是一个render方法。
        return () => {}
    }
}
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

# jsx (tsx)

一种类 xml 写法的 js

```js
let vnode = <div>str{var}</div>
```
