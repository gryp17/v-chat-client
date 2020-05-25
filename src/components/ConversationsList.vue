<template>
	<div class="conversations-list">
		<div class="conversations-title">
			Channels
		</div>

		<ConversationItem
			v-for="conversation in channels"
			:key="conversation.id"
			:conversation="conversation"
			:active="currentConversation && currentConversation.id === conversation.id"
			v-bind="$props"
			v-on="$listeners"
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
			:conversation="conversation"
			:active="currentConversation && currentConversation.id === conversation.id"
			v-bind="$props"
			v-on="$listeners"
		/>
	</div>
</template>

<script>
	import ConversationItem from '@/components/ConversationItem';

	export default {
		components: {
			ConversationItem
		},
		props: {
			conversations: Array,
			currentUser: {
				type: Object,
				required: true
			},
			currentConversation: Object
		},
		computed: {
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
		}
	};
</script>

<style scoped lang="scss">
	.conversations-list {
		padding: 5px;

		.conversations-title {
			margin-top: 15px;
			font-weight: bold;

			&:first-child {
				margin-top: 0px;
			}
		}
	}
</style>
