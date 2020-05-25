<template>
	<div
		:class="['conversation-item', { active: isActive }]"
		@click="onClick"
	>
		<!-- TODO: move this to it's own component and update it accordingly -->
		<div v-show="conversation.isPrivate" class="online-indicator"></div>
		{{ conversationName }}
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		props: {
			conversation: {
				type: Object,
				required: true
			}
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapState('chat', {
				openedConversation: (state) => state.conversation
			}),
			isActive() {
				return this.conversation.id === this.openedConversation.id;
			},
			conversationName() {
				if (this.conversation.isPrivate) {
					const user = this.conversation.users.find((user) => {
						return user.id !== this.userSession.id;
					});

					return user.displayName;
				}

				return this.conversation.name;
			}
		},
		methods: {
			...mapActions('chat', [
				'setConversation'
			]),
			onClick() {
				this.setConversation(this.conversation);
			}
		}
	};
</script>

<style lang="scss">
	.conversation-item {
		padding: 5px;
		cursor: pointer;

		&.active {
			background-color: darken($gray, 5%);
		}

		&:hover {
			background-color: darken($gray, 5%);
		}

		.online-indicator {
			display: inline-block;
			width: 10px;
			height: 10px;
			border-radius: 100%;
			background-color: $green;
		}
	}
</style>
