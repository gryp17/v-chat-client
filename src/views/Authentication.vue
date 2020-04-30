<template>
	<div class="authentication-page">

		<div class="tabs-wrapper">
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
		$tabs-border: solid 2px $gray;

		.tabs-wrapper {
			margin: auto;
			margin-top: 100px;
			width: 70%;
			max-width: 500px;

			.tabs-component {
				border-left: $tabs-border;
				border-right: $tabs-border;
				border-bottom: $tabs-border;
			}

			.tabs-component-tab {
				flex: 1;
				border-top: solid 3px $gray;

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
