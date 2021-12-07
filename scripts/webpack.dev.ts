import webpack, { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import RefreshReactPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import getPath from './path';
import commonConfig from './webpack.common';

process.env.mode = 'dev';

const devConfig: Configuration = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	cache: {
		type: 'filesystem',
		allowCollectingMemory: true
	},
	devServer: {
		static: {
			directory: getPath('./public')
		},
		client: {
			overlay: {
				errors: true,
				warnings: false
			}
		},
		open: true,
		hot: true,
		compress: true
	},
	plugins: [
		new RefreshReactPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};

export default merge(commonConfig, devConfig);
