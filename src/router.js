import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components'
import Admin from '@/components/Admin'
// import PlatformerGame from '@/components/PlatformerGame'
// import DrawGame from '@/components/DrawGame'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        }
    ]
})
