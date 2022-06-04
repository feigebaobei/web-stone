# `svelte`

## overview

> 写更少代码。需要使用html/css/js
> 使用真实dom。react说自己运行快的原因是使用虚拟dom.svelte说自己代码代码量少的原因是使用真实dom。
> 真正的交互。不需要状态管理工具。
> 目标是小、快

### feature

- 把一段时间内的微任务屯起来一起解决。
- feature1
- feature2

## usage
```shell
# 创建项目
npm init vite my-app -- --template svelte
cd my-app
npm install
npm run dev
```
```svelte
<script>
    <!-- js代码 -->
</script>
<dom>
    <!-- dom -->
</dom>
<style>
    <!-- 样式 -->
</style>
```

||||
|-|-|-|
|Basics|-||
|Adding data|在script标签中定义后在dom标签中使用。||
|Dynamic attributes|-||
|Styling|只作用于当前文件||
|Nested components|不需要输出，使用import引入后，再使用。||
|HTML tags|`{@html ...}`||
|Making an app|对于svite/rollup/svelte都有支持的插件。new一个svelte文件的实例后输出。||
|Assignments|||
|Declarations|`$: <变量名> = <表达式>`||
|Statements|||
|Updating arrays and objects|反应是由任务触发的。改变数组或对象的方法本身不会触发更新。|使用`numbers = numbers`或`numbers = [...numbers, newValue]`|
|Declaring props|使用`export let <params>;`接收从`props`来的数据||
|Default values||`export let answer = 'a mystery';`|
|Spread props|||
|If blocks|`{#if <表达式>}...{:else if <表达式1>}...{/if}}`|``|
|Else blocks|||
|Else-if blocks|||
|Each blocks|`{#each <数组变量> as <数组元素变量>, <下标变量>}...{/each}` `{#each <对象变量> as {<对象元素变量0>, <对象元素变量1>, ...}}...{/each}`||
|Keyed each blocks|解构出的第二个参数是key`{#each things as thing (thing.id)}...{/each}`其中`thing.id`是key||
|Await blocks|`{#await promise}...{:then <param0>}...{:catch <param1>}...{/await}`或`{#await promise then <param0>}...{/await}`||
|DOM events|`on:<事件名>|<事件修饰符0>|<事件修饰符1>|...={方法名}`，在script标签中定义方法||
|Inline handlers|常用于组件间触发事件。需要从`svelte`中引入`createEventDispatcher`，运行该方法会得到一个dispatcher（分发器）。再使用dispatcher分发 [自定义事件](/language/javascript/event.html) 。通过`event.detail`得到事件中携带的参数。|`dispatcher('<事件名>', <param>)`|
|Event modifiers|||
|Component events|||
|Event forwarding|组件的事件不能自动冒泡。需要一连串的组件做转发。||
|DOM event forwarding|dom事件也需要转发||
|Text inputs||`<input bind:value={name}>`|
|Numeric inputs|可以使用数字numberg型||
|Checkbox inputs||`<input type=checkbox bind:checked={yes}>`|
|Group inputs|使用`bind:group`和`value`处理多选。|`<input type=radio bind:group={scoops} name="scoops" value={1}>`|
|Textarea inputs||`<textarea bind:value={value}></textarea>`|
|Select bindings|`option`的`value`是一个对象（比字符串更好）。|`<select bind:value={selected} on:change="{() => answer = ''}">`|
|Select multiple||`<select multiple bind:value={flavours}>...</select>`|
|Contenteditable bindings||`<div contenteditable="true" bind:innerHTML={html}></div>`|
|Each block bindings|||
|Media elements|||
|Dimensions|||
|This|类似vue/react中的ref。在组件的`onMount`前this是undefined。|`<canvas bind:this={canvas}></canvas>`|
|Component bindings||`<InputField bind:this={field} />`|
|Binding to component instances|||
|onMount|第一次渲染到dom后执行的钩子。常执行一些网络请求。|`import { onMount } from 'svelte'; onMount(fn)`|
|onDestroy|销毁组件前执行|`import { onDestroy } from 'svelte'; onDestroy(fn)`|
|beforeUpdate and afterUpdate|||
|tick|生命周期的方法都需要从`svelte`包中引入。它返回一个promise，尽快解决未完成的状态改变。||
|Writable stores|使用`subscribe(fn)`方法订阅当指定值改变时，执行fn.|`import { writable } from 'svelte/store';export const count = writable(0); import { count } from './stores.js';count.subscribe(value => {countValue = value;});`|
|Auto-subscriptions|以`$`开头的变量，被认识是从store中取出的变量。|`$count`|
|Readable stores|设置一个可读的值。接收2个参数，第一个是初始值，可以是null/undefined，第二个是start方法。start方法在被订阅时执行。start方法有一个参数set。set是一个方法，参数是需要被设置的值。start方法返回stop方法。stop方法用于取消订阅。|`export param = readable(initValue, function start(set) {/*set方法是用于设置值的。*/ return function stop() {...}})`|
|Derived stores|从若干个store中衍生出一个store。||
|Custom stores||`$count`|
|Store bindings|||
|Tweened|控制动画的属性||
|Spring|||
|The transition directive|内置的过滤动画||
|Adding parameters|||
|In and out|||
|Custom CSS transitions|||
|Custom JS transitions|||
|Transition events|||
|Local transitions|||
|Deferred transitions|||
|Key blocks|当表达式改变时执行销毁或重新渲染||
|The animate directive|||
|The use directive|||
|Adding parameters|||
|The class directive||`<button class:selected="{current === 'foo'}">foo</button>`是否显示selected类|
|Shorthand class directive||`<div class:big></div>`|
|Inline styles||`<p style="color: {color}; --opacity: {bgOpacity};">string</p>`|
|The style directive||`<p style:color style:--opacity={bgOpacity}>This is a paragraph.</p>`|
|Slots||`<div><slot></slot></div>`|
|Slot fallbacks|默认插入内容||
|Named slots||`<span slot="address"></span>``<slot name="address"></slot>`|
|Checking for slot content|||
|Slot props|||
|setContext and getContext|||
|svelte:self|||
|svelte:component|||
|svelte:element|||
|svelte:window|||
|svelte:window bindings|||
|svelte:body|||
|svelte:head|||
|svelte:options|||
|svelte:fragment|||
|Sharing code|||
|Exports|||
|The @debug tag|||
|Congratulations!|||

### 事件修饰符
||||||
|-|-|-|-|-|
|preventDefault|||||
|stopPropagation|||||
|passive|改进了触摸/滚轮事件的滚动性能(Svelte会自动添加它，在安全的地方这样做)||||
|nonpassive|||||
|capture|||||
|once|||||
|self|||||
|trusted|只当用户触发时触发。`event.isTrusted`为`true`时触发。||||


## demo

## api

## todo
