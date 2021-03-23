<template>
	<div class="user-menu" ref="menu">
		<FormButton
			transparent
			:active="showActions"
			@click="toggleActions"
		>
			<i class="fas fa-cog"></i>
			User Menu
		</FormButton>

		<div
			v-show="showActions"
			class="actions"
			ref="actions"
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
</template>

<script>
	export default {
		data() {
			return {
				showActions: false
			};
		},
		mounted() {
			document.addEventListener('click', this.handleOutsideClick);
		},
		destroyed() {
			document.removeEventListener('click', this.handleOutsideClick);
		},
		methods: {
			handleOutsideClick(e) {
				const picker = this.$refs.menu;
				const isClickInside = picker.contains(e.target);

				if (!isClickInside) {
					this.hideActions();
				}
			},
			onLogout() {
				this.$emit('logout');
				this.hideActions();
			},
			onEditProfile() {
				this.$emit('editProfile');
				this.hideActions();
			},
			onOpenSettings() {
				this.$emit('openSettings');
				this.hideActions();
			},
			hideActions() {
				this.showActions = false;
			},
			toggleActions() {
				this.showActions = !this.showActions;
			}
		}
	};
</script>

<style lang="scss">
	.user-menu {
		position: relative;

		> button.form-button.transparent {
			display: block;
			color: $text-color;
			cursor: pointer;
		}

		.actions {
			position: absolute;
			left: 0px;
			padding: 5px 0px;
			min-width: 200px;
			background-color: $white;
			z-index: 1;
			border: solid 1px $gray;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
			border-top-right-radius: 5px;

			.action {
				padding: 10px;
				cursor: pointer;

				&:hover {
					background-color: $gray;
				}
			}
		}
	}
</style>
