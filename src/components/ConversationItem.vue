<template>
	<div
		:class="['conversation-item', { active }]"
		@click="onClick"
	>
		<!-- TODO: move this to it's own component and update it accordingly -->
		<div v-show="conversation.isPrivate" class="online-indicator"></div>
		{{ conversationName }}
	</div>
</template>

<script>
	export default {
		props: {
			conversation: {
				type: Object,
				required: true
			},
			currentUser: {
				type: Object,
				required: true
			},
			active: Boolean
		},
		computed: {
			conversationName() {
				if (this.conversation.isPrivate) {
					const user = this.conversation.users.find((user) => {
						return user.id !== this.currentUser.id;
					});

					return user.displayName;
				}

				return this.conversation.name;
			}
		},
		methods: {
			onClick() {
				this.$emit('open', this.conversation);
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
