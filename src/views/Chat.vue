<template>
	<div v-if="!loading && isLoggedIn" class="chat-page">
		<div class="page-content">
			<div class="left-panel-wrapper">
				<UserPanel />
				<ConversationsList />
			</div>

			<div v-if="conversation" class="chat-wrapper">
				<ConversationHeader/>
				<MessagesList />
				<ConversationControls />
			</div>
			<ConversationPlaceholder v-else />
		</div>

		<ProfileModal />
		<EditProfileModal />
		<StartConversationModal />
		<SettingsModal />
		<ConversationDetailsModal />
		<ImagePreviewModal />
	</div>
</template>

<script>
	import SocketIO from 'socket.io-client';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import UserPanel from '@/components/UserPanel';
	import ConversationsList from '@/components/conversations/ConversationsList';
	import ConversationHeader from '@/components/conversation/ConversationHeader';
	import ConversationControls from '@/components/conversation/ConversationControls';
	import ConversationPlaceholder from '@/components/conversation/ConversationPlaceholder';
	import MessagesList from '@/components/conversation/MessagesList';
	import ProfileModal from '@/components/modals/ProfileModal';
	import EditProfileModal from '@/components/modals/EditProfileModal';
	import StartConversationModal from '@/components/modals/StartConversationModal';
	import SettingsModal from '@/components/modals/SettingsModal';
	import ConversationDetailsModal from '@/components/modals/ConversationDetailsModal';
	import ImagePreviewModal from '@/components/modals/ImagePreviewModal';

	export default {
		components: {
			UserPanel,
			ConversationsList,
			ConversationHeader,
			ConversationControls,
			ConversationPlaceholder,
			MessagesList,
			ProfileModal,
			EditProfileModal,
			StartConversationModal,
			SettingsModal,
			ConversationDetailsModal,
			ImagePreviewModal
		},
		data() {
			return {
				socket: null,
				onlineUsersSet: false
			};
		},
		computed: {
			...mapState('auth', [
				'server'
			]),
			...mapGetters('ui', [
				'loading'
			]),
			...mapGetters('chat', [
				'conversation'
			]),
			...mapGetters('auth', [
				'isLoggedIn'
			])
		},
		async mounted() {
			this.setLoading(true);

			await this.getUsers();
			await Promise.all([
				this.getConversations(),
				this.getSettings()
			]);

			this.connectToSocket();
			this.setLoading(false);
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
				'setOnlineUsers',
				'updateOnlineUsers',
				'newUserReceived',
				'newConversationReceived',
				'messageReceived',
				'updateUser'
			]),
			...mapActions('auth', [
				'logout'
			]),
			...mapActions('settings', [
				'getSettings'
			]),
			/**
			 * Connects to the socket.io server and listens for it's events
			 */
			connectToSocket() {
				//initialize the socket connection
				this.socket = SocketIO(this.server, {
					transports: ['websocket'],
					upgrade: false
				});

				this.socket.on('error', (error) => {
					this.$toasted.global.apiError({
						message: this.$options.filters.errorsMap(error)
					});
				});

				this.socket.on('updateOnlineUsers', (onlineUsers) => {
					if (this.onlineUsersSet) {
						this.updateOnlineUsers(onlineUsers);
					} else {
						this.setOnlineUsers(onlineUsers);
						this.onlineUsersSet = true;
					}
				});

				this.socket.on('newUser', (user) => {
					this.newUserReceived(user);
				});

				this.socket.on('newConversation', (conversation) => {
					this.newConversationReceived(conversation);
				});

				this.socket.on('message', (message) => {
					this.messageReceived(message);
				});

				this.socket.on('updateUser', (user) => {
					this.updateUser(user);
				});
			},
			/**
			 * Disconnects from the socket.io server
			 */
			disconnectFromSocket() {
				if (this.socket) {
					this.socket.disconnect();
				}
			}
		}
	};
</script>

<style lang="scss">
	.chat-page {
		display: flex;
		flex-direction: column;
		height: 100%;

		.page-content {
			display: flex;
			height: 100%;

			.left-panel-wrapper {
				display: flex;
				flex-direction: column;
				flex-shrink: 0;
				width: 225px;
				height: 100%;
				background-color: $gray-darkest;
			}

			.chat-wrapper {
				display: flex;
				flex-direction: column;
				height: 100%;
				flex: 1;
				background: $background;
			}
		}

		@media (max-width: $small) {
			.page-content {
				.left-panel-wrapper {
					width: 100%;
				}

				.chat-wrapper {
					position: absolute;
					width: 100%;
					height: 100%;
				}

				.conversation-placeholder {
					display: none;
				}
			}
		}
	}
</style>
