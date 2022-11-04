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
	preview: {
		port: 8080
	},
	plugins: [
		handlebars({
			context: {
				currentYear: new Date().getFullYear(),
				version: `v${process.env.npm_package_version}`
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
