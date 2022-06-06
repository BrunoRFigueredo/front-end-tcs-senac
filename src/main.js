import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import Maska from 'maska'

createApp(App).use(router, VueModal, Maska).mount('#app')
