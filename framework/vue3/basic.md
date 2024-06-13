# 基本用法

## [创建一个 vue 应用](/framework/vue3/demo/createVueApp.html)

## 模板语法

```
文本插值
<span>Message: {{ msg }}</span>

原始 HTML
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>

Attribute 绑定
<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>

使用 JavaScript 表达式
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>

调用函数
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>

受限的全局访问
在app.config.globalProperties上添加数据。

指令 Directives
v-xx:arg.modify="value"
```

## 响应式基础

- `<script setup>`语法糖会避免手动暴露大量状态、方法的繁索工作。
- 更改响应式状态后更新组件
- 默认深层响应式
- ref 嵌套在 reactive 里时，会不具有响应性。在浅层响应式对象里时不会解包。
- ref 与数组、set/map 结合使用时不会解包。
- js 中需要使用 refObj.value 访问。在 template 中可以使用 refObj 访问，这是 vue 做的语法糖。

### reactive & ref

|      | reactive                     | ref                            |
| ---- | ---------------------------- | ------------------------------ |
|      |                              |                                |
|      | 对对象有效，对基本类型无效。 | 对任意类型有效                 |
|      | 不要替换响应式对象的引用     |                                |
| 访问 | 直接访问                     | `refObj.value`                 |
|      |                              | 传递给函数、解构时不丢失响应性 |
|      |                              |                                |

## 计算属性

用途：

- 处理复杂响应式逻辑。
- getter 不应该有副作用

```html
<script setup>
  import { ref, computed } from 'vue'

  const firstName = ref('John')
  const lastName = ref('Doe')

  const fullName = computed({
    // getter
    get() {
      return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
      // 注意：我们这里使用的是解构赋值语法
      ;[firstName.value, lastName.value] = newValue.split(' ')
    },
  })
</script>
```

### computed & methods & wetch & wetchEffect

|     | computed                                                   | methods      | watch                                                                     | watchEffect                          |     |
| --- | ---------------------------------------------------------- | ------------ | ------------------------------------------------------------------------- | ------------------------------------ | --- |
|     | 基于响应式依赖，缓存计算结果，当响应式对象改变时重新计算。 | 只执行一次。 | 懒执行。当依赖改变时执行回调。                                            | 先执行一次（用于收集依赖）           |     |
|     |                                                            |              | 追踪明确监听的数据源。更精确。                                            | 在副作用发生期间追踪依赖。不太明确。 |     |
|     |                                                            |              | 触发的时机：默认在组件更新前。设置 flush:post，可以在组件更新后执行回调。 |                                      |     |
|     |                                                            |              | 必须是同步语句创建                                                        | 必须是同步语句创建                   |     |
|     |                                                            |              | 返回取消监听方法                                                          | 返回取消监听方法                     |     |
|     |                                                            |              |                                                                           |                                      |     |
|     |                                                            |              |                                                                           |                                      |     |
|     |                                                            |              |                                                                           |                                      |     |

## class & style

|     | class              | style      |     |     |
| --- | ------------------ | ---------- | --- | --- |
| 值  | 对象、数组、字符串 | 对象、数组 |     |     |
|     |                    |            |     |     |
|     |                    |            |     |     |
|     |                    |            |     |     |

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
<div :class="classObject"></div>
<div :class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<div :class="[{ active: isActive }, errorClass]"></div>
<p class="foo bar active">Hi</p>
<p :class="$attrs.class">
  当组件内有多个直接子元素时需要明确指定哪个子元素使用props里的class
</p>
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="styleObject"></div>
<div :style="[baseStyles, overridingStyles]"></div>
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## 条件渲染

- v-if
- v-else
- v-else-if
- v-show
- v-if + template 实现一次切换多个元素。
- v-if、v-for 尽量不要作用于同一个元素。

|     | v-if                              | v-show                           | v-for                        |
| --- | --------------------------------- | -------------------------------- | ---------------------------- |
|     | 可以与 templata 标签一起使用      | 不可以与 templata 标签一起使用   | 可以与 templata 标签一起使用 |
|     | true 时真实渲染出现，否则不渲染。 | 问题渲染。                       |                              |
|     | “惰性”                            | -                                | -                            |
|     | 若 false，则不渲染。              | 不能减少初次渲染的工作量         |                              |
|     | v-if 的优先级大于 v-for           | 不要在同一元素上使用 v-if v-show |                              |
|     | 在编译阶段处理                    |                                  |                              |
|     |                                   |                                  |                              |

## 列表渲染

- 遍历对象时，是按照`Object.keys()`遍历的。
- 可用`v-for="(item, index) in arr"`
- 也可用`v-for="(item, index) of arr"`
- 可能是 vue 出生是`for...of`还未出生。vue 使用 for...in 处理循环。后来 for...of 出生了。vue 使用了与其相同的写法，也兼容了以前的写法。

```html
<li v-for="item in items" :key="item.id">{{ item.message }}</li>

<li v-for="(item, index) in items" :key="item.id">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>

<li v-for="{ message } in items" :key="item.id">{{ message }}</li>

<li v-for="({ message }, index) in items" :key="item.id">
  {{ message }} {{ index }}
</li>

<li v-for="item in items" :key="item.id">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>

<ul>
  <template v-for="item in items" :key="item.id">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

封装 array 的方法。

- push
- pop
- shift
- unshift
- splice
- sort
- reverse

## 事件

- 内联
- 方法
- `v-on`指令会为 dom 添加事件。
- react 中是在 vdom 上添加事件的。

```html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

```js
const name = ref('Vue.js')
function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}

// <!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

// <!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

### 事件修饰符

可链式调用。

|          |                                         |                                               |     |
| -------- | --------------------------------------- | --------------------------------------------- | --- |
| .stop    | 防止冒泡                                |                                               |     |
| .prevent | 防止默认事件                            |                                               |     |
| .self    | 仅当 event.target 是当前 dom 元素时触发 |                                               |     |
| .capture | 在事件捕获阶段处理。                    |                                               |     |
| .once    | 只触发一次                              |                                               |     |
| .passive | 不阻止默认事件                          | passive 为 true 时，不会触发 preventDefault() |     |

### 按键修饰符

|                                             |     |     |     |
| ------------------------------------------- | --- | --- | --- |
| .enter                                      |     |     |     |
| .tab                                        |     |     |     |
| .delete (捕获“Delete”和“Backspace”两个按键) |     |     |     |
| .esc                                        |     |     |     |
| .space                                      |     |     |     |
| .up                                         |     |     |     |
| .down                                       |     |     |     |
| .left                                       |     |     |     |
| .right                                      |     |     |     |
|                                             |     |     |     |
|                                             |     |     |     |

### 系统修饰符

|        |     |     |     |
| ------ | --- | --- | --- |
| .ctrl  |     |     |     |
| .alt   |     |     |     |
| .shift |     |     |     |
| .meta  |     |     |     |

### 严格修饰符

|        |                                                      |     |     |
| ------ | ---------------------------------------------------- | --- | --- |
| .exact | 允许控制触发一个事件所需的确定组合的系统按键修饰符。 |     |     |

### 鼠标按键修饰符

|         |     |     |     |
| ------- | --- | --- | --- |
| .left   |     |     |     |
| .right  |     |     |     |
| .middle |     |     |     |

### v-model 的修饰符

- .lazy // input 事件改为 change 事件
- .number // 若能被 parseFloat()处理，则返回 number.否则返回 string.
- .trim // 去掉首尾空格

### vue 事件 & react 事件

|     | vue 事件                                       | react 事件     |
| --- | ---------------------------------------------- | -------------- |
|     | 绑定到 dom 上                                  | 绑定到 vdom 上 |
|     | 原生 dom 的事件                                | 合成事件       |
|     | 有原生事件对应的修饰符等                       | 无             |
|     | 当 vdom(dom)被销毁时，绑定的事件也一起被销毁。 | -              |

## 表单绑定

一般使用`v-model`。它为表单元素提供了双向数据绑定的语法糖。  
当使用输入法时不会在组织文字时触发 input.(可能内部使用了`xxxx`)

```js
// text
<input v-model="msg" />
data() { return {msg: ''} } // textarea
<textarea v-model="msg" />
data() {return {msg: ''}} // checkbox
<input type="checkbox" v-model="checked" />
data() {return {checkbox: false}} //
一般单个复选框使用boolean,多个复选框使用数组。 //
<input type="checkbox" value="one" v-model="arr" />
<input type="checkbox" value="two" v-model="arr" />
<input type="checkbox" value="three" v-model="arr" />
data() {return {arr: ['two']}} // 设置默认选中值 // radio
<input type="radio" value="one" id="radio" v-model="picked" />
<input type="radio" value="two" id="radio" v-model="picked" />
data() {return {picked: ''}} // radio一般于字符串绑定 // select
<select v-model="selected">
    <option v-for="(value, name, index) in arr" :value="value.v">{{index}}: {{name}} {{value.label}}</option>
</select>
data() {return {arr: [...], selected: ''}} //
单选时又是与字符串绑定。官网在多选时使用了字符串。经过测试可以使用数组。感觉数组更适合多选。
```

### 值绑定

```js
<input type="radio" v-model="picked" value="a"> // 单选框一般与字符串绑定。
<input type="checkbox" v-model="picked" value="a"> // 多选框可以与字符串、boolean、数组绑定。
<select v-model="selected">...</select> // 下拉选择器可以与字符串、数组绑定。
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no"> // 绑定真值与假值
<input type="radio" v-model="pick" :value="a"> // 选中时pick为变量a的值
<select>
    <option :value="{number: 123}">12345</option>
</select>
```

### 如何处理 input & checkbox & radio & select

|     | input           | checkbox         | select         |     |
| --- | --------------- | ---------------- | -------------- | --- |
|     | text & textarea | checkbox & radio | select         |     |
|     | value + input   | checked + change | value + change |     |
|     |                 | true-value       |                |     |
|     |                 | false-value      |                |     |
|     |                 |                  |                |     |
|     |                 |                  |                |     |
|     |                 |                  |                |     |
|     |                 |                  |                |     |

## 生命周期

![生命周期](/framework/vue3//lifecycle.16e4c08e.png)

不要在生命周期方法上使用箭头函数，会影响 this 指向。

|     | 选项式 api      | hook inside setup |
| --- | --------------- | ----------------- |
|     | beforeCreate    | -                 |
|     | created         | -                 |
|     | beforeMount     | onBeforeMount     |
|     | mounted         | onMounted         |
|     | beforeUpdate    | onBeforeUpdate    |
|     | updated         | onUpdated         |
|     | beforeUnmount   | onBeforeUnmount   |
|     | unmounted       | onUnmounted       |
|     | errorCaptured   | onErrorCaptured   |
|     | renderTracked   | onRenderTracked   |
|     | renderTriggered | onRenderTriggered |
|     | activated       | onActivated       |
|     | deactivated     | onDeactivated     |

## 监听器

- 默认深层监听响应式对象。可以使用 getter 方法设置为只改变特定值时触发回调。
- 必是同步语句创建。
- watch & watchEffect

```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)

watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true } // 还有别的选项
)
```

## 模板引用

- 需要考虑 ref 对象为 null 的情况。初次渲染时指定元素还不存在。
- ref 与 v-for 结合使用时 ref 对象的值是列表元素组成的数组。

## [组件](/framework/vue3/component.html)
