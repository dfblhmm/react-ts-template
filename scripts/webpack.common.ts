import { Configuration, ProgressPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MinCssExtractPlugin from 'mini-css-extract-plugin';
import getPath from './path';

const isProduction = process.env.NODE_ENV === 'production';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.s(c|a)ss$/;
const sassModuleRegex = /\.module\.s(c|a)ss$/;

const commonConfig: Configuration = {
	entry: './src/index.tsx',
	output: {
		path: getPath('./dist'),
		filename: 'chunks/[name].[chunkhash:6].js',
		chunkFilename: 'chunks/[name].[contenthash:6].js'
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				]
			},
			{
				test: cssRegex,
				exclude: cssModuleRegex,
				sideEffects: true,
				use: [
					isProduction ? MinCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				]
			},
			{
				test: cssModuleRegex,
				sideEffects: true,
				use: [
					isProduction ? MinCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: isProduction
									? '[hash:base64]'
									: '[path][name]__[local]--[hash:base64:5]'
							}
						}
					},
					'postcss-loader'
				]
			},
			{
				test: sassRegex,
				exclude: sassModuleRegex,
				sideEffects: true,
				use: [
					isProduction ? MinCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: sassModuleRegex,
				sideEffects: true,
				use: [
					isProduction ? MinCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: {
								localIdentName: isProduction
									? '[hash:base64]'
									: '[path][name]__[local]--[hash:base64:5]'
							}
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				type: 'asset',
				generator: {
					filename: 'img/[name][hash:6][ext]'
				},
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024
					}
				}
			},
			{
				test: /\.ttf|eot|woff2?$/i,
				type: 'asset-resource',
				generator: {
					filename: 'font/[name][hash:6][ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '...'],
		alias: {
			'@': getPath('./src')
		}
	},
	plugins: [
		new ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: getPath('./public/index.html'),
			favicon: getPath('./public/favicon.ico')
		})
	]
};

export default commonConfig;
