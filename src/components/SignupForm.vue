<template>
	<div class="signup-form">
		<FormInput
			v-model="email"
			type="text"
			name="email"
			floating-label
			placeholder="Email"
		></FormInput>

		<FormInput
			v-model="displayName"
			type="text"
			name="displayName"
			floating-label
			placeholder="Display name"
		></FormInput>

		<FormInput
			v-model="password"
			type="password"
			name="password"
			floating-label
			placeholder="Password"
		></FormInput>

		<FormInput
			v-model="repeatPassword"
			type="password"
			name="repeatPassword"
			floating-label
			placeholder="Repeat password"
		></FormInput>

		<FormButton
			:disabled="submitting"
			@click="submit">
			Sign up
		</FormButton>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				displayName: '',
				password: '',
				repeatPassword: '',
				submitting: false
			};
		},
		methods: {
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;
			}
		}
	};
</script>

<style lang="scss">
	.signup-form {
		.form-button {
			display: block;
			margin: auto;
			margin-top: 20px;
		}
	}
</style>
