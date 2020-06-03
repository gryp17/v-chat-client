<template>
	<modal v-bind="$attrs" @closed="closed" name="base-modal">
		<slot></slot>
	</modal>
</template>

<script>
	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			if (this.visible) {
				this.show();
			}
		},
		watch: {
			/**
			 * Watches the visible status and opens/closes the modal
			 * @param {Boolean} status
			 */
			visible(status) {
				if (status) {
					this.show();
				} else {
					this.hide();
				}
			}
		},
		methods: {
			show() {
				this.$modal.show('base-modal');
			},
			hide() {
				this.$modal.hide('base-modal');
			},
			closed() {
				this.$emit('hidden');
			}
		}
	};
</script>
