<template>
	<div class="initial-setup-page">
		<div class="form-wrapper">
			<h4>Specify your vChat server URL</h4>

			<FormInput
				v-model="url"
				type="text"
				name="url"
				floating-label
				placeholder="Server URL"
			></FormInput>

			<button @click="onSetServer">
				Set server
			</button>
		</div>
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
	.initial-setup-page {
		display: flex;
		flex-direction: column;
		height: 100%;

		.form-wrapper {
			margin: auto;
			width: 70%;
			padding: 10px;
			background-color: $gray;

			h4 {
				margin-top: 10px;
				text-align: center;
			}
		}
	}
</style>
