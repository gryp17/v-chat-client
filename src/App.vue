<template>
	<div id="app">
		<LoadingIndicator v-show="loading" />
		<router-view />
	</div>
</template>

<script>
	import Vue from 'vue';
	import { ipcRenderer } from 'electron';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import { setApiBaseURL, setApiToken } from '@/services/API';

	import errorsMap from '@/filters/errorsMap';
	import FormInput from '@/components/forms/FormInput';
	import FormButton from '@/components/forms/FormButton';
	import LoadingIndicator from '@/components/LoadingIndicator';

	//global filters
	Vue.filter('errorsMap', errorsMap);

	//global components
	Vue.component('FormInput', FormInput);
	Vue.component('FormButton', FormButton);

	export default {
		components: {
			LoadingIndicator
		},
		computed: {
			...mapState('auth', [
				'server',
				'token'
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
				'setLoading'
			]),
			...mapActions('auth', [
				'getUserSession',
				'resetState'
			]),
			listenForElectronEvents() {
				ipcRenderer.on('change-server', () => {
					//reset the auth state
					this.resetState();

					this.redirectTo({
						name: 'initial-setup'
					});
				});

				ipcRenderer.on('reset-settings', () => {
					//reset the auth state
					this.resetState();
					//TODO: reset the rest of the settings state

					this.redirectTo({
						name: 'initial-setup'
					});
				});
			},
			/**
			 * Initializes the app by figuring out which page to show and setting the axios URL and token
			 */
			async initializeApp() {
				this.setLoading(true);

				if (!this.server) {
					//redirect to the initial setup page
					this.redirectTo({
						name: 'initial-setup'
					});
					this.setLoading(false);
					return;
				}

				//set the axios base URL
				setApiBaseURL(this.server);

				//set the axios token header
				if (this.token) {
					setApiToken(this.token);
				}

				//get the user session
				await this.getUserSession();

				if (!this.isLoggedIn) {
					this.redirectTo({
						name: 'authentication'
					});
				} else {
					this.redirectTo({
						name: 'chat'
					});
				}

				this.setLoading(false);
			},
			/**
			 * Proxy function redirects to the specified path
			 * It's used in order to catch any NavigationDuplicated exceptions
			 * @param {String} path
			 */
			redirectTo(path) {
				this.$router.push(path).catch(() => {});
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

		button:focus {
			outline: none;
		}

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
	}
</style>
