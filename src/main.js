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
    baseURL: 'http://localhost:8001',
 
    
    //请求等待超时时间则中
    timeout: 1500,
    //请求后的data处理
    // transformResponse: [function (data) {
    //   window.console.log(data);
    //   return data;
    // }]
  })
axios.defaults.headers.post['ontent-type']='application/json;charset=UTF-8'
Vue.use(ElementUI);
new Vue({
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
