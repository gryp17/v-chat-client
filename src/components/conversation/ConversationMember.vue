<template>
	<div class="conversation-member">
		<OnlineIndicator v-show="online" />
		{{ user.displayName }}
	</div>
</template>

<script>
	import OnlineIndicator from '@/components/OnlineIndicator';

	export default {
		components: {
			OnlineIndicator
		},
		props: {
			user: {
				type: Object,
				required: true
			},
			online: Boolean
		}
	};
</script>
