<template>
	<div
		class="user-panel"
		ref="panel"
	>
		<img
			class="avatar"
			:src="userSession.avatarLink"
			@click="toggleActions"
		/>
		<div
			class="display-name"
			:title="userSession.displayName"
			@click="toggleActions"
		>
			{{ userSession.displayName }}
		</div>
		<div class="user-menu">
			<FormButton
				transparent
				title="Open user menu"
				:active="showActions"
				@click="toggleActions"
			>
				<i class="fas fa-bars"></i>
			</FormButton>

			<div
				v-show="showActions"
				class="actions"
			>
				<div
					@click="onEditProfile"
					class="action"
				>
					<i class="fas fa-user-edit"></i>
					Edit Profile
				</div>
				<div
					@click="onOpenSettings"
					class="action"
				>
					<i class="fas fa-cog"></i>
					Settings
				</div>
				<div
					@click="onLogout"
					class="action"
				>
					<i class="fas fa-sign-out-alt"></i>
					Logout
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		data() {
			return {
				showActions: false
			};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			])
		},
		mounted() {
			document.addEventListener('click', this.handleOutsideClick);
		},
		destroyed() {
			document.removeEventListener('click', this.handleOutsideClick);
		},
		methods: {
			...mapActions('auth', [
				'logout'
			]),
			/**
			 * Handles clicks outside of the component and closes the actions menu
			 * @param {Object} e
			 */
			handleOutsideClick(e) {
				const panel = this.$refs.panel;
				const isClickInside = panel.contains(e.target);

				if (!isClickInside) {
					this.hideActions();
				}
			},
			/**
			 * Hides the actions menu
			 */
			hideActions() {
				this.showActions = false;
			},
			/**
			 * Toggles the actions menu
			 */
			toggleActions() {
				this.showActions = !this.showActions;
			},
			/**
			 * Logs out the user
			 */
			async onLogout() {
				this.hideActions();

				await this.logout();
				this.$router.push({
					name: 'authentication'
				});
			},
			/**
			 * Opens the edit profile modal
			 */
			onEditProfile() {
				this.hideActions();
				this.$modal.show('edit-profile-modal');
			},
			/**
			 * Opens the settings modal
			 */
			onOpenSettings() {
				this.hideActions();
				this.$modal.show('settings-modal');
			}
		}
	};
</script>

<style lang="scss">
	.user-panel {
		display: flex;
		padding: 8px 5px;
		color: $white;
		background-color: $gray-darkest;
		border-bottom: solid 1px $gray-medium-dark;

		.avatar {
			margin-right: 10px;
			width: 45px;
			height: 45px;
			border-radius: 100%;
			cursor: pointer;
		}

		.display-name {
			flex: 1;
			align-self: center;
			text-overflow: ellipsis;
			overflow-x: hidden;
			white-space: nowrap;
			cursor: pointer;
		}

		.user-menu {
			position: relative;
			align-self: center;

			> button.form-button.transparent {
				color: $white;
				cursor: pointer;

				&:hover, &.active {
					background-color: $gray-darkest;
				}
			}

			.actions {
				position: absolute;
				margin-top: 3px;
				right: 0px;
				padding: 5px 0px;
				min-width: 200px;
				background-color: $white;
				z-index: 1;
				border: solid 1px $gray;
				border-radius: 3px;
				color: $text-color;

				&::before {
					content: '';
					position: absolute;
					width: 0;
					height: 0;
					top: -24px;
					right: 12px;
					border: 12px solid transparent;
					border-bottom: 12px solid $white;
					pointer-events: none;
					filter: drop-shadow(-2px 0px 0px $gray);
				}

				.action {
					padding: 10px;
					cursor: pointer;

					&:hover {
						background-color: $gray;
					}
				}
			}
		}
	}
</style>
