module.exports = {
	plugins: [
		require('postcss-nesting'),
		require('autoprefixer'),
		require('postcss-preset-env')({
			preserve: true
		}),
		require('cssnano')({
			preset: 'default'
		})
	]
};
