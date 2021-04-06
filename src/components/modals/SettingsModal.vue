<template>
	<div class="settings-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="560"
			:height="'auto'"
			@before-open="onBeforeOpen"
			name="settings-modal"
		>
			<div class="header">
				Settings
			</div>
			<div class="content">

				Notifications

				<hr />

				<FormSwitch v-model="messageNotifications">
					Show new message notifications
				</FormSwitch>

				<FormSwitch v-model="onlineStatusNotifications">
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
	import { mapState, mapActions } from 'vuex';

	export default {
		data() {
			return {
				messageNotifications: false,
				onlineStatusNotifications: false,
				submitting: false
			};
		},
		computed: {
			...mapState('settings', [
				'showMessageNotifications',
				'showOnlineStatusNotifications'
			])
		},
		methods: {
			...mapActions('settings', [
				'updateSettings'
			]),
			/**
			 * Sets the checkbox values before opening the modal
			 */
			onBeforeOpen() {
				this.messageNotifications = this.showMessageNotifications;
				this.onlineStatusNotifications = this.showOnlineStatusNotifications;
			},
			/**
			 * Submits the settings modal
			 */
			async submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				await this.updateSettings({
					showMessageNotifications: this.messageNotifications,
					showOnlineStatusNotifications: this.onlineStatusNotifications
				});

				this.submitting = false;
				this.$modal.hide('settings-modal');
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
