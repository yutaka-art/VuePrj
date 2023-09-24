import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios' //追記
import VueAxios from 'vue-axios' //追記
// import * as date_fns from 'date-fns'
// import * as is from './_is'

//axios.defaults.baseURL = 'https://dapr-backend.thankfulgrass-b5e492bd.japaneast.azurecontainerapps.io'
//axios.defaults.baseURL = 'https://localhost:44372'
// this.axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
// this.axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.get['Origin'] = 'https://trustedsite.com';

//axios.defaults.baseURL = 'https://apim-vue-api-dev-001.azure-api.net'
//axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = 'e8f9eaeaaaa64d408f0fb028ab693061';

axios.defaults.baseURL = 'https://localhost:44372'

Vue.config.productionTip = false
Vue.use(VueAxios, axios) //追記

// window.date_fns = date_fns
// window.Libs = {
//   is
// }

// window.Vue = Vue
// window.Vuetify = vuetify
// window.axios = axios
// window.date_fns = date_fns
// window.Libs = {
//   is
// }

import AppTextField from '@/components/commons/AppTextField.vue'
import AppConfirmDialog from '@/components/commons/AppConfirmDialog'
// import AppPopupDatePicker from '@/components/commons/AppPopupDatePicker.vue'

Vue.component('app-text-field', AppTextField);
Vue.component('app-confirm-dialog', AppConfirmDialog);
// Vue.component('app-popup-date-picker', AppPopupDatePicker);


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')



