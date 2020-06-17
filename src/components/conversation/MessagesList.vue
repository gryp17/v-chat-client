<template>
	<div class="messages-list" ref="list">
		<div
			v-for="message in conversationMessages"
			:key="message.id"
			class="message"
		>
			{{ message.content }}
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data() {
			return {
				limit: 10,
				fetchingMessages: false
			};
		},
		computed: {
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

		.message {
			background-color: $white;
			border: solid 1px $gray;
			margin: 5px;
			padding: 20px;
		}
	}
</style>
