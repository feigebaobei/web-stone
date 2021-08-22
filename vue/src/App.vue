<template>
  <div class="app-box">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    return {
    };
  }
});
</script>

<style lang="scss" scoped>
.app-box {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
