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

				Notifications

				<hr />

				<FormSwitch v-model="showMessageNotifications">
					Show new message notifications
				</FormSwitch>

				<FormSwitch v-model="showOnlineStatusNotifications">
					Show online status notifications
				</FormSwitch>

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
				showMessageNotifications: false,
				showOnlineStatusNotifications: false,
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
			padding: 20px 10px 10px 10px;

			hr {
				width: 100%;
				border: none;
				border-top: solid 1px $gray;
			}

			.buttons-wrapper {
				padding-top: 5px;
				text-align: center;
			}
		}
	}
</style>
