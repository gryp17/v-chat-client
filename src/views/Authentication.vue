<template>
	<div class="authentication-page">
		authentication page that contains two tabs with signup and login options

		<button @click="onLogin">
			Login
		</button>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions('auth', [
				'login'
			]),
			onLogin() {
				this.login({
					username: 'plamen',
					password: '1234'
				});
			}
		}
	};
</script>
