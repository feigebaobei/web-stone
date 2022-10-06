const routes = [
    { path: '/', component: () => import('../pages/Upload.vue')},
    { path: '/search', component: () => import('../pages/Search.vue')},
]
export default routes