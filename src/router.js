import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/home/login.vue'
import Index from '@/view/home/index.vue'
import Product from '@/view/product/index.vue'
import Category from '@/view/category/index.vue'
// import Olist from '@/view/home/olist.vue'
Vue.use(Router);
const routes = [
    { path: '/', redirect: '/login', },
    { path: '/login', component: Login, },
    {
        path: '/home', name: 'home', component: Index.Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', name: 'welcome', component: Index.Welcome, },
            { path: '/productlist', name: 'productlist', component: Product.List, },
            { path: '/power', name: 'power', component: Category.Power, },
            { path: '/useManage', name: 'useManage', component: Category.useManage, },
            { path: '/changePwd', name: 'changePwd', component: Category.ChangePwd, },
        ]
    },

]
const router = new Router({
    routes
})
export default router;