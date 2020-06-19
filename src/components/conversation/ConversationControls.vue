<template>
	<div class="conversation-controls">
		<FormInput
			v-model="message"
			:rows="3"
			@keypress.enter="onSubmit"
			tag="textarea"
			placeholder="Write a message..."
			class="message-input"
			ref="messageInput"
		/>

		<div class="controls-wrapper">
			<EmojiPicker @select="addEmoji" />

			<FormButton
				transparent
				title="Add attachment"
				class="attachment-btn"
			>
				<i class="fas fa-paperclip"></i>
			</FormButton>

			<FormButton
				@click="onSubmit"
				:disabled="submitting"
				transparent
				class="send-btn"
			>
				<i class="fas fa-paper-plane"></i>
				Send
			</FormButton>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import EmojiPicker from '@/components/conversation/EmojiPicker';

	export default {
		components: {
			EmojiPicker
		},
		data() {
			return {
				message: '',
				submitting: false
			};
		},
		computed: {
			...mapGetters('chat', [
				'conversation'
			])
		},
		methods: {
			...mapActions('chat', [
				'sendMessage'
			]),
			addEmoji(emoji) {
				this.message = `${this.message}${emoji.native}`;
				//focus the message input once the emoticon has been added
				//...look at me mom - no jquery!
				this.$refs.messageInput.$el.querySelector('textarea').focus();
			},
			async onSubmit(e) {
				if (!e.shiftKey) {
					e.preventDefault();
				}

				const message = this.message.trim();

				//don't submit on shift + enter
				if (e.shiftKey || message.length === 0 || this.submitting) {
					return;
				}

				const params = {
					conversationId: this.conversation.id,
					content: message
				};

				this.submitting = true;

				await this.sendMessage(params);
				this.message = '';
				this.submitting = false;
			}
		}
	};
</script>

<style lang="scss">
	.conversation-controls {
		.message-input {
			margin: 0 -1px 0px 0px;
			font-size: 16px;

			textarea {
				resize: none;
			}
		}

		.controls-wrapper {
			background-color: $gray-very-light;

			.attachment-btn {
				color: $text-color;
			}

			.send-btn {
				float: right;
			}
		}
	}
</style>
