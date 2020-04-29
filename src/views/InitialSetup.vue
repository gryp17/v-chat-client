<template>
	<div class="initial-setup-page">
		<div class="form-wrapper">
			<h4>Specify your vChat server URL</h4>

			<FormInput
				v-model="url"
				@keyup.enter="submit"
				type="text"
				name="url"
				floating-label
				placeholder="Server URL"
			></FormInput>

			<FormButton
				:disabled="submitting"
				@click="submit"
			>
				Proceed
			</FormButton>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				url: '',
				submitting: false
			};
		},
		methods: {
			...mapActions('auth', [
				'setServer'
			]),
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				//try to set the server URL
				this.setServer(this.url).then((success) => {
					if (success) {
						//redirect to the authentication page
						this.$router.push({
							name: 'authentication'
						});
					}

					this.submitting = false;
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
			padding: 15px;
			background-color: $gray;

			h4 {
				margin-top: 5px;
				text-align: center;
			}

			.form-button {
				display: block;
				margin: auto;
			}
		}
	}
</style>
