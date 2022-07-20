# 创建项目

## xxx
## 独立项目
### vue组件
```vue
<template>
</template>
<script lang="ts">
import {defineComponent, PropType, ref, reactive} from 'vue'
interface A {
    k: number
}
interface Book {
    title: string
}
const CompName = defineComponent({
    props: {
        name: string,
        cb: {
            type: Function as PropType<() => void> // 像不像ts中的泛型。其实就是泛型。
        },
        book: {
            type: Object as PropType<Book>
        }
    },
    emits: {
        addBook(payload: {bookName: string}) { // 为有效载荷添加类型注解
            // 运行时验证
            return payload.bookName.length > 0
        }
    },
    data () {
        return {
            k: 0
        } as A // 使用类型断言
    },
    computed: {
        a(): string {
            return String(this.k)
        }
    },
    setup() { // 实际中，一般setup与data互斥出现
        let year = ref<string | number>(2020) // 又是ts的泛型
        console.log(year.value) // 2020
        let b = reactive<Book>({title: 's'}) // 与ref的用法类似
        let b: Book = reactive({title: 's'})
        let b = reactive({title: 's'}) as Book
        let fn = (evt: Event) => {
            console.log((evt.target as HTMLInputElement).value)
        }
        return {
            fn // 这需要输出后可被模板引用使用
        }
    }
})
</script>
<style>
</style>

// other comp
const app = defineComponent({
    components: {
        MyModal
    },
    template: `<my-modal ref="m" />`
    setup() {
        let m = ref<InstanceType<typeof MyModal>>(null) // 类型注解
        let open = () => {
            m.value.fn() // 使用输出的方法
        }
        return {
            open,
            m
        }
    }
})
```

### title
### title
### title
### title
### title


