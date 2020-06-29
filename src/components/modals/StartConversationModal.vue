<template>
	<div class="start-conversation-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="450"
			:height="'400px'"
			@before-open="onBeforeOpen"
			name="start-conversation-modal"
		>
			<div class="modal-inner-wrapper">
				<div class="header">
					Start conversation
				</div>
				<div class="content">
					<FormInput
						placeholder="Find or start a conversation"
					/>

					Users

					<hr />

					<div class="users-list">
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
						<div>user</div>
					</div>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			onBeforeOpen() {
				this.resetState();
			},
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			}
		}
	};
</script>

<style lang="scss">
	.start-conversation-modal {
		.modal-inner-wrapper {
			display: flex;
			flex-direction: column;
			height: 100%;

			.header {
				padding: 10px;
				background-color: $gray-very-dark;
				color: $white;
				font-weight: bold;
			}

			.content {
				display: flex;
				flex-direction: column;
				height: 100%;
				padding: 10px;

				hr {
					width: 100%;
					border: none;
					border-top: solid 1px $gray;
				}

				.users-list {
					height: 100%;
					overflow-y: auto;
				}
			}
		}
	}
</style>
