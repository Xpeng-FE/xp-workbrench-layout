import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import router from './route'
import "element-plus/dist/index.css"

const app = createApp(App)
window.localStorage.removeItem('oldtagurls')
window.localStorage.removeItem('tagnames')
window.localStorage.removeItem('oldtagnames')
window.localStorage.removeItem('tags')
router.beforeEach((...arg) => {
    if (arg[0].path === '/')
        arg[2]({path: '/dashboard'})
})
app.use(router)
app.mount('#app')
