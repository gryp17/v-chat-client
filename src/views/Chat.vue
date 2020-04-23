<template>
	<div class="chat-page">
		<div class="page-header">
			page header
		</div>
		<div class="page-content">
			<div class="conversations-list">
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
	import { mapActions } from 'vuex';

	export default {
		mounted() {
			//TODO: fetch all the necessary data and set loading to false
			this.setLoading(true);

			setTimeout(() => {
				this.setLoading(false);
			}, 1500);
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
			])
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
