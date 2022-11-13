// vite.config.js
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { photos } from './tools/photos.js';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const albums = photos('assets/img/albums');

const pageData = {
	'/index.html': {
		navPath: ''
	},
	'/albums/index.html': {
		navPath: '/'
	},
	'/albums/business/index.html': {
		navPath: '/',
		title: 'Business',
		photos: albums['business'].images
	},
	'/albums/families-and-kids/index.html': {
		navPath: '/',
		title: 'Families & Kids',
		photos: albums['families-and-kids'].images
	},
	'/albums/people-and-lifestyle/index.html': {
		navPath: '/',
		title: 'People & Lifestyle',
		photos: albums['people-and-lifestyle'].images
	},
	'/albums/travel/index.html': {
		navPath: '/',
		title: 'Travel',
		photos: albums['travel'].images
	},
	'/albums/weddings/index.html': {
		navPath: '/',
		title: 'Weddings',
		photos: albums['weddings'].images
	}
};

module.exports = defineConfig({
	root: root,
	publicDir: '../public',
	build: {
		outDir: '../dist',
		rollupOptions: {
			input: {
				main: resolve(root, 'index.html'),
				albums: resolve(root, 'albums', 'index.html'),
				business: resolve(root, 'albums/business', 'index.html')
			}
		}
	},
	preview: {
		port: 8080
	},
	plugins: [
		handlebars({
			context(pagePath) {
				return {
					currentYear: new Date().getFullYear(),
					version: `v${process.env.npm_package_version}`,
					context: pageData[pagePath]
				};
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
