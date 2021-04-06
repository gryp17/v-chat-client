<template>
	<div class="profile-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="320"
			:height="'auto'"
			name="profile-modal"
		>
			<template v-if="userProfile">
				<img :src="userProfile.avatarLink" class="avatar" />

				<div class="content">
					<div :title="userProfile.displayName" class="display-name">
						<OnlineIndicator
							:online="userProfile.online"
						/>{{ userProfile.displayName }}
					</div>

					<p class="bio">
						{{ bio }}
					</p>

					<div class="buttons-wrapper">
						<FormButton v-if="canEditProfile" @click="showEditProfileModal">
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
		</modal>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import OnlineIndicator from '@/components/OnlineIndicator';

	export default {
		components: {
			OnlineIndicator
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapGetters('chat', [
				'userProfile'
			]),
			bio() {
				return this.userProfile.bio ? this.userProfile.bio : 'Apparently, this user prefers to keep an air of mystery about them.';
			},
			canEditProfile() {
				return this.userSession.id === this.userProfile.id;
			}
		},
		methods: {
			...mapActions('chat', [
				'openConversationWithUser'
			]),
			/**
			 * Creates/opens a conversation with the user
			 */
			async openConversation() {
				await this.openConversationWithUser(this.userProfile.id);
				this.$modal.hide('profile-modal');
			},
			/**
			 * Opens the edit profile modal
			 */
			showEditProfileModal() {
				this.$modal.hide('profile-modal');
				setTimeout(() => {
					this.$modal.show('edit-profile-modal');
				}, 200);
			}
		}
	};
</script>

<style lang="scss">
	.profile-modal {
		.avatar {
			width: 100%;
			max-height: 320px;
		}

		.content {
			padding: 0px 10px 10px 10px;

			.display-name {
				padding: 5px 0px;
				text-overflow: ellipsis;
				overflow-x: hidden;
				white-space: nowrap;
				font-size: 20px;
				font-weight: bold;
			}

			.bio {
				max-height: 100px;
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
