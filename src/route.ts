import { createRouter, createWebHistory } from "vue-router"

let routes = [
    {
        path: '/',
        component: () => import("./pages/entry.vue"),
        name: 'entry',
        children: [
            {
                path: '/dashboard',
                component: () => import("./pages/test.vue"),
                name: '综合',
                meta: {
                    title: '综合',
                }
            },
            {
                path: '/propertySetting',
                component: () => import("./pages/test2.vue"),
                name: '配色管理',
                meta: {
                    title: '配色管理',
                }
            },
            {
                path: '/propertySetting2',
                component: () => import("./pages/test3.vue"),
                name: '随便',
                meta: {
                    title: '随便',
                }
            },
        ]
    },
]
let router = createRouter({
    history: createWebHistory(),
    routes
})
export default router