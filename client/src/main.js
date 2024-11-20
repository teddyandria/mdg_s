import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './routes/router'


const app = createApp(App)


axios.defaults.withCredentials = true

app.config.globalProperties.$axios = axios
app.use(router)
app.mount('#app')