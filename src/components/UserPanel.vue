<template>
	<div class="user-panel">
		<DropdownMenu>
			<template v-slot:button>
				<img
					class="avatar"
					:src="userSession.avatarLink"
				/>
				<div
					class="display-name"
					:title="userSession.displayName"
				>
					{{ userSession.displayName }}
				</div>

				<FormButton
					transparent
					title="Open user menu"
					class="menu-btn"
				>
					<i class="fas fa-bars"></i>
				</FormButton>
			</template>
			<template v-slot:items>
				<div
					@click="onEditProfile"
				>
					<i class="fas fa-user-edit"></i>
					Edit Profile
				</div>
				<div
					@click="onOpenSettings"
				>
					<i class="fas fa-cog"></i>
					Settings
				</div>
				<div
					@click="onLogout"
				>
					<i class="fas fa-sign-out-alt"></i>
					Logout
				</div>
			</template>
		</DropdownMenu>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import DropdownMenu from '@/components/DropdownMenu';

	export default {
		components: {
			DropdownMenu
		},
		computed: {
			...mapState('auth', [
				'userSession'
			])
		},
		methods: {
			...mapActions('auth', [
				'logout'
			]),
			/**
			 * Logs out the user
			 */
			async onLogout() {
				await this.logout();
				this.$router.push({
					name: 'authentication'
				});
			},
			/**
			 * Opens the edit profile modal
			 */
			onEditProfile() {
				this.$modal.show('edit-profile-modal');
			},
			/**
			 * Opens the settings modal
			 */
			onOpenSettings() {
				this.$modal.show('settings-modal');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.user-panel {
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

		::v-deep .menu-btn {
			color: $white;

			&:hover {
				background-color: $gray-medium-dark;
			}
		}
	}
</style>
