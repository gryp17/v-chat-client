<template>
	<div :class="['conversation-details', { opened }]">
		<div class="inner-wrapper">
			<div class="section-title">Members</div>
			<ConversationMember
				v-for="user in conversation.users"
				:key="user.id"
				:user="user"
				:online="userIsOnline(user.id)"
				@click="showProfileModal($event)"
			/>
		</div>

		<ProfileModal />
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import ProfileModal from '@/components/modals/ProfileModal';
	import ConversationMember from '@/components/conversation/ConversationMember';

	export default {
		components: {
			ProfileModal,
			ConversationMember
		},
		props: {
			opened: Boolean
		},
		computed: {
			...mapState('chat', [
				'conversation',
				'onlineUsers'
			]),
			...mapGetters('chat', [
				'userIsOnline'
			])
		},
		methods: {
			...mapActions('modals', [
				'showProfileModal'
			])
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
