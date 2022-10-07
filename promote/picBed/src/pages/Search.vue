<template>
  <main>
    <section>
    <el-space wrap>
      <el-image class="img" v-for="(item, index) in temp.imgList" :key="index" :fit="'cover'" :src="item.url"></el-image>
    </el-space>
    </section>
    <aside>
      <ul>
        <li v-for="(item, index) in temp.imgList" :key="index" @click="liClickHandler(item.url)">
          {{item.url}}
        </li>
      </ul>
    </aside>
  </main>
</template>

<script lang="ts">
// 工具方法
import { defineComponent, onMounted, computed, ref, reactive } from "vue";
import {instance} from '../utils/axios'
// 组件
// import CaInputNumber from '../../InputNumber/src/index.vue';
import {
  ElSpace,
  ElImage,
  ElMessage,
} from 'element-plus'
// 验证
// type/interface
// 配置项
// 指令
// 数据

export default defineComponent({
  name: "Search",
  components: {
    ElSpace,
    ElImage,
  },
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
    // let elementRef = ref();
    // let imgList = reactive([1,2,3])
    let temp = reactive({
      imgList: [] as any
    })
    // computed
    // methods
    // provide
    // evnet fn
    let liClickHandler = (v: any) => {
      var inp =document.createElement('input'); // create input标签
      document.body.appendChild(inp) // 添加到body中
      inp.value = v // that.textContent // 给input设置value属性为需要copy的内容
      inp.select(); // 选中
      document.execCommand('copy',false); // copy已经选中的内容
      inp.remove(); // 删除掉这个dom
      ElMessage('已经复制')
    }
    // watch
    // lifeCircle
    onMounted(() => {
      // console.log("mounted");
      instance({
        // url: 'http://localhost:5000/picBed',
        url: 'http://wushusandavercel.com:5000/picBed',
        method: 'get',
        // headers: {
        //   'Content-Type': 'multipart/form-data' // 设置此字段，则axios自动把data转化为FormData类型
        //   // 'Content-Type': 'application/x-www-form-urlencoded'
        // },
        // data: formData,
        // data: {
        //   tags: form.tags,
        //   photo: form.rawFile,
        // }
      }).then((res: any) => {
        if (res.code === 0) {
          // imgList = res.data.map(item => {
          temp.imgList = res.data.map((item: any) => {
            return {
              url: `http://wushusandavercel.com:5000/images/picBed/${item.filename}`,
              tags: item.tags
            }
          })
        } else {
          ElMessage({
            message: res.message,
            type: 'error'
          })
        }
      }).catch((error: any) => {
        ElMessage({
          message: '请求失败',
          type: 'error'
        })
      })
      // .finally(() => {
      // })
    });
    return {
      // variable
      // ref
      // elementRef,
      // imgList,
      temp,
      // computed
      // methods
      // evnet fn
      liClickHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.img {
  // width: 30%;
  width: 300px;
  height: 280px;
  // flex-basis: 30%;
  // flex-grow: 0;
}
main {
  display: flex;
  width: 960px;
  margin: 16px auto 0;
}
section {
  flex-basis: 70%;
  flex-grow: 0;
  flex-shrink: 0;
}
aside {
  flex-basis: 30%;
  flex-grow: 0;
  flex-shrink: 0;
  word-break: break-all;
}
li {
  cursor: pointer;
  margin: 4px 0;
}
</style>