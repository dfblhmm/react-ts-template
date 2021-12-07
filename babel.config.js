const presets = [
	[
		'@babel/preset-env',
		{
			useBuiltIns: 'usage',
			corejs: {
				version: 3,
				proposals: true
			}
		}
	],
	'@babel/preset-react',
	'@babel/preset-typescript'
];
const plugins = [];

if (process.env.mode === 'dev') {
	plugins.push('react-refresh/babel');
}

module.exports = {
	presets,
	plugins
};
