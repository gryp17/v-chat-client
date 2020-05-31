<template>
	<div
		:class="['conversation-item', { active }]"
		@click="$emit('open', conversation)"
	>
		<OnlineIndicator v-show="online" />
		{{ conversationName }}
	</div>
</template>

<script>
	import OnlineIndicator from '@/components/OnlineIndicator';

	export default {
		components: {
			OnlineIndicator
		},
		props: {
			active: Boolean,
			conversation: {
				type: Object,
				required: true
			},
			online: Boolean,
			currentUser: {
				type: Object,
				required: true
			}
		},
		computed: {
			conversationName() {
				if (this.conversation.isPrivate) {
					const user = this.conversation.users.find((user) => {
						return user.id !== this.currentUser.id;
					});

					return user.displayName;
				}

				return this.conversation.name;
			}
		}
	};
</script>

<style lang="scss">
	.conversation-item {
		padding: 5px;
		cursor: pointer;

		&.active {
			background-color: darken($gray-very-dark, 5%);
		}

		&:hover {
			background-color: darken($gray-very-dark, 5%);
		}
	}
</style>
