<template>
  <div class="nav-box">
    <h2 v-text="title"></h2>
    <div class="nb__item-box">
      <span class="nb__item"
        v-for="(item, index) in navList"
        :key="index"
      	:class="[item.disabled ? 'is-disabled' : '']"
        v-text="item.label"
        @click="itemClickHandler(item)"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
// 工具方法
import { defineComponent, PropType, onMounted, computed, ref } from "vue";
// 组件
// import CaInputNumber from '../../InputNumber/src/index.vue';
// import CaIcon from '@/packages/Icon/src/index.vue';
// 验证
// type/interface
type TNavItem = {
	label: string
	value: any
	disabled?: boolean
}
// 配置项
// 指令
// 数据

export default defineComponent({
  name: "NavBox",
  // components: {
    // CaIcon
    //     CaInputNumber,
  // },
  // directives
  // inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: "",
    },
    navList: {
      type: Array as PropType<TNavItem[]>,
      default: () => {
        return [
          // {
          //   label
          //   value
          // }
        ]
      },
    },
  },
  emits: ['selectItem'],
  setup(props, ctx) {
    // inject
    // variable
    // ref
    // let elementRef = ref();
    // computed
    // methods
    // provide
    // evnet fn
    let itemClickHandler = (item: TNavItem) => {
		  item.disabled ? null : ctx.emit('selectItem', item.value)
    }
    // watch
    // lifeCircle
    // onMounted(() => {
    //   console.log("mounted");
    // });
    return {
      // variable
      // ref
      // elementRef,
      // computed
      // methods
      // evnet fn
      itemClickHandler
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-box {
	padding: 20px 12px;
  box-sizing: border-box;
  h2 {
    text-align: center;
  }
  .nb__item-box {
  	display: flex;
  	flex-wrap: wrap;
    .nb__item {
      margin: 6px 10px;
      color: #000;
      background-color: #ffb9f0;
      border-radius: 4px;
      font-size: 18px;
      padding: 4px;
      cursor: pointer;
      &.is-disabled {
      	color: grey;
      	background-color: #dad5b4;
      }
    }
  }
}
</style>