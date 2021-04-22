<template>
	<div class="authentication-page">
		<div class="logo-wrapper">
			<img
				src="@/assets/img/logo.png"
				title="vChat"
				class="logo"
			/>
			vChat
		</div>

		<div class="tabs-wrapper">
			<Tabs cache-lifetime="0" :options="{ useUrlFragment: false }">
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

		.tabs-wrapper {
			margin: auto;
			margin-top: 20px;
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

			.tabs-component-panels {
				padding: 20px;
			}
		}

		@media (max-width: $small) {
			.tabs-wrapper {
				padding: 10px;
				width: 100%;
			}
		}
	}
</style>
