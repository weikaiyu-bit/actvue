import Vue from 'vue';
import router from '@/router'
import store from '@/stores'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import App from './App.vue';
import ElementUI from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible/flexible.js'
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios
  .create({
    //请求前处理数据
    baseURL: 'http://localhost:8082',
    // baseURL: 'http://andwky.cn:8001',
 
    
    //请求等待超时时间则中
    timeout: 100000,
    //请求后的data处理
    // transformResponse: [function (data) {
    //   window.console.log(data);
    //   return data;
    // }]
  })
  router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (window.localStorage.getItem("name")) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
  axios.interceptors.request.use((config)=>{
    let token = window.localStorage.getItem("name");
    window. console.error('tokentoken:',token)

    if(token){
      config.headers.Authorization=`Code#${token}`;
    }
    return config;
  },(error)=>{
    window. console.error('request interceptor:',error)
    return Promise.reject(error)
  })
  axios.interceptors.response.use((res)=>{
    return res;
  },(error)=>{
    window. console.error('response interceptor:',error)
    if(error.response.status){
      switch(error.response.status){
      case 401:
      router.replace("/login")
      }
    }
    return Promise.reject(error)

  })
axios.defaults.headers.post['ontent-type']='application/json;charset=UTF-8'

Vue.use(ElementUI);
new Vue({
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
