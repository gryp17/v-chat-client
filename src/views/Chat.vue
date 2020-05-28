<template>
	<div class="chat-page">
		<div class="page-header">
			page header

			<FormButton @click="onLogout">
				Logout
			</FormButton>
		</div>
		<div v-if="conversation" class="page-content">
			<div class="conversations-list-wrapper">
				<ConversationsList />
			</div>
			<div class="chat-wrapper">
				<div class="header">
					<FormButton transparent :active="detailsAreVisible" @click="toggleDetails">
						<i class="fas fa-info-circle"></i>
						Details
					</FormButton>
				</div>

				<div class="messages-list">
					<div
						v-for="message in conversation.messages"
						:key="message.id"
						class="message"
					>
						{{ message.content }}
					</div>
				</div>

				<div class="controls">
					Controls
				</div>
			</div>
			<div :class="['conversation-details-wrapper', { visible: this.detailsAreVisible }]">
				<ConversationDetails />
			</div>
		</div>
	</div>
</template>

<script>
	import SocketIO from 'socket.io-client';
	import { mapState, mapActions } from 'vuex';
	import ConversationsList from '@/components/ConversationsList';
	import ConversationDetails from '@/components/ConversationDetails';

	export default {
		components: {
			ConversationsList,
			ConversationDetails
		},
		data() {
			return {
				socket: null,
				detailsAreVisible: false
			};
		},
		computed: {
			...mapState('auth', [
				'server',
				'token'
			]),
			...mapState('chat', [
				'conversations',
				'conversation'
			])
		},
		mounted() {
			this.setLoading(true);

			//initialize the socket connection
			this.socket = SocketIO(this.server, {
				transports: ['websocket'],
				upgrade: false,
				query: {
					token: this.token
				}
			});

			this.socket.on('error', (error) => {
				this.$toasted.global.apiError({
					message: error
				});
			});

			this.socket.on('updateConversations', (data) => {
				console.log(data);
				this.setConversations(data);
				this.setConversation(this.conversations[0]);
				this.setLoading(false);
			});
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
			]),
			...mapActions('chat', [
				'setConversations',
				'setConversation'
			]),
			...mapActions('auth', [
				'logout'
			]),
			onLogout() {
				this.logout();
				this.$router.push({
					name: 'authentication'
				});
			},
			toggleDetails() {
				this.detailsAreVisible = !this.detailsAreVisible;
			}
		}
	};
</script>

<style lang="scss">
	.chat-page {
		display: flex;
		flex-direction: column;
		height: 100%;

		$page-header-height: 50px;

		.page-header {
			height: $page-header-height;
			line-height: $page-header-height;
			background-color: #d8d8d8;
		}

		.page-content {
			display: flex;
			height: calc(100% - #{$page-header-height});

			.conversations-list-wrapper {
				width: 200px;
				overflow-y: auto;
				background-color: $gray;
			}

			.chat-wrapper {
				display: flex;
				flex-direction: column;
				flex: 1;

				.header {
					padding: 10px;
					background-color: $white;
					border-bottom: solid 1px $gray;

					.form-button {
						float: right;
						color: $text-color;
					}
				}

				.messages-list {
					height: 100%;
					overflow-y: auto;
				}

				.controls {
					padding: 20px;
					background-color: #b6d4b0;
				}
			}

			.conversation-details-wrapper {
				width: 0px;
				overflow-y: auto;
				transition: all 400ms ease;
				background-color: $gray;

				&.visible {
					width: 200px;
				}
			}
		}
	}
</style>
