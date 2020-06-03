<template>
	<button
		:class="['form-button', {active, outline, transparent}, className]"
		:type="type"
		v-on="{
			...$listeners
		}"
	>
		<slot>Click me</slot>
	</button>
</template>

<script>
	export default {
		props: {
			className: String,
			type: {
				type: String,
				default: 'button'
			},
			active: {
				type: Boolean,
				default: false
			},
			outline: {
				type: Boolean,
				default: false
			},
			transparent: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-button {
		padding: 10px 15px;
		border: solid 1px transparent;
		background-color: $blue-light;
		color: $white;
		transition: all 0.4s ease-in-out;
		font-size: 16px;
		cursor: pointer;

		&:hover, &:active, &:focus, &.active {
			background-color: darken($blue-light, 15%);
		}

		&:disabled {
			background-color: lighten($blue-light, 15%);
			cursor: not-allowed;

			&:hover {
				background-color: lighten($blue-light, 15%);
			}
		}

		&.outline {
			background-color: $white;
			color: $blue-light;
			border: solid 1px $blue-light;

			&:hover, &:active, &:focus, &.active {
				background-color: $blue-light;
				color: $white;
			}
		}

		&.transparent {
			background-color: transparent;
			color: $blue-light;
			opacity: 0.8;

			&:hover, &.active {
				background-color: $gray-light;
				opacity: 1;
			}
		}

		> svg {
			margin-right: 3px;
		}
	}
</style>
