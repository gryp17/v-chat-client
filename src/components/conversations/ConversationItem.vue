<template>
	<div
		:class="['conversation-item', { active, unread: conversation.unread }]"
		:title="conversation.name"
		@click="$emit('open', conversation.id)"
	>
		<div class="conversation-item-inner">
			<OnlineIndicator
				v-show="conversation.isPrivate"
				:online="online"
				dark
			/>
			<span v-if="conversation.muted">
				<i
					class="fas fa-bell-slash"
					title="Muted"
				/>
			</span>{{ conversation.name }}
		</div>
	</div>
</template>

<script>
	import OnlineIndicator from '@/components/OnlineIndicator';

	export default {
		components: {
			OnlineIndicator
		},
		props: {
			active: Boolean,
			conversation: {
				type: Object,
				required: true
			},
			currentUser: {
				type: Object,
				required: true
			}
		},
		computed: {
			conversationUser() {
				return this.conversation.users.find((user) => {
					return user.id !== this.currentUser.id;
				});
			},
			online() {
				if (this.conversation.isPrivate) {
					return this.conversationUser.online;
				}

				return false;
			}
		}
	};
</script>

<style lang="scss">
	.conversation-item {
		overflow-x: hidden;

		.conversation-item-inner {
			padding: 5px;
			text-overflow: ellipsis;
			overflow-x: hidden;
			white-space: nowrap;
			cursor: pointer;

			.fa-bell-slash {
				font-size: 14px;
				margin-left: 3px;
				margin-right: 4px;
			}
		}

		&.active {
			background-color: $gray-medium-dark;
		}

		&.unread {
			.conversation-item-inner {
				color: $orange;
				font-weight: bold;

				animation: 3s shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
				transform: translate3d(0, 0, 0);

				@keyframes shake {
					5%, 45% {
						transform: translate3d(-1px, 0, 0);
					}

					10%, 40% {
						transform: translate3d(2px, 0, 0);
					}

					15%, 25%, 35% {
						transform: translate3d(-4px, 0, 0);
					}

					20%, 30% {
						transform: translate3d(4px, 0, 0);
					}
				}
			}
		}

		&:hover {
			background-color: $gray-medium-dark;
		}
	}
</style>
