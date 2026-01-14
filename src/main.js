import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // Optional global styles

// Wait for Firebase to init before mounting to prevent redirect flickers
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).mount('#app');
  }
});