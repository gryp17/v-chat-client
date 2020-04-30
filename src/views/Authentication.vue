<template>
	<div class="authentication-page">
		<div class="tabs-wrapper">
			<Tabs cache-lifetime="0">
				<Tab name="Login">
					<LoginForm />
				</Tab>
				<Tab name="Sign Up">
					<SignupForm />
				</Tab>
			</Tabs>
		</div>
	</div>
</template>

<script>
	import { Tabs, Tab } from 'vue-tabs-component';
	import LoginForm from '@/components/LoginForm';
	import SignupForm from '@/components/SignupForm';

	export default {
		components: {
			Tabs,
			Tab,
			LoginForm,
			SignupForm
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
