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
			padding: 5px;
			color: $white;
			font-size: 18px;

			&:hover {
				background-color: darken($gray-very-dark, 5%);
			}

			> svg {
				margin: 0px;
			}
		}
	}
</style>
