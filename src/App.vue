<template>
	<div id="app">
		<LoadingIndicator
			v-show="loading"
			full-screen
		/>
		<router-view />
	</div>
</template>

<script>
	import Vue from 'vue';
	import { ipcRenderer, shell } from 'electron';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import { setApiBaseURL } from '@/services/API';

	import errorsMap from '@/filters/errorsMap';
	import FormInput from '@/components/forms/FormInput';
	import FormFileInput from '@/components/forms/FormFileInput';
	import FormButton from '@/components/forms/FormButton';
	import FormSwitch from '@/components/forms/FormSwitch';
	import LoadingIndicator from '@/components/LoadingIndicator';

	//global filters
	Vue.filter('errorsMap', errorsMap);

	//global components
	Vue.component('FormInput', FormInput);
	Vue.component('FormFileInput', FormFileInput);
	Vue.component('FormButton', FormButton);
	Vue.component('FormSwitch', FormSwitch);

	export default {
		components: {
			LoadingIndicator
		},
		computed: {
			...mapState('auth', [
				'server'
			]),
			...mapGetters('ui', [
				'loading'
			]),
			...mapGetters('auth', [
				'isLoggedIn'
			])
		},
		created() {
			this.listenForElectronEvents();
			this.initializeApp();
		},
		methods: {
			...mapActions('ui', [
				'setLoading',
				'setFocused'
			]),
			...mapActions('auth', [
				'getUserSession',
				'logout',
				'resetState'
			]),
			/**
			 * Listens for the electron (main window) events
			 */
			listenForElectronEvents() {
				ipcRenderer.on('change-server', async () => {
					//logout before changing the server
					await this.logout();

					//reset the auth state
					this.resetState();

					this.redirectTo({
						name: 'initial-setup'
					});
				});

				//on download complete open the directory where the file was saved
				ipcRenderer.on('download-complete', (event, path) => {
					shell.showItemInFolder(path);
				});

				ipcRenderer.on('window-focused', (event, focused) => {
					this.setFocused(focused);
				});
			},
			/**
			 * Initializes the app by figuring out which page to show and setting the axios URL
			 */
			async initializeApp() {
				this.setLoading(true);

				let page;

				if (!this.server) {
					page = 'initial-setup';
				} else {
					//set the axios base URL
					setApiBaseURL(this.server);

					//get the user session
					await this.getUserSession();
					page = this.isLoggedIn ? 'chat' : 'authentication';
				}

				await this.redirectTo({
					name: page
				});

				this.setLoading(false);
			},
			/**
			 * Proxy function redirects to the specified path
			 * It's used in order to catch any NavigationDuplicated exceptions
			 * @param {String} path
			 */
			redirectTo(path) {
				return this.$router.push(path).catch(() => {});
			}
		}
	};
</script>

<style lang="scss">
	@import '~@/assets/css/_electron-titlebar';
	@import '~@/assets/css/_vue-tabs';
	@import '~@/assets/css/_vue-toasted';

	@font-face {
		font-family: "Roboto Mono";
		src: url(~@/assets/fonts/RobotoMono-Regular.woff2) format("woff2"),
			url(~@/assets/fonts/RobotoMono-Regular.woff) format("woff"),
			url(~@/assets/fonts/RobotoMono-Regular.ttf) format("truetype");
		font-weight: normal;
		font-style: normal;
	}

	*,
	:after,
	:before {
		box-sizing:border-box;
	}

	body, html {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	body {
		background: $background;
		font-family:  $font-family;
		color: $text-color;

		:focus {
			outline: none;
		}

		::-moz-focus-inner {
			border: 0;
		}

		input {
			filter: none;
		}

		button:focus {
			outline: none;
		}

		a {
			color: $blue-light;
		}

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
	}
</style>
