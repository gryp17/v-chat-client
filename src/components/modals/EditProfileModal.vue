<template>
	<div class="edit-profile-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="320"
			:height="'auto'"
			name="edit-profile-modal"
		>
			<div class="content">
				content

				<div class="buttons-wrapper">
					<FormButton>
						Save
					</FormButton>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		data() {
			return {};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			])
		},
		methods: {
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			}
		}
	};
</script>

<style lang="scss">
	.edit-profile-modal {
		.content {
			padding: 0px 10px 10px 10px;

			.buttons-wrapper {
				text-align: center;
			}
		}
	}
</style>
