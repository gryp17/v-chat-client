<template>
	<div class="conversation-placeholder">
		<!-- hackfix for the fontawesome vue icons -->
		<span key="info">
			<i class="fas fa-info-circle"></i>
		</span>
		Select a conversation from the list on the left
	</div>
</template>

<style scoped lang="scss">
	.conversation-placeholder {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		align-items: center;
		padding: 50px;
		height: 100%;
		font-size: 18px;
		color: $gray-dark;

		svg {
			margin-bottom: 20px;
			font-size: 54px;
		}
	}
</style>
