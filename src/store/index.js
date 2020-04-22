import Vue from 'vue';
import Vuex from 'vuex';

//TODO: look for a different persisted state plugin
//import { createPersistedState } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
	modules,
	plugins: [
		//createPersistedState()
	],
	strict: process.env.NODE_ENV !== 'production'
});
