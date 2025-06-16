import { createApp } from 'vue'
import App from './App.vue'

//pinia 추가
import {createPinia} from "pinia";
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App) //index.js 불러오기
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.mount('#app')
