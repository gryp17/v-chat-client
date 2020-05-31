<template>
	<div class="conversations-list">
		<div class="conversations-title">
			Channels
		</div>

		<ConversationItem
			v-for="conversation in channels"
			:key="conversation.id"
			:active="conversation.id === openedConversation.id"
			:conversation="conversation"
			:online="conversationUserIsOnline(conversation)"
			:currentUser="userSession"
			@open="setConversation"
		/>

		<div
			v-show="privateMessages.length > 0"
			class="conversations-title"
		>
			Private messages
		</div>

		<ConversationItem
			v-for="conversation in privateMessages"
			:key="conversation.id"
			:active="conversation.id === openedConversation.id"
			:conversation="conversation"
			:online="conversationUserIsOnline(conversation)"
			:currentUser="userSession"
			@open="setConversation"
		/>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import ConversationItem from '@/components/conversations/ConversationItem';

	export default {
		components: {
			ConversationItem
		},
		computed: {
			...mapState('chat', {
				conversations: (state) => state.conversations,
				openedConversation: (state) => state.conversation
			}),
			...mapState('auth', [
				'userSession'
			]),
			...mapGetters('chat', [
				'userIsOnline'
			]),
			channels() {
				return this.conversations.filter((conversation) => {
					return !conversation.isPrivate;
				});
			},
			privateMessages() {
				return this.conversations.filter((conversation) => {
					return conversation.isPrivate;
				});
			}
		},
		methods: {
			...mapActions('chat', [
				'setConversation'
			]),
			conversationUserIsOnline(conversation) {
				if (conversation.isPrivate) {
					const user = conversation.users.find((user) => {
						return user.id !== this.userSession.id;
					});

					return this.userIsOnline(user.id);
				}

				return false;
			}
		}
	};
</script>

<style lang="scss">
	.conversations-list {
		width: 200px;
		overflow-y: auto;
		background-color: $gray-very-dark;
		color: $white;

		.conversations-title {
			padding: 5px;
			margin-top: 15px;
			font-weight: bold;

			&:first-child {
				margin-top: 0px;
			}
		}
	}
</style>
