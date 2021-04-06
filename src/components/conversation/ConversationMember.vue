<template>
	<div
		class="conversation-member"
		:title="user.displayName"
		@click="onClick"
	>
		<OnlineIndicator :online="user.online" />{{ user.displayName }}
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
			/**
			 * Emits the click event with the user id
			 */
			onClick() {
				this.$emit('click', this.user.id);
			}
		}
	};
</script>

<style lang="scss">
	.conversation-member {
		padding: 5px;
		text-overflow: ellipsis;
		overflow-x: hidden;
		white-space: nowrap;
		cursor: pointer;

		&:hover {
			background-color: $gray-light;
		}
	}
</style>
