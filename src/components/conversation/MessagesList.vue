<template>
	<div class="messages-list" ref="list">
		<Message
			v-for="message in conversationMessages"
			:key="message.id"
			:message="message"
			:own="message.userId === userSession.id"
			@openProfile="showProfileModal($event)"
		/>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import Message from '@/components/conversation/Message';

	export default {
		components: {
			Message
		},
		data() {
			return {
				limit: 10,
				fetchMessagesTimeout: null
			};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapGetters('chat', [
				'conversation',
				'conversationMessages'
			]),
			offset() {
				return this.conversationMessages.length;
			}
		},
		mounted() {
			this.$refs.list.addEventListener('scroll', this.onChatScroll);
		},
		beforeDestroy() {
			this.$refs.list.removeEventListener('scroll', this.onChatScroll);
		},
		watch: {
			conversationMessages: {
				handler(newMessages, oldMessages) {
					//scroll to the bottom only when a new message arrives or a new conversation is opened
					if (!oldMessages || (
						newMessages.length > 0 && oldMessages.length > 0 && newMessages[0].id !== oldMessages[0].id)
					) {
						this.$nextTick(() => {
							this.scrollToBottom();
						});
					}
				},
				deep: true
			}
		},
		methods: {
			...mapActions('chat', [
				'getMessages',
				'setSelectedUser'
			]),
			/**
			 * Opens the profile modal
			 * @param {Number} userId
			 */
			showProfileModal(userId) {
				this.setSelectedUser(userId);
				this.$modal.show('profile-modal');
			},
			/**
			 * Scrolls the chat to the bottom
			 */
			scrollToBottom() {
				const list = this.$refs.list;
				list.scrollTop = list.scrollHeight;
			},
			/**
			 * Fetches more messages on scroll
			 * @param {Object} e
			 */
			onChatScroll(e) {
				if (e.target.scrollTop < 50) {
					this.fetchOlderMessages();
				}
			},
			/**
			 * Fetches more/older message
			 */
			async fetchOlderMessages() {
				if (this.fetchMessagesTimeout) {
					clearTimeout(this.fetchMessagesTimeout);
				}

				this.fetchMessagesTimeout = setTimeout(() => {
					const params = {
						conversationId: this.conversation.id,
						limit: this.limit,
						offset: this.offset
					};

					this.getMessages(params);
				}, 500);
			}
		}
	};
</script>

<style scoped lang="scss">
	.messages-list {
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		overflow-y: auto;
	}
</style>
