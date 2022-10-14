import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
// import store from './store'
import Datepicker from 'vuejs-datepicker'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component("DatePicker", Datepicker);
Vue.use(Vuex)

new Vue({
  // store,
  router,
  render: h => h(App)
}).$mount('#app')
