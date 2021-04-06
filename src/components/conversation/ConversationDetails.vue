<template>
	<div :class="['conversation-details', { opened }]">
		<div class="inner-wrapper">
			<div class="section-title">Members</div>
			<ConversationMember
				v-for="user in conversation.users"
				:key="user.id"
				:user="user"
				@click="showProfileModal($event)"
			/>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import ConversationMember from '@/components/conversation/ConversationMember';

	export default {
		components: {
			ConversationMember
		},
		props: {
			opened: Boolean
		},
		computed: {
			...mapGetters('chat', [
				'conversation'
			])
		},
		methods: {
			...mapActions('chat', [
				'setSelectedUser'
			]),
			/**
			 * Opens the user profile modal
			 * @param {Number} userId
			 */
			showProfileModal(userId) {
				this.setSelectedUser(userId);
				this.$modal.show('profile-modal');
			}
		}
	};
</script>

<style lang="scss">
	.conversation-details {
		width: 0px;
		overflow-y: auto;
		overflow-x: hidden;
		transition: all 400ms ease;
		background-color: $white;
		border-left: solid 1px $gray;

		&.opened {
			width: 200px;
		}

		.section-title {
			padding: 5px;
			font-weight: bold;
		}
	}
</style>
