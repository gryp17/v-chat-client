<template>
	<div class="conversation-member" @click="onClick">
		<OnlineIndicator :online="user.online" />
		{{ user.displayName }}
	</div>
</template>

<script>
	import OnlineIndicator from '@/components/OnlineIndicator';

	export default {
		components: {
			OnlineIndicator
		},
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		methods: {
			onClick() {
				this.$emit('click', this.user.id);
			}
		}
	};
</script>

<style lang="scss">
	.conversation-member {
		display: flex;
		align-items: center;
		padding: 5px;
		cursor: pointer;

		&:hover {
			background-color: $gray-light;
		}
	}
</style>
