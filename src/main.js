import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App).use(router, VueModal, BootstrapVue3).mount('#app')
