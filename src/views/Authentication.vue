<template>
	<div class="authentication-page">
		authentication page that contains two tabs with signup and login options

		<Tabs cache-lifetime="0">
			<Tab name="First tab">
				1111111
			</Tab>
			<Tab name="Second tab">
				222222
			</Tab>
			<Tab name="Third tab">
				3333333333
			</Tab>
		</Tabs>

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
