<template>
	<div class="start-conversation-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="450"
			:height="'470px'"
			@before-open="onBeforeOpen"
			name="start-conversation-modal"
		>
			<div class="modal-inner-wrapper">
				<div class="header">
					Start a conversation
				</div>
				<div class="content">
					<FormInput
						v-model="text"
						placeholder="Find or start a conversation"
					/>

					Users

					<hr />

					<div class="users-list">
						<div
							v-if="searchResults.length === 0"
							class="no-results"
						>
							No results
						</div>

						<ConversationMember
							v-for="user in searchResults"
							:key="user.id"
							:user="user"
							@click="openConversation($event)"
						/>
					</div>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import ConversationMember from '@/components/conversation/ConversationMember';

	export default {
		components: {
			ConversationMember
		},
		data() {
			return {
				text: ''
			};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapState('chat', [
				'users'
			]),
			searchResults() {
				const users = Object.values(this.users);
				return users.filter(({ id, displayName }) => {
					return this.userSession.id !== id
						&& displayName.toLowerCase().indexOf(this.text.toLowerCase()) !== -1;
				});
			}
		},
		methods: {
			...mapActions('chat', [
				'openConversationWithUser'
			]),
			/**
			 * Resets the modal state before opening it
			 */
			onBeforeOpen() {
				this.resetState();
			},
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			},
			/**
			 * Starts/opens a conversation with the selected user
			 * @param {Number} userId
			 */
			async openConversation(userId) {
				await this.openConversationWithUser(userId);
				this.$modal.hide('start-conversation-modal');
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

					.no-results {
						display: flex;
						padding-bottom: 15px;
						height: 100%;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
</style>
