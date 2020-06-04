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
			currentUser: {
				type: Object,
				required: true
			}
		},
		computed: {
			conversationUser() {
				return this.conversation.users.find((user) => {
					return user.id !== this.currentUser.id;
				});
			},
			conversationName() {
				if (!this.conversationUser) {
					return;
				}

				return this.conversation.isPrivate ? this.conversationUser.displayName : this.conversation.name;
			},
			online() {
				if (this.conversation.isPrivate) {
					return this.conversationUser.online;
				}

				return false;
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
