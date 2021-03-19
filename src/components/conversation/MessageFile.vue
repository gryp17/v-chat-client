<template>
	<div class="message-file">
		<div
			v-if="fileIsImage"
			class="image-file"
		>
			<img
				title="Open image"
				:src="file.link"
				@click="openFile"
			/>

			<div class="controls">
				<FormButton
					title="Open image"
					@click="openFile()"
				>
					<i class="far fa-image"></i>
					Open
				</FormButton>
				<FormButton
					title="Download image"
					@click="download()"
				>
					<i class="far fa-arrow-alt-circle-down"></i>
					Download
				</FormButton>
			</div>
		</div>
		<div
			v-else
			class="other-file"
			title="Download file"
			@click="download"
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
	import { ipcRenderer } from 'electron';

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
			async download() {
				ipcRenderer.send('download-url', {
					url: this.file.link,
					filename: this.file.originalName
				});
			},
			openFile() {
				window.open(this.file.link, '_blank', 'frame=true,nodeIntegration=no');
			}
		}
	};
</script>

<style lang="scss">
	.message-file {
		.image-file {
			position: relative;

			img {
				width: 100%;
				cursor: pointer;
			}

			.controls {
				position: absolute;
				bottom: 5px;
				padding: 15px;
				opacity: 0;
				width: 100%;
				transition: all 300ms ease;
				background-color: rgba($gray-dark, 0.5);

				.form-button {
					margin-right: 10px;
					padding: 8px 12px;
					font-size: 14px;
				}
			}

			&:hover {
				.controls {
					opacity: 1;
				}
			}
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
