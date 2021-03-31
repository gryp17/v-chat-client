<template>
	<FormButton
		transparent
		title="Send a private message"
		class="start-conversation-button"
		@click="$emit('click')"
	>
		<i class="fas fa-plus"></i>
	</FormButton>
</template>

<style scoped lang="scss">
	.start-conversation-button {
		&.transparent {
			margin: -7px 0px;
			padding: 3px;
			color: $white;
			font-size: 18px;

			&:hover {
				background-color: $gray-darkest;
			}

			> svg {
				margin: 0px;
			}
		}
	}
</style>
