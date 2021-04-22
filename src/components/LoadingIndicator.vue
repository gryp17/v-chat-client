<template>
	<div :class="['loading-indicator', { 'full-screen': fullScreen }]">
		<img class="loading-image" src="@/assets/img/loading.gif" />
	</div>
</template>

<script>
	export default {
		props: {
			fullScreen: {
				type: Boolean
			}
		}
	};
</script>

<style lang="scss">
	.loading-indicator {
		display: flex;
		width: 100%;
		height: 100%;

		.loading-image {
			display: block;
			margin: auto;
		}

		&.full-screen {
			position: absolute;
			background-color: $white;
			z-index: 9999;
		}
	}
</style>
