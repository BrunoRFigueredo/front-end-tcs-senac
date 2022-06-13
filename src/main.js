import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'

createApp(App).use(router, VueModal).mount('#app')
