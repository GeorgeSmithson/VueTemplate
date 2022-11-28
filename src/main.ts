import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-green/theme.css'; //Theme
import 'primevue/resources/primevue.min.css'; //General styling 
import 'primeicons/primeicons.css'; //Icons
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import BadgeDirective from 'primevue/badgedirective';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ConfirmationService)
app.use(ToastService)
app.directive('tooltip', Tooltip)
app.directive('badge', BadgeDirective)

app.mount('#app')
