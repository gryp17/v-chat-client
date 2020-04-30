<template>
	<div class="authentication-page">
		authentication page that contains two tabs with signup and login options

		<div class="form-wrapper">
			<Tabs cache-lifetime="0">
				<Tab name="Login">
					1111111
				</Tab>
				<Tab name="Sign Up">
					222222
				</Tab>
			</Tabs>
		</div>

		<button @click="onLogin">
			Login
		</button>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { Tabs, Tab } from 'vue-tabs-component';

	export default {
		components: {
			Tabs,
			Tab
		},
		methods: {
			...mapActions('auth', [
				'login'
			]),
			onLogin() {
				this.login({
					email: 'plamen@abv.bg',
					password: '1234'
				});
			}
		}
	};
</script>

<style lang="scss">
	.authentication-page {
		.form-wrapper {
			margin: auto;
			width: 70%;
			max-width: 500px;

			.tabs-component-tab {
				flex: 1;

				&.is-active {
					background-color: $white;
				}

				.tabs-component-tab-a {
					justify-content: center;;
				}
			}
		}
	}
</style>
