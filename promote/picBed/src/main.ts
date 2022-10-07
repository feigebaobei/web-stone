import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import * as VueRouter from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
// import './style.css'
import App from './App.vue'
import routes from './routes/index'


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = createApp(App)
for(let [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
// .use(ElementPlus) // 不使用全量引入
app.mount('#app')

