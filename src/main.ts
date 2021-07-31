import { createApp } from 'vue'
import App from './App.vue'
import './assets/baseScss.scss'
import {createRouter, createWebHashHistory} from 'vue-router'

import Home from './components/Home.vue'
import About from './components/About.vue'

let routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/about',
		component: About
	},
]

let router = createRouter({
	history: createWebHashHistory(),
	routes
})
createApp(App)
	.use(router)
.mount('#app')
