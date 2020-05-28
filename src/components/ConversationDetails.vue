<template>
	<div class="conversation-details">
		<div class="section-title">Members</div>
		<div
			v-for="user in conversation.users"
			:key="user.id"
			class="user"
		>
			{{ user.displayName }}
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState('chat', [
				'conversation'
			])
		}
	};
</script>

<style lang="scss">
	.conversation-details {
		padding: 5px;

		.section-title {
			margin: 5px 0px;
			font-weight: bold;
		}
	}
</style>
