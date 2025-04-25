import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import btoast from "b-toast";

createApp(App).use(btoast).mount('#app')
