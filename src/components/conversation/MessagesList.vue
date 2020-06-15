<template>
	<div class="messages-list" ref="list">
		<div
			v-for="message in conversationMessages"
			:key="message.id"
			class="message"
		>
			{{ message.content }}
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	//TODO: fix the messages order and implement the loading of older messages on scroll?

	export default {
		computed: {
			...mapGetters('chat', [
				'conversationMessages'
			])
		},
		watch: {
			conversationMessages: {
				handler() {
					//scroll to the bottom every time the messages change
					this.scrollToBottom();
				},
				deep: true
			}
		},
		methods: {
			scrollToBottom() {
				const list = this.$refs.list;
				list.scrollTop = list.scrollHeight;
			}
		}
	};
</script>

<style scoped lang="scss">
	.messages-list {
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		overflow-y: auto;
	}
</style>
