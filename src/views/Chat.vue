<template>
	<div class="chat-page">
		<div class="page-header">
			page header

			<FormButton @click="onLogout">
				Logout
			</FormButton>
		</div>
		<div class="page-content">
			<div class="conversations-list">

				{{ conversations }}

				<div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div>
				<div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div>
				<div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div>
				<div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div>
				<div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div>
				<div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div>
				<div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div><div>conversation</div>

			</div>
			<div class="chat-wrapper">
				<div class="header">
					Header
				</div>

				<div class="messages-list">
					<div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div>
					<div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div>
					<div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div>
					<div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div><div>chat message</div>v
					<div>chat message</div>
					<div>chat message</div>
					<div>chat message</div>
				</div>

				<div class="controls">
					Controls
				</div>
			</div>
			<div class="users-list">
				<div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div>
				<div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div>
				<div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div><div>user</div>

			</div>
		</div>
	</div>
</template>

<script>
	import SocketIO from 'socket.io-client';
	import { mapState, mapActions } from 'vuex';

	export default {
		data() {
			return {
				socket: null
			};
		},
		computed: {
			...mapState('auth', [
				'server',
				'token'
			]),
			...mapState('conversations', [
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
					//TODO: need to fix the loading logic because the App.vue component hides the Chat.vue loading
					token: 1234 //this.token
				}
			});

			this.socket.on('connect', (data) => {
				console.log('######### connected succesfully');

				//TODO: this data needs to be passed by the sockets
				this.getConversations().then(() => {
					this.setLoading(false);
				});
			});

			this.socket.on('disconnect', (data) => {
				console.log('@@@@@@@@@@ disconect');
			});

			this.socket.on('test', (data) => {
				console.log(data);
			});
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
			]),
			...mapActions('auth', [
				'logout'
			]),
			...mapActions('conversations', [
				'getConversations'
			]),
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

			.conversations-list {
				width: 200px;
				overflow-y: auto;
				background-color: gray;
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
