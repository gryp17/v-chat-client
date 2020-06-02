<template>
	<div class="conversation-controls">
		<FormInput
			v-model="message"
			:rows="3"
			@keypress.enter="onSubmit"
			tag="textarea"
			placeholder="Write a message..."
			class="message-input"
		/>

		<div class="controls-wrapper">
			<FormButton
				transparent
				title="Add emoticon"
				class="emoticons-btn"
			>
				<i class="fas fa-smile"></i>
			</FormButton>
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
	import { mapState, mapActions } from 'vuex';

	export default {
		data() {
			return {
				message: '',
				submitting: false
			};
		},
		computed: {
			...mapState('chat', [
				'conversation'
			])
		},
		methods: {
			...mapActions('chat', [
				'sendMessage'
			]),
			onSubmit(e) {
				//TODO: check the message length

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
				this.sendMessage(params).then(() => {
					this.message = '';
					this.submitting = false;
				});
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

			.emoticons-btn {
				color: $yellow;
			}

			.attachment-btn {
				color: $text-color;
			}

			.send-btn {
				float: right;
			}
		}
	}
</style>
