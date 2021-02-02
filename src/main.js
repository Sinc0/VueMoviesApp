import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import storage from './storage'

createApp(App)
    .use(storage)
    .use(router)
    .mount('#app')
