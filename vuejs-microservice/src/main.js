import Vue from 'vue'
import App from './App.vue'
import './assets/css/bootstrap.min.css'
// import './assets/css/signin.css' 
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
