<template>
	<div class="profile-modal">
		<BaseModal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="320"
			:height="'auto'"
			:visible="visible"
			@hidden="hideProfileModal"
		>
			<template v-if="userProfile">
				<img :src="avatar" class="avatar" />

				<div class="content">
					<div class="display-name">
						<OnlineIndicator
							:online="userProfile.online"
						/>
						{{ userProfile.displayName }}
					</div>

					<p class="bio">
						{{ bio }}
					</p>

					<div class="buttons-wrapper">
						<FormButton v-if="canEditProfile">
							<i class="fas fa-user-edit"></i>
							Edit Profile
						</FormButton>
						<FormButton v-else @click="openConversation">
							<i class="fas fa-comment-alt"></i>
							Message
						</FormButton>
					</div>
				</div>
			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';
	import OnlineIndicator from '@/components/OnlineIndicator';

	export default {
		components: {
			BaseModal,
			OnlineIndicator
		},
		data() {
			return {};
		},
		computed: {
			...mapState('modals', {
				visible: 'profileModalOpened'
			}),
			...mapState('auth', [
				'server',
				'userSession'
			]),
			...mapGetters('chat', [
				'userProfile'
			]),
			avatar() {
				return `${this.server}/avatars/${this.userProfile.avatar}`;
			},
			bio() {
				return this.userProfile.bio ? this.userProfile.bio : 'Apparently, this user prefers to keep an air of mystery about them.';
			},
			canEditProfile() {
				return this.userSession.id === this.userProfile.id;
			}
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible(value) {
				this.resetState();
			}
		},
		methods: {
			...mapActions('modals', [
				'hideProfileModal'
			]),
			...mapActions('chat', [
				'openConversationWithUser'
			]),
			async openConversation() {
				await this.openConversationWithUser(this.userProfile.id);
				this.hideProfileModal();
			},
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			}
		}
	};
</script>

<style lang="scss">
	.profile-modal {
		.avatar {
			width: 100%;
		}

		.content {
			padding: 0px 10px 10px 10px;

			.display-name {
				display: flex;
				align-items: center;
				padding: 5px 0px;
				font-size: 20px;
				font-weight: bold;
			}

			.bio {
				max-height: 120px;
				margin-top: 0px;
				overflow-y: auto;
			}

			.buttons-wrapper {
				display: flex;

				.form-button {
					flex: 1;
				}
			}
		}
	}
</style>
