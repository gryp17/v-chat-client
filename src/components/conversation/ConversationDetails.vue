<template>
	<div :class="['conversation-details', { opened }]">
		<div class="inner-wrapper">
			<div class="section-title">Members</div>
			<ConversationMember
				v-for="user in conversation.users"
				:key="user.id"
				:user="user"
				:online="userIsOnline(user.id)"
				class="user"
			/>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import ConversationMember from '@/components/conversation/ConversationMember';

	export default {
		components: {
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
