<template>
	<div class="conversation-menu">
		<DropdownMenu direction="right">
			<template v-slot:button>
				<FormButton
					transparent
					class="menu-btn"
				>
					<i class="fas fa-bars"></i>
				</FormButton>
			</template>
			<template v-slot:items>
				<div
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
				</div>
				<div
					@click="openConversationDetails"
				>
					<i class="fas fa-info-circle"></i>
					Details
				</div>
			</template>
		</DropdownMenu>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import DropdownMenu from '@/components/DropdownMenu';

	export default {
		components: {
			DropdownMenu
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
			 * Opens the conversation details modal
			 */
			openConversationDetails() {
				this.$modal.show('conversation-details-modal');
			},
			/**
			 * Toggles the conversation muted state
			 */
			async toggleMuted() {
				await this.muteConversation({
					conversationId: this.conversation.id,
					status: !this.conversation.muted
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.conversation-menu {
		::v-deep .menu-btn {
			color: $text-color;
		}
	}
</style>
