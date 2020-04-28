<template>
	<div class="initial-setup-page">
		initial setup page
		contains controls for setting up the workspace/server URL

		<FormInput
			v-model="url"
			type="text"
			name="url"
			floating-label
			placeholder="Server URL"
		></FormInput>

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
				//try to set the server URL
				this.setServer(this.url).then((success) => {
					if (success) {
						//redirect to the authentication page
						this.$router.push({
							name: 'authentication'
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss">

</style>
