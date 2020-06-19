<template>
	<div :class="['message', { own }]">
		<div class="avatar-wrapper">
			<img
				:src="message.user.avatar"
				:title="avatarTitle"
				:class="['avatar', { online }]"
				@click="$emit('openProfile', message.userId)"
			/>
			<div class="author">
				{{ displayName }}
			</div>
		</div>
		<div class="message-wrapper">
			<div class="message-content">
				{{ message.content }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			message: {
				type: Object,
				required: true
			},
			own: Boolean
		},
		computed: {
			displayName() {
				return this.message.user.displayName;
			},
			online() {
				return this.message.user.online;
			},
			avatarTitle() {
				return this.online ? 'Online' : 'Offline';
			}
		}
	};
</script>

<style lang="scss">
	.message {
		display: flex;
		padding: 5px 15px;

		.avatar-wrapper {
			max-width: 120px;
			text-align: center;

			.avatar {
				width: 70%;
				border-radius: 100%;
				border: solid 4px $gray;
				cursor: pointer;

				&.online {
					border-color: $green;
				}
			}

			.author {
				font-size: 14px;
			}
		}

		.message-wrapper {
			flex: 1;

			.message-content {
				position: relative;
				margin : 15px 0px 0px 15px;
				background-color: $white;
				padding: 20px;
				box-shadow:	0px 0px 0px 2px $gray;

				&::before {
					content: '';
					position: absolute;
					width: 0;
					height: 0;
					right: 100%;
					left: auto;
					border: 12px solid transparent;
					border-right: 12px solid $white;

					filter: drop-shadow(-2px 0px 1px $gray);
				}
			}
		}

		&.own {
			.avatar-wrapper {
				order: 1;
			}

			.message-wrapper {
				.message-content {
					margin-right: 15px;

					&::before {
						left: 100%;
						top: 20px;

						border-right: 12px solid transparent;
						border-left: 12px solid $white;

						filter: drop-shadow(2px 0px 0px $gray);
					}
				}
			}
		}
	}
</style>
