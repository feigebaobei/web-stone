import { createRouter, createWebHashHistory } from 'vue-router'
import {navBoxList} from '../components/pages/home/config'
import {TRoute} from '../types'
// import navBoxList from '../components/pages/Home/config.ts'
// console.log(navBoxList)
let routes: TRoute[] = [
	{
		path: '/',
		// component: import('@/component/pages/home/index.vue')
		component: () => import('../components/pages/home/index.vue')
	},
	// {
	// 	path: '/html',
	// 	component: import('../components/pages/html/index.vue')
	// },
	// {
	// 	path: '/js',
	// 	component: import('../components/pages/js/index.vue')
	// },
// 	{
// 		path: '/',
// 		component: import('@/component/pages/Home/index.vue')
// 	},
// 	{
// 		path: '/',
// 		component: import('@/component/pages/Home/index.vue')
// 	},
]
let {log} = console
routes = routes.concat(navBoxList.map(({title, navList}) => {
	// log(title, navList)
	return navList.map((item) => {
		let a = {
			path: `/${item.value}`,
			// component: import(`@/components/pages/${item.value}/index.vue`)
			// component: import(`../components/pages/home/index.vue`)
			// component: import('@/components/pages/home/index.vue')
			// component: import(`../components/pages/${item.value}/index.vue`)
			component: () => import(`../components/pages/${item.value}/index.vue`)
		}
		// log(a)
		return a
	})
}).reduce((r, c) => {
	r.push(...c)
	return r
}, []))
// console.log(routes)

let router = createRouter({
	history: createWebHashHistory(),
	routes
})
export default router
