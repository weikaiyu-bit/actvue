import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/home/login.vue'
import Index from '@/view/home/index.vue'
import Product from '@/view/product/index.vue'
import Category from '@/view/category/index.vue'
import Property from '@/view/property/index.vue'
// import Olist from '@/view/home/olist.vue'
Vue.use(Router);
const routes = [
    { path: '/', redirect: '/login', },
    { path: '/login', component: Login, },
    {
        path: '/home', name: 'home', component: Index.Home,meta:{requireAuth:true,},
        redirect: '/welcome',
        children: [
            { path: '/welcome', name: 'welcome', component: Index.Welcome,meta:{requireAuth:true} },
            { path: '/productlist', name: 'productlist', component: Product.List, meta:{requireAuth:true} },
            { path: '/power', name: 'power', component: Category.Power, meta:{requireAuth:true} },
            { path: '/useManage', name: 'useManage', component: Category.useManage, meta:{requireAuth:true} },
            { path: '/changePwd', name: 'changePwd', component: Category.ChangePwd, meta:{requireAuth:true} },
            { path: '/image', name: 'image', component: Product.Images, meta:{requireAuth:true} },
            { path: '/property', name: 'property', component: Property.List, meta:{requireAuth:true} },
            { path: '/propertyValue', name: 'propertyValue', component: Property.PropertyValue, meta:{requireAuth:true} },
            
        ]
    },

]
const router = new Router({
    routes
})
export default router;