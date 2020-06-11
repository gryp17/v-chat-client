<template>
	<BaseModal
		:adaptive="true"
		:width="'100%'"
		:maxWidth="600"
		:visible="visible"
		@hidden="hideProfileModal"
	>
		profile modal content
	</BaseModal>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	export default {
		components: {
			BaseModal
		},
		data() {
			return {};
		},
		computed: {
			...mapState('modals', {
				visible: 'profileModalOpened'
			})
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
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			}
		}
	};
</script>
