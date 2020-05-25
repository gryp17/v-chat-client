<template>
	<div
		class="conversation-item"
		@click="onClick"
	>
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
			}
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
