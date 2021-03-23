<template>
	<div class="settings-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="560"
			:height="'auto'"
			name="settings-modal"
		>
			<div class="header">
				Settings
			</div>
			<div class="content">
				content

				<div class="buttons-wrapper">
					<FormButton
						:disabled="submitting"
						@click="submit"
					>
						Save
					</FormButton>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				submitting: false
			};
		},
		methods: {
			submit() {

			}
		}
	};
</script>

<style lang="scss">
	.settings-modal {
		.header {
			padding: 10px;
			background-color: $gray-very-dark;
			color: $white;
			font-weight: bold;
		}

		.content {
			padding: 10px;

			.buttons-wrapper {
				text-align: center;
			}
		}
	}
</style>
