<template>
	<div
		:class="['conversation-item', { active, unread: conversation.unread }]"
		@click="$emit('open', conversation.id)"
	>
		<OnlineIndicator
			v-show="conversation.isPrivate"
			:online="online"
			dark
		/>
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
		display: flex;
		align-items: center;
		padding: 5px;
		cursor: pointer;

		&.active {
			background-color: darken($gray-very-dark, 5%);
		}

		&.unread {
			color: $red;
		}

		&:hover {
			background-color: darken($gray-very-dark, 5%);
		}
	}
</style>
