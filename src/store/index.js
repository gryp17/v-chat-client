import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
	modules,
	plugins: [
		createPersistedState({
			//persist only the auth module for now
			paths: [
				'auth'
			]
		})
	],
	strict: process.env.NODE_ENV !== 'production'
});
