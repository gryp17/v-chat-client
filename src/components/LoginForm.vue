<template>
	<div class="login-form">
		<FormInput
			v-model="email"
			@keyup.enter="submit"
			type="text"
			name="email"
			floating-label
			placeholder="Email"
		></FormInput>

		<FormInput
			v-model="password"
			@keyup.enter="submit"
			type="password"
			name="password"
			floating-label
			placeholder="Password"
		></FormInput>

		<FormButton
			:disabled="submitting"
			@click="submit">
			Login
		</FormButton>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				email: '',
				password: '',
				submitting: false
			};
		},
		methods: {
			...mapActions('auth', [
				'login'
			]),
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				this.login({
					email: 'plamen@abv.bg',
					password: '12345'
				}).then((res) => {
					console.log(res);

					this.submitting = false;
				});
			}
		}
	};
</script>

<style lang="scss">
	.login-form {
		.form-button {
			display: block;
			margin: auto;
			margin-bottom: 5px;
		}
	}
</style>
