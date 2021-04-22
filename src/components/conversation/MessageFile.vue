<template>
	<div class="message-file">
		<img
			v-if="fileIsImage"
			class="image-file"
			title="Open preview"
			:src="file.link"
			@click="openImagePreview"
		/>
		<div
			v-else
			class="other-file"
			title="Download file"
			@click="onDownload"
		>
			<div class="file-icon-wrapper">
				<i class="fas fa-file-download"></i>
			</div>
			<div
				class="file-name-wrapper"
				:title="file.originalName"
			>
				{{ file.originalName }}
			</div>
		</div>
	</div>
</template>

<script>
	import { download } from '@/utils/files';

	export default {
		props: {
			file: {
				type: Object,
				required: true
			}
		},
		computed: {
			fileIsImage() {
				return /image\//.test(this.file.type);
			}
		},
		methods: {
			/**
			 * Opens the image preview modal
			 */
			openImagePreview() {
				this.$modal.show('image-preview-modal', this.file);
			},
			/**
			 * Opens a save file dialog and downloads the file
			 */
			async onDownload() {
				download(this.file.link, this.file.originalName);
			}
		}
	};
</script>

<style lang="scss">
	.message-file {
		.image-file {
			width: 100%;
			cursor: pointer;
		}

		.other-file {
			display: flex;
			background-color: $gray-light;
			border-radius: 5px;
			cursor: pointer;

			.file-icon-wrapper {
				padding: 15px;
				font-size: 30px;
				align-self: center;
				text-align: center;
				color: $gray-dark;
			}

			.file-name-wrapper {
				padding-right: 15px;
				align-self: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: $blue-light;
			}
		}
	}
</style>
