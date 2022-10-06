<template>
  <div>
    <el-space :size="'large'">
      <el-icon><ArrowLeftBold @click="goBackHandler" /></el-icon>
    </el-space>
    <el-space :size="'large'">
      <router-link to="/">上传</router-link>
    </el-space>
    <el-space :size="'large'">
      <router-link to="/search">搜索</router-link>
    </el-space>
  </div>
  <div>
    <router-view/>
  </div>
</template>

<script lang="ts">
  // 工具方法
  import { defineComponent, onMounted, computed, ref, reactive, onUnmounted } from "vue";
  import { ElButton, ElSpace, ElIcon } from 'element-plus'
  export default defineComponent({
    name: 'App',
    components: {
      ElButton,
      ElSpace,
      ElIcon,
    },
    methods: {
      goBackHandler: function() {
        this.$router.go(-1)
      }
    }
  })
</script>

<style scoped>
* {
  user-select: none;
}
</style>
