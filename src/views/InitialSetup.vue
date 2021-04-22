<template>
	<div class="initial-setup-page">
		<div class="logo-wrapper">
			<img
				src="@/assets/img/logo.png"
				title="vChat"
				class="logo"
			/>
			vChat
		</div>

		<div class="form-wrapper">
			<h4>Specify your vChat server URL</h4>

			<FormInput
				v-model="url"
				@keyup.enter="submit"
				type="text"
				name="url"
				floating-label
				placeholder="Server URL (e.g. http://v-chat.com:1234)"
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
			/**
			 * Submits the initial setup form
			 */
			async submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				//try to set the server URL
				const success = await this.setServer(this.url);

				if (success) {
					//redirect to the authentication page
					this.$router.push({
						name: 'authentication'
					});
				}

				this.submitting = false;
			}
		}
	};
</script>

<style lang="scss">
	.initial-setup-page {
		height: 100%;

		.logo-wrapper {
			margin-top: 20px;
			padding: 10px;
			text-align: center;
			font-size: 22px;

			.logo {
				display: block;
				margin: auto;
				width: 80px;
			}
		}

		.form-wrapper {
			margin: 20px auto 0px auto;
			width: 70%;
			max-width: 500px;
			padding: 15px;
			background-color: $white;
			border: solid 2px $gray;

			h4 {
				margin-top: 5px;
				text-align: center;
			}

			.form-button {
				display: block;
				margin: auto;
			}
		}

		@media (max-width: $small) {
			.form-wrapper {
				width: 90%;
			}
		}
	}
</style>
