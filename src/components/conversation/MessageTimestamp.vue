<template>
	<div :class="['message-timestamp', alignment]">
		<span :title="fullDate">
			{{ formattedDate }}
		</span>
	</div>
</template>

<script>
	import moment from 'moment';

	export default {
		props: {
			alignment: {
				type: String,
				default: 'left'
			},
			date: {
				type: String,
				required: true
			}
		},
		computed: {
			fullDate() {
				return moment(this.date).format('YYYY-MM-DD HH:mm:ss');
			},
			formattedDate() {
				const date = moment(this.date);

				if (date.isSame(moment(), 'day')) {
					return date.format('HH:mm:ss');
				}

				return this.fullDate;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.message-timestamp {
		&.right {
			text-align: right;
		}

		span {
			font-size: 10px;
			color: $gray-dark;
			cursor: default;
		}
	}
</style>
