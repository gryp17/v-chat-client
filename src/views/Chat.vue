<template>
	<div class="chat-page">
		Chat page
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		mounted() {
			//TODO: fetch all the necessary data and set loading to false
			this.setLoading(true);

			setTimeout(() => {
				this.setLoading(false);
			}, 1500);
		},
		methods: {
			...mapActions('ui', [
				'setLoading'
			])
		}
	};
</script>
