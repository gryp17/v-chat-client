<template>
	<div class="conversation-header">
		<ConversationMenu />

		<MuteConversationButton />

		<div class="conversation-name">
			{{ conversation.name }}
		</div>

		<FormButton
			transparent
			class="details-btn"
			@click="openConversationDetails"
		>
			<i class="fas fa-info-circle"></i>
			Details
		</FormButton>

		<FormButton
			transparent
			class="close-conversation-btn"
			title="Close conversation"
			@click="closeConversation"
		>
			<i class="fas fa-times"></i>
		</FormButton>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import MuteConversationButton from '@/components/conversation/MuteConversationButton';
	import ConversationMenu from '@/components/conversation/ConversationMenu';

	export default {
		components: {
			MuteConversationButton,
			ConversationMenu
		},
		computed: {
			...mapGetters('chat', [
				'conversation'
			])
		},
		methods: {
			...mapActions('chat', [
				'setSelectedConversation'
			]),
			/**
			 * Opens the conversation details modal
			 */
			openConversationDetails() {
				this.$modal.show('conversation-details-modal');
			},
			/**
			 * Closes the current conversation
			 */
			closeConversation() {
				this.setSelectedConversation(null);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.conversation-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		background-color: $white;
		border-bottom: solid 1px $gray;

		.conversation-menu {
			display: none;
		}

		.conversation-name {
			flex: 1;
			text-align: center;
		}

		::v-deep .details-btn {
			color: $text-color;
		}

		.close-conversation-btn {
			display: none;
			padding: 7px 12px;
			font-size: 22px;

			svg {
				margin-right: 0px;
				color: $text-color;
			}
		}

		@media (max-width: $small) {
			.conversation-menu {
				display: block;
			}

			.mute-conversation-button {
				display: none;
			}

			.close-conversation-btn {
				display: inline;
			}

			.details-btn {
				display: none;
			}
		}
	}
</style>
