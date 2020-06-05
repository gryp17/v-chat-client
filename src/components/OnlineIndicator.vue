<template>
	<div
		:class="['online-indicator', { online, dark }]"
		:title="title"
	></div>
</template>

<script>
	export default {
		props: {
			online: Boolean,
			dark: Boolean
		},
		computed: {
			title() {
				return this.online ? 'Online' : 'Offline';
			}
		}
	};
</script>

<style lang="scss">
	.online-indicator {
		display: inline-block;
		margin-right: 5px;
		width: 10px;
		height: 10px;
		border: solid 1px $gray-dark;
		border-radius: 100%;
		background-color: $white;

		&.dark {
			background-color: $gray-dark;
		}

		&.online {
			border-color: $green;
			background-color: $green;
		}
	}
</style>
