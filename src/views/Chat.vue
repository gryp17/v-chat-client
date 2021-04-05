<template>
	<div v-if="!loading && isLoggedIn" class="chat-page">
		<div v-if="conversation" class="page-content">
			<div class="left-panel-wrapper">
				<UserPanel />
				<ConversationsList />
			</div>

			<div class="chat-wrapper">
				<div class="header">
					<MuteConversationButton />

					<FormButton
						transparent
						class="details-btn"
						:active="detailsAreVisible"
						@click="toggleDetails"
					>
						<i class="fas fa-info-circle"></i>
						Details
					</FormButton>
				</div>

				<MessagesList />

				<ConversationControls />
			</div>

			<ConversationDetails :opened="detailsAreVisible" />
		</div>

		<ProfileModal />
		<EditProfileModal />
		<StartConversationModal />
		<SettingsModal />
	</div>
</template>

<script>
	import SocketIO from 'socket.io-client';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import UserPanel from '@/components/UserPanel';
	import ConversationsList from '@/components/conversations/ConversationsList';
	import ConversationDetails from '@/components/conversation/ConversationDetails';
	import ConversationControls from '@/components/conversation/ConversationControls';
	import MessagesList from '@/components/conversation/MessagesList';
	import MuteConversationButton from '@/components/conversation/MuteConversationButton';
	import ProfileModal from '@/components/modals/ProfileModal';
	import EditProfileModal from '@/components/modals/EditProfileModal';
	import StartConversationModal from '@/components/modals/StartConversationModal';
	import SettingsModal from '@/components/modals/SettingsModal';

	export default {
		components: {
			UserPanel,
			ConversationsList,
			ConversationDetails,
			ConversationControls,
			MessagesList,
			MuteConversationButton,
			ProfileModal,
			EditProfileModal,
			StartConversationModal,
			SettingsModal
		},
		data() {
			return {
				socket: null,
				detailsAreVisible: false,
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

			await Promise.all([
				this.getConversations(),
				this.getUsers(),
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
			},
			/**
			 * Toggles the conversation details
			 */
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

				.header {
					padding: 10px;
					background-color: $white;
					border-bottom: solid 1px $gray;

					.details-btn {
						float: right;
						color: $text-color;
					}
				}
			}
		}
	}
</style>
