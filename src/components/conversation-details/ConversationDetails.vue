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
	import ConversationMember from '@/components/conversation-details/ConversationMember';

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
		transition: all 400ms ease;
		background-color: $white;
		border-left: solid 1px $gray;

		&.opened {
			width: 200px;
		}

		.inner-wrapper {
			padding: 5px;
		}

		.section-title {
			margin: 5px 0px;
			font-weight: bold;
		}
	}
</style>
