module.exports = {
	//set custom app/window title
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = 'vChat';
			return args;
		});
	},
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				productName: 'vChat',
				appId: 'com.plamen.vchat',
				win: {
					icon: './public/icon.ico'
				}
			}
		}
	},
	css: {
		loaderOptions: {
			sass: {
				//imports the provided scss files globally (in every vue component)
				//so you don't have to import them manually
				prependData: `
					@import '@/assets/css/_variables.scss';
				`
			}
		}
	}
};
