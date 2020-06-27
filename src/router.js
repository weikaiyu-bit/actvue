import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/home/login.vue'
import Index from '@/view/home/index.vue'
import Leave from '@/view/leave/index.vue'

// import Olist from '@/view/home/olist.vue'
Vue.use(Router);
const routes = [
    { path: '/', redirect: '/login', },
    { path: '/login', component: Login, },
    {
        path: '/home', name: 'home', component: Index.Home, meta: { requireAuth: true, },
        redirect: '/welcome',
        children: [
            { path: '/welcome', name: 'welcome', component: Index.Welcome, meta: { requireAuth: true } },
            { path: '/power', name: 'power', component: Leave.Power, meta: { requireAuth: true } },
            { path: '/task', name: 'task', component: Leave.Task, meta: { requireAuth: true } },
            { path: '/mytask', name: 'mytask', component: Leave.MyTask, meta: { requireAuth: true } },
        ]
    },

]
const router = new Router({
    routes
})
export default router;