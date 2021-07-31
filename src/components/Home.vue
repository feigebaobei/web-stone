<template>
  <div class="app-box">
    <!-- <div class="header">header</div>
    <div class="bottom">bottom</div> -->
    <nav-box
      class="nav-box"
      v-for="(item, index) in navBoxList"
      :key="index"
      :title="item.title"
      :nav-list="item.navList"
      @selectItem="navItemClickHandler"
    />
  
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import NavBox from './NavBox.vue';
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld,
    NavBox,
  },
  setup(props, ctx) {
    const navBoxList = reactive([
      {
        title: 'basic',
        navList: [
          {
            label: 'about',
            value: 'about',
            disabled: false,
          },
          {
            label: 'html',
            value: 'html',
            disabled: true,
          },
          {
            label: 'js',
            value: 'js',
            disabled: true,
          },
          {
            label: 'ts',
            value: 'ts',
            disabled: true,
          },
          {
            label: 'vue',
            value: 'vue',
            disabled: true,
          },
          {
            label: 'react',
            value: 'react',
            disabled: true,
          },
          {
            label: 'angular',
            value: 'angular',
            disabled: true,
          },
          {
            label: 'data-structure',
            value: 'data-structure',
            disabled: true,
          },
        ],
      },
      {
        title: 'promote',
        navList: [
          {
            label: '工程化',
            value: 'engineered',
            disabled: true,
          },
          {
            label: 'proxy',
            value: 'proxy',
            disabled: true,
          },
        ],
      },
      {
        title: 'development',
        navList: [
          {
            label: 'none',
            value: 'none',
            disabled: true,
          },
        ],
      },
    ]);
    let router = useRouter()
    let navItemClickHandler = (v: any) => {
      // emit('selectItem', v)
      console.log(v, ctx)
      router.push({
        // query: `/${v}`
        path: `/${v}`
      })
    }
    return {
      navBoxList,
      navItemClickHandler
    };
  }
});
</script>

<style lang="scss" scoped>
.app-box {
  /*
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  */
  display: flex;
  height: 100%;
  .nav-box {
    flex-basis: 30%;
    height: 100%;
    flex-grow: 1;
    &:nth-child(1) {
      background-color: #8dbaff;
    }
    &:nth-child(2) {
      background-color: #81f3cd;
    }
    &:nth-child(3) {
      background-color: #f3f087;
    }
  }
  .header {
    flex-basis: 100%;
    height: 100px;
    width: 100%;
    background-color: green;
  }
  .bottom {
    flex-basis: 100%;
    width: 100%;
    height: 100px;
    background-color: blue;
  }
}
</style>
