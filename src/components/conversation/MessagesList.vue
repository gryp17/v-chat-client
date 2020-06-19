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
				fetchingMessages: false
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
					if (!oldMessages || (newMessages.length > 0 && newMessages[0].id !== oldMessages[0].id)) {
						this.scrollToBottom();
					}
				},
				deep: true
			}
		},
		methods: {
			...mapActions('chat', [
				'getMessages'
			]),
			...mapActions('modals', [
				'showProfileModal'
			]),
			scrollToBottom() {
				const list = this.$refs.list;
				list.scrollTop = list.scrollHeight;
			},
			onChatScroll(e) {
				if (e.target.scrollTop < 50) {
					this.fetchOlderMessages();
				}
			},
			async fetchOlderMessages() {
				if (this.fetchingMessages) {
					return;
				}

				this.fetchingMessages = true;

				const params = {
					conversationId: this.conversation.id,
					limit: this.limit,
					offset: this.offset
				};

				await this.getMessages(params);
				this.fetchingMessages = false;
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