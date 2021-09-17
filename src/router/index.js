import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/Home.vue'
import Song_list from '../components/song-list/song-list.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    component: Login
}, {
    path: '/home',
    component: Home,
    redirect: '/song_list/5001',
    children: [{
        path: '/song_list/:name',
        component: Song_list,
        props: true
    }]
}]

const router = new VueRouter({
        routes
    })
    //路由导航
    // router.beforeEach((to, from, next) => {
    //     if (to.path === '/login') return next();
    //     //获取token
    //     const tokenStr = window.sessionStorage.getItem('token');
    //     if (!tokenStr) return next('/login')
    //     next()
    // })
export default router