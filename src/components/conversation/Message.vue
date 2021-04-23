<template>
	<div :class="['message', { own }]">
		<div class="avatar-wrapper">
			<div @click="$emit('openProfile', message.userId)">
				<img
					:src="message.user.avatarLink"
					:title="avatarTitle"
					:class="['avatar', { online }]"
				/>
				<div :title="displayName" class="author">
					{{ displayName }}
				</div>
			</div>
		</div>
		<div class="message-wrapper">
			<div class="message-content">
				<MessageFile
					v-if="isFileMessage"
					:file="message.file"
				/>
				<div
					v-else
					v-html="message.content"
					v-linkified:options="linkifiedOptions"
				/>
			</div>

			<MessageTimestamp
				:alignment="timestampAlignment"
				:date="message.createdAt"
			/>
		</div>
	</div>
</template>

<script>
	import { shell } from 'electron';
	import MessageFile from '@/components/conversation/MessageFile';
	import MessageTimestamp from '@/components/conversation/MessageTimestamp';

	export default {
		components: {
			MessageFile,
			MessageTimestamp
		},
		props: {
			message: {
				type: Object,
				required: true
			},
			own: Boolean
		},
		data() {
			return {
				linkifiedOptions: {
					className: 'linkified-link',
					attributes(href) {
						return {
							title: href
						};
					}
				}
			};
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
			},
			timestampAlignment() {
				return this.own ? 'left' : 'right';
			}
		},
		mounted() {
			//manually add a click event listener to all linkified links in order to open them in the browser instead of new electron window
			this.$el.addEventListener('click', (e) => {
				if (e.target.tagName === 'A'
					&& e.target.classList.contains('linkified-link')
					&& e.target.href.startsWith('http')) {
					e.stopPropagation();
					e.preventDefault();
					shell.openExternal(e.target.href);
				}
			});
		}
	};
</script>

<style lang="scss">
	.message {
		display: flex;
		padding: 5px 15px;

		.avatar-wrapper {
			text-align: center;

			.avatar {
				width: 100px;
				height: 100px;
				border-radius: 100%;
				border: solid 4px $gray;
				cursor: pointer;

				&.online {
					border-color: $green;
				}
			}

			.author {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 14px;
				cursor: pointer;
			}
		}

		.message-wrapper {
			margin-left: 20px;
			flex: 1;
			//fixes an issue with the text ellipsis? wtf?
			width: 1px;

			.message-content {
				position: relative;
				margin-top: 20px;
				background-color: $white;
				padding: 15px;
				box-shadow:	0px 0px 0px 2px $gray;
				word-break: break-word;

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
				margin-left: 0px;
				margin-right: 20px;

				.message-content {
					&::before {
						left: 100%;
						top: 15px;

						border-right: 12px solid transparent;
						border-left: 12px solid $white;

						filter: drop-shadow(2px 0px 0px $gray);
					}
				}
			}
		}
	}
</style>
