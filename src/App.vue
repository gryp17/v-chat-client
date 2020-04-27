<template>
	<div id="app">
		<LoadingIndicator v-show="loading" />
		<router-view/>
	</div>
</template>

<script>
	import API from '@/services/API';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import LoadingIndicator from '@/components/LoadingIndicator';

	export default {
		components: {
			LoadingIndicator
		},
		computed: {
			...mapState('ui', [
				'loading'
			]),
			...mapState('auth', [
				'server'
			]),
			...mapGetters('auth', [
				'isLoggedIn'
			])
		},
		created() {
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
				'getUserSession'
			])
		}
	};
</script>

<style lang="scss">
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
		font-family: "Roboto Mono";
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

		//custom titlebar/menu styling
		.titlebar {
			.action-menu-item {
				.menu-item-icon {
					display: none;

					.action-label:not(.separator) {
						padding: 0 20px;
					}
				}
			}
		}

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
	}
</style>
