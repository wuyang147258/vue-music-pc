import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/aixos.js'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')