<template>
	<div class="chat-page">
		<div class="page-header">
			page header

			<FormButton @click="onLogout">
				Logout
			</FormButton>
		</div>
		<div v-if="conversation" class="page-content">
			<ConversationsList />

			<div class="chat-wrapper">
				<div class="header">
					<FormButton transparent :active="detailsAreVisible" @click="toggleDetails">
						<i class="fas fa-info-circle"></i>
						Details
					</FormButton>
				</div>

				<div class="messages-list">
					<div
						v-for="message in conversationMessages"
						:key="message.id"
						class="message"
					>
						{{ message.content }}
					</div>
				</div>

				<ConversationControls />
			</div>

			<ConversationDetails :opened="detailsAreVisible" />
		</div>
	</div>
</template>

<script>
	import SocketIO from 'socket.io-client';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import ConversationsList from '@/components/conversations/ConversationsList';
	import ConversationDetails from '@/components/conversation/ConversationDetails';
	import ConversationControls from '@/components/conversation/ConversationControls';

	export default {
		components: {
			ConversationsList,
			ConversationDetails,
			ConversationControls
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
			...mapGetters('chat', [
				'conversation',
				'conversationMessages'
			])
		},
		mounted() {
			this.setLoading(true);

			Promise.all([
				this.getConversations(),
				this.getUsers()
			]).then((results) => {
				this.connectToSocket();
				this.setLoading(false);
			});
		},
		beforeDestroy() {
			this.disconnectFromSocket();
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
			]),
			...mapActions('chat', [
				'getConversations',
				'getUsers',
				'updateOnlineUsers',
				'newUserReceived',
				'messageReceived'
			]),
			...mapActions('auth', [
				'logout'
			]),
			connectToSocket() {
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

				this.socket.on('updateOnlineUsers', (onlineUsers) => {
					this.updateOnlineUsers(onlineUsers);
				});

				this.socket.on('newUser', (user) => {
					this.newUserReceived(user);
				});

				this.socket.on('message', (message) => {
					this.messageReceived(message);
				});
			},
			disconnectFromSocket() {
				this.socket.disconnect();
			},
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
			background-color: $white;
			border-bottom: solid 1px $gray;
		}

		.page-content {
			display: flex;
			height: calc(100% - #{$page-header-height});

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
			}
		}
	}
</style>
