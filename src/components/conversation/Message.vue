<template>
	<div :class="['message', { own }]">
		<div
			@click="$emit('openProfile', message.userId)"
			class="avatar-wrapper"
		>
			<img
				:src="message.user.avatarLink"
				:title="avatarTitle"
				:class="['avatar', { online }]"
			/>
			<div :title="displayName" class="author">
				{{ displayName }}
			</div>
		</div>
		<div class="message-wrapper">
			<div class="message-content">
				<MessageFile
					v-if="isFileMessage"
					:file="message.file"
				/>
				<template v-else>
					{{ message.content }}
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import MessageFile from '@/components/conversation/MessageFile';

	export default {
		components: {
			MessageFile
		},
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
			},
			isFileMessage() {
				return this.message.type === 'file';
			}
		}
	};
</script>

<style lang="scss">
	.message {
		display: flex;
		padding: 5px 15px;

		.avatar-wrapper {
			width: 120px;
			text-align: center;
			cursor: pointer;

			.avatar {
				width: 100px;
				height: 100px;
				border-radius: 100%;
				border: solid 4px $gray;

				&.online {
					border-color: $green;
				}
			}

			.author {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
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
				//fixes an issue with the text ellipsis? wtf?
				width: 1px;

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
