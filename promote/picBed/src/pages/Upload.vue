<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="文件">
        <el-upload
          :before-upload="beforeUploadHander"
        >
          <template #trigger>
            <el-button>选择文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.tags" multiple>
          <el-option label="one" value="one" />
          <el-option label="two" value="two" />
          <el-option label="three" value="three" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!!form.submitDisableTime" type="primary" @click="submitHandler">提交 {{form.submitDisableTime ? form.submitDisableTime : ''}}</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// 工具方法
import { defineComponent, onMounted, computed, ref, reactive, onUnmounted } from "vue";
import {instance} from '../utils/axios'
// 组件
import {
  ElForm,
  ElFormItem,
  ElUpload,
  ElButton,
  ElSelect,
  ElOption,
  ElMessage,
} from 'element-plus'
// import CaInputNumber from '../../InputNumber/src/index.vue';
// import CaIcon from '@/packages/Icon/src/index.vue';
// 验证
// type/interface
// 配置项
// 指令
// 数据

export default defineComponent({
  name: "Upload",
  components: {
    ElForm,
    ElFormItem,
    ElUpload,
    ElButton,
    ElSelect,
    ElOption,
    // ElMessage,
  },
  // directives
  // inheritAttrs: false,
  props: {
    key: {
      type: String,
      default: "",
    },
  },
  // data() {
  //   return {
  //     toUploadFile: '',
  //     k: 2
  //   }
  // },
  // emits: ['blur'],
  setup(props, ctx) {
    // inject
    // variable
    // ref
    let elementRef = ref();
    const form = reactive({
      tags: [],
      rawFile: {} as File,
      submitDisableTime: 0,
      timeId: 0,
    })

    // computed
    // methods
    // provide
    // evnet fn
    const submitHandler = () => {
      console.log('submitHandler', form.submitDisableTime)
      if (form.submitDisableTime) {
        ElMessage({
          message: '请等一等',
          type: 'warning',
        })
        return
      }
      // let formData = new FormData()
      // formData.append('photo', form.rawFile)
      // // formData.append(`tags[${form}]`, form.tags)
      // form.tags.forEach((item, index) => {
      //   console.log('item', item, index)
      //   formData.append(`tags[${index}]`, item)
      // })
      // for ()
      // Object.
      // console.log('formData', formData)
      instance({
        // url: 'http://localhost:5000/picBed',
        url: 'http://wushusandavercel.com:5000/picBed',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data' // 设置此字段，则axios自动把data转化为FormData类型
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        // data: formData,
        data: {
          tags: form.tags,
          photo: form.rawFile,
        }
      }).then((res: any) => {
        console.log('then', res)
      }).catch((error: any) => {
        console.log('catch', error)
      }).finally(() => {
        form.submitDisableTime = 5
        form.timeId = setInterval(() => {
          form.submitDisableTime = form.submitDisableTime - 1
          if (!form.submitDisableTime) {
            clearInterval(form.timeId)
          }
        }, 1000)
      })
      // console.log('submitHandler', formData)
    }
    const beforeUploadHander = function(file: File) {
      form.rawFile = file
      console.log('beforeUploadHander', file)
      // console.log('beforeUploadHander', file, this.k, this.toUploadFile)
      return false
    }
    // watch
    // lifeCircle
    // onMounted(() => {
    //   console.log("mounted");
    // });
    onUnmounted(() => {
      // console.log("onUnmounted");
      form.timeId && clearInterval(form.timeId)
    });
    return {
      // variable
      // ref
      elementRef,
      form,
      // computed
      // methods
      // evnet fn
      submitHandler,
      beforeUploadHander,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>