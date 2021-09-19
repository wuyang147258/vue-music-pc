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

//定义格式化时间全局过滤器
Vue.filter('dateFormat', function(originVal) {
        const dt = new Date(originVal)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')
        const hh = (dt.getHours() + '').padStart(2, '0')
            // const mm = (dt.getMinutes() + '').padStart(2, '0')
            // const ss = (dt.getSeconds() + '').padStart(2, '0')

        return `${y}-${m}-${d} ${hh}`
    })
    //定义格式化数量全局过滤器
Vue.filter('formatCount', function(value) {
    if (value >= 10000 && value <= 100000000) {
        value /= 1000;
        return value.toFixed(1) + '万'
    } else if (value > 100000000) {
        value /= 100000000;
        return value.toFixed(1) + '亿'
    } else {
        return value;
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')