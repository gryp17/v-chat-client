<template>
	<div id="app">
		<LoadingIndicator v-show="loading" />
		<router-view/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import LoadingIndicator from '@/components/LoadingIndicator';

	export default {
		components: {
			LoadingIndicator
		},
		computed: {
			...mapState('ui', [
				'loading'
			])
		},
		created() {
			this.setLoading(true);

			//TODO: check if the server URL is set
			//TODO: check if the user is logged in
			//TODO: and finally redirect to the chat/signup or the initial setup page

			setTimeout(() => {
				this.$router.push({
					name: 'Chat'
				});
			}, 1500);
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
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

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
	}
</style>
