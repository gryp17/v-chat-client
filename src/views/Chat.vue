<template>
	<div v-if="!loading" class="chat-page">
		<div v-if="conversation" class="page-content">
			<ConversationsList />

			<div class="chat-wrapper">
				<div class="header">
					<UserMenu
						@logout="onLogout"
						@editProfile="onEditProfile"
					/>

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
	</div>
</template>

<script>
	import SocketIO from 'socket.io-client';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import UserMenu from '@/components/UserMenu';
	import ConversationsList from '@/components/conversations/ConversationsList';
	import ConversationDetails from '@/components/conversation/ConversationDetails';
	import ConversationControls from '@/components/conversation/ConversationControls';
	import MessagesList from '@/components/conversation/MessagesList';
	import ProfileModal from '@/components/modals/ProfileModal';
	import EditProfileModal from '@/components/modals/EditProfileModal';
	import StartConversationModal from '@/components/modals/StartConversationModal';

	export default {
		components: {
			UserMenu,
			ConversationsList,
			ConversationDetails,
			ConversationControls,
			MessagesList,
			ProfileModal,
			EditProfileModal,
			StartConversationModal
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
			...mapGetters('ui', [
				'loading'
			]),
			...mapGetters('chat', [
				'conversation'
			])
		},
		async mounted() {
			this.setLoading(true);

			await Promise.all([
				this.getConversations(),
				this.getUsers()
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
				'updateOnlineUsers',
				'newUserReceived',
				'newConversationReceived',
				'messageReceived',
				'updateUser'
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
			disconnectFromSocket() {
				if (this.socket) {
					this.socket.disconnect();
				}
			},
			onLogout() {
				this.logout();
				this.$router.push({
					name: 'authentication'
				});
			},
			onEditProfile() {
				this.$modal.show('edit-profile-modal');
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

		.page-content {
			display: flex;
			height: 100%;

			.chat-wrapper {
				display: flex;
				flex-direction: column;
				height: 100%;
				flex: 1;

				.header {
					padding: 10px;
					background-color: $white;
					border-bottom: solid 1px $gray;

					.user-menu {
						float: left;
					}

					.details-btn {
						float: right;
						color: $text-color;
					}
				}
			}
		}
	}
</style>
