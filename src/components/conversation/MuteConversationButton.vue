<template>
	<FormButton
		transparent
		class="mute-conversation-button"
		:active="conversation.muted"
		:disabled="loading"
		:title="muteButtonText"
		@click="toggleMuted"
	>
		<!-- hackfix for the fontawesome vue icons -->
		<template v-if="conversation.muted">
			<span key="unmute">
				<i class="fas fa-bell"></i>
			</span>
		</template>
		<template v-else>
			<span key="mute">
				<i class="fas fa-bell-slash"></i>
			</span>
		</template>
		{{ muteButtonText }}
	</FormButton>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data() {
			return {
				loading: false
			};
		},
		computed: {
			...mapGetters('chat', [
				'conversation'
			]),
			muteButtonText() {
				return this.conversation.muted ? 'Unmute' : 'Mute';
			}
		},
		methods: {
			...mapActions('chat', [
				'muteConversation'
			]),
			/**
			 * Toggles the conversation muted state
			 */
			async toggleMuted() {
				if (this.loading) {
					return;
				}

				this.loading = true;
				await this.muteConversation({
					conversationId: this.conversation.id,
					status: !this.conversation.muted
				});
				this.loading = false;
			}
		}
	};
</script>

<style scoped lang="scss">
	.mute-conversation-button {
		&.form-button.transparent {
			color: $text-color;
		}
	}
</style>
