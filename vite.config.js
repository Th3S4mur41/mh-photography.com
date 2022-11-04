// vite.config.js
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

module.exports = defineConfig({
	root: 'src',
	publicDir: '../public',
	build: {
		outDir: '../dist'
	},
	plugins: [
		handlebars({
			context: {
				currentYear: new Date().getFullYear()
			},
			partialDirectory: resolve(__dirname, 'src/partials')
		})
	],
	css: {},
	resolve: {
		alias: {
			'~': 'node_modules/'
		}
	}
});
