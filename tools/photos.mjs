/**
 * tools/photos.js
 */

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { sizeOf } from 'image-size';

const projectRoot = '../';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * getPhotos
 * @param {string} input The path of the photo albums
 * @returns {JSON} the JSON representations of the photo albums
 */
export const photos = (input) => {
	input = input || 'assets/img/albums';
	const albumsPath = path.join(__dirname, projectRoot, input);

	const photos = {};

	// Get a list of albums
	const albums = fs
		.readdirSync(albumsPath, { withFileTypes: true })
		.filter((item) => {
			return item.isDirectory();
		})
		.map((item) => {
			return item.name;
		});

	// Get a list of file in each album
	albums.forEach((album) => {
		photos[album] = {};
		photos[album].path = `${input}/${album}`;
		photos[album].images = [];

		const images = fs
			.readdirSync(path.join(__dirname, projectRoot, photos[album].path), {
				withFileTypes: true
			})
			.filter((item) => {
				return item.isFile();
			})
			.map((item) => {
				return item.name;
			});

		images.forEach((image) => {
			const img = {};

			const destImage = image.replace(/ /g, '-').replace(/&/g, 'and').toLowerCase();
			img.name = destImage.substring(0, destImage.lastIndexOf('.'));
			img.extension = destImage.substring(destImage.lastIndexOf('.'));
			img.path = `/${photos[album].path}/`;
			img.url = `/${photos[album].path}/${destImage}`;

			const dimensions = sizeOf(path.join(__dirname, projectRoot, `/${photos[album].path}/${image}`));
			img.width = dimensions.width;
			img.height = dimensions.height;
			img.orientation = dimensions.width > dimensions.height ? 'landscape' : 'portrait';

			photos[album].images.push(img);
		});
	});

	return photos;
};

export const writePhotosFile = (input, output) => {
	fs.writeFile(output || 'photos.json', JSON.stringify(photos(input)), () => {
		// Checking for errors
		console.log('Done writing'); // Success
	});
};
