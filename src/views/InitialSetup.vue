<template>
	<div class="initial-setup-page">
		initial setup page
		contains controls for setting up the workspace/server URL

		<input v-model="url" placeholder="Server URL" type="text" />

		<button @click="onSetServer">
			Set server
		</button>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				url: ''
			};
		},
		methods: {
			...mapActions('auth', [
				'setServer'
			]),
			onSetServer() {
				//TODO: check if the server URL is correct and the user can connect to the API (maybe add an enpoint for checking the server status)
				this.setServer(this.url);

				//redirect to the authentication page
				this.$router.push({
					name: 'authentication'
				});
			}
		}
	};
</script>

<style lang="scss">

</style>
