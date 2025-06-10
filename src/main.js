import { createApp } from 'vue'
import App from './App.vue'

//pinia 추가
import {createPinia} from "pinia";
import router from './router'

const app = createApp(App) //index.js 불러오기

app.use(createPinia) //pinina 등록
app.use(router)

app.mount('#app')
