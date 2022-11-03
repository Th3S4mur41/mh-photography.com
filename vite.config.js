// vite.config.js
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

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
			}
		})
	],
	css: {},
	resolve: {
		alias: {
			'~': 'node_modules/'
		}
	}
});
