<template>
  <div class="html">
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
  name: "CaBaseCars",
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