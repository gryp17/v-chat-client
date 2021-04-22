<template>
	<div class="image-preview-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="560"
			:height="'auto'"
			name="image-preview-modal"
			@before-open="onBeforeOpen"
		>
			<div class="content">
				<div
					v-if="file"
					class="image-preview"
					:style="imageStyle"
					:title="file.originalName"
				></div>
				<div class="controls">
					<FormButton
						title="Open image"
						@click="onOpenFile"
					>
						<i class="far fa-image"></i>
						Open
					</FormButton>
					<FormButton
						title="Download image"
						@click="onDownload"
					>
						<i class="far fa-arrow-alt-circle-down"></i>
						Download
					</FormButton>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	import { download, openFile } from '@/utils/files';

	export default {
		data() {
			return {
				file: null
			};
		},
		computed: {
			imageStyle() {
				if (!this.file) {
					return {};
				}

				return {
					'background-image': `url(${this.file.link})`
				};
			}
		},
		methods: {
			/**
			 * Sets the file object
			 * @param {Object} e
			 */
			onBeforeOpen(e) {
				this.file = e.params;
			},
			/**
			 * Opens a save file dialog and downloads the file
			 */
			onDownload() {
				download(this.file.link, this.file.originalName);
			},
			/**
			 * Opens the file (image) in a new window
			 */
			onOpenFile() {
				openFile(this.file.link);
			}
		}
	};
</script>

<style lang="scss">
	.image-preview-modal {
		.content {
			position: relative;

			.image-preview {
				height: 560px;
				background-size: 100% 100%;
			}

			.controls {
				position: absolute;
				bottom: 0px;
				padding: 15px;
				width: 100%;
				transition: all 300ms ease;
				background-color: rgba($gray-dark, 0.5);

				.form-button {
					margin-right: 10px;
					padding: 8px 12px;
				}
			}
		}
	}
</style>
