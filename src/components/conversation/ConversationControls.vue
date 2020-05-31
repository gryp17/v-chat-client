<template>
	<div class="conversation-controls">
		<FormInput
			tag="textarea"
			rows="3"
			placeholder="Write a message..."
			class="message-input"
		/>

		<div class="controls-wrapper">
			<FormButton transparent>
				<i class="fas fa-smile"></i>
			</FormButton>
			<FormButton transparent>
				<i class="fas fa-paperclip"></i>
			</FormButton>

			<FormButton
				transparent
				class="send-btn"
			>
				<i class="fas fa-paper-plane"></i>
				Send
			</FormButton>
		</div>
	</div>
</template>

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

			.form-button {
				font-size: 20px;
			}

			.send-btn {
				float: right;
			}
		}
	}
</style>
