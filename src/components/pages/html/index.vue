<template>
  <div class="html">
  <section>
    <h1>html</h1>
    <ul>
      <li>HTML 指的是超文本标记语言 (Hyper Text Markup Language)</li>
      <li>HTML 不是一种编程语言，而是一种标记语言 (markup language)</li>
      <li>标记语言是一套标记标签 (markup tag)</li>
      <li>HTML 使用标记标签来描述网页</li>
      <li>它在浏览器中有自己默认样式</li>
      <li>明确规定需要成对出现，即：开始标签+闭合标签。但是仍有一些标签是自闭合的。因为这些标签有特定含义，不应该包含非特定的内容。如：`img`它是图片域标签。它是自闭合标签，它只能处理图片，不应该包含非图片内容。`br`是拆行标签。它是自闭合标签，它只能拆行，不应该包含非拆行内容。html语言为了防止包含不正确内容的错误，设置了自闭合标签。</li>
      <li>若无闭合标签，则浏览器会尝试补全标签</li>
      <li>块级标签是默认独占一行的标签</li>
      <li>行内标签是默认非独占一行的标签</li>
      <li>行内标签不包含块级标签</li>
      <li>有些标签不可互相嵌套。如p不可嵌套div</li>
      <li>标签语义化可以方便程序员、浏览器、辅助设备</li>
      <li>不区分大小写</li>
    </ul>
    <h1>html & css & javascript</h1>
    <ul>
      <li>html就像筋骨</li>
      <li>css就像衣服</li>
      <li>javascript（js）就像本领</li>
    </ul>
    <h1>属性</h1>
    <ul>
      <li>使用`key="value"`形式书写在开始标签内。</li>
    </ul>
    <h1>标题</h1>
    <ul>
      <li>h1 - h6</li>
      <li>拥有默认样式</li>
    </ul>
    <h1>基本结构</h1>
    <code>
      &lt;html&gt;
        &lt;head&gt;
          &lt;title&gt;TITLE&lt;/title&gt;
          &lt;meta charset="UTF-8" /&gt;
          &lt;link rel="icon" href="/favicon.ico" /&gt;
          &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
        &lt;/head&gt;
        &lt;body&gt;
          <!-- other code -->
          <!-- other -->
          &lt;script src="URL"&gt;&lt;/script&gt;
        &lt;/body&gt;
      &lt;/html&gt;
    </code>
    <ul>
      <li></li>
    </ul>
    <h1>属性</h1>
    <ul>
      <li></li>
    </ul>
    <h1>属性</h1>
    <ul>
      <li></li>
    </ul>
    <h1>属性</h1>
    <ul>
      <li></li>
    </ul>
  </section>
    <code>
&lt;!--&gt;
&lt;!DOCTYPE&gt;
&lt;a&gt;
&lt;abbr&gt;
&lt;acronym&gt;
&lt;address&gt;
&lt;applet&gt;
&lt;area&gt;
&lt;article&gt;
&lt;aside&gt;
&lt;audio&gt;
&lt;b&gt;
&lt;base&gt;
&lt;basefont&gt;
&lt;bdi&gt;
&lt;bdo&gt;
&lt;big&gt;
&lt;blockquote&gt;
&lt;body&gt;
&lt;br&gt;
&lt;button&gt;
&lt;canvas&gt;
&lt;caption&gt;
&lt;center&gt;
&lt;cite&gt;
&lt;code&gt;
&lt;col&gt;
&lt;colgroup&gt;
&lt;command&gt;
&lt;data&gt;
&lt;datalist&gt;
&lt;dd&gt;
&lt;del&gt;
&lt;details&gt;
&lt;dfn&gt;
&lt;dialog&gt;
&lt;dir&gt;
&lt;div&gt;
&lt;dl&gt;
&lt;dt&gt;
&lt;em&gt;
&lt;embed&gt;
&lt;fieldset&gt;
&lt;figcaption&gt;
&lt;figure&gt;
&lt;font&gt;
&lt;footer&gt;
&lt;form&gt;
&lt;frame&gt;
&lt;frameset&gt;
&lt;h1&gt; - &lt;h6&gt;
&lt;head&gt;
&lt;header&gt;
&lt;hr&gt;
&lt;html&gt;
&lt;i&gt;
&lt;iframe&gt;
&lt;img&gt;
&lt;input&gt;
&lt;ins&gt;
&lt;kbd&gt;
&lt;keygen&gt;
&lt;label&gt;
&lt;legend&gt;
&lt;li&gt;
&lt;link&gt;
&lt;main&gt;
&lt;map&gt;
&lt;mark&gt;
&lt;menu&gt;
&lt;menuitem&gt;
&lt;meta&gt;
&lt;meter&gt;
&lt;nav&gt;
&lt;noframes&gt;
&lt;noscript&gt;
&lt;object&gt;
&lt;ol&gt;
&lt;optgroup&gt;
&lt;option&gt;
&lt;output&gt;
&lt;p&gt;
&lt;param&gt;
&lt;picture&gt;
&lt;pre&gt;
&lt;progress&gt;
&lt;q&gt;
&lt;rp&gt;
&lt;rt&gt;
&lt;ruby&gt;
&lt;s&gt;
&lt;samp&gt;
&lt;script&gt;
&lt;section&gt;
&lt;select&gt;
&lt;small&gt;
&lt;source&gt;
&lt;span&gt;
&lt;strike&gt;
&lt;strong&gt;
&lt;style&gt;
&lt;sub&gt;
&lt;summary&gt;
&lt;sup&gt;
&lt;svg&gt;
&lt;table&gt;
&lt;tbody&gt;
&lt;td&gt;
&lt;template&gt;
&lt;textarea&gt;
&lt;tfoot&gt;
&lt;th&gt;
&lt;thead&gt;
&lt;time&gt;
&lt;title&gt;
&lt;tr&gt;
&lt;track&gt;
&lt;tt&gt;
&lt;u&gt;
&lt;ul&gt;
&lt;var&gt;
&lt;video&gt;
&lt;wbr&gt;
</code>
    
  </div>
</template>

<script lang="ts">
// 工具方法
import { defineComponent, onMounted, computed, ref } from "vue";
// 组件
// import CaInputNumber from '../../InputNumber/src/index.vue';
// import CaIcon from '@/packages/Icon/src/index.vue';
// 验证
// type/interface
// 配置项
// 指令
// 数据

export default defineComponent({
  name: "html",
  // components: {
    // CaIcon
    //     CaInputNumber,
  // },
  // directives
  // inheritAttrs: false,
  props: {
    key: {
      type: String,
      default: "",
    },
  },
  // emits: ['blur'],
  setup(props, ctx) {
    // inject
    // variable
    // ref
    let elementRef = ref();
    // computed
    // methods
    // provide
    // evnet fn
    // watch
    // lifeCircle
    // onMounted(() => {
    //   console.log("mounted");
    // });
    return {
      // variable
      // ref
      elementRef,
      // computed
      // methods
      // evnet fn
    };
  },
});
</script>

<style lang="scss" scoped>
.html {
  background-color: #8dbaff;
}
</style>