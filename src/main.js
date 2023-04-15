import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/fontawesome/font-awesome.css'


window.addEventListener('storage', () => {
    if(localStorage.session_id == undefined)
    {
        window.location.reload();
    }
});

const app = createApp(App)

app.use(router)

app.mount('#app')
