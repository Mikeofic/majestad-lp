import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Register Service Worker for performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const app = createApp(App)
app.use(router)
app.mount('#app')
