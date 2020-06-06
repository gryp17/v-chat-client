<template>
	<div class="loading-indicator">
		<img class="loading-image" src="@/assets/img/loading.gif" />
	</div>
</template>

<style lang="scss">
	.loading-indicator {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		background-color: $white;
		z-index: 1;

		.loading-image {
			display: block;
			margin: auto;
		}
	}
</style>
