/**
 *
 */
class Portfolio {
	protocol: string;
	domain: string;
	cdn: string[];
	formats: string[];
	pictures: Array<string>;
	imagePath: string;
	configRequest: XMLHttpRequest;

	constructor() {
		this.protocol = window.location.protocol;
		this.cdn = [];
		this.cdn.push('cdn1.mh-photography.com');
		this.cdn.push('cdn2.mh-photography.com');
		this.cdn.push('cdn3.mh-photography.com');
		this.cdn.push('cdn4.mh-photography.com');

		this.configRequest = new XMLHttpRequest();
		this.configRequest.onload = () => {
			if (this.configRequest.readyState === 4 && this.configRequest.status === 200)  {
				const json = JSON.parse(this.configRequest.responseText);
				this.formats = json.image_formats;
				this.pictures = json.image_gallery;

				this.showThumbnail();
			}
		};
		this.configRequest.open(
			'get',
			 'config.php',
			// window.location.hostname === 'localhost' ? 'config.json' : 'config.php',
			true
		);
		this.configRequest.send();
	}

	static imageLoaded() {
		// TODO: replace placeholder with high quality picture
	}

	addSourceSet(picture: Element, url: String, size: Number, maxWidth = 0): Element {
		const webp = document.createElement('source');
		const jpeg = document.createElement('source');
		// const media = (maxWidth ? '(max-width: ' + size + 'px)' : '(min-width: 1921px)');
		const media = `(${'max-width'}: ${(maxWidth === 0 ? size : maxWidth)}px)`;
		const host = window.location.hostname.search('mh-photography.com') >= 0 ?
			window.location.protocol + '//cdn1.mh-photography.com/' : '';

		if (portfolio.formats.indexOf('webp') > -1) {
			webp.media = media;
			webp.type = 'image/webp';
			webp.srcset = host + 'image.php?path=' + url + (size > 0 ? '&width=' + size : '') + '&format=webp';
			picture.appendChild(webp);
		}
		if (portfolio.formats.indexOf('jpeg') > -1) {
			jpeg.media = media;
			jpeg.type = 'image/jpeg';
			jpeg.srcset = host + 'image.php?path=' + url + (size > 0 ? '?width=' + size : '');
			picture.appendChild(jpeg);
		}

		return picture;
	}

	showThumbnail() {
		const sizes = [72, 100, 140, 170, 200, 256];
		const width = [360, 450, 600, 700, 800, 1920];
		// myDictionary: { [index: string]: any; } = {};
		// const sizes = [{360:72},{450:100}, {600:140}, {700: 170}, {800: 200}, 256];
		const grid = document.getElementById('grid');

		grid.innerHTML = '';
		this.pictures.forEach((item) => {
			const link = document.createElement('a');
			const thumbnail = document.createElement('img');
			let picture: Element;
			picture = document.createElement('picture');

			link.className = 'thumbnail';
			link.href = item['file'];
			link.dataset.picture = item['name'];
			thumbnail.alt = item['name'];
			link.addEventListener('click', this.togglePicture);

			// for (let key in myDictionary) {
			// 	let value = myDictionary[key];
			// 	// Use `key` and `value`
			// }

			for (let i = 0; i < sizes.length; i++) {
				picture = this.addSourceSet(picture, item['file'], sizes[i], width[i]);
			}

			// sizes.forEach((size) => {
			// 	picture = this.addSourceSet(picture, item['file'], size);
			// });

			thumbnail.src = 'image.php?path=' + item['file'] + '&width=256';
			thumbnail.classList.add('placeholder');
			// TODO: add landscape or portrait for IE (no object-fit)
			thumbnail.classList.add((item ['width'] > item['height']) ? 'landscape' : 'portrait');

			// picture.appendChild(webp);
			picture.appendChild(thumbnail);
			link.appendChild(picture);
			grid.appendChild(link);
		});
	}

	showPicture(src: Element) {
		const sizes = [640, 768, 1024, 1366, 1600, 1920];
		// const sizes = [640, 768, 1024, 1366, 1600, 1920];
		let picture: Element;
		if (src.childElementCount === 1) {
			const source = document.createElement('source');
			const img = document.createElement('img');
			picture = document.createElement('picture');

			// picture = this.addSourceSet(picture, src.getAttribute('href'), sizes[0], true);
			sizes.forEach((size) => {
				picture = this.addSourceSet(picture, src.getAttribute('href'), size);
			});
			// picture = this.addSourceSet(picture, src.getAttribute('href'), sizes[sizes.length - 1], true);

			img.alt = '';
			picture.id = src.getAttribute('data-picture');
			picture.classList.add('picture');
			img.src = src.getAttribute('href');
			picture.appendChild(img);

			// Update listener
			// src.removeEventListener('click', this.showPicture);
			// picture.addEventListener('click', this.hidePicture);

			// Register event to trigger when high quality image is loaded
			if (img.complete) {
				Portfolio.imageLoaded();
			} else {
				img.addEventListener('load', Portfolio.imageLoaded);
			}
			src.appendChild(picture);
		}	else {
			picture = src.firstElementChild;
		}
		// Display picture
		src.classList.add('show');
	}

	hidePicture(src: Element) {
		const picture = src.firstElementChild;

		src.classList.remove('show');
	}

	togglePicture() {
		let src = event.srcElement;

		// Don't navigate to picture URL
		event.preventDefault();

		while (src.tagName.toLowerCase() !== 'a') {
			src = src.parentElement;
		}
		if (src.classList.contains('show')) {
			portfolio.hidePicture(src);
		} else {
			portfolio.showPicture(src);
		}
	}
}

let portfolio = new Portfolio();
