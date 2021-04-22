<template>
	<div class="conversation-details-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="560"
			:height="400"
			name="conversation-details-modal"
		>
			<div class="header">
				Conversation details
			</div>
			<div class="content">
				<Tabs
					v-if="conversation"
					cache-lifetime="0"
					:options="{ useUrlFragment: false }"
				>
					<Tab name="Members">
						<ConversationMember
							v-for="user in conversation.users"
							:key="user.id"
							:user="user"
							@click="showProfileModal($event)"
						/>
					</Tab>
				</Tabs>
			</div>
		</modal>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import { Tabs, Tab } from 'vue-tabs-component';
	import ConversationMember from '@/components/conversation/ConversationMember';

	export default {
		components: {
			ConversationMember,
			Tabs,
			Tab
		},
		props: {
			opened: Boolean
		},
		computed: {
			...mapGetters('chat', [
				'conversation'
			])
		},
		methods: {
			...mapActions('chat', [
				'setSelectedUser'
			]),
			/**
			 * Opens the user profile modal
			 * @param {Number} userId
			 */
			showProfileModal(userId) {
				this.$modal.hide('conversation-details-modal');
				this.setSelectedUser(userId);
				this.$modal.show('profile-modal');
			}
		}
	};
</script>

<style lang="scss">
	.conversation-details-modal {
		.header {
			padding: 10px;
			background-color: $gray-very-dark;
			color: $white;
			font-weight: bold;
		}

		.content {
			padding: 10px;

			.tabs-component-panel {
				height: 275px;
				overflow-y: auto;
			}
		}
	}
</style>
