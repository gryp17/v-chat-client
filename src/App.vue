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
	import API from '@/services/API';

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
			...mapState('ui', [
				'loading'
			]),
			...mapState('auth', [
				'server',
				'token'
			]),
			...mapGetters('auth', [
				'isLoggedIn'
			])
		},
		created() {
			ipcRenderer.on('sign-out', () => {
				this.resetState();
			});

			this.setLoading(true);

			//TODO: check if the server URL is set
			//TODO: check if the user is logged in
			//TODO: and finally redirect to the chat/signup or the initial setup page

			if (!this.server) {
				//redirect to the initial setup page
				this.$router.push({
					name: 'initial-setup'
				});
				this.setLoading(false);
				return;
			}

			//set the axios base URL
			API.defaults.baseURL = this.server;

			//set the axios token header
			if (this.token) {
				API.defaults.headers.common.token = this.token;
			}

			this.getUserSession().then(() => {
				if (!this.isLoggedIn) {
					this.$router.push({
						name: 'authentication'
					});
				} else {
					this.$router.push({
						name: 'chat'
					});
				}

				this.setLoading(false);
			});
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
			]),
			...mapActions('auth', [
				'getUserSession',
				'resetState'
			])
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
