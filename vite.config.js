// vite.config.js

import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

module.exports = defineConfig({
	root: 'src',
	publicDir: '../public',
	build: {
		outDir: '../dist'
	},
	css: {},
	plugins: [
		handlebars({
			context: {
				BUILD: '<%= buildnumber %>',
				YEAR: new Date().getFullYear()
			},
			partialDirectory: './build'
		})
	]
});
