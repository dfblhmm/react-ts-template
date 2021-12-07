import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import MinCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import commonConfig from './webpack.common';

const prodConfig: Configuration = {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				extractComments: false,
				terserOptions: {
					compress: {
						drop_console: true
					},
					mangle: true,
					toplevel: true
				}
			})
		],
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					filename: 'vendors/[contenthash:6]_vendors.js',
					priority: -10,
					reuseExistingChunk: true
				},
				default: {
					minChunks: 2,
					filename: 'common/common_[contenthash:6].js',
					priority: -20
				}
			}
		}
	},
	plugins: [
		new MinCssExtractPlugin({
			filename: 'css/[name].[contenthash:6].css',
			chunkFilename: 'css/[name].[contenthash:6].css'
		}),
		new CompressionWebpackPlugin({
			test: /\.(css|js)$/,
			minRatio: 0.7,
			algorithm: 'gzip'
		}),
		new CleanWebpackPlugin()
	]
};

export default merge(commonConfig, prodConfig);
