import Vue from 'vue';
import { Titlebar } from 'custom-electron-titlebar';

import App from './App.vue';
import router from './router';
import store from './store';
import menuIcon from './assets/img/icon.png';

new Titlebar({
	icon: menuIcon
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
