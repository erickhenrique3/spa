import { createApp } from 'vue'
import App from './App.vue'
import './reset.css'
import router from './router'
import '@/axios'
// import moment from 'moment'


createApp(App).use(router).mount('#app')
