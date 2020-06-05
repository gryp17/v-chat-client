<template>
	<div class="conversations-list">
		<div class="conversations-title">
			Channels
		</div>

		<ConversationItem
			v-for="conversation in channels"
			:key="conversation.id"
			:active="conversation.id === selectedConversation"
			:conversation="conversation"
			:currentUser="userSession"
			@open="setSelectedConversation"
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
			:active="conversation.id === selectedConversation"
			:conversation="conversation"
			:currentUser="userSession"
			@open="setSelectedConversation"
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
			...mapState('chat', [
				'selectedConversation'
			]),
			...mapState('auth', [
				'userSession'
			]),
			...mapGetters('chat', [
				'conversations'
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
				'setSelectedConversation'
			])
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
