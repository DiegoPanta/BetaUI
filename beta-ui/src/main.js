import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './assets/main.css'

library.add(faPlus);
library.add(faTrash);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');