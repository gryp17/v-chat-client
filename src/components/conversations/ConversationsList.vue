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
			class="conversations-title"
		>
			Private messages

			<StartConversationButton
				@click="openStartConversationModal"
			/>
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
	import StartConversationButton from '@/components/conversations/StartConversationButton';

	export default {
		components: {
			ConversationItem,
			StartConversationButton
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
			]),
			openStartConversationModal() {
				//TODO: open the start conversation modal
			}
		}
	};
</script>

<style lang="scss">
	.conversations-list {
		width: 225px;
		overflow-y: auto;
		background-color: darken($gray-very-dark, 1%);
		color: $white;

		.conversations-title {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			padding: 5px;
			margin-top: 15px;
			font-weight: bold;

			&:first-child {
				margin-top: 0px;
			}
		}
	}
</style>
