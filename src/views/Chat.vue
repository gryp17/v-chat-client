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
				<!-- TODO: use vuex for the currentUser and currentConversation variables... -->
				<ConversationsList
					:conversations="conversations"
					:currentUser="userSession"
					:currentConversation="conversation"
					@open="openConversation"
				/>
			</div>
			<div class="chat-wrapper">
				<div class="header">
					Header
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
			<div class="users-list">
				<div
					v-for="user in conversation.users"
					:key="user.id"
					class="user"
				>
					{{ user.displayName }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SocketIO from 'socket.io-client';
	import { mapState, mapActions } from 'vuex';
	import ConversationsList from '@/components/ConversationsList';

	export default {
		components: {
			ConversationsList
		},
		data() {
			return {
				socket: null,
				conversation: null
			};
		},
		computed: {
			...mapState('auth', [
				'server',
				'token',
				'userSession'
			]),
			...mapState('chat', [
				'conversations'
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
				this.openConversation(this.conversations[0]);
				this.setLoading(false);
			});
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
			]),
			...mapActions('chat', [
				'setConversations'
			]),
			...mapActions('auth', [
				'logout'
			]),
			openConversation(conversation) {
				this.conversation = conversation;
			},
			onLogout() {
				this.logout();
				this.$router.push({
					name: 'authentication'
				});
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
					padding: 20px;
					background-color: #b6d4b0;
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

			.users-list {
				width: 200px;
				background-color: #868686;
				overflow-y: auto;
			}
		}
	}
</style>
